import { UPDATE_DECKS_IN_STATE } from '../actions';

export default function decks(state = {}, action) {
  switch (action.type) {
    case UPDATE_DECKS_IN_STATE:
      return action.decks;
    default:
      return state;
  }
}
