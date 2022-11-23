/* eslint-disable react/react-in-jsx-scope */
import {SafeAreaView} from 'react-native';

import TranslatePage from './pages/TranslatePage';

export default function App() {
  return (
    <SafeAreaView className="flex-1 bg-slate-200 relative">
      <TranslatePage />
    </SafeAreaView>
  );
}
