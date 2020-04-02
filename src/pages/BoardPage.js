import React from 'react';
import { connect } from 'react-redux';
import Header from '../components/Header.js';
import MainBoard from '../components/MainBoard.js';
import FormCard from '../components/FormCard.js';
import '.././css/BoardPages.css';
import ChatBox from '../components/ChatBox.js';
const BoardPage = (props) => {
  return (
    <div>
      <ChatBox />
      {props.stateFromStore.onDropArea === true &&
        props.stateFromStore.cardData &&
        Object.entries(props.stateFromStore.cardData)
          .filter(cardPair => cardPair[1].onFormSetting === 1)
          .map(cardPair => <div className="form-card"><FormCard key={cardPair[0]} id={cardPair[0]} name={cardPair[1].name} /></div>)}
      <Header />
      <MainBoard />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
// const mapDispatchToProps = dispatch => {
//   return {
//     updateLine: (updateLine) => {
//       return dispatch({ type: 'UPDATE_LINE', payload: updateLine });
//     }
//   }
// }
export default connect(mapStateToProps, null)(BoardPage);