import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, KeyboardAvoidingView, Keyboard, StyleSheet } from 'react-native';

import { saveDeckTitle } from '../actions';

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

class NewDeck extends Component {
  constructor() {
    super();
    this.state = { newDeckName: '' };
    this.addDeckAndNavigate = this.addDeckAndNavigate.bind(this);
  }

  addDeckAndNavigate() {
    const { addNewDeck, navigation } = this.props;
    const { newDeckName } = this.state;
    Keyboard.dismiss();
    addNewDeck(newDeckName);
    navigation.navigate('Deck', { deckName: newDeckName });
    this.setState({ newDeckName: '' });
  }

  render() {
    const { newDeckName } = this.state;
    return (
      <KeyboardAvoidingView keyboardVerticalOffset={1} behavior="position" style={styles.container}>
        <View>
          <Text style={styles.title}>What is the title of your new deck?</Text>
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Deck Title"
            value={newDeckName}
            onChangeText={text => this.setState({ newDeckName: text })}
          />
        </View>
        <View>
          <View style={styles.submitButtonView}>
            <TouchableOpacity style={styles.submitButton} onPress={() => this.addDeckAndNavigate()}>
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </KeyboardAvoidingView>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    addNewDeck: deckName => dispatch(saveDeckTitle(deckName)),
  };
}

NewDeck.propTypes = {
  addNewDeck: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
};

export default connect(null, mapDispatchToProps)(NewDeck);
