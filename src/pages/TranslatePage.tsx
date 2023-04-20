/* eslint-disable react/react-in-jsx-scope */
import {View} from 'react-native';
import DropDownMenu from '../components/DropDownMenu';
import Word from '../components/Word';
import ExampleArea from '../components/ExampleArea';
import WordImage from '../components/WordImage';

export default function TranslatePage() {
  return (
    <View className="w-[85%] self-center">
      <WordImage />
      <Word />
      <DropDownMenu />
      <ExampleArea />
    </View>
  );
}
