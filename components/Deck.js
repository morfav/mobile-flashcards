import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: 'white',
  },
  item: {
    textAlign: 'center',
    fontSize: 28,
    paddingTop: 30,
    paddingBottom: 14,
  },
  itemCount: {
    textAlign: 'center',
    fontSize: 20,
    paddingBottom: 30,
    color: 'rgba(0, 0, 0, 0.65)',
  },
  buttons: {
    padding: 20,
    marginLeft: 80,
    marginRight: 80,
    margin: 5,
    borderWidth: 1,
    borderRadius: 7,
  },
  buttonText: {
    textAlign: 'center',
    fontSize: 18,
  },
  startQuiz: {
    backgroundColor: 'black',
  },
});

class Deck extends Component {
  static navigationOptions = ({ navigation }) => {
    const { deckName } = navigation.state.params;

    return {
      title: `${deckName}`,
    };
  }

  render() {
    const { deck, deckName } = this.props;
    return (
      <View style={styles.container}>
        <View>
          <Text
            style={styles.item}
          >
            {deckName}
          </Text>
          <Text style={styles.itemCount}>
            {`${deck.questions.length} card${deck.questions.length !== 1 ? 's' : ''}`}
          </Text>
        </View>
        <View>
          <TouchableOpacity style={styles.buttons}>
            <Text style={styles.buttonText}>Add Card</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.buttons, styles.startQuiz, { marginBottom: 30 }]}>
            <Text style={[styles.buttonText, { color: 'white' }]}>Start Quiz</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

function mapStateToProps(state, { navigation }) {
  const { deckName } = navigation.state.params;

  return {
    deck: state[deckName],
    deckName,
  };
}

Deck.propTypes = {
  deck: PropTypes.shape({
    questions: PropTypes.arrayOf(Object).isRequired,
  }).isRequired,
  deckName: PropTypes.string.isRequired,
};

export default connect(mapStateToProps)(Deck);
