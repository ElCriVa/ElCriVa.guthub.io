import React, { useState, useEffect, useLayoutEffect } from 'react';
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

function LoginScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = () => {
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) || password.trim() === '') {
      setError('Please enter a valid email and password.');
    } else {
      navigation.navigate('Home');
    }
  };

  const handleRegistration = () => {
    navigation.navigate('Registration');
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCompleteType="email"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter email"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCompleteType="password"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter password"
      />

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Log In</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>

    </View>
  );
}

function RegistrationScreen({ navigation }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleRegistration = () => {
    if (!email.match(/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/) || password.trim() === '') {
      setError('Please enter a valid email and password');
    } else {
      navigation.navigate('Login');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Email</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCompleteType="email"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter email"
      />

      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        autoCompleteType="password"
        autoCapitalize="none"
        autoCorrect={false}
        placeholder="Enter password"
      />

      <TouchableOpacity style={styles.button} onPress={handleRegistration}>
        <Text style={styles.buttonText}>Register</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      <Text style={styles.error}>{error}</Text>

    </View>
  );
}

function HomeScreen({ navigation, route }) {
  const [entries, setEntries] = useState([]);

  const handleNewEntry = () => {
    navigation.navigate('NewEntry');
  };

  useLayoutEffect(() => {
    navigation.setOptions({
      title: 'Entries',
      headerRight: () => (
        <TouchableOpacity style={styles.addButton} onPress={() => navigation.navigate('NewEntry')}>
          <Text style={styles.buttonText}>New entry</Text>
        </TouchableOpacity>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    if (route.params?.title) {
      const newEntry = { title: route.params.title };
      setEntries(prevEntries => [...prevEntries, newEntry]);
    }
  }, [route.params?.title]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Entries</Text>
      {entries.map(entry => (
        <Text style={styles.entryTitle} key={entry.title}>
          {entry.title}
        </Text>
      ))}
      <TouchableOpacity style={styles.button} onPress={handleNewEntry}>
        <Text style={styles.buttonText}>New entry</Text>
      </TouchableOpacity>
    </View>
  );
}

function NewEntryScreen({ navigation }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [error, setError] = useState(null);

  const handleSave = () => {
    if (!title) {
      setError('Please enter a title.');
      return;
    }

    const newEntry = { title, body };
    navigation.navigate('Home', { title: newEntry.title });
  };

  const handleCancel = () => {
    navigation.navigate('Home');
  };

  useEffect(() => {
    navigation.setOptions({ title: 'New Entry' });
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Title</Text>
      <TextInput style={styles.input} value={title} onChangeText={setTitle} />

      <Text style={styles.label}>Body</Text>
      <TextInput style={[styles.input, styles.textarea]} value={body} onChangeText={setBody} multiline />

      <TouchableOpacity style={styles.button} onPress={handleSave}>
        <Text style={styles.buttonText}>Save</Text>
      </TouchableOpacity>
      <TouchableOpacity style={[styles.button, styles.cancelButton]} onPress={handleCancel}>
        <Text style={styles.buttonText}>Cancel</Text>
      </TouchableOpacity>

      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
}


const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Registration" component={RegistrationScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="NewEntry" component={NewEntryScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    backgroundColor: '#EBEBE4',
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#706993',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
    width: '100%',
    fontSize: 16,
    backgroundColor: '#BEBBC6',
  },
  button: {
    backgroundColor: '#A0C1B9',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  title: {
    fontSize: 35,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#706993',
  },
  entryTitle: {
    fontSize: 22,
    marginBottom: 5,
    color: '#706993',
    fontWeight: 'bold',
  },
  textarea: {
    height: 150,
    textAlignVertical: 'top',
  },
  cancelButton: {
    backgroundColor: '#A0C1B9',
  },
});
