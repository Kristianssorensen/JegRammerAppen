import {
  Keyboard,
  Pressable, ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View
} from 'react-native';

import DateTimePicker from '@react-native-community/datetimepicker';
import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { db } from '../../firebaseConfig';


export default function Index() {
  const [title, setTitle,] = useState(''); 
  const [beskrivelse, setBeskrivelse,] = useState('')
  const [sted, setSted] = useState('')
  const [time, setTime] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);

  
  
  // funktion til upload til fire base 
  const uploadEvent = async () => {
    if (title.trim() === '') return; // gør ingenting hvis feltet er tomt
    await addDoc(collection(db, 'events'), {
    titel: title,
    beskrivelse: beskrivelse,
    Lokation: sted,
    oprettet: new Date(),
    tidspunkt: time,
    kategori: kategori,
  });
    // tømmer feltet efter upload
    setBeskrivelse('');
    setTitle(''); 
    setSted('');
    setTime(new Date());
    setKategori (null)
    //logger eventet til consolen
    console.log('Event uploadet!')
  };
 
  // til at lave katrgori propdown
  const kategorier = ['Mad 🍔', 'Gaming 🎮', 'Sport ⚽', 'Lektier 📚', 'Andet 🎉','Roadtrip 🏎️' ];
  const [kategori, setKategori] = useState<string | null>(null);
  const [visDropdown, setVisDropdown] = useState(false);

  const kategorifarver: Record<string, string> = {
  'Mad 🍔':     '#e67e22',
  'Gaming 🎮':  '#8e44ad',
  'Sport ⚽':   '#2980b9',
  'Lektier 📚': '#27ae60',
  'Andet 🎉':   '#e74c3c',
  'Roadtrip 🏎️': '#c517cb',
  };




  
  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View style={styles.background}>
        <View style={styles.contaner}>
          <Text style={styles.titel}>Opret Et Event</Text>
            <Text style={styles.headings}>Title:</Text>
              <TextInput
                style={styles.input}
                value={title}
                onChangeText={setTitle}
                placeholder="Skriv en title til dit Event"
              /> 

            <Text style={styles.headings}>Beskrivelse:</Text>
              <TextInput
                style={[styles.input, {height: 130}]}
                value={beskrivelse}
                onChangeText={setBeskrivelse}
                multiline
                placeholder="Skriv en kort beskrivelse"
                
              />

            <Text style={styles.headings}>Sted:</Text>
              <TextInput
                style={styles.input}
                value={sted}
                onChangeText={setSted}
                placeholder='hvor går det ned?'
              />
            
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
            
            <Pressable
              style={[styles.dropdown, { backgroundColor: kategori ? kategorifarver[kategori] : '#444' }]}
              onPress={() => setVisDropdown(!visDropdown)}
            >
          
            <Text style={{ color: 'white' }}>
              {kategori ?? 'Vælg kategori'}
            </Text>

            </Pressable>
            {visDropdown && (
              <ScrollView style={styles.dropdownListe}>
                {kategorier.map((k) => (
                  <Pressable
                    key={k}
                    style={[styles.dropdownItem, { backgroundColor: kategorifarver[k] }]}
                    onPress={() => {
                      setKategori(k);
                      setVisDropdown(false);
                    }}
                  >
                    <Text style={{ color: 'white' }}>{k}</Text>
                  </Pressable>
                ))}
              </ScrollView>
            )}
        </View>

        <View style={styles.padding}/>
        <Pressable style={styles.button} onPress={uploadEvent}>
            <Text style={styles.backText}>Opret dit event</Text>
        </Pressable>
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

  contaner:{
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
    borderColor: '#e3e3e3',
    borderRadius: 8,
    padding: 10,
    
  },
  button: {
    width: '80%',
    backgroundColor: '#1637aa',
    padding: 15,
    borderRadius: 20,
    alignItems: 'center',
  },
  dropdown: {
  padding: 12,
  borderRadius: 8,
  marginTop: 4,
  
  },

  dropdownItem: {
    padding: 12,
    marginBottom: 2,
    borderRadius: 6,
  },

  dropdownListe: {
  backgroundColor: '#1a1a2e',
  borderRadius: 10,
  marginTop: 4,
  maxHeight: 180, 
  padding: 4,
  minHeight: 100,
  zIndex: 999,
  },

 
  padding: {
    padding: 10,
  },
  backText: {
    color: 'white',
    fontWeight: '800',
    fontSize: 16,
  },
});
