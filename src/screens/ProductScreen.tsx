import React, {useEffect} from 'react';
import {Text, View, StyleSheet, Button} from 'react-native';
import {StackScreenProps} from '@react-navigation/stack';
import {ProductsStackParams} from '../navigator/ProductsNavigator';
import {ScrollView, TextInput} from 'react-native-gesture-handler';

interface Props
  extends StackScreenProps<ProductsStackParams, 'ProductScreen'> {}

export const ProductScreen = ({navigation, route}: Props) => {
  const {id = '', name = ''} = route.params;

  useEffect(() => {
    navigation.setOptions({
      title: name ? name : 'Nuevo Producto',
    });
  }, [name]);

  return (
    <View
      style={{
        marginHorizontal: 12,
        flex: 1,
      }}>
      <ScrollView>
        <Text style={styles.label}>Nombre del producto:</Text>
        <TextInput
          placeholder="Producto"
          style={styles.textInput}
          // value={nombre}
          // onChangeText={value => onChange(value, 'nombre')}
        />

        {/* Picker / Selector */}
        <Text style={styles.label}>Categoría:</Text>

        <View
          style={{
            flexDirection: 'row',
            justifyContent: 'center',
            marginTop: 10,
          }}>
          <Button title="Cámara" onPress={() => {}} color="#5856D6" />

          <View style={{width: 10}} />

          <Button title="Galería" onPress={() => {}} color="#5856D6" />
        </View>

        <Button title="Guardar" onPress={() => {}} color="#5856D6" />
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 10,
    marginHorizontal: 20,
  },
  label: {
    fontSize: 18,
  },
  textInput: {
    borderWidth: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 20,
    borderColor: 'rgba(0,0,0,0.2)',
    height: 45,
    marginTop: 5,
    marginBottom: 15,
  },
});
