import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const Decks = ({ decks }) => (
  <View style={styles.container}>
    {Object.keys(decks).map(deckName => (
      <Text key={deckName}>{deckName}</Text>))}
  </View>
);

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

Decks.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
  // navigation: PropTypes.instanceOf(Object).isRequired,
};

export default connect(mapStateToProps)(Decks);
