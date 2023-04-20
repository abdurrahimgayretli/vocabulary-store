/* eslint-disable react/react-in-jsx-scope */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import StackNavigation from './components/StackNavigation';
import {RealmProvider} from './models/Lists';
import SplashScreen from 'react-native-splash-screen';
import {useEffect} from 'react';

export default function App() {
  const queryClient = new QueryClient({});

  useEffect(() => {
    SplashScreen.hide();
  }, []);

  return (
    <PaperProvider>
      <NativeBaseProvider>
        <RealmProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaView className="flex-1 bg-slate-200 relative">
              <StackNavigation />
            </SafeAreaView>
          </QueryClientProvider>
        </RealmProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
