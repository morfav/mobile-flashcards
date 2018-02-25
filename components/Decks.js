import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';

import { loadDecks } from '../actions';


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  item: {
    textAlign: 'center',
    fontSize: 24,
    paddingTop: 40,
    paddingBottom: 3,
  },
  itemCount: {
    textAlign: 'center',
    fontSize: 16,
    paddingBottom: 40,
    color: 'rgba(0, 0, 0, 0.65)',
    borderBottomColor: 'rgba(0, 0, 0, 0.70)',
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
});

class Decks extends Component {
  componentDidMount() {
    this.props.getAllDecks();
  }

  render() {
    const { decks, navigation } = this.props;
    return (
      <View style={styles.container}>
        <FlatList
          data={Object.entries(decks)}
          keyExtractor={item => item[0]}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => navigation.navigate(
                'Deck',
                { deckName: item[0] },
              )}
            >
              <View>
                <Text style={styles.item}>
                  {item[0]}
                </Text>
                <Text style={styles.itemCount}>
                  {`${item[1].questions.length} card${item[1].questions.length !== 1 ? 's' : ''}`}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    );
  }
}

function mapStateToProps(state) {
  return {
    decks: state,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    getAllDecks: () => dispatch(loadDecks()),
  };
}

Decks.propTypes = {
  decks: PropTypes.instanceOf(Object).isRequired,
  navigation: PropTypes.instanceOf(Object).isRequired,
  getAllDecks: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, mapDispatchToProps)(Decks);
