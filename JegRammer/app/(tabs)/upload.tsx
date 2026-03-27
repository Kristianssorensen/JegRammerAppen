import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { useState } from 'react';
import { collection, addDoc } from 'firebase/firestore';
import { db } from '../../firebaseConfig';
import DateTimePicker from '@react-native-community/datetimepicker'; 

export default function Index() {
  const [tekst, setTekst] = useState(''); 
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  
  
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
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.titel}>Opret Et Event</Text>
            <Text style={styles.headings}>Title:</Text>
            <TextInput
              style={styles.input}
              value={tekst}
              onChangeText={setTekst}
              placeholder="Skriv en title til dit Event"
            /> 
            <Text style={styles.headings}>Beskrivelse:</Text>
            <TextInput
              style={[styles.input, {height: 130}]}
              multiline
              //tilføj en value til upload funktionen
              placeholder="Skriv en kort beskrivelse"
            />

            <Text style={styles.headings}>Sted:</Text>
            
            
            <Text style={[styles.headings,{paddingBottom: 5}]}>Hvornår:</Text>
                <DateTimePicker
                  value={time}
                  mode="datetime"
                  is24Hour={true}
                  onChange={(event, selectedDate) => {
                    if (!selectedDate) return;
                    setShowPicker(false);
                    setTime(selectedDate);
                  }}
                />
            <Text style={styles.headings}>Kategori:</Text>
           
            
            
          <Button title="Upload" onPress={uploadEvent} /> 
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
}


//style sheet
const styles = StyleSheet.create({
  background: {
    flex: 1,
    backgroundColor: '#25292e',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 50,
  },
  container:{
    backgroundColor: '#2ec7d8',
    height: '80%',
    width: '80%',
    padding: 20,
    borderRadius: 20,
    
  },
  headings:{
    color: 'white',
    padding: 5,
    paddingTop: 20,
    fontWeight: '800',


  },
  titel:{
    color: 'white',
    fontWeight: '900',
    fontSize: 25,
    alignSelf: 'center',

  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    color: '#ccc',
    
  }
});
