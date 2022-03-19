import * as React from 'react';
import {Text, TouchableOpacity, TextInput, View, StyleSheet, StatusBar} from 'react-native';
import meuestilo from '../src/meuestilo';

export default class App extends React.Component{
  state = {
    valor1:0.0,
    valor2:0.0,
    resultado:0.0
  }

  atualizaValor1=(number)=>{
    this.setState({valor1:number})
  }

  atualizaValor2=(number)=>{
    this.setState({valor2:number})
  }

  soma(){
    this.state.resultado=parseFloat(this.state.valor1)+parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }

  subtrai(){
    this.state.resultado=parseFloat(this.state.valor1)-parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }

  multiplica(){
    this.state.resultado=parseFloat(this.state.valor1)*parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }

  divide(){
    this.state.resultado=parseFloat(this.state.valor1)/parseFloat(this.state.valor2);
    alert(this.state.resultado);
  }

  render(){
    return(
      <View style={meuestilo.container}>
        <StatusBar backgroundColor="black"></StatusBar>
        <TextInput style={meuestilo.input} underlineColorAndroid="transparent" placeholder="Digite o Valor 1" placeholderTextColor="black" autoCapitalize="none" onChangeText={this.atualizaValor1} keyboardType='numeric'/>

        <TextInput style={meuestilo.input} underlineColorAndroid="transparent" placeholder="Digite o Valor 2" placeholderTextColor="black" autoCapitalize="none" onChangeText={this.atualizaValor2} keyboardType='numeric'/>
      
        <TouchableOpacity style={meuestilo.submitButton} onPress={()=>this.soma(this.state.valor1,this.state.valor2,this.state.resultado)}>
          <Text style={meuestilo.submitButtonText}>
            Somar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={meuestilo.submitButton} onPress={()=>this.subtrai(this.state.valor1,this.state.valor2,this.state.resultado)}>
          <Text style={meuestilo.submitButtonText}>
            Subtrair
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={meuestilo.submitButton} onPress={()=>this.multiplica(this.state.valor1,this.state.valor2,this.state.resultado)}>
          <Text style={meuestilo.submitButtonText}>
            Multiplicar
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={meuestilo.submitButton} onPress={()=>this.divide(this.state.valor1,this.state.valor2,this.state.resultado)}>
          <Text style={meuestilo.submitButtonText}>
            Dividir
          </Text>
        </TouchableOpacity>
      </View>
    )
  }

}