import React, { Component } from 'react';
import Cards, { Card } from 'react-swipe-card';
import { connect } from 'react-redux';
import Fav from '../styles/favorite-icon.png';
import Reject from '../styles/reject-icon.png';
import { fetchMatches, addMatches, fetchAllPets, refreshCards, rejectPet } from '../store';
import SinglePet from './SinglePet';


const CustomAlertLeft = () => (
  <span>
    <img alt="reject pet icon" src={Reject} className="icon" />
  </span>);
const CustomAlertRight = () => (
  <span>
    <img alt="accept pet icon" src={Fav} className="icon" />
  </span>);

class AllPets extends Component {
  componentDidMount() {
    this.props.onLoad(this.props.currentUser);
  }
  // there is a lag with getting the currentUser on state so this is needed to work fetch matches:
  componentWillReceiveProps(nextProps) {
    if (nextProps.currentUser && nextProps.currentUser.id !== this.props.currentUser.id) {
      this.props.loadMatches(nextProps.currentUser.id);
    }
  }

  render() {
    return (
      <Cards
        alertRight={<CustomAlertRight />}
        alertLeft={<CustomAlertLeft />}
        onEnd={this.props.onEnd}
        className="master-root"
      >
        {this.props.pets && this.props.pets.map((el, i) =>
      (
        <Card
          key={i}
          onSwipeLeft={() => { this.props.onReject(el.id.$t, this.props.currentUser.id); }}
          onSwipeRight={() => { this.props.onLove(el.id.$t, this.props.currentUser.id); }}
        >
          <SinglePet pet={el} expand={false} />
        </Card>
    ))}
      </Cards>
    );
  }
}

const mapState = state => ({
  pets: state.pets,
  currentUser: state.currentUser,
});

const mapDispatch = (dispatch, ownProps) => ({
  onLoad(user) {
    console.log('onLoad');
    dispatch(fetchAllPets(ownProps.match.params.type, user));
  },
  loadMatches(id) {
    dispatch(fetchMatches(id));
  },
  onEnd() {
    dispatch(refreshCards());
  },
  onReject(petId, userId) {
    dispatch(rejectPet(petId, userId));
  },
  onLove(petId, userId) {
    dispatch(addMatches(petId, userId));
  },
});

export default connect(mapState, mapDispatch)(AllPets);
