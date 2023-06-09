import { AppRegistry, Platform } from 'react-native';
// eslint-disable-next-line import/no-extraneous-dependencies
import { ScriptManager, Script, Federated } from '@callstack/repack/client';
import { name as appName } from './app.json';
import App from './App';

const resolveURL = Federated.createURLResolver({
  containers: {
    // app1: 'http://172.16.10.91:9000/bundle/ios/[name][ext]'
    // app1: 'http://172.16.10.91:9000/bundle/android/[name][ext]',
    app1: 'http://localhost:8082/[name][ext]',
  },
});

ScriptManager.shared.addResolver(async (scriptId, caller) => {
  let url;
  if (caller === 'main') {
    url = Script.getDevServerURL(scriptId);
  } else {
    url = resolveURL(scriptId, caller);
  }

  if (!url) {
    return undefined;
  }

  return {
    url,
    cache: true, // For development
    query: {
      platform: Platform.OS,
    },
  };
});

AppRegistry.registerComponent(appName, () => App);