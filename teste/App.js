import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { 
  StyleSheet, 
  TextInput, 
  View,
  Button,
  Alert,
  } from 'react-native';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      txtPeso: "",
      txtAltura: "",
    }
  }

  preenchimentoErrado = () =>{
    Alert.alert("Erro", "Preencha o campo corretamente.")
  }

  calcularIMC = (peso, altura) =>{
    return peso / (altura * altura);
  }

  categorizar = (imc) =>{
    if (imc < 18.5){
      return "Abaixo do peso.";
    }
    else if (imc < 25){
      return "Peso normal.";
    }
    else if (imc < 30){
      return "Acima do peso.";
    }
    else{
      return "Obesidade";
    }
  }

  calcular = () =>{
    const {txtPeso, txtAltura} = this.state;
    const peso = parseFloat(txtPeso);
    const altura = parseFloat(txtAltura);

    if (Number.isNaN(peso) || Number.isNaN(altura)){
     this.preenchimentoErrado();
    }   

    const imc = this.calcularIMC(peso, altura); 

    let categoria = this.categorizar(imc);

    const mensagem = `IMC = ${imc.toFixed(1)}\n${categoria}`;

    Alert.alert("Índice de Massa Corporal", mensagem);

  }

  render() {
    return (
      <View style={styles.container}>
        <TextInput 
          placeholder="Peso (kg)"
          style={styles.InputText} 
          value={this.state.txtPeso}
          onChangeText={text => this.setState({txtPeso: text})}  
        />
        <TextInput 
          placeholder="Altura (m)"
          style={styles.InputText}  
          value={this.state.txtAltura}
          onChangeText={text => this.setState({txtAltura: text})}  
        />
        <Button 
          style={styles.Botao}
          onPress={() => this.calcular()}
          title={"Calcular"}/>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  InputText: {
    bordercolor: 'gray',
    borderWidth: 1,
    height: 40,
    paddingHorizontal: 16,
    margin: 10,
    width: '80%', 
  },
  Botao: {
    width: '80%',
  },
});


