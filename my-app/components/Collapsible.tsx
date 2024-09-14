import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

interface CollapsibleProps {
  title: string;
  children: React.ReactNode;
}

export default function Collapsible({ title, children }: CollapsibleProps) {
  const [isCollapsed, setIsCollapsed] = useState(true);

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={() => setIsCollapsed(!isCollapsed)} style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        <Ionicons name={isCollapsed ? 'chevron-down' : 'chevron-up'} size={20} color="black" />
      </TouchableOpacity>
      {!isCollapsed && <View style={styles.content}>{children}</View>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginVertical: 8,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#f9f9f9',
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  content: {
    padding: 10,
  },
});
