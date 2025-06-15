import { IconSymbol } from '@/components/ui/IconSymbol'
import { useLocalSearchParams, useRouter } from 'expo-router'
import React from 'react'
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default function ArticleScreen() {
  const router = useRouter()
  const params = useLocalSearchParams()
  let article = null
  const rawArticle = Array.isArray(params.article) ? params.article[0] : params.article
  article = rawArticle ? JSON.parse(rawArticle) : null

  if (!article) {
    return (
      <View style={styles.centered}>
        <Text>Article not found.</Text>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Text style={styles.backButtonText}>Go Back</Text>
        </TouchableOpacity>
      </View>
    )
  }

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: article.image }} style={styles.image} />
        <TouchableOpacity onPress={() => router.back()} style={styles.backIcon}>
          <IconSymbol size={28} name="back.arrow" color="black" />
        </TouchableOpacity>
      </View>
      <View style={styles.contentBox}>
        <Text style={styles.title}>{article.title}</Text>
        <Text style={styles.content}>{article.content}</Text>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#faf8f6',
  },
  imageContainer: {
    position: 'relative',
    width: '100%',
    height: 240,
  },
  backIcon: {
    position: 'absolute',
    top: 40,
    left: 8,
    zIndex: 10,
    backgroundColor: 'rgba(255,255,255,0.7)',
    borderRadius: 40,
    padding: 6,
  },
  image: {
    width: '100%',
    height: 240,
    resizeMode: 'cover',
    marginBottom: 0,
  },
  contentBox: {
    backgroundColor: '#faf8f6',
    borderTopLeftRadius: 24,
    borderTopRightRadius: 24,
    marginTop: -24,
    padding: 24,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12,
    color: '#222',
  },
  content: {
    fontSize: 16,
    color: '#222',
    lineHeight: 22,
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  backButton: {
    marginTop: 16,
    padding: 10,
    backgroundColor: '#eee',
    borderRadius: 8,
  },
  backButtonText: {
    color: '#222',
    fontWeight: 'bold',
  },
})