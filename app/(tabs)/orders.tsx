//import { Image } from 'expo-image'
import { IconSymbol } from '@/components/ui/IconSymbol'
import React from 'react'
import { FlatList, Image, StyleSheet, Text, View } from 'react-native'

const ordersData = [
  {
    id: '1',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
    number: '12345',
    date: '24-01-15',
    desc: '1 latte, 1 donut',
    price: '$5.50',
  },
  {
    id: '2',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    number: '67890',
    date: '24-01-14',
    desc: '2 cappuccinos',
    price: '$11.00',
  },
  {
    id: '3',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    number: '11223',
    date: '24-01-13',
    desc: '1 espresso',
    price: '$3.00',
  },
  {
    id: '4',
    image: 'https://images.unsplash.com/photo-1465101046530-73398c7f28ca?auto=format&fit=crop&w=400&q=80',
    number: '44556',
    date: '24-01-12',
    desc: '1 iced coffee',
    price: '$4.00',
  },
  {
    id: '5',
    image: 'https://images.unsplash.com/photo-1464983953574-0892a716854b?auto=format&fit=crop&w=400&q=80',
    number: '77889',
    date: '24-01-11',
    desc: '2 americanos',
    price: '$8.00',
  },
  {
    id: '6',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    number: '99001',
    date: '24-01-10',
    desc: '1 mocha',
    price: '$6.00',
  },
  {
    id: '7',
    image: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=400&q=80',
    number: '22334',
    date: '24-01-09',
    desc: '1 cold brew',
    price: '$4.50',
  },
  {
    id: '8',
    image: 'https://images.unsplash.com/photo-1504674900247-0877df9cc836?auto=format&fit=crop&w=400&q=80',
    number: '55667',
    date: '24-01-08',
    desc: '2 macchiatos',
    price: '$9.00',
  },
  {
    id: '9',
    image: 'https://images.unsplash.com/photo-1511920170033-f8396924c348?auto=format&fit=crop&w=400&q=80',
    number: '88990',
    date: '24-01-07',
    desc: '1 Flat white, 2 Croissant, more...',
    price: '$25.00',
  },
  {
    id: '10',
    image: 'https://images.unsplash.com/photo-1519125323398-675f0ddb6308?auto=format&fit=crop&w=400&q=80',
    number: '11223',
    date: '24-01-06',
    desc: '1 cortado',
    price: '$3.50',
  },
]

export default function OrdersScreen() {
  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.headerContainer}>
        <Text style={styles.headerText}>Order History</Text>
        <IconSymbol name="search" size={32} color="#222" />
      </View>
      <FlatList
        data={ordersData}
        keyExtractor={item => item.id}
        contentContainerStyle={{ paddingBottom: 16 }}
        renderItem={({ item }) => (
          <View style={styles.orderRow}>
            <Image source={{ uri: item.image }} style={styles.orderImage} />
            <View style={styles.orderInfo}>
              <Text style={styles.orderNumber}>Order #{item.number}</Text>
              <Text style={styles.orderDate}>Order Date: {item.date}</Text>
              <Text style={styles.orderDesc}>{item.desc}</Text>
            </View>
            <Text style={styles.orderPrice}>{item.price}</Text>
          </View>
        )}
        showsVerticalScrollIndicator={false}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FDF8F2',
    paddingTop: 32,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    marginBottom: 8,
  },
  headerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#222',
  },
  orderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  orderImage: {
    width: 56,
    height: 56,
    borderRadius: 12,
    marginRight: 12,   backgroundColor: '#eee',
  },
  orderInfo: {
    flex: 1,
    justifyContent: 'center',
  },
  orderNumber: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
  },
  orderDate: {
    fontSize: 13,
    color: '#8a8a8a',
    marginTop: 1,
  },
  orderDesc: {
    fontSize: 13,
    color: '#8a8a8a',
    marginTop: 1,
  },
  orderPrice: {
    fontSize: 15,
    fontWeight: 'bold',
    color: '#222',
    marginLeft: 8,
  },
})