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
  const fetchData = async () => {
    try {
      await props.fetchBoardFn(props.stateFromStore.user);
    } catch (error) {
      throw error;
    }
  };
  useEffect(() => {
    //REVIEW loader(true)
    fetchData();
    setState({
      ...state,
      isFetch: true,
    });
    props.checkLogin();
    console.log(props.match.params.board)
    const boardIdSnap = props.match.params.board
    // .where("id", "==", props.match.params.board)
    const unsub = db.collection('cardData').where("id", "==", boardIdSnap).onSnapshot(docSnapshot => {
      // console.log(fire.auth().currentUser)
      const docList = []
      docSnapshot.forEach(item=>docList.push(item.data()))
      console.log(docList[0])
      props.cardDataSnapshotFn({boardId:boardIdSnap, data:docList[0].data})
    }, err => {
      console.log(`Encountered error: ${err}`);
    });

    return () => {
      unsub();
    }
  }, []);

  useEffect(() => {
    if (!props.stateFromStore.user) {
      console.log(props.stateFromStore.user);
      history.push("/login");
    }
  }, [props.stateFromStore.user]);

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
        {props.stateFromStore.isLoading ? (
          <div className="coop-loader">
            <div class="lds-ring">
              <div></div>
              <div></div>
              <div></div>
              <div></div>
            </div>
          </div>
        ) : (
          <div></div>
        )}

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
});

export default connect(mapStateToProps, mapDispatchToProps)(BoardPage);
