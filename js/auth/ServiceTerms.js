import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
  StatusBar,
  ScrollView
} from 'react-native';

import Toolbar from '../common/Toolbar';

export default class ServiceTerms extends Component {
  render() {
    return(
      <View style={styles.container}>
        <StatusBar backgroundColor='#C5C5C5'/>
        <Toolbar backIcon border navigator={this.props.navigator} title='Termos de uso' />
        <ScrollView>
          <View style={styles.innerContainer}>
            <Text style={styles.info}>
            Silvio Santos Ipsum Is it good or not? Wellintaaammmmmmmmm. Mah ooooee come here. Come here. Is it easy or not? You came from the caravan from where? I just believe ... I'm seeing. They risk it all, worth a million Reais. Patríciaaammmm ... Luiz Ricardouaaammmmmm. Is it at your own risk? One, two three, four, PIM, understood?

             One, two three, four, PIM, understood? Is it easy or not? I did not want to ask that publicly, but I'll ask. Carla, do you have the basic education? Is it dating or friendship? Ma who wants money? Is it good or is not it? Do you have or do not have a millionaamm cell phone? What is the musicamm?

             Is it good or is not it? Ma there are no woman ugly, there are women who do not know the Jequitiamm products. Ma, are you sure? Ma who wants money? Is it at your own risk? They risk it all, worth a million Reais. Do you live with Dad or Mom? Is it money or is not it? Do you live with Dad or Mom? Bad! When you get the Chest card, you will be competing for a prize of one hundred thousand reaisam. Wellintaaammmmmmmmm.

             We're in a party mood. Is it good or is not it? Ma there are no woman ugly, there are women who do not know the Jequitiamm products. Ha haeeee. Hi hi The prize is in gold bars, which is worth more than money. Ma will go there. Mah ooooee come here. Come here. Ma will go there. Mah is the door of hope. It's Lombardy with you.

             Ha ha Well done, well done. Well enjoyed. They risk it all, worth a million Reais. Is it good or is not it? Ma there are no woman ugly, there are women who do not know the Jequitiamm products. Mah you can not right Moses? You can not. Is it dating or friendship? Mah ooooee come here. Come here. Come on, mah, you're coming. Now go, now come on. Mah ooooee come here. Come here.
            </Text>
          </View>
        </ScrollView>
      </View>
    );
  }
}

var styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white',
  },
  innerContainer: {
    padding: 20,
  },
  info: {
    fontSize: 16,
  },
});
