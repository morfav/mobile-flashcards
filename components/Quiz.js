import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

import { clearLocalNotification, setLocalNotification } from '../utils/helper';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    justifyContent: 'space-between',
  },
  countText: {
    alignSelf: 'flex-start',
    textAlign: 'left',
    fontSize: 30,
    paddingTop: 20,
    paddingLeft: 20,
  },
  questionText: {
    textAlign: 'center',
    fontSize: 50,
    paddingTop: 30,
    paddingBottom: 14,
  },
  questionAndAnswerBtn: {
    textAlign: 'center',
    fontSize: 25,
    fontWeight: 'bold',
    paddingTop: 20,
  },
  buttonsView: {
    justifyContent: 'center',
    flexDirection: 'row',
  },
  buttons: {
    flex: 0.6,
    margin: 5,
    borderRadius: 7,
  },
  buttonText: {
    textAlign: 'center',
    padding: 18,
    fontSize: 18,
    color: 'white',
  },
  correctBtn: {
    backgroundColor: 'green',
  },
  incorrectBtn: {
    backgroundColor: 'red',
  },
  restartQuizBtn: {
    borderRadius: 7,
    margin: 80,
    backgroundColor: 'black',
  },
});

class Quiz extends Component {
  state = {
    cardIndex: 0,
    correctCount: 0,
    showingQuestion: true,
  }

  render() {
    const { deck } = this.props;
    const { cardIndex, correctCount, showingQuestion } = this.state;
    if (deck.questions.length === 0) {
      return (
        <View style={styles.container}>
          <Text style={styles.questionText}>This deck has no cards!</Text>
        </View>
      );
    }
    if (deck.questions.length === cardIndex) {
      clearLocalNotification().then(setLocalNotification);
      return (
        <View style={styles.container}>
          <Text style={styles.questionText}>
            {`You scored ${correctCount} / ${deck.questions.length} answers correct`}
          </Text>
          <View>
            <TouchableOpacity
              style={styles.restartQuizBtn}
              onPress={() => this.setState({
                cardIndex: 0,
                correctCount: 0,
                showingQuestion: true,
              })}
            >
              <Text
                style={[styles.buttonText, { padding: 20, fontSize: 18 }]}
              >
                Restart quiz
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      );
    }
    return (
      <View style={styles.container}>
        <View>
          <Text style={styles.countText}>{`${cardIndex + 1} / ${deck.questions.length}`}</Text>
          <Text
            style={styles.questionText}
          >
            {showingQuestion
              ? deck.questions[cardIndex].question
              : deck.questions[cardIndex].answer}
          </Text>
          <View>
            <TouchableOpacity onPress={() => this.setState({ showingQuestion: !showingQuestion })}>
              {showingQuestion
                ? <Text style={[styles.questionAndAnswerBtn, { color: 'red' }]}>Answer</Text>
                : <Text style={[styles.questionAndAnswerBtn, { color: 'green' }]}>Question</Text>}
            </TouchableOpacity>
          </View>
        </View>
        <View>
          <View style={styles.buttonsView}>
            <TouchableOpacity
              onPress={() => this.setState({
                cardIndex: cardIndex + 1,
                correctCount: correctCount + 1,
                showingQuestion: true,
              })}
              style={[styles.buttons, styles.correctBtn]}
            >
              <Text style={styles.buttonText}>Correct</Text>
            </TouchableOpacity>
          </View>
          <View>
            <View style={styles.buttonsView}>
              <TouchableOpacity
                onPress={() => this.setState({
                  cardIndex: cardIndex + 1,
                  showingQuestion: true,
                })}
                style={[styles.buttons, styles.incorrectBtn, { marginBottom: 100 }]}
              >
                <Text
                  style={[styles.buttonText, { color: 'white' }]}
                >
                  Incorrect
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params;

  return {
    deck: state[deckName],
  };
}

Quiz.propTypes = {
  deck: PropTypes.shape({
    questions: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
};

export default connect(mapStateToProps)(Quiz);
