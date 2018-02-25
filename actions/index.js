import * as storageHelper from '../utils/storageHelper';

export const SAVE_DECK_TITLE = 'SAVE_DECK_TITLE';
export const UPDATE_DECKS_IN_STATE = 'UPDATE_DECKS_IN_STATE';

export const updateDecksInState = decks => ({
  type: UPDATE_DECKS_IN_STATE,
  decks,
});

export const loadDecks = () => dispatch => (
  (storageHelper.getDecks()).then(decks => dispatch(updateDecksInState(decks)))
);

export const saveDeckTitle = deckName => (dispatch) => {
  storageHelper.saveDeckTitle(deckName).then(dispatch(loadDecks()));
};
