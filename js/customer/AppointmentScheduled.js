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

export default class AppointmentScheduled extends Component {
  _openMain() {
    this.props.navigator.pop();
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo style={styles.logo} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Appointment Scheduled!</Text>
          <Text style={styles.info}>Your appointment has been scheduled successfully.</Text>
          <Text style={styles.info}>You will receive a notification one hour prior to your appointment.</Text>
          <Button containerStyle={styles.button} text='Back' onPress={this._openMain.bind(this)} />
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
    marginTop: Platform.OS === 'ios' ? 70 : 0
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
  logo: {
    marginTop: 20
  },
  button: {
    marginTop: 20,
  },
});
