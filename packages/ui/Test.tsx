import React from 'react';
import { StyleSheet, Button, View, SafeAreaView, Text, Alert } from 'react-native';

export const Test = () => {
  console.log('Loaded shared comp')
  return (
    <>
      <Text>CA MARCHE SA MERE</Text>
        <Button
            title="Press me"
            onPress={() => console.log('Simple Button pressed')}
          />
    </>
  )
};