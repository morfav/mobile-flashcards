import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, TextInput, StyleSheet } from 'react-native';
import { NavigationActions } from 'react-navigation';

import { addCard } from '../actions';

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

class AddCard extends Component {
  constructor(props) {
    super(props);

    this.state = {
      question: '',
      answer: '',
    };
    this.addCardAndNavigate = this.addCardAndNavigate.bind(this);
  }

  addCardAndNavigate() {
    const { addCardToDeck, deckName, navigation, existingQuestions } = this.props;
    const cardObject = {
      question: this.state.question,
      answer: this.state.answer,
    };
    addCardToDeck(deckName, cardObject, existingQuestions);
    this.props.navigation.dispatch(NavigationActions.back({
      key: null,
    }));
    this.setState({
      question: '',
      answer: '',
    });
  }

  render() {
    const { question, answer } = this.state;
    return (
      <View style={styles.container}>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Question"
            value={question}
            onChangeText={text => this.setState({ question: text })}
          />
        </View>
        <View>
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            value={answer}
            onChangeText={text => this.setState({ answer: text })}
          />
        </View>
        <View>
          <View style={styles.submitButtonView}>
            <TouchableOpacity
              style={styles.submitButton}
              onPress={() => this.addCardAndNavigate()}
            >
              <Text style={styles.buttonText}>Submit</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params;
  return {
    deckName,
    existingQuestions: state[deckName].questions,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    addCardToDeck: (deckName, card, existingQuestions) => dispatch(addCard(deckName, card, existingQuestions)),
  };
}

AddCard.propTypes = {
  deckName: PropTypes.string.isRequired,
  addCardToDeck: PropTypes.func.isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  existingQuestions: PropTypes.arrayOf(Object).isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(AddCard);
