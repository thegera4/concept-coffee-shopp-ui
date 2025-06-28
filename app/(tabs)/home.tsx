//import { Image } from 'expo-image'
import { useRouter } from 'expo-router'
import React, { useEffect, useRef, useState } from 'react'
import { Dimensions, FlatList, Image, NativeScrollEvent, NativeSyntheticEvent, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

const { width } = Dimensions.get('window')

const featuredData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    title: 'Coffee Brewing Masterclass',
    subtitle: 'Cool off with our refreshing summer specials.',
    article: {
      title: 'Coffee Brewing Masterclass',
      content: `Join us for an exclusive coffee brewing masterclass led by renowned barista, Alex Chen. Learn the art of crafting the perfect cup, from bean selection to brewing techniques. Limited spots available!\n\nDiscover the secrets behind a rich, aromatic brew. Alex will guide you through various brewing methods, including pour-over, French press, and espresso. Gain hands-on experience and elevate your coffee game.\n\nThis masterclass is perfect for coffee enthusiasts of all levels. Whether you're a beginner or a seasoned home barista, you'll learn valuable tips and tricks to enhance your coffee experience.\n\nDon't miss this opportunity to learn from the best. Reserve your spot today and embark on a journey to coffee perfection.`,
      image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    title: 'Barista Workshop',
    subtitle: 'Join our next event and learn latte art!',
    article: {
      title: 'Barista Workshop',
      content: `Unlock your inner barista with our hands-on workshop. Learn latte art, milk frothing, and more from industry experts. Perfect for coffee lovers looking to up their skills!`,
      image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=800&q=80',
    },
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    title: 'Coffee Tips',
    subtitle: 'Discover how to brew the perfect cup at home.',
    article: {
      title: 'Coffee Tips',
      content: `Discover expert tips for brewing the perfect cup at home. From grind size to water temperature, learn how to make every cup exceptional.`,
      image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=800&q=80',
    },
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
  const router = useRouter();

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

  const renderHeader = () => (
    <View style={styles.headerContainer}>
      <Text style={styles.headerText}>Welcome back</Text>
      <Text style={styles.searchIcon}>🔍</Text>
    </View>
  )

  const renderFeaturedCarousel = () => (
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
          <TouchableOpacity
            style={{ width }}
            activeOpacity={0.8}
            onPress={() => router.push({ pathname: '/article', params: { article: JSON.stringify(item.article) } })}
          >
            <Image source={{ uri: item.image }} style={styles.featuredImage} />
            <Text style={styles.featuredTitle}>{item.title}</Text>
            <Text style={styles.featuredSubtitle}>{item.subtitle}</Text>
          </TouchableOpacity>
        )}
      />
      <View style={styles.dotsContainer}>
        { featuredData.map((_, idx) => (<View key={idx} style={[styles.dot, currentIndex === idx && styles.activeDot]}/>)) }
      </View>
    </View>
  )

  const renderRecommended = () => (
    <View>
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
    </View>
  )

  const renderBestSelling = () => (
    <View>
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
    </View>
  )

  const renderMenu = () => (
    <View>
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
    </View>
  )

  const sections = [
    { id: 'header', render: renderHeader },
    { id: 'featured', render: renderFeaturedCarousel },
    { id: 'recommended', render: renderRecommended },
    { id: 'bestSelling', render: renderBestSelling },
    { id: 'menu', render: renderMenu },
  ]

  return (
    <FlatList
      data={sections}
      keyExtractor={item => item.id}
      renderItem={({ item }) => item.render()}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ backgroundColor: '#FDF8F2' }}
    />
  )
}

const styles = StyleSheet.create({
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingTop: 32,
    paddingBottom: 8
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
    marginBottom: 16
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