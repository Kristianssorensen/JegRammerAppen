import { useLocalSearchParams, useRouter } from 'expo-router';
import { doc, getDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';
import { db } from '../../firebaseConfig';

const kategorifarver: Record<string, string> = {
  'Mad 🍔':     '#e67e22',
  'Gaming 🎮':  '#8e44ad',
  'Sport ⚽':   '#2980b9',
  'Lektier 📚': '#27ae60',
  'Andet 🎉':   '#e74c3c',
};

export default function EventScreen() {
  const { id } = useLocalSearchParams();
  const router = useRouter();
  const [event, setEvent] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        const docRef = doc(db, 'events', id as string);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setEvent({ id: docSnap.id, ...docSnap.data() });
        } else {
          setError(true);
        }
      } catch (e) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };
    fetchEvent();
  }, [id]);

  const formatDate = (timestamp: any) => {
    if (!timestamp) return 'Ukendt';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleString('da-DK', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#2ec7d8" />
      </View>
    );
  }

  if (error || !event) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Event findes ikke!</Text>
        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backText}>Tilbage</Text>
        </Pressable>
      </View>
    );
  }

  return (
    <View style={styles.background}>
      <View style={[styles.card, { backgroundColor: kategorifarver[event.kategori] || '#37a5c1' }]}>
        <Text style={styles.titel}>{event.titel}</Text>
        <Text style={styles.kategori}>{event.kategori}</Text>

        <View style={styles.infoBox}>
          <Text style={styles.heading}>Beskrivelse:</Text>
          <Text style={styles.text}>{event.beskrivelse}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.heading}>Sted:</Text>
          <Text style={styles.text}>{event.Lokation}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.heading}>Tidspunkt:</Text>
          <Text style={styles.text}>{formatDate(event.tidspunkt)}</Text>
        </View>

        <View style={styles.infoBox}>
          <Text style={styles.heading}>Oprettet:</Text>
          <Text style={styles.text}>{formatDate(event.oprettet)}</Text>
        </View>
      </View>

      <Pressable style={styles.backButton} onPress={() => router.back()}>
        <Text style={styles.backText}>Tilbage til feed</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#3e3a39',
    padding: 20,
    paddingTop: 60,
  },
  center: {
    flex: 1,
    backgroundColor: '#3e3a39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    padding: 30,
    borderRadius: 20,
    marginBottom: 20,
  },
  titel: {
    color: 'white',
    fontSize: 28,
    fontWeight: '900',
    marginBottom: 8,
  },
  kategori: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  infoBox: {
    marginBottom: 16,
  },
  heading: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
    marginBottom: 4,
  },
  text: {
    color: 'white',
    fontSize: 16,
  },
  errorText: {
    color: 'white',
    fontSize: 18,
    marginBottom: 20,
  },
  backButton: {
    backgroundColor: '#1637aa',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  backText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});
