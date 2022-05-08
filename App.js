import React from 'react';
import Routes from './Routes'
import { SafeAreaView, StatusBar } from 'react-native';
import COLORS from './src/styles/colors';

const App = () => {
    return (
        <SafeAreaView style={{ flex: 1 }} forceInset={{ bottom: 'always', top: 'always' }}>
            <StatusBar
                backgroundColor={COLORS.yellow}
                barStyle="dark-content"
            />
            <Routes />
        </SafeAreaView>
    );
};

export default App;