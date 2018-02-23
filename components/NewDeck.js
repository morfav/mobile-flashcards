import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});

const NewDeck = ({ dispatch }) => (
  <View style={styles.container}>
    <Text>New Deck</Text>
  </View>
);

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

NewDeck.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(NewDeck);
