import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';

import Logo from '../common/Logo';
import Button from '../common/Button';
import Main from './Main';

export default class WaitReview extends Component {
  _openMain() {
    this.props.navigator.replace({
      component: Main,
      title: 'Barber Hour'
    });
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Review in Progress!</Text>
          <Text style={styles.info}>Our team is currently reviewing your application and will reach out to you shortly.</Text>
          <Button containerStyle={styles.button} text='Okay' onPress={this._openMain.bind(this)} />
        </View>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 60 : 0
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  info: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20,
  },
  logo: {
    marginTop: 20
  }
});
