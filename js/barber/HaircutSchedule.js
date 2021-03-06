import React, { Component } from 'react';
import {
  View,
  StyleSheet,
  ActivityIndicator,
  Text,
  RefreshControl,
  ScrollView,
  Alert
} from 'react-native';

import { connect } from 'react-redux';

import SelectableButton from '../common/SelectableButton';
import HaircutDetails from './HaircutDetails';
import { listSchedules, selectDay, toggleActive } from '../actions/schedules';
import EmptyResults from '../common/EmptyResults';
import ChartLegend from '../common/ChartLegend';

class HaircutSchedule extends Component {
  componentDidMount() {
    this._fetchData();
  }

  _fetchData() {
    this.props.dispatch(listSchedules());
  }

  _onRefresh() {
    this._fetchData();
  }

  _selectDay(index) {
    this.props.dispatch(selectDay(index));
  }

  _scheduleClicked(schedule) {
    if (schedule.scheduled_appointment_id) {
      this._openHaircutDetails(schedule);
    } else {
      this._confirmToggleActive(schedule);
    }
  }

  _confirmToggleActive(schedule) {
    const action = schedule.active ? 'Disable' : 'Activate';

    Alert.alert(
      `${action} schedule`,
      `Are you sure you want to ${action} this time?`,
      [
        {text: `Yes, ${action} schedule`, onPress: () => {this._toggleActive(schedule)} },
        {text: 'Cancel', style: 'cancel'},
      ]
    );
  }

  _toggleActive(schedule) {
    const data = {
      active: !schedule.active
    };
    this.props.dispatch(toggleActive(schedule.id, data));
  }

  _openHaircutDetails(schedule) {
    const appointment = this.props.appointments.appointments.find(a => a.id === schedule.scheduled_appointment_id);

    this.props.navigator.push({
      component: HaircutDetails,
      passProps: {appointment: appointment, appointmentId: schedule.scheduled_appointment_id, edit: true}
    });
  }

  _getContainerStyle(status) {
    switch (status) {
      case 'finished':
        return {backgroundColor: '#57a77e'};
      case 'canceled':
        return {backgroundColor: '#e73348'};
      case 'scheduled':
        return {backgroundColor: '#003459'};
      default:
        null;
    }
  }

  _getLegendItems() {
    return [
      {label: 'Canceled Time', iconColor: '#e73348' },
      {label: 'Schedule Ended', iconColor: '#57a77e' },
      {label: 'Scheduled Time', iconColor: '#003459' },
      {label: 'Free Time', iconColor: 'white' }
    ];
  }

  render() {
    const {days, isLoading} = this.props.schedules;
    const selectedDay = days.find(day => day.selected);

    var refreshControl = <RefreshControl refreshing={isLoading} onRefresh={this._onRefresh.bind(this)} />
    var content;

    if (isLoading) {
      content = <ActivityIndicator />;
    } else if (days.length === 0) {
      var message = "You will recieve a schedule once your application is done being reviewed.";
      content = <ScrollView refreshControl={refreshControl}><EmptyResults icon='razor-2' message={message} /></ScrollView>;
    } else {
      content =
        <ScrollView refreshControl={refreshControl}>
          <View style={styles.innerContainer}>
            <Text style={styles.info}>Day:</Text>
            <View style={styles.selectableButtonContainer}>
              {days.map((day, index) => {
                return(
                  <SelectableButton
                    key={index}
                    title={day.schedules[0].day_name}
                    text={`${day.number} ${day.schedules[0].month_name}`}
                    selected={day === selectedDay}
                    onPress={() => this._selectDay(index)} />
                )
              })}
            </View>
            <Text style={styles.info}>Schedules:</Text>
            <View style={styles.selectableButtonContainer}>
              {selectedDay.schedules.map(schedule => {
                return(
                  <SelectableButton
                    key={schedule.id}
                    title={schedule.hour}
                    disabled={schedule.disabled && !schedule.scheduled_appointment_id}
                    selected={schedule.appointment_status}
                    onPressIfDisabled={true}
                    containerStyle={this._getContainerStyle(schedule.appointment_status)}
                    onPress={() => this._scheduleClicked(schedule)} />
                )
              })}
            </View>
            <ChartLegend items={this._getLegendItems()} />
          </View>
        </ScrollView>
    }

    return(
      <View style={styles.container}>
        <View style={styles.listContainer}>{content}</View>
      </View>
    );
  }
}

function select(store) {
  return {
    schedules: store.schedules,
    appointments: store.appointments
  };
}

export default connect(select)(HaircutSchedule);

var styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    backgroundColor: '#F8F8F8',
    flex: 1,
    paddingLeft: 10,
    paddingRight: 10,
    paddingTop: 10
  },
  innerContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  info: {
    fontSize: 16,
    textAlign: 'center',
    flex: 1
  },
  selectableButtonContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignSelf: 'stretch',
    justifyContent: 'center'
  },
});
