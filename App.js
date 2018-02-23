import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import { StyleSheet, View, StatusBar } from 'react-native';
import { Constants } from 'expo';
import { TabNavigator, StackNavigator } from 'react-navigation';

import decksReducer from './reducers/decks';
import Decks from './components/Decks';
import NewDeck from './components/NewDeck';


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
  // EventDetails: {
  //   screen: EventDetails,
  //   navigationOptions: {
  //     headerTintColor: 'white',
  //     headerStyle: {
  //       backgroundColor: 'blue',
  //     },
  //   },
  // },
});

const App = () => (
  <Provider store={createStore(decksReducer)}>
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
