import React, { useState } from 'react'
import { StyleSheet, Text, View, TextInput, TouchableOpacity, Alert } from 'react-native'
import ClienteServico from '../servico/cliente_servico'
import Icon from 'react-native-vector-icons/Ionicons'
import { Cliente } from '../modelo/cliente'


// métodos da home

export default class App extends React.Component {

    constructor(props) {
        super(props);
        this.findAllCliente()
    }

    state = {
        cliente: Cliente,
        lista_array_dados_cliente: [],
        value: null,
        Id_pesquisar: null,
        onChangeText: null,
        formularioId: null,
        formularioNome: null,
        formularioSobrenome: null,
        formularioEmail: null,
        formularioSenha: null,
        formularioTelefone: null
    }

    //acionado quando o componente e montado
    componentDidMount() {
        this.instanciarCliente();
        this.findAllCliente();
    }

    //escuta atualizações na lista
    componentDidUpdate(prevProps, prevState) {
        if (prevState.lista_array_dados_cliente !== this.state.lista_array_dados_cliente) {
            this.findAllCliente();
        }
    }

    findAllCliente = () => {
        ClienteServico.findAll()
            .then((response: any) => {
                this.setState({
                    lista_array_dados_cliente: response._array,
                    isLoading: false,
                })
            }), (error) => {
                console.log(error);
            }
    }


    deleteCliente = (id) => {
        this.findClienteById(id)
        if (this.state.formularioId != null || this.state.formularioId != undefined) {
            ClienteServico.deleteById(id)
            Alert.alert("Cliente excluido gigatônicamente: ")
        }
    }

    atualizaCliente = (item0, item1, item2, item3, item4, item5) => {
        let cliente = new Cliente()// cria objeto memória
        cliente.id = item0 // seta o atributo id do objeto 
        cliente.nome = item1 // seta o atributo nome do objeto 
        cliente.sobrenome = item2 // seta o atributo sobrenome do objeto 
        cliente.email = item3 // seta o atributo email do objeto 
        cliente.senha = item4 // seta o atributo senha do objeto 
        cliente.telefone = item5 // seta o atributo telefone do objeto 
        // com o valor(state) do item

        ClienteServico.updateByObjeto(cliente).then((response: any) => {
            if (response._array.length > 0 && response != null && response != undefined) {
                // popular o objeto da memória
                Alert.alert("Atualizado");

            } else {
                Alert.alert("Nome não encontrado")
            }
        }), (error) => {
            console.log(error);
        }
    }


    insertCliente = (item1, item2, item3, item4, item5) => {
        let cliente = new Cliente()// cria objeto memória
        cliente.nome = item1 // seta o atributo nome do objeto 
        cliente.sobrenome = item2 // seta o atributo sobrenome do objeto 
        cliente.email = item3 // seta o atributo email do objeto 
        cliente.senha = item4 // seta o atributo senha do objeto 
        cliente.telefone = item5 // seta o atributo telefone do objeto 
        // com o valor(state) do item

        // cria um id no banco para persistir o objeto
        const insertId = ClienteServico.addData(cliente);
        // testa pra ver se deu certo a criação do id
        if (insertId == null || insertId == undefined) {
            Alert.alert("Não foi possivel inserir o novo Cliente")
        }
        return cliente
    }

    instanciarCliente = () => {
        let cliente: Cliente = new Cliente()// cria objeto memória
        return cliente
    }



    findClienteById = (id) => {
        ClienteServico.findById(id)
            .then((response: any) => {
                if (response._array.length > 0 && response != null && response != undefined) {
                } else {
                    Alert.alert("id é um segredo gigatônico e não pode ser encontrado")
                }
            }), (error) => {
                console.log(error);
            }
    }

    localizaCliente = (id) => {
        ClienteServico.findById(id)
            .then((response: any) => {
                if (response._array.length > 0 && response != null && response != undefined) {
                    let clientePesquisa: Cliente = new Cliente()// cria objeto memória
                    const clienteRetorno = response._array.map((item, key) => {
                        clientePesquisa.id = item.id;
                        clientePesquisa.nome = item.nome;
                        clientePesquisa.sobrenome = item.sobrenome;
                        clientePesquisa.email = item.email;
                        clientePesquisa.senha = item.senha;
                        clientePesquisa.telefone = item.telefone;
                    })
                    // o SetState abaixo mostra para o usuário o objeto recuperado do banco
                    // e atualmente somente em memória 

                    this.setState({
                        cliente: clientePesquisa,
                        formularioId: clientePesquisa.id,
                        formularioNome: clientePesquisa.nome,
                        formularioSobrenome: clientePesquisa.sobrenome,
                        formularioEmail: clientePesquisa.email,
                        formularioSenha: clientePesquisa.senha,
                        formularioTelefone: clientePesquisa.telefone,
                    })
                    // popular o objeto da memória
                    //Alert.alert("Atualizado"); 
                } else {
                    Alert.alert("Nome Não foi possível atualizar")
                }
            }), (error) => {
                console.log(error);
            }
    }


    // fim da parte de funções
    // agora é necessário passar os parametros para a visão através de renderização



    // aqui temos a renderização da tela (visão)
    render() {

        //extrai as propriedades entre chaves
        const { cliente, lista_array_dados_cliente, value, Id_pesquisar, formularioId, formularioNome, formularioSobrenome, formularioEmail, formularioSenha, formularioTelefone } = this.state;
        // se tivermos animais listados oriundos do banco
        // a lista é mostrada na visão
        //const {animal}=animal;

        const clienteList = lista_array_dados_cliente.map((item, key) => {
            return (
                <>
                    <Text >id:{item.id} nome:{item.nome} sobrenome:{item.sobrenome} email:{item.email} senha:{item.senha} telefone:{item.telefone}</Text>
                </>
            )
        })

        return (

            <View style={styles.container}>

                <Text style={{ fontSize: 20, paddingBottom: 20 }}>Crud de Clientes</Text>

                <TextInput
                    placeholder="Insira o ID a ser pesquisado..."
                    style={styles.textInput}
                    onChangeText={Id_pesquisar => { this.setState({ Id_pesquisar: Id_pesquisar }) }}
                    value={Id_pesquisar}
                />

                <Text>{formularioId}</Text>


                <TextInput
                    placeholder="Digite seu nome..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioNome => { this.setState({ formularioNome: formularioNome }) }}
                    value={formularioNome}
                />

                <TextInput
                    placeholder="Digite seu sobrenome..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioSobrenome => { this.setState({ formularioSobrenome: formularioSobrenome }) }}
                    value={formularioSobrenome}
                />

                <TextInput
                    placeholder="Digite seu email..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioEmail => { this.setState({ formularioEmail: formularioEmail }) }}
                    value={formularioEmail}

                />

                <TextInput
                    placeholder="Digite sua senha..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioSenha => { this.setState({ formularioSenha: formularioSenha }) }}
                    value={formularioSenha}
                />

                <TextInput
                    placeholder="Digite seu telefone..."
                    style={styles.textInput}
                    // a cada letra digitada (change) ajusta o state
                    onChangeText={formularioTelefone => { this.setState({ formularioTelefone: formularioTelefone }) }}
                    value={formularioTelefone}

                />

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioNome == null ? Alert.alert("O campo de nome não pode estar vazio.") : this.insertCliente(formularioNome, formularioSobrenome, formularioEmail, formularioSenha, formularioTelefone) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-add" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("Não há objeto para ser atualizado, certifique-se de realizar uma pesquisa antes de tentar atualizar.") : this.atualizaCliente(formularioId, formularioNome, formularioSobrenome, formularioEmail, formularioSenha, formularioTelefone) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-refresh" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { Id_pesquisar == null ? Alert.alert("Certifique-se de que digitou um ID para ser pesquisado.") : this.localizaCliente(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-search" size={30} color="white" />
                    </TouchableOpacity>
                </View>

                <View style={styles.containerTouch}>
                    <TouchableOpacity onPress={() => { formularioId == null ? Alert.alert("O campo de id não pode estar vazio.") : this.deleteCliente(Id_pesquisar) }} style={{ alignItems: "center", backgroundColor: 'green' }}>
                        <Icon name="md-remove" size={30} color="white" />
                    </TouchableOpacity>
                </View>
                {clienteList}
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

    textInput: {
        alignItems: "center",
        width: 200,
        height: 40,
        borderColor: 'gray',
        borderWidth: 1
    },
    containerTouch: {
        width: 200,
        padding: 10
    }
});