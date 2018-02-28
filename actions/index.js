import * as helper from '../utils/helper';

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const UPDATE_DECKS_IN_STATE = 'UPDATE_DECKS_IN_STATE';
export const ADD_CARD = 'ADD_CARD';

export const updateDecksInState = decks => ({
  type: UPDATE_DECKS_IN_STATE,
  decks,
});

export const loadDecks = () => dispatch => (
  (helper.getDecks()).then(decks => dispatch(updateDecksInState(decks)))
);

export const saveDeckTitle = deckName => (dispatch) => {
  helper.saveDeckTitle(deckName).then(dispatch(loadDecks()));
};

export const addCard = (deckName, card, existingQuestions) => (dispatch) => {
  helper.addCardToDeck(deckName, card, existingQuestions).then(dispatch(loadDecks()));
};

export const clear = () => dispatch => (
  helper.clear().then(dispatch(loadDecks()))
);
