import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  TextInput,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import t from 'tcomb-form-native';
const Form = t.form.Form;

import Button from '../common/Button';
import Toolbar from '../common/Toolbar';
import VerifyPhone from './VerifyPhone';

import { startPhoneVerification, setEditMode } from '../actions/verifyPhone';

class PhoneForm extends Component {
  _sendConfirmation() {
    let value = this.refs.form.getValue();
    // if are any validation errors, value will be null
    if (value !== null) {
      this.props.dispatch(startPhoneVerification(value));
    }
  }

  componentDidMount() {
    if (this.props.edit) {
      this.props.dispatch(setEditMode());
    }
  }

  componentDidUpdate() {
    if (this.props.form.success) {
      const route = {
        component: VerifyPhone,
        title: 'Barber Hour'
      };

      Platform.OS === 'ios' ? requestAnimationFrame(() => this.props.navigator.resetTo(route)) : this.props.navigator.resetTo(route);
    }
  }

  getFormValue() {
    return {
      phone: this.props.form.phone
    };
  }

  render() {
    const Login = t.struct({phone: t.String});
    const buttonLabel = this.props.form.isLoading ? 'Sending...' : 'To Send';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5' networkActivityIndicatorVisible={this.props.form.isLoading} />
        <Toolbar backIcon navigator={this.props.navigator} />
        <View style={styles.innerContainer}>
          <Text style={styles.title}>Confirm Number</Text>
          <Text style={styles.info}>Mobile Number:</Text>
          <View style={styles.formContainer}>
            <Form ref='form' type={Login} options={this.props.form} value={this.getFormValue()} />
          </View>
          <Text style={styles.info}>In just a moment, you will recieve a text message containing your one time access code.</Text>
          <Button
            containerStyle={styles.button}
            text={buttonLabel}
            disabled={this.props.form.isLoading}
            onPress={this._sendConfirmation.bind(this)} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    form: store.startPhoneVerification
  };
}

export default connect(select)(PhoneForm);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    marginTop: Platform.OS === 'ios' ? 55 : 0
  },
  innerContainer: {
    padding: 20,
  },
  title: {
    fontSize: 24,
    textAlign: 'center'
  },
  info: {
    fontSize: 16,
    textAlign: 'center'
  },
  button: {
    marginTop: 20
  },
  formContainer: {
    marginTop: 10
  }
});
