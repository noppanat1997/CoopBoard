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
    member: [user],
  };
  const initialLineData = {
    id: boardId,
    data: [{ id: pageId, line: {}, color: [], size: [] }],
  };
  const initialCardData = {
    id: boardId,
    data: [{ id: pageId, data: [] }],
  };

  const promiseSetList = [
    db
      .collection("boardData")
      .doc(boardId)
      .set(initialBoardData),
    db
      .collection("lineData")
      .doc(lineId)
      .set(initialLineData),
    db
      .collection("cardData")
      .doc(cardId)
      .set(initialCardData),
  ];
  await Promise.all(promiseSetList);

  // NOTE new version
  const promiseGetList = [
    db
      .collection("boardData")
      .doc(boardId)
      .get(),
    db
      .collection("lineData")
      .doc(lineId)
      .get(),
    db
      .collection("cardData")
      .doc(cardId)
      .get(),
  ];
  const responseGetList = await Promise.all(promiseGetList);

  const [fireBoardData, fireLineData, fireCardData] = responseGetList;

  const boardDataList = dtf.keyRemove([fireBoardData]);
  const lineDataList = dtf.keyRemove([fireLineData]);
  const cardDataList = dtf.keyRemove([fireCardData]);

  const newUserBoard = [...user.board, boardId];
  await db
    .collection("user")
    .doc(user.id)
    .update({
      board: newUserBoard,
    });

  const initialLineDataToArray = {
    id: boardId,
    data: [{ id: pageId, line: [], color: [], size: [] }],
  };

  const resData = {
    boardData: boardDataList[0],
    lineData: initialLineDataToArray,
    cardData: cardDataList[0],
    boardId: boardId,
  };

  return resData;
};

services.fetchBoard = async (userUid) => {
  const fireUser = await db
    .collection("user")
    .doc(userUid)
    .get();
  const userList = dtf.keyRemove([fireUser]);

  console.log(userList[0]);

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

  const newBoardDataList = boardDataList.filter((item) =>
    userList[0].board.includes(item.id)
  );
  const newLineDataList = lineDataList.filter((item) =>
    userList[0].board.includes(item.id)
  );
  const newCardDataList = cardDataList.filter((item) =>
    userList[0].board.includes(item.id)
  );

  //console.log("?????", newBoardDataList);

  newLineDataList.forEach((itemBoard) =>
    itemBoard.data.forEach(
      (itemPage) => (itemPage.line = Object.values(itemPage.line))
    )
  );

  const resData = {
    newBoardDataList,
    newLineDataList,
    newCardDataList,
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
    db
      .collection("boardData")
      .doc(boardId)
      .delete(),
    db
      .collection("lineData")
      .doc(lineIdList[0])
      .delete(),
    db
      .collection("cardData")
      .doc(cardIdList[0])
      .delete(),
  ];
  await Promise.all(promiseSetList);

  const fireUser = await db.collection("user").get();
  // //console.log(fireUser)
  const userList = dtf.keyRemove(fireUser.docs);
  // //console.log('>>>>>',userList)
  const userHasBoard = userList.filter((item) => item.board.includes(boardId));
  userHasBoard.forEach(async (item) => {
    item.board.splice(item.board.indexOf(boardId), 1);
    await db
      .collection("user")
      .doc(item.id)
      .update({
        board: item.board,
      });
  });

  return;
};

services.addPage = async (boardId) => {
  const pageId = uuidv4();

  const newLineData = {
    id: pageId,
    line: {},
    color: [],
    size: [],
  };
  const newCardData = {
    id: pageId,
    data: [],
  };
  const promiseGetList = [
    db
      .collection("lineData")
      .where("id", "==", boardId)
      .get(),
    db
      .collection("cardData")
      .where("id", "==", boardId)
      .get(),
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
    db
      .collection("lineData")
      .doc(lineId)
      .update({ data: lineData[0].data }),
    db
      .collection("cardData")
      .doc(cardId)
      .update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  const newLineDataToArray = {
    id: pageId,
    line: [],
    color: [],
    size: [],
  };

  const resData = {
    boardId,
    newLineDataToArray,
    newCardData,
  };

  return resData;
};

services.deletePage = async (boardId, pageId) => {
  const promiseGetList = [
    db
      .collection("lineData")
      .where("id", "==", boardId)
      .get(),
    db
      .collection("cardData")
      .where("id", "==", boardId)
      .get(),
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
    db
      .collection("lineData")
      .doc(lineId)
      .update({ data: lineData[0].data }),
    db
      .collection("cardData")
      .doc(cardId)
      .update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  return;
};

services.clearPage = async (boardId, pageId) => {
  const promiseGetList = [
    db
      .collection("lineData")
      .where("id", "==", boardId)
      .get(),
    db
      .collection("cardData")
      .where("id", "==", boardId)
      .get(),
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
    db
      .collection("lineData")
      .doc(lineId)
      .update({ data: lineData[0].data }),
    db
      .collection("cardData")
      .doc(cardId)
      .update({ data: cardData[0].data }),
  ];
  await Promise.all(promiseSetList);

  return;
};

services.changeBoardName = async (boardId, boardName) => {
  await db
    .collection("boardData")
    .doc(boardId)
    .update({
      name: boardName,
    });

  return;
};

services.changeBoardImg = async (boardId, img) => {
  await db
    .collection("boardData")
    .doc(boardId)
    .update({
      img: img,
    });

  return;
};

services.addUser = async (id, firstname, lastname, email) => {
  const user = await db
    .collection("user")
    .doc(id)
    .set({ id: id, firstname, lastname, email, board: [] });
  return user;
};

services.inviteMember = async (email, boardId) => {
  const fireUser = await db.collection("user").get();
  // //console.log(fireUser.docs)
  const userList = dtf.keyRemove(fireUser.docs);
  // //console.log(userList)
  const userHasEmail = userList.find((item) => item.email === email);
  //console.log(userHasEmail);
  if (userHasEmail) {
    const userHasBoard = userHasEmail.board.find((item) => item === boardId);
    if (!userHasBoard) {
      const fireBoardData = await db
        .collection("boardData")
        .doc(boardId)
        .get();
      const boardData = dtf.keyRemove([fireBoardData]);
      // //console.log(boardData[0].member,boardData[0].member.length)
      if (boardData[0].member.length < 6) {
        const newMember = [...boardData[0].member, userHasEmail];
        await db
          .collection("boardData")
          .doc(boardId)
          .update({
            member: newMember,
          });
        const newUserHasBoard = [...userHasEmail.board, boardId];
        await db
          .collection("user")
          .doc(userHasEmail.id)
          .update({
            board: newUserHasBoard,
          });
        return { status: "Invite member success" };
      } else {
        return { status: "Cannot add more member in this board" };
      }
    } else {
      return { status: "Already has an account in this board" };
    }
  }
  return { status: "Not have an account on the Coopboard" };
};
services.getUser = async (uid) => {
  const fireUser = await db
    .collection("user")
    .doc(uid)
    .get();
  // //console.log(fireUser)
  const userList = dtf.keyRemove([fireUser]);
  // //console.log(userList[0])

  return userList[0];
};

services.kickMember = async (boardId, memberId) => {
  // //console.log('service', boardId,memberId)
  const fireBoardData = await db
    .collection("boardData")
    .doc(boardId)
    .get();
  const boardData = dtf.keyRemove([fireBoardData]);
  const newMemberData = boardData[0].member.filter(
    (item) => item.id !== memberId
  );
  // //console.log("?????",newBoardData)
  await db
    .collection("boardData")
    .doc(boardId)
    .update({
      member: newMemberData,
    });
  const fireUserData = await db
    .collection("user")
    .doc(memberId)
    .get();
  const userData = dtf.keyRemove([fireUserData]);
  const newBoardData = userData[0].board.filter((item) => item == boardId);

  await db
    .collection("user")
    .doc(memberId)
    .update({
      board: newBoardData,
    });

  return;
};

services.addCard = async (data) => {
  const cardId = uuidv4();
  const newCardData = {
    id: cardId,
    type: data.type,
    size: data.size,
    color: data.color,
    position: { x: 0, y: 0 },
    text: data.text,
    isNew: true,
    language: data.language,
  };
  const fireCardData = await db
    .collection("cardData")
    .where("id", "==", data.board)
    .get();

  let cardData = dtf.keyRemove(fireCardData.docs);
  const cardfireId = fireCardData.docs[0].id;

  cardData[0].data.forEach((item) =>
    item.id === data.curPage ? item.data.push(newCardData) : null
  );
  // //console.log(cardData[0].data);
  await db
    .collection("cardData")
    .doc(cardfireId)
    .update({
      data: cardData[0].data,
    });

  return {
    boardId: data.board,
    pageId: data.curPage,
    data: newCardData,
  };
};

services.updatePosition = async (data) => {
  // //console.log(data);
  const fireCardData = await db
    .collection("cardData")
    .where("id", "==", data.board)
    .get();

  let cardData = dtf.keyRemove(fireCardData.docs);
  const cardfireId = fireCardData.docs[0].id;

  cardData[0].data.forEach((item) =>
    item.id === data.curPage
      ? item.data.forEach((item) =>
          item.id === data.id ? (item.position = data.position) : null
        )
      : null
  );

  // //console.log(cardData[0].data[0])
  await db
    .collection("cardData")
    .doc(cardfireId)
    .update({
      data: cardData[0].data,
    });

  return;
};

services.deleteCard = async (data) => {
  // //console.log('?????',data);
  const fireCardData = await db
    .collection("cardData")
    .where("id", "==", data.board)
    .get();

  let cardData = dtf.keyRemove(fireCardData.docs);
  const cardfireId = fireCardData.docs[0].id;

  for (let i = 0; i < cardData[0].data.length; i++) {
    if (cardData[0].data[i].id === data.curPage) {
      //console.log("got it !!!!!!");
      const newData = cardData[0].data[i].data.filter((item) => {
        //console.log(">>>", item.id);
        return item.id !== data.id;
      });
      cardData[0].data[i].data = newData;
    }
  }

  // //console.log(cardData[0].data[0]);
  await db
    .collection("cardData")
    .doc(cardfireId)
    .update({
      data: cardData[0].data,
    });

  return;
};

services.addLine = async (data) => {
  // //console.log(data);
  const fireLineData = await db
    .collection("lineData")
    .where("id", "==", data.boardId)
    .get();

  //console.log(fireLineData);
  let lineData = dtf.keyRemove(fireLineData.docs);
  const linefireId = fireLineData.docs[0].id;

  lineData[0].data.forEach((item) => {
    if (item.id === data.pageId) {
      let lineLength = Object.keys(item.line).length;
      item.line = { ...item.line, [lineLength]: data.data };
      item.color.push(data.color);
      item.size.push(data.size);
    }
  });

  //console.log(lineData[0].data);

  await db
    .collection("lineData")
    .doc(linefireId)
    .update({
      data: lineData[0].data,
    });

  return;
};

services.deleteLine = async (data) => {
  //console.log(data);
  const fireLineData = await db
    .collection("lineData")
    .where("id", "==", data.boardId)
    .get();

  // //console.log(fireLineData)
  let lineData = dtf.keyRemove(fireLineData.docs);
  const linefireId = fireLineData.docs[0].id;

  lineData[0].data.forEach((item) => {
    if (item.id === data.pageId) {
      item.line = Object.values(item.line);
      for (let i = data.data.length; i > 0; i--) {
        let index = data.data.pop();
        item.line.splice(index, 1);
        item.color.splice(index, 1);
        item.size.splice(index, 1);
      }
    }
  });

  const lineDataToFire = lineData[0].data;
  lineDataToFire.forEach((item) => {
    if (item.id === data.pageId) {
      let tmpLineObject = {};
      let keyCount = 0;
      item.line.forEach((value) => {
        tmpLineObject = {
          ...tmpLineObject,
          [keyCount]: value,
        };
        keyCount += 1;
      });
      item.line = tmpLineObject;
    }
  });

  // //console.log(lineData[0].data);

  await db
    .collection("lineData")
    .doc(linefireId)
    .update({
      data: lineDataToFire,
    });

  return;
};

export default services;
