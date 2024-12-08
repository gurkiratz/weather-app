import React from 'react';
import { View } from 'react-native';
import * as Progress from 'react-native-progress';

const Loader = () => {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Progress.Circle size={60} indeterminate={true} />
    </View>
  );
};

export default Loader;
