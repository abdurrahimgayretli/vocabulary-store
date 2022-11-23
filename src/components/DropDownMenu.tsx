/* eslint-disable react-native/no-inline-styles */
/* eslint-disable @typescript-eslint/no-unused-vars */
import React, {useEffect} from 'react';
import {Text, View} from 'react-native';
import {SelectList} from 'react-native-dropdown-select-list';
import SearchWord from '../components/SearchWord';

const DropDownMenu = () => {
  const [fromSelected, setSelectedFrom] = React.useState('');
  const [toSelected, setSelectedTo] = React.useState('');

  const data = [
    {key: 'TURKISH', value: 'TURKISH'},
    {key: 'ENGLISH', value: 'ENGLISH'},
  ];

  return (
    <>
      <SearchWord to={toSelected} from={fromSelected} />
      <View className="absolute h-[7vh] top-[40vh] w-[16vh] left-[2vh] ">
        <SelectList
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[0]}
          setSelected={(val: any) => setSelectedFrom(val)}
          data={data}
          save="value"
        />
      </View>
      <View className="absolute h-[7vh] top-[40vh] w-[16vh] right-[2vh]">
        <SelectList
          boxStyles={{
            backgroundColor: 'white',
            borderRadius: 8,
            borderColor: '#D0D5DD',
          }}
          dropdownItemStyles={{backgroundColor: 'white'}}
          defaultOption={data[1]}
          setSelected={(val: any) => setSelectedTo(val)}
          data={data}
          save="value"
        />
      </View>
    </>
  );
};

export default DropDownMenu;
