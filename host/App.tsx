import React from 'react';
import {Federated} from '@callstack/repack/client';
import {Text, SafeAreaView} from 'react-native';
import WebView from 'react-native-webview';

const App1 = React.lazy(() => Federated.importModule('app1', './App'));

export default function App(): JSX.Element {
  return (
    <SafeAreaView>
      <Text>Host App</Text>
      <React.Suspense fallback={<Text>Loading app1...</Text>}>
        <App1 />
      </React.Suspense>
    </SafeAreaView>
  );
}

export {WebView};
