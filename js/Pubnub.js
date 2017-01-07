import { Platform } from 'react-native';
import Config from 'react-native-config';
const pubnubSubscribeKey = Config.PUB_NUB_SUBSCRIBE_KEY;
const apiHost = `https://pubsub.pubnub.com/v1/push/sub-key/${pubnubSubscribeKey}`;

export default class Pubnub {
  static _sendRequest(deviceID, type, channel) {
    const pushType = Platform.OS === 'ios' ? 'apns' : 'gcm';
    fetch(`${apiHost}/devices/${deviceID}?type=${pushType}&${type}=${channel}`);
  }

  static enablePushNotificationsOnChannel(channel, deviceID) {
    this._sendRequest(deviceID, 'add', channel);
  }

  static disablePushNotificationsOnChannel(channel, deviceID) {
    this._sendRequest(deviceID, 'remove', channel);
  }
}
