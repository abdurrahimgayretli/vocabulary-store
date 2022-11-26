/* eslint-disable react/react-in-jsx-scope */

import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {SafeAreaView} from 'react-native';

import TranslatePage from './pages/TranslatePage';

export default function App() {
  const queryClient = new QueryClient({});
  return (
    <QueryClientProvider client={queryClient}>
      <SafeAreaView className="flex-1 bg-slate-200 relative">
        <TranslatePage />
      </SafeAreaView>
    </QueryClientProvider>
  );
}
