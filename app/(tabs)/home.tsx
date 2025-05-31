//import { Image } from 'expo-image'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, ScrollView, StyleSheet, Text, View } from 'react-native'

const { width } = Dimensions.get('window')

const featuredData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: 'New Summer Drinks',
    subtitle: 'Cool off with our refreshing summer specials.',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: 'Barista Workshop',
    subtitle: 'Join our next event and learn latte art!'
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    title: 'Coffee Tips',
    subtitle: 'Discover how to brew the perfect cup at home.'
  },
]

const recommendedData = [
  {
    id: '1',
    title: 'Latte Art',
    desc: 'A beautiful design in your cup.',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Iced Coffee',
    desc: 'Perfect for a hot day.',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Cappuccino',
    desc: 'Classic and creamy.',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
  },
]

const bestSellingData = [
  {
    id: '1',
    title: 'Espresso',
    desc: 'Strong and rich in flavor.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Cold Brew',
    desc: 'Smooth and refreshing.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Mocha',
    desc: 'Chocolatey and delicious.',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
  },
]

const menuData = [
  {
    id: '1',
    title: 'Espresso',
    desc: 'Strong and rich in flavor.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '2',
    title: 'Cold Brew',
    desc: 'Smooth and refreshing.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '3',
    title: 'Espresso',
    desc: 'Strong and rich in flavor.',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
  },
  {
    id: '4',
    title: 'Cold Brew',
    desc: 'Smooth and refreshing.',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
  },
]

export default function HomeScreen() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const flatListRef = useRef<FlatList>(null)

  // Auto-advance carousel
  useEffect(() => {
    const interval = setInterval(() => {
      let nextIndex = currentIndex + 1
      if (nextIndex >= featuredData.length) nextIndex = 0
      setCurrentIndex(nextIndex)
      flatListRef.current?.scrollToIndex({ index: nextIndex, animated: true })
    }, 8000)
    return () => clearInterval(interval)
  }, [currentIndex])

  const onScroll = (e: NativeSyntheticEvent<NativeScrollEvent>) => {
    const slide = Math.round(e.nativeEvent.contentOffset.x / width)
    setCurrentIndex(slide)
  }

  return (
    <ScrollView style={{ flex: 1, backgroundColor: '#fff' }}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Welcome back</Text>
        <Text style={styles.searchIcon}>🔍</Text>
      </View>

      {/* Featured Carousel */}
      <View style={styles.featuredContainer}>
        <FlatList
          ref={flatListRef}
          data={featuredData}
          keyExtractor={item => item.id}
          horizontal
          pagingEnabled
          showsHorizontalScrollIndicator={false}
          onScroll={onScroll}
          snapToAlignment="start"
          decelerationRate={0.95}
          scrollEnabled={false}
          renderItem={({ item }) => (
            <View style={{ width }}>
              <Image source={{ uri: item.image }} style={styles.featuredImage} />
              <Text style={styles.featuredTitle}>{item.title}</Text>
              <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
            </View>
          )}
        />
        {/* Indicator Dots */}
        <View style={styles.dotsContainer}>
          {featuredData.map((_, idx) => (
            <View
              key={idx}
              style={[styles.dot, currentIndex === idx && styles.activeDot]}
            />
          ))}
        </View>
      </View>

      {/* Recommended Section */}
      <Text style={styles.sectionTitle}>Recommended</Text>
      <FlatList
        data={recommendedData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        )}
      />

      {/* Best Selling Section */}
      <Text style={styles.sectionTitle}>Best Selling</Text>
      <FlatList
        data={bestSellingData}
        keyExtractor={item => item.id}
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        )}
      />

      {/* Menu Section */}
      <Text style={styles.sectionTitle}>Menu</Text>
      <FlatList
        data={menuData}
        keyExtractor={item => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        contentContainerStyle={{ paddingHorizontal: 16, marginBottom: 24, gap: 16 }}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Image source={{ uri: item.image }} style={styles.cardImage} />
            <Text style={styles.cardTitle}>{item.title}</Text>
            <Text style={styles.cardDesc}>{item.desc}</Text>
          </View>
        )}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 8,
    backgroundColor: '#fff',
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  searchIcon: {
    fontSize: 22,
    color: '#222',
  },
  featuredContainer: {
    paddingHorizontal: 0,
    marginBottom: 16,
  },
  featuredImage: {
    width: width - 32,
    height: 160,
    borderRadius: 16,
    marginBottom: 12,
    marginHorizontal: 16,
  },
  featuredTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#222',
    marginHorizontal: 16,
  },
  featuredSubtitle: {
    fontSize: 14,
    color: '#8a8a8a',
    marginBottom: 8,
    marginHorizontal: 16,
  },
  dotsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e0e0e0',
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: '#222',
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 16,
    marginTop: 12,
    marginBottom: 8,
  },
  card: {
    width: 160,
    marginRight: 16,
    backgroundColor: '#faf8f6',
    borderRadius: 16,
    padding: 12,
    alignItems: 'center',
  },
  cardImage: {
    width: 120,
    height: 90,
    borderRadius: 12,
    marginBottom: 8,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginBottom: 2,
  },
  cardDesc: {
    fontSize: 13,
    color: '#8a8a8a',
    textAlign: 'center',
  },
})