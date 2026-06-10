import { useRouter } from 'expo-router';
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { FlatList, Pressable, StyleSheet, Text, View } from 'react-native';
import { db } from '../../firebaseConfig';

export default function HomeScreen() {
  const [events, setEvents] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const q = query(collection(db, 'events'), orderBy('oprettet', 'desc'));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const liste = snapshot.docs.map(doc => {
        const data = doc.data();
        return {
          id: doc.id,
          titel: data.titel,
          beskrivelse: data.beskrivelse,
          Lokation: data.Lokation,
          tidspunkt: data.tidspunkt,
          kategori: data.kategori,
          oprettet: data.oprettet,
        };
      });
      setEvents(liste)
    });

    return () => unsubscribe();
  }, []);

  const kategorifarver: Record<string, string> = {
    'Mad 🍔':     '#e67e22',
    'Gaming 🎮':  '#8e44ad',
    'Sport ⚽':   '#2980b9',
    'Lektier 📚': '#27ae60',
    'Andet 🎉':   '#e74c3c',
    'Roadtrip 🏎️': '#c517cb',
  };

  return (
    <View style={styles.Background}>
      <FlatList
        data={events}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => {
          const dato = item.tidspunkt?.toDate ? item.tidspunkt.toDate() : new Date(item.tidspunkt);
          const datoStreng = dato.toLocaleString('da-DK', {
            day: '2-digit',
            month: '2-digit',
          });
          return (
            <Pressable
              style={[styles.card, { backgroundColor: kategorifarver[item.kategori] || '#37a5c1' }]}
              onPress={() => router.push(`/event/${item.id}`)}
            >
              
              <Text style={styles.titel}>{item.titel}</Text>
              <Text style={styles.dato}>dato {datoStreng}</Text>
              <Text style={styles.kategori}>{item.kategori}</Text>
            </Pressable>
          )
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  Background: {
    flex: 1,
    backgroundColor: '#3e3a39',
    padding: 20,
    paddingTop: 60,
    paddingBottom: 0,
  },

  card: {
    padding: 25,
    paddingTop: 20,
    paddingBottom: 20,
    marginBottom: 16,
    borderRadius: 20,
  },

  kategori: {
    color: 'white',
    fontSize: 14,
    marginBottom: 6,
  },

  titel: {
    color: 'white',
    fontSize: 22,
    fontWeight: '900',
    marginBottom: 8,
  },

  dato: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
});
