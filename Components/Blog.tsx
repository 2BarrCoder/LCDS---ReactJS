// components/Blog.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Blog: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Blog</Text>
      {/* Affichez ici les articles du blog */}
      <Text>Liste des articles du blog</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});

export default Blog;
