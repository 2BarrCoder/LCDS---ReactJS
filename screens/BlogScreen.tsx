import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';

const articles = [
  {
    id: '1',
    title: 'Les dernières tendances en photographie',
    summary: 'Découvrez les tendances actuelles en photographie pour améliorer vos clichés.',
    image: 'https://via.placeholder.com/400x200', // Placeholder image URL
  },
  {
    id: '2',
    title: 'Conseils pour réussir ses photos',
    summary: 'Apprenez des astuces et techniques pour prendre de meilleures photos.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: '3',
    title: 'Histoires de clients',
    summary: 'Lisez les expériences et témoignages de nos clients satisfaits.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: '4',
    title: 'Nouveaux services et événements',
    summary: 'Restez informés des nouveaux services et événements au studio.',
    image: 'https://via.placeholder.com/400x200',
  },
  {
    id: '5',
    title: 'Tutoriels visite virtuelle',
    summary: 'Suivez nos guides pour utiliser la visite virtuelle et la prise de photos à distance.',
    image: 'https://via.placeholder.com/400x200',
  },
];

const BlogScreen: React.FC = () => {
  const renderArticle = ({ item }: { item: typeof articles[0] }) => (
    <TouchableOpacity style={styles.articleContainer}>
      <Image source={{ uri: item.image }} style={styles.articleImage} />
      <View style={styles.textContainer}>
        <Text style={styles.articleTitle}>{item.title}</Text>
        <Text style={styles.articleSummary}>{item.summary}</Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      
      <FlatList
        data={articles}
        renderItem={renderArticle}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContainer}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
 
  listContainer: {
    paddingBottom: 20,
  },
  articleContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    borderRadius: 12,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  articleImage: {
    width: '100%',
    height: 200,
  },
  textContainer: {
    padding: 16,
  },
  articleTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 8,
  },
  articleSummary: {
    fontSize: 16,
    color: '#666',
  },
});

export default BlogScreen;
