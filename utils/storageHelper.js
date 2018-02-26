// import { Notifications, Permissions } from 'expo';

import { AsyncStorage } from 'react-native';

export const DECKS_STORAGE_KEY = 'mobileFlashcards:decks';

export function getDecks() {
  return AsyncStorage.getItem(DECKS_STORAGE_KEY).then(results => (results ? JSON.parse(results) : {}));
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
      questions: [...existingQuestions, card.question],
    },
  }));
}

export function clear() {
  return AsyncStorage.removeItem(DECKS_STORAGE_KEY);
}

// export function setLocalNotification() {
//   AsyncStorage.getItem(NOTIFICATION_KEY)
//   .then(JSON.parse)
//   .then((data) => {
//     if (data === null) {
//       Permissions.askAsync(Permissions.NOTIFICATIONS)
//       .then(({ status }) => {
//         if (status === 'granted') {
//           Notifications.cancelAllScheduledNotificationsAsync()

//           let tomorrow = new Date()
//           tomorrow.setDate(tomorrow.getDate() + 1)
//           tomorrow.setHours(20)
//           tomorrow.setMinutes(0)

//           Notifications.scheduleLocalNotificationAsync(
//             createNotification(),
//             {
//               time: tomorrow,
//               repeat: 'day',
//             }
//           )

//           AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
//         }
//       })
//     }
//   })
// }
