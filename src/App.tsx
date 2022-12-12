/* eslint-disable react/react-in-jsx-scope */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native';
import {Provider as PaperProvider} from 'react-native-paper';
import {NativeBaseProvider} from 'native-base';
import {NativeRouter, Route, Routes} from 'react-router-native';
import StackNavigation from './components/StackNavigation';

import {RealmProvider} from './models/Lists';

export default function App() {
  const queryClient = new QueryClient({});
  return (
    <PaperProvider>
      <NativeBaseProvider>
        <RealmProvider>
          <QueryClientProvider client={queryClient}>
            <SafeAreaView className="flex-1 bg-slate-200 relative">
              <NativeRouter>
                <Routes>
                  <Route path="/" element={<StackNavigation />} />
                </Routes>
              </NativeRouter>
            </SafeAreaView>
          </QueryClientProvider>
        </RealmProvider>
      </NativeBaseProvider>
    </PaperProvider>
  );
}
