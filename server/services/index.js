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

services.deleteBoard = async (boardId) => {
  const lineIdList = await db.collection("lineData").where('id', '==', boardId).get()
    .then(fireLineDataList => {
        if (fireLineDataList.empty) {
          return;
        }  
        const outputList = [];
        fireLineDataList.forEach(doc => outputList.push(doc.id));
        return outputList;
      })
      .catch(err => {throw err;});

  const cardIdList = await db.collection("cardData").where('id', '==', boardId).get()
    .then(fireCardDataList => {
        if (fireCardDataList.empty) {
          return;
        }  
        const outputList = [];
        fireCardDataList.forEach(doc => outputList.push(doc.id));
        return outputList;
      })
      .catch(err => {throw err;});

  const memberIdList = await db.collection("memberData").where('id', '==', boardId).get()
    .then(fireMemberDataList => {
        if (fireMemberDataList.empty) {
          return;
        }  
        const outputList = [];
        fireMemberDataList.forEach(doc => outputList.push(doc.id));
        return outputList;
      })
      .catch(err => {throw err;});

      console.log(lineIdList);
      console.log(cardIdList);
      console.log(memberIdList);
  const promiseSetList = [
    db.collection("boardData").doc(boardId).delete(),
    db.collection("lineData").doc(lineIdList[0]).delete(),
    db.collection("cardData").doc(cardIdList[0]).delete(),
    db.collection("memberData").doc(memberIdList[0]).delete(),
  ];
  await Promise.all(promiseSetList);

  return
};

export default services;
