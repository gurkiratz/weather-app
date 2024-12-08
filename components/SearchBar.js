import React, { useState, useRef } from 'react';
import { View, TextInput, TouchableOpacity, Text, StyleSheet, Keyboard } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const SearchBar = ({ value, onChangeText, onSubmit }) => {
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef(null);

  const handleCancel = () => {
    inputRef.current.blur();
    Keyboard.dismiss();
  };

  return (
    <View style={styles.container}>
      <MaterialIcons name="search" size={24} color="#666" style={styles.icon} />
      <TextInput
        ref={inputRef}
        placeholder="Enter city name"
        style={styles.input}
        value={value}
        onChangeText={onChangeText}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        returnKeyType="search"
        onSubmitEditing={onSubmit}
      />
      {isFocused && (
        <TouchableOpacity onPress={handleCancel} style={styles.cancelButton}>
          <Text style={styles.cancelText}>Cancel</Text>
        </TouchableOpacity>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { 
    flexDirection: 'row', 
    alignItems: 'center', 
    margin: 20, 
    paddingHorizontal: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  icon: {
    marginRight: 10,
  },
  input: { 
    flex: 1, 
    height: 40, 
    fontSize: 16, 
    color: '#333',
  },
  cancelButton: {
    marginLeft: 10,
  },
  cancelText: {
    color: '#007AFF',
    fontSize: 16,
  },
});

export default SearchBar;