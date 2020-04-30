import db from "../configs/database";
import dtf from "../tools/transformer";
import { v4 as uuidv4 } from "uuid";

const services = {};

services.addBoardData = async (user) => {
  const boardId = uuidv4();
  const pageId = uuidv4();
  const lineId = uuidv4();
  const cardId = uuidv4();

  const initialBoardData = {
    id: boardId,
    name: "Untitled Coop",
    img: "",
    owner: user.email,
    member:[]
  };
  const initialLineData = {
    id: boardId,
    data: [{ id: pageId, line: [], color: [], size: [] }],
  };
  const initialCardData = {
    id: boardId,
    data: [{ id: pageId, data: [] }],
  };

  const promiseSetList = [
    db.collection("boardData").doc(boardId).set(initialBoardData),
    db.collection("lineData").doc(lineId).set(initialLineData),
    db.collection("cardData").doc(cardId).set(initialCardData),
  ];
  await Promise.all(promiseSetList);

  // NOTE new version
  const promiseGetList = [
    db.collection("boardData").doc(boardId).get(),
    db.collection("lineData").doc(lineId).get(),
    db.collection("cardData").doc(cardId).get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [
    fireBoardData,
    fireLineData,
    fireCardData,
  ] = responseGetList;

  const boardDataList = dtf.keyRemove([fireBoardData]);
  const lineDataList = dtf.keyRemove([fireLineData]);
  const cardDataList = dtf.keyRemove([fireCardData]);

  const newUserBoard = [...user.board, boardId]
  await db.collection("user").doc(user.id).update({
    board: newUserBoard,
  })

  const resData = {
    boardData: boardDataList[0],
    lineData: lineDataList[0],
    cardData: cardDataList[0],
    boardId: boardId,
  };

  

  return resData;
};

services.fetchBoard = async () => {
  const promiseGetList = [
    db.collection("boardData").get(),
    db.collection("lineData").get(),
    db.collection("cardData").get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [
    fireBoardDataList,
    fireLineDataList,
    fireCardDataList,
  ] = responseGetList;

  const boardDataList = dtf.keyRemove(fireBoardDataList.docs);
  const lineDataList = dtf.keyRemove(fireLineDataList.docs);
  const cardDataList = dtf.keyRemove(fireCardDataList.docs);

  const resData = {
    boardDataList,
    lineDataList,
    cardDataList,
  };
  return resData;
};

services.deleteBoard = async (boardId) => {
  const lineIdList = await db
    .collection("lineData")
    .where("id", "==", boardId)
    .get()
    .then((fireLineDataList) => {
      if (fireLineDataList.empty) {
        return;
      }
      const outputList = [];
      fireLineDataList.forEach((doc) => outputList.push(doc.id));
      return outputList;
    })
    .catch((err) => {
      throw err;
    });

  const cardIdList = await db
    .collection("cardData")
    .where("id", "==", boardId)
    .get()
    .then((fireCardDataList) => {
      if (fireCardDataList.empty) {
        return;
      }
      const outputList = [];
      fireCardDataList.forEach((doc) => outputList.push(doc.id));
      return outputList;
    })
    .catch((err) => {
      throw err;
    });

  const promiseSetList = [
    db.collection("boardData").doc(boardId).delete(),
    db.collection("lineData").doc(lineIdList[0]).delete(),
    db.collection("cardData").doc(cardIdList[0]).delete(),
  ];
  await Promise.all(promiseSetList);

  return;
};

services.addPage = async (boardId) => {
  const pageId = uuidv4();

  const newLineData = {
    id: pageId,
    line: [],
    color: [],
    size: [],
  };
  const newCardData = {
    id: pageId,
    data: [],
  };
  const promiseGetList = [
    db.collection("lineData").where("id", "==", boardId).get(),
    db.collection("cardData").where("id", "==", boardId).get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [fireLineData, fireCardData] = responseGetList;

  const lineId = fireLineData.docs[0].id;
  const cardId = fireCardData.docs[0].id;

  const lineData = dtf.keyRemove(fireLineData.docs);
  const cardData = dtf.keyRemove(fireCardData.docs);

  lineData[0].data.push(newLineData);
  cardData[0].data.push(newCardData);

  const promiseSetList = [
    db.collection("lineData").doc(lineId).update({ data: lineData[0].data }),
    db.collection("cardData").doc(cardId).update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  const resData = {
    boardId,
    newLineData,
    newCardData,
  };

  return resData;
};

services.deletePage = async (boardId, pageId) => {
  const promiseGetList = [
    db.collection("lineData").where("id", "==", boardId).get(),
    db.collection("cardData").where("id", "==", boardId).get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [fireLineData, fireCardData] = responseGetList;

  const lineId = fireLineData.docs[0].id;
  const cardId = fireCardData.docs[0].id;

  const lineData = dtf.keyRemove(fireLineData.docs);
  const cardData = dtf.keyRemove(fireCardData.docs);

  const lineIndex = lineData[0].data.findIndex((item) => item.id === pageId);
  const cardIndex = cardData[0].data.findIndex((item) => item.id === pageId);
  lineData[0].data.splice(lineIndex, 1);
  cardData[0].data.splice(cardIndex, 1);

  const promiseSetList = [
    db.collection("lineData").doc(lineId).update({ data: lineData[0].data }),
    db.collection("cardData").doc(cardId).update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  return;
};

services.clearPage = async (boardId, pageId) => {
  const promiseGetList = [
    db.collection("lineData").where("id", "==", boardId).get(),
    db.collection("cardData").where("id", "==", boardId).get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [fireLineData, fireCardData] = responseGetList;

  const lineId = fireLineData.docs[0].id;
  const cardId = fireCardData.docs[0].id;

  const lineData = dtf.keyRemove(fireLineData.docs);
  const cardData = dtf.keyRemove(fireCardData.docs);

  const lineIndex = lineData[0].data.findIndex((item) => item.id === pageId);
  const cardIndex = cardData[0].data.findIndex((item) => item.id === pageId);
  lineData[0].data[lineIndex].line = [];
  lineData[0].data[lineIndex].color = [];
  lineData[0].data[lineIndex].size = [];

  cardData[0].data[cardIndex].data = [];

  const promiseSetList = [
    db.collection("lineData").doc(lineId).update({ data: lineData[0].data }),
    db.collection("cardData").doc(cardId).update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  return;
};

services.changeBoardName = async (boardId, img) => {

  await db.collection("boardData").doc(boardId).update({
    img: img
  })

  return;
};


services.addUser = async (id, firstname, lastname, email) => {
  const user = await db.collection('user').doc(id).set({ id:id, firstname, lastname, email, board:[]});
  return user;
}

services.inviteMember = async (email,boardId) => {

  const fireUser = await db.collection("user").get();
  // console.log(fireUser.docs)
  const userList = dtf.keyRemove(fireUser.docs);
  // console.log(userList)
  const userHasEmail = userList.find(item=>item.email===email)
  // console.log(userHasEmail)
  if(userHasEmail){
    const userHasBoard = userHasEmail.board.find(item=>item===boardId)
    
    if(!userHasBoard){
      const fireBoardData = await db.collection("boardData").doc(boardId).get();
      const boardData = dtf.keyRemove([fireBoardData]);
      const newMember = [...boardData[0].member,email]
      await db.collection("boardData").doc(boardId).update({
        member: newMember
      })
      const newUserHasBoard = [...userHasEmail.board, boardId]
      await db.collection("user").doc(userHasEmail.id).update({
        board: newUserHasBoard
      });
    } else {
      return null
    }
  }
  return userHasEmail
  
};
services.getUser = async (uid) => {

  const fireUser = await db.collection("user").doc(uid).get();
  // console.log(fireUser)
  const userList = dtf.keyRemove([fireUser]);
  // console.log(userList[0])

  return userList[0]
  
};



export default services;
