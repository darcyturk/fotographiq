import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableNativeFeedback,
  TextInput,
  TouchableOpacity,
  StatusBar,
  Platform
} from 'react-native';

import { connect } from 'react-redux';
import {FBLoginManager} from 'react-native-facebook-login';

import Login from './Login';
import FacebookButton from './FacebookButton';
import Logo from '../common/Logo';
import Button from '../common/Button';
import TextSeparator from '../common/TextSeparator';
import LargeButton from '../common/LargeButton';
import AccountTypeSelector from './AccountTypeSelector';
import PrivacyPolicy from './PrivacyPolicy';
import ServiceTerms from './ServiceTerms';
import SignupForm from './SignupForm';
import CustomerMain from '../customer/Main';
import BarberMain from '../barber/Main';

import { loginWithFacebook } from '../actions/auth';

class Signup extends Component {
  _openLogin() {
    this.props.navigator.replace({
      component: Login,
      passProps: { skipDeepLinking: this.props.skipDeepLinking }
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy,
      title: 'Privacy Policy'
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms,
      title: 'Terms of Use'
    });
  }

  _openSignupForm() {
    this.props.navigator.replace({
      component: SignupForm,
      passProps: { skipDeepLinking: this.props.skipDeepLinking },
      title: 'Barber Hour'
    });
  }

  componentDidUpdate() {
    if (this.props.isLoggedIn) {
      let component = AccountTypeSelector;

      if (this.props.type === 'Barber') {
        component = BarberMain;
      } else if (this.props.type === 'Customer') {
        component = CustomerMain;
      }

      this.props.navigator.replace({component: component, title: 'Barber Hour'});
    }
  }

  _onFacebookLogin() {
    FBLoginManager.loginWithPermissions(['email', 'public_profile'], (error, data) => {
      if (!error) {
        this.props.dispatch(loginWithFacebook(data));
      }
    });
  }

  render() {
    const facebookButtonLabel = this.props.isLoading ? 'Signing Up...' : 'Signup with Facebook';

    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Logo />
        <View style={styles.formContainer}>
          <Button
            containerStyle={styles.button}
            text='Creat an Account'
            onPress={this._openSignupForm.bind(this)}
            disabled={this.props.isLoading} />
          <View style={styles.privacyContainer}>
            <Text>By registering, you agree to the</Text>
            <View style={styles.row}>
              <TouchableOpacity onPress={this._openServiceTerms.bind(this)}>
                <Text style={styles.link}>Terms of Service</Text>
              </TouchableOpacity>
              <Text> & </Text>
              <TouchableOpacity onPress={this._openPrivacyPolicy.bind(this)}>
                <Text style={styles.link}>Privacy Policy</Text>
              </TouchableOpacity>
              <Text>.</Text>
            </View>
          </View>
          <TextSeparator style={styles.separatorContainer} />
          <Button
            outline
            text={facebookButtonLabel}
            disabled={this.props.isLoading}
            onPress={this._onFacebookLogin.bind(this)} />
        </View>
        <View style={styles.signupContainer}>
          <LargeButton
            text='Already have an account? '
            linkText='Login'
            onPress={this._openLogin.bind(this)}
            disabled={this.props.isLoading} />
        </View>
      </View>
    );
  }
}

function select(store) {
  return {
    type: store.user.type,
    isLoggedIn: store.user.isLoggedIn,
    isLoading: store.login.isLoading
  }
}

export default connect(select)(Signup);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
    justifyContent: 'space-between',
    marginTop: Platform.OS === 'ios' ? 70 : 0
  },
  formContainer: {
    paddingLeft: 20,
    paddingRight: 20,
  },
  privacyContainer: {
    marginTop: 15,
    alignItems: 'center'
  },
  link: {
    textDecorationLine: 'underline',
    textDecorationStyle: 'solid',
  },
  separatorContainer: {
    marginBottom: 10
  },
  row: {
    flexDirection: 'row'
  },
  signupContainer: {
    height: 55,
  },
});
