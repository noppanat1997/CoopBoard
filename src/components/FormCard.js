import React from 'react';
import Card from 'react-bootstrap/Card';
import { connect } from 'react-redux';

const FormCard = (props) => {
  return (
    <div style={{width: '200px',height: '200px',top: '50%',position:'absolute',
    left: '50%', transform: 'translate(-50%, -50%)'}}>
      <Card >
        <Card.Header as="h5"></Card.Header>
        <Card.Body>
          <Card.Title>Special title treatment</Card.Title>
          <Card.Text>
            With supporting text below as a natural lead-in to additional content.
          </Card.Text>
        </Card.Body>
        <Card.Footer className="text-muted">2 days ago</Card.Footer>
      </Card>
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
//     onDropAreaFn: (onDropArea) => {
//       return dispatch({ type: 'UPDATE_ON_DROP_AREA', payload: onDropArea });
//     }
//   }
// }
export default connect(mapStateToProps, null)(FormCard);