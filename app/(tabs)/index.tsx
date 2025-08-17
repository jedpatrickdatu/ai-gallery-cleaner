import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import { Stack } from 'expo-router';
import { useState } from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

export default function HomeScreen() {
  const [images, setImages] = useState<string[]>([]);

  const pickImages = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: 'images',
      allowsEditing: false,
      allowsMultipleSelection: true,
      // aspect: [4, 3],
      // quality: 1,
    });

    console.log(result);

    if (!result.canceled) {
      setImages(result.assets.map(asset => asset.uri));
    }
  };

  return (
    <>
      <Stack.Screen options={{title: 'Image Picker'}} />
      <View style={styles.container}>
        <Text style={styles.title}>Item Image</Text>
        <Text style={styles.title}>Selected Images: {images.length}</Text>
        <TouchableOpacity style={styles.imagePicker} onPress={pickImages}>
          {images.length > 0 ? (
            <View>
              {images.map((img) =>
                <Image key={img} source={{ uri: img }} style={styles.previewImage} />
              )}
            </View>
          ) : (
            <View style={styles.placeholderContainer}>
              <Ionicons name="image-outline" size={40} color={'#39E46'} />
              <Text style={styles.placeholderText}>Select images</Text>
            </View>
          )}
        </TouchableOpacity>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  imagePicker: {
    width: '100%',
    height: 200,
    backgroundColor: '#FAF6E9',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#F0BB78',
    overflow: 'hidden',
  },
  placeholderContainer: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  placeholderText: {
    color: '#393E46',
    marginTop: 8,
  },
  previewImage: {
    width: '100%',
    height: '100%',
  },
});
