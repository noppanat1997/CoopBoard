import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

const EachCard = (props) => {
  const clickHandler = () =>{
    console.log(props.id);
    props.updateOnFormSettingFn(props.id);
  }
  return (
    <Card onClick={clickHandler} className="text-light" style={{ 
      width: '16rem', 
      height: '10rem',
      borderRadius: '0.7rem', 
      backgroundColor: props.color,
      boxShadow: "1px 1px 3px 0px rgba(78, 78, 78, 0.75)",
      cursor: 'pointer',
      userSelect: 'none'
      }}>
      <Card.Title className="pl-3 pt-2" >{props.name}</Card.Title>
    </Card>
  );
}
const mapStateToProps = state => {
  return {
    stateFromStore: state
  }
}
const mapDispatchToProps = dispatch => {
  return {
    updateOnFormSettingFn: (cardId) => {
      return dispatch({ type: 'UPDATE_ON_FORM_SETTING', payload: cardId });
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(EachCard);