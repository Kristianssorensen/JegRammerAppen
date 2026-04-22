import { Text, View, StyleSheet, TextInput, Button, TouchableWithoutFeedback, Keyboard, Platform, TouchableOpacity } from 'react-native';
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


  const dismissKeyboard = () => {
    if (Platform.OS !== 'web' && Keyboard.dismiss) {
      Keyboard.dismiss();
    }
  };

  
  
  return (
    <TouchableWithoutFeedback onPress={dismissKeyboard} disabled={showPicker}>
      <View style={styles.background}>
        <View style={styles.container}>
          <Text style={styles.titel}>Opret Et Event</Text>
            <Text style={styles.headings}>Title:</Text>
            <TextInput
              style={styles.input}
              value={tekst}
              onChangeText={setTekst}
              placeholder="Skriv en titel til dit Event"
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
            <TouchableOpacity onPress={() => setShowPicker(true)} style={styles.timePicker}>
              <Text style={styles.timeText}>
                {time.toLocaleString('da-DK', { 
                  year: 'numeric', 
                  month: '2-digit', 
                  day: '2-digit', 
                  hour: '2-digit', 
                  minute: '2-digit' 
                })}
              </Text>
            </TouchableOpacity>
            {(Platform.OS === 'ios'|| Platform.OS === 'android' || showPicker) && (
              <DateTimePicker
                value={time}
                mode="datetime"
                is24Hour={true}
                display={Platform.OS === 'ios' ? 'default' : 'default'}
                onChange={(event, selectedDate) => {
                  if (event.type === 'set' && selectedDate) {
                    setTime(selectedDate);
                  }
                  if (Platform.OS === 'android') {
                    setShowPicker(false);
                  }
                }}
              />
            )}
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
    
  },
  timePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
  },
  timeText: {
    color: '#000',
    fontSize: 16,
  }
});
