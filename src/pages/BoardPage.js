import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { useHistory } from "react-router-dom";
import MainBoard from "../components/MainBoard.js";
import FormCard from "../components/FormCard.js";
import ".././css/BoardPages.css";
import Header from "../components/Header.js";
import * as action from "../actions";

import {db,fire} from '../realtime'

const BoardPage = (props) => {
  
  let history = useHistory();
  const [state, setState] = useState({
    isFetch: false,
  });
  const fetchData = async (userUid) => {
    try {
      await props.checkLogin();
      await props.fetchBoardFn(userUid);
      setState({
        ...state,
        isFetch: true,
      });
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    //REVIEW loader(true)
    fire.auth().onAuthStateChanged(function(user) {
      console.log('OOOOOOOOOOOOOOO',user.uid)
      if (user != null) {
        fetchData(user.uid);
      }else{
        history.push("/login");
      }
    });
    
    const boardIdSnap = props.match.params.board
    const unSubCardData = db.collection('cardData').where("id", "==", boardIdSnap).onSnapshot(docSnapshot => {
      // console.log(fire.auth().currentUser)
      const docList = []
      docSnapshot.forEach(item=>docList.push(item.data()))
      // console.log(docList[0])
      props.cardDataSnapshotFn({boardId:boardIdSnap, data:docList[0].data})
    }, err => {
      // console.log(`Encountered error: ${err}`);
    });
    
    const unSubLineData = db.collection('lineData').where("id", "==", boardIdSnap).onSnapshot(docSnapshot => {
      // console.log(fire.auth().currentUser)
      const docList = []
      docSnapshot.forEach(item=>docList.push(item.data()))
      // console.log(docList[0])
      
      props.lineDataSnapshotFn({boardId:boardIdSnap, data:docList[0].data})
    }, err => {
      // console.log(`Encountered error: ${err}`);
    });

    const unSubBoardData = db.collection('boardData').where("id", "==", boardIdSnap).onSnapshot(docSnapshot => {
      // console.log(fire.auth().currentUser)
      const docList = []
      docSnapshot.forEach(item=>docList.push(item.data()))
      // console.log(docList[0])
      props.boardDataSnapshotFn({boardId:boardIdSnap, data:docList[0].data})
    }, err => {
      // console.log(`Encountered error: ${err}`);
    });

    return () => {
      unSubCardData();
      unSubLineData();
      unSubBoardData();
    }
  }, []);

  if (!state.isFetch) {
    return (
      <div className="coop-loader">
        <div class="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </div>
    );
  } else {
    return (
      <div>

        {props.stateFromStore.onDropArea === true &&
          props.stateFromStore.formCardData &&
          Object.entries(props.stateFromStore.formCardData)
            .filter((cardPair) => cardPair[1].onFormSetting === 1)
            .map((cardPair) => (
              <div className="form-card">
                <FormCard
                  board={props.match.params.board}
                  page={props.match.params.page}
                  key={cardPair[0]}
                  id={cardPair[0]}
                  name={cardPair[1].name}
                />
              </div>
            ))}

        <Header
          path="board"
          board={props.match.params.board}
          page={props.match.params.page}
        />
        <MainBoard
          board={props.match.params.board}
          page={props.match.params.page}
        />
      </div>
    );
  }
};

const mapStateToProps = (state) => {
  return {
    stateFromStore: state,
  };
};

const mapDispatchToProps = (dispatch) => ({
  checkLogin: () => dispatch(action.checkLogin()),
  updateLoaderFn: (data) => {
    return dispatch({ type: "UPDATE_LOADER", payload: data });
  },
  fetchBoardFn: (data) => {
    return dispatch(action.fetchBoard(data));
  },
  cardDataSnapshotFn: (data) => {
    return dispatch({ type: "CARD_DATA_SNAPSHOT", payload: data });
  },
  lineDataSnapshotFn: (data) => {
    return dispatch({ type: "LINE_DATA_SNAPSHOT", payload: data });
  },
  boardDataSnapshotFn: (data) => {
    return dispatch({ type: "BOARD_DATA_SNAPSHOT", payload: data });
  },
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
