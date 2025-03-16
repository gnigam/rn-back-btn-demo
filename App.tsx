import React, { useRef, useState, useEffect } from 'react';
import { BackHandler, View, Button, StyleSheet } from 'react-native';
import { WebView } from 'react-native-webview';

const App = () => {
  const webViewRef = useRef(null);
  const [showWebView, setShowWebView] = useState(false);
  const [canGoBack, setCanGoBack] = useState(false);

  useEffect(() => {
    const backAction = () => {
      if (showWebView) {
        if (canGoBack && webViewRef.current) {
          webViewRef.current.goBack();
        } else {
          setShowWebView(false);
        }
        return true;
      }
      return false;
    };

    const backHandler = BackHandler.addEventListener(
      'hardwareBackPress',
      backAction
    );

    return () => backHandler.remove();
  }, [showWebView, canGoBack]);

  return (
    <View style={{ flex: 1 }}>
      {showWebView ? (
        <WebView
          ref={webViewRef}
          source={{ uri: 'https://www.example.com' }}
          style={{ flex: 1 }}
          onNavigationStateChange={(navState) => {
            setCanGoBack(navState.canGoBack);
          }}
        />
      ) : (
        <View style={styles.container}>
          <Button title="Open URL" onPress={() => setShowWebView(true)} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;
