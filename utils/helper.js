import { Notifications, Permissions } from 'expo';
import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'mobileFlashcards:decks';
const NOTIFICATIONS_KEY = 'mobileFlashcards:notifications';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY)
    .then(results => (results ? JSON.parse(results) : {}));
}

export function getDeck(deckName) {
  return getDecks().then(decks => decks[deckName]);
}

export function saveDeckTitle(deckName) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckName]: {
      title: deckName,
      questions: [],
    },
  }));
}

export function addCardToDeck(deckName, card, existingQuestions) {
  return AsyncStorage.mergeItem(DECKS_STORAGE_KEY, JSON.stringify({
    [deckName]: {
      title: deckName,
      questions: [...existingQuestions, card],
    },
  }));
}

/*
 * Next 3 methods adapted from the UdaciFitness example
 */
export function clear() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

export function clearLocalNotification() {
  return AsyncStorage.removeItem(NOTIFICATIONS_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync());
}

function createNotification() {
  return {
    title: 'Practice',
    body: "Don't forget to practice at least one quiz today!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    },
  };
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATIONS_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync();

              const tomorrow = new Date();
              tomorrow.setDate(tomorrow.getDate() + 1);
              tomorrow.setHours(20);
              tomorrow.setMinutes(0);

              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                },
              );

              AsyncStorage.setItem(NOTIFICATIONS_KEY, JSON.stringify(true));
            }
          });
      }
    });
}
