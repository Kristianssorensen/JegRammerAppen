import { Text, View, StyleSheet, TextInput, Button } from 'react-native';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';





export default function Index() {
  const [tekst, setTekst] = useState(''); 
  // funktion til upload til fire base 
  const uploadEvent = async () => {
    if (tekst.trim() === '') return; // gør ingenting hvis feltet er tomt
    await addDoc(collection(db, 'events'), {
      titel: tekst,
      oprettet: new Date(),
    });
    setTekst(''); // tømmer feltet efter upload
    console.log('Event uploadet!')
  };

  return (
    <View style={styles.container}>
        <TextInput
          style={styles.input}
          value={tekst}
          onChangeText={setTekst}
          placeholder="Hvad sker der?"
        />
        <Button title="Upload" onPress={uploadEvent} /> 
    </View>
  );
}


//style sheet
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#ccc',
  }
});
