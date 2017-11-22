import axios from 'axios';

// ACTION TYPES

const GET_MATCHES = 'GET_MATCHES';
const CREATE_MATCHES = 'CREATE_MATCHES';
// const REMOVE_MATCHES = 'REMOVE_MATCHES'

// ACTION CREATOR

const getMatches = matches => ({
  type: GET_MATCHES,
  matches,
});
// const removeMatches = () => ({
//   type: REMOVE_MATCHES
// })
const createMatches = match => ({
  type: CREATE_MATCHES,
  match,
});

// THUNK CREATORS

export const fetchMatches = userId =>
  dispatch =>
    axios.get(`/api/match/${userId}`)
      .then(res =>
        dispatch(getMatches(res.data)))
      .catch(err => console.log(err));

export const petWasSeen = (petId, userId) => 
  dispatch => {
    axios.post('/api/seen', {petId, userId})
    .catch(err => console.log(err))
  } 

export const rejectPet = (petId, userId) =>
  (dispatch) => {
  dispatch(petWasSeen(petId, userId))
  console.log(`Rejected a poor pet # ${id}`);
  // dispatch(rejectSinglePet(id));
};

export const addMatches = (petId, userId) =>
  dispatch =>
    axios.post('/api/match', { petId, userId })
      .then((res) => {
        dispatch(petWasSeen(petId, userId))
        dispatch(createMatches(res.data));
      })
      .catch(err => console.log(err));


// REDUCER

export default function (state = [], action) {
  switch (action.type) {
    case GET_MATCHES:
      return action.matches;
    case CREATE_MATCHES:
      return [...state, action.match];
    default:
      return state;
  }
}
