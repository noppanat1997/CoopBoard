import React from 'react';
import { connect } from 'react-redux';
import MainBoard from '../components/MainBoard.js';
import FormCard from '../components/FormCard.js';
import '.././css/BoardPages.css';
import Header from '../components/Header.js';
import fire from '../components/Fire.js'
import { useState } from 'react';

const BoardPage = (props) => {


  return (
    <div >
      {props.stateFromStore.onDropArea === true &&
        props.stateFromStore.formCardData &&
        Object.entries(props.stateFromStore.formCardData)
          .filter(cardPair => cardPair[1].onFormSetting === 1)
          .map(cardPair => <div className="form-card"><FormCard board={props.match.params.id} key={cardPair[0]} id={cardPair[0]} name={cardPair[1].name} /></div>)
      }

      <Header path="board" board={props.match.params.id} />
      <MainBoard board={props.match.params.id} />
    </div>
  );
}

const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}

export default connect(mapStateToProps, null)(BoardPage);
