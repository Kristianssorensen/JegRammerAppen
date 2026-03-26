import { useEffect, useState, } from 'react';
import { View, FlatList, Text, StyleSheet } from 'react-native';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { db } from '../../firebaseConfig';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('oprettet', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liste = snapshot.docs.map(doc => ({
        id: doc.id,
        titel: doc.data().titel,
      }));
      setEvents(liste);
    });
    return () => unsubscribe();
  }, []);


  return (
  <View style={styles.container}>
    <FlatList

      data={events}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <View style={styles.textContainer}>
        <Text>{item.titel}</Text>
        </View>
      )}
    />
  </View>
  );
}

 const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#3e3a39',
    padding: 20,
    paddingTop: 60,
  }, 
  
  textContainer:{
    backgroundColor: '#37a5c1',
    padding: 30,
    paddingTop: 50,
    paddingBottom: 50,
    marginBottom: 20,
    borderRadius: 20,
    
  },
});
