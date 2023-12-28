import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { TabView, SceneMap, TabBar } from 'react-native-tab-view';
import { Dimensions } from 'react-native';
import All from './All';
import Male from './Male';
import Female from './Female';
import Baby from './Baby';
import Colors from '../../color';

const initialLayout = { width: Dimensions.get('window').width };

const renderScene = SceneMap({
  first: All,
  second: Male,
  third: Female,
  fourth: Baby,
});

const CategoryTabs = () => {
  const [index, setIndex] = useState(0);
  const [routes] = useState([
    { key: 'first', title: 'All' },
    { key: 'second', title: 'Male' },
    { key: 'third', title: 'Female' },
    { key: 'fourth', title: 'Baby' },
  ]);

  const renderTabBar = (props) => (
    <TabBar
      {...props}
      style={{ backgroundColor: Colors.white }}
      indicatorStyle={{ backgroundColor: Colors.main }}
      activeColor={Colors.main}
      inactiveColor={Colors.black}
    />
  );

  return (
    <TabView
      navigationState={{ index, routes }}
      renderScene={renderScene}
      onIndexChange={setIndex}
      initialLayout={initialLayout}
      renderTabBar={renderTabBar}
      style={{backgroundColor: Colors.subGreen, paddingBottom: 20}}
    />
  );
};

export default CategoryTabs;
