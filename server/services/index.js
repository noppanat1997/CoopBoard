import db from "../configs/database";
import dtf from "../tools/transformer";
import { v4 as uuidv4 } from "uuid";

const services = {};

services.addBoardData = async () => {
  const boardId = uuidv4();
  const pageId = uuidv4();
  const lineId = uuidv4();
  const cardId = uuidv4();
  const memberId = uuidv4();

  const initialBoardData = {
    id: boardId,
    name: "Untitled Coop",
    img: "",
  };
  const initialLineData = {
    id: boardId,
    data: [{ id: pageId, line: [], color: [], size: [] }],
  };
  const initialCardData = {
    id: boardId,
    data: [{ id: pageId, data: [] }],
  };
  const initialMemberData = {
    id: boardId,
    member: [],
  };

  const promiseSetList = [
    db.collection("boardData").doc(boardId).set(initialBoardData),
    db.collection("lineData").doc(lineId).set(initialLineData),
    db.collection("cardData").doc(cardId).set(initialCardData),
    db.collection("memberData").doc(memberId).set(initialMemberData),
  ];
  await Promise.all(promiseSetList);

  // NOTE old version
  // const fireBoardData = await db.collection('boardData').doc(boardId).get();
  // const fireLineData = await db.collection('lineData').doc(lineId).get();
  // const fireCardData = await db.collection('cardData').doc(cardId).get();
  // const fireMemberData = await db.collection('memberData').doc(memberId).get();

  // NOTE new version
  const promiseGetList = [
    db.collection("boardData").doc(boardId).get(),
    db.collection("lineData").doc(lineId).get(),
    db.collection("cardData").doc(cardId).get(),
    db.collection("memberData").doc(memberId).get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [
    fireBoardData,
    fireLineData,
    fireCardData,
    fireMemberData,
  ] = responseGetList;

  const boardDataList = dtf.keyRemove([fireBoardData]);
  const lineDataList = dtf.keyRemove([fireLineData]);
  const cardDataList = dtf.keyRemove([fireCardData]);
  const memberDataList = dtf.keyRemove([fireMemberData]);

  const resData = {
    boardData: boardDataList[0],
    lineData: lineDataList[0],
    cardData: cardDataList[0],
    memberData: memberDataList[0],
  };
  return resData;
};

services.fetchBoard = async () => {
  const promiseGetList = [
    db.collection("boardData").get(),
    db.collection("lineData").get(),
    db.collection("cardData").get(),
    db.collection("memberData").get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [
    fireBoardDataList,
    fireLineDataList,
    fireCardDataList,
    fireMemberDataList,
  ] = responseGetList;

  const boardDataList = dtf.keyRemove(fireBoardDataList.docs);
  const lineDataList = dtf.keyRemove(fireLineDataList.docs);
  const cardDataList = dtf.keyRemove(fireCardDataList.docs);
  const memberDataList = dtf.keyRemove(fireMemberDataList.docs);

  const resData = {
    boardDataList,
    lineDataList,
    cardDataList,
    memberDataList,
  };

  // console.log(resData)
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

  const memberIdList = await db
    .collection("memberData")
    .where("id", "==", boardId)
    .get()
    .then((fireMemberDataList) => {
      if (fireMemberDataList.empty) {
        return;
      }
      const outputList = [];
      fireMemberDataList.forEach((doc) => outputList.push(doc.id));
      return outputList;
    })
    .catch((err) => {
      throw err;
    });

  const promiseSetList = [
    db.collection("boardData").doc(boardId).delete(),
    db.collection("lineData").doc(lineIdList[0]).delete(),
    db.collection("cardData").doc(cardIdList[0]).delete(),
    db.collection("memberData").doc(memberIdList[0]).delete(),
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


export default services;
