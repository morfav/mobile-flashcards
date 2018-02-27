import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';

import decksReducer from './reducers/decks';
import AddCard from './components/AddCard';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';
import Deck from './components/Deck';
import Quiz from './components/Quiz';


const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

function FlashcardsStatusBar({ backgroundColor, ...props }) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  );
}

const Tabs = TabNavigator(
  {
    Decks: {
      screen: Decks,
      navigationOptions: {
        tabBarLabel: 'Decks',
      },
    },
    NewDeck: {
      screen: NewDeck,
      navigationOptions: {
        tabBarLabel: 'New Deck',
      },
    },
  },
  {
    navigationOptions: {
      header: null,
    },
    tabBarOptions: {
      activeTintColor: 'red',
      style: {
        height: 56,
        backgroundColor: 'blue',
        shadowColor: 'rgba(0, 0, 0, 0.24)',
        shadowOffset: {
          width: 0,
          height: 3,
        },
        shadowRadius: 6,
        shadowOpacity: 1,
      },
    },
  },
);

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  Deck: {
    screen: Deck,
    navigationOptions: {
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      },
    },
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      },
    },
  },
  Quiz: {
    screen: Quiz,
    navigationOptions: {
      title: 'Quiz',
      headerTintColor: 'white',
      headerStyle: {
        backgroundColor: 'blue',
      },
    },
  },
});

const App = () => (
  <Provider store={createStore(decksReducer, applyMiddleware(thunk))}>
    <View style={styles.container}>
      <FlashcardsStatusBar backgroundColor="orange" barStyle="light-content" />
      <MainNavigator />
    </View>
  </Provider>
);

FlashcardsStatusBar.propTypes = {
  backgroundColor: PropTypes.string.isRequired,
};

export default App;
