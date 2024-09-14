import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, FlatList, TouchableOpacity, Image, Alert } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import Collapsible from '@/components/Collapsible';



// Asegúrate de que la ruta sea correcta

// Estructura de datos para los vehículos
interface Vehicle {
  id: string;
  plate: string;
  brand: string;
  owner: string;
  location: string;
  time: string;
  images: string[];
  isFound: boolean;
}

export default function ExploreScreen() {
  const [vehicles, setVehicles] = useState<Vehicle[]>([]); // Lista de vehículos
  const [foundVehicles, setFoundVehicles] = useState<Vehicle[]>([]); // Lista de vehículos encontrados
  const [newVehicle, setNewVehicle] = useState<Partial<Vehicle>>({
    plate: '',
    brand: '',
    owner: '',
    location: '',
    time: '',
    images: [],
  }); // Formulario de nuevo vehículo

  // Función para agregar un nuevo vehículo robado
  const addNewVehicle = () => {
    if (!newVehicle.plate || !newVehicle.brand || !newVehicle.owner || !newVehicle.location || !newVehicle.time) {
      Alert.alert('Error', 'Por favor, completa todos los campos.');
      return;
    }

    const vehicle: Vehicle = {
      id: Math.random().toString(),
      ...newVehicle,
      images: newVehicle.images || [],
      isFound: false,
    } as Vehicle;

    setVehicles([...vehicles, vehicle]);
    setNewVehicle({ plate: '', brand: '', owner: '', location: '', time: '', images: [] });
    Alert.alert('Vehículo registrado', 'El vehículo ha sido registrado exitosamente.');
  };

  // Función para seleccionar una imagen
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setNewVehicle((prev) => ({
        ...prev,
        images: [...(prev.images || []), result.assets[0].uri],
      }));
    }
  };

  // Marcar un vehículo como encontrado
  const markAsFound = (id: string) => {
    const updatedVehicles = vehicles.map((vehicle) =>
      vehicle.id === id ? { ...vehicle, isFound: true } : vehicle
    );
    setVehicles(updatedVehicles);
    setFoundVehicles(updatedVehicles.filter((vehicle) => vehicle.isFound));
  };

  // Renderizar la lista de vehículos robados
  const renderVehicleItem = ({ item }: { item: Vehicle }) => (
    <Collapsible title={`Placa: ${item.plate}`}>
      <View style={styles.vehicleDetails}>
        <Image source={{ uri: item.images[0] }} style={styles.vehicleImage} />
        <Text>Marca: {item.brand}</Text>
        <Text>Nombre del dueño: {item.owner}</Text>
        <Text>Última localización: {item.location}</Text>
        <Text>Hora del robo: {item.time}</Text>
        {!item.isFound && (
          <TouchableOpacity onPress={() => markAsFound(item.id)}>
            <Text style={styles.markAsFound}>Marcar como encontrado</Text>
          </TouchableOpacity>
        )}
      </View>
    </Collapsible>
  );

  return (
    <View style={styles.container}>
      {/* Formulario de registro de vehículo robado */}
      <Text style={styles.title}>Registrar Vehículo Robado</Text>
      <TextInput
        style={styles.input}
        placeholder="Placa"
        value={newVehicle.plate}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, plate: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Marca"
        value={newVehicle.brand}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, brand: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Nombre del dueño"
        value={newVehicle.owner}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, owner: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Última localización"
        value={newVehicle.location}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, location: text })}
      />
      <TextInput
        style={styles.input}
        placeholder="Hora del robo"
        value={newVehicle.time}
        onChangeText={(text) => setNewVehicle({ ...newVehicle, time: text })}
      />
      <Button title="Seleccionar Imágenes" onPress={pickImage} />
      <Button title="Registrar Vehículo" onPress={addNewVehicle} />

      {/* Lista de vehículos robados */}
      <Text style={styles.subtitle}>Vehículos Robados</Text>
      <FlatList
        data={vehicles.filter((vehicle) => !vehicle.isFound)}
        keyExtractor={(item) => item.id}
        renderItem={renderVehicleItem}
      />

      {/* Lista de vehículos encontrados */}
      <Text style={styles.subtitle}>Vehículos Encontrados</Text>
      <FlatList
        data={foundVehicles}
        keyExtractor={(item) => item.id}
        renderItem={renderVehicleItem}
      />
    </View>
  );
}

// Estilos para la pantalla
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    marginVertical: 16,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
  },
  vehicleDetails: {
    padding: 8,
  },
  vehicleImage: {
    width: 100,
    height: 100,
    marginBottom: 8,
  },
  markAsFound: {
    color: 'blue',
    marginTop: 4,
  },
});
