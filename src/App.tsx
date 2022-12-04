/* eslint-disable react/react-in-jsx-scope */
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native';

import TranslatePage from './pages/TranslatePage';
import {Provider as PaperProvider} from 'react-native-paper';

export default function App() {
  const queryClient = new QueryClient({});
  return (
    <PaperProvider>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView className="flex-1 bg-slate-200 relative">
          <TranslatePage />
        </SafeAreaView>
      </QueryClientProvider>
    </PaperProvider>
  );
}
