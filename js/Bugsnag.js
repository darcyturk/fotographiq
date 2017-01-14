import React, { Component } from 'react';
import { Client } from 'bugsnag-react-native';
import { connect } from 'react-redux';
//import Config from 'react-native-config';
const bugsnagKey = '3cb03916719fa3065d7f0a285a48664e';

class Bugsnag extends Component {
  constructor(props) {
    super(props);
    this.client = new Client(bugsnagKey);
  }

  componentDidMount() {
    var { user } = this.props;

    if (user.isLoggedIn) {
      this.client.setUser(user.token, user.name, user.email);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.user.isLoggedIn && this.props.user.isLoggedIn) {
      var { user } = this.props;
      this.client.setUser(user.token, user.name, user.email);
    } else if (prevProps.user.isLoggedIn && !this.props.user.isLoggedIn) {
      this.client.setUser('', '', '');
    }
  }

  render() {
    return this.props.children;
  }
}

function select(store) {
  return {
    user: store.user
  };
}

export default connect(select)(Bugsnag);
