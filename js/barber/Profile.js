import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  Platform
} from 'react-native';

import { connect } from 'react-redux';

import AddressForm from './AddressForm';
import ImageChooser from './ImageChooser';
import ScheduleBuilder from './ScheduleBuilder';
import ServicesForm from './ServicesForm';
import Login from '../auth/Login';
import PrivacyPolicy from '../auth/PrivacyPolicy';
import ServiceTerms from '../auth/ServiceTerms';
import EditProfile from '../auth/EditProfile';
import EditPassword from '../auth/EditPassword';
import Touchable from '../common/Touchable';

import { logout } from '../actions/auth';

class Profile extends Component {
  _editProfile() {
    this.props.navigator.push({
      component: EditProfile,
      title: 'Edit Account'
    });
  }

  _editPassword() {
    this.props.navigator.push({
      component: EditPassword,
      title: 'Edit Password'
    });
  }

  _editAddress() {
    this.props.navigator.push({
      component: AddressForm,
      passProps: { edit: true },
      title: 'Edit Address'
    });
  }

  _editImages() {
    this.props.navigator.push({
      component: ImageChooser,
      passProps: { edit: true },
      title: 'Edit Photos'
    });
  }

  _scheduleBuilder() {
    this.props.navigator.push({
      component: ScheduleBuilder,
      passProps: { edit: true },
      title: 'Edit Agenda'
    });
  }

  _editServices() {
    this.props.navigator.push({
      component: ServicesForm,
      passProps: { edit: true },
      title: 'Edit Services'
    });
  }

  _openServiceTerms() {
    this.props.navigator.push({
      component: ServiceTerms,
      title: 'Terms of Use'
    });
  }

  _openPrivacyPolicy() {
    this.props.navigator.push({
      component: PrivacyPolicy,
      title: 'Privacy Policy'
    });
  }

  _logout() {
    const route = {
      component: Login,
      title: 'Barber Hour'
    };

    this.props.navigator.replace(route);

    this.props.dispatch(logout());
  }

  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <View style={styles.account}>
          <Text style={styles.header}>Account</Text>
          <Touchable
            style={styles.item}
            onPress={this._editProfile.bind(this)}>
            <Text style={styles.subtitle}>Edit Account</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._editPassword.bind(this)}>
            <Text style={styles.subtitle}>Change Password</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._editAddress.bind(this)}>
            <Text style={styles.subtitle}>Change Address</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._editImages.bind(this)}>
            <Text style={styles.subtitle}>Change Photos</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._scheduleBuilder.bind(this)}>
            <Text style={styles.subtitle}>Change Calendar Template</Text>
          </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._editServices.bind(this)}>
            <Text style={styles.subtitle}>Change Available Services</Text>
          </Touchable>
        </View>

        <View style={styles.about}>
          <Text style={styles.header}>About</Text>
            <Touchable
              style={styles.item}
              onPress={this._openServiceTerms.bind(this)}>
              <Text style={styles.subtitle}>Terms of Use</Text>
            </Touchable>
          <Touchable
            style={styles.item}
            onPress={this._openPrivacyPolicy.bind(this)}>
            <Text style={styles.subtitle}>Privacy Policy</Text>
          </Touchable>
        </View>

        <Touchable
          style={[styles.item, styles.lastItem]}
          onPress={this._logout.bind(this)}>
          <Text style={styles.subtitle}>Sign Out</Text>
        </Touchable>
      </View>
    );
  }
}

export default connect()(Profile);

var styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 10
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 14
  },
  account: {
    marginBottom: 10
  },
  item: {
    borderColor: '#DCDCDC',
    borderBottomWidth: 1,
    paddingTop: 10,
    paddingBottom: 10,
    flexWrap: 'wrap'
  },
  lastItem: {
    borderBottomWidth: 0,
    marginTop: 10
  }
});
