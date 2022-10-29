import {Alert, Linking, Platform} from 'react-native';
import {PERMISSIONS, requestMultiple, RESULTS} from 'react-native-permissions';

export const requestCameraAndAudioPermission = () =>
  new Promise((resolve, reject) => {
    const permissions = Platform.select({
      android: [PERMISSIONS.ANDROID.CAMERA, PERMISSIONS.ANDROID.RECORD_AUDIO],
      ios: [PERMISSIONS.IOS.CAMERA, PERMISSIONS.IOS.MICROPHONE],
    });
    requestMultiple(permissions)
      .then(res => {
        if (
          res[permissions[0]] === RESULTS.GRANTED &&
          res[permissions[1]] === RESULTS.GRANTED
        ) {
          resolve();
        } else {
          Alert.alert(
            'Please give permission',
            'Please give camera and audio permission to start call.',
            [
              {
                text: 'Yes',
                onPress: () => Linking.openSettings(),
              },
              {
                text: 'No',
                style: 'cancel',
              },
            ],
          );
        }
        reject('Permission Rejected');
      })
      .catch(err => {
        reject(err);
      });
  });
