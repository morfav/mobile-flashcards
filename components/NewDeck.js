import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  title: {
    padding: 30,
    fontSize: 50,
    textAlign: 'center',
    paddingBottom: 40,
  },
  textInput: {
    padding: 9,
    margin: 15,
    borderRadius: 5,
    borderWidth: 1,
  },
  submitButtonView: {
    paddingTop: 30,
    flexDirection: 'row',
    justifyContent: 'center',
  },
  submitButton: {
    backgroundColor: 'black',
    margin: 5,
    borderRadius: 7,
  },
  buttonText: {
    color: 'white',
    textAlign: 'center',
    padding: 15,
    paddingRight: 40,
    paddingLeft: 40,
    fontSize: 18,
  },
});

const NewDeck = ({ dispatch }) => (
  <View style={styles.container}>
    <View>
      <Text style={styles.title}>What is the title of your new deck?</Text>
    </View>
    <View>
      <TextInput style={styles.textInput}>Deck Title</TextInput>
    </View>
    <View>
      <View style={styles.submitButtonView}>
        <TouchableOpacity style={styles.submitButton}>
          <Text style={styles.buttonText}>Submit</Text>
        </TouchableOpacity>
      </View>
    </View>
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
