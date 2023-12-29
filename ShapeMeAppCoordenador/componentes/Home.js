// Importações de bibliotecas e componentes necessários para construir a tela
import React, { useState, useEffect } from "react"
import { Text, TouchableOpacity, View, SafeAreaView, StyleSheet, Animated } from 'react-native'
import estilo from "./estilo" // Estilos personalizados
import Logo from "./Logo" // Componente de logo
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Ícone da comunidade de materiais
import { MaterialIcons } from '@expo/vector-icons'; // Ícones materiais
import { collection, getDocs, getFirestore } from "firebase/firestore"; // Integração com Firestore
import { firebase, firebaseBD } from './configuracoes/firebaseconfig/config' // Configurações do Firebase
import { Ionicons } from '@expo/vector-icons'; // Ícones Ionicons
import { Entypo } from '@expo/vector-icons'; // Ícones Entypo
import { AntDesign } from '@expo/vector-icons'; // Ícones AntDesign
import { Foundation } from '@expo/vector-icons'; // Ícones Foundation
import { Coordenador } from "../classes/Coordenador"; // Classe Coordenador
import { Endereco } from "../classes/Endereco"; // Classe Endereco
import Spinner from 'react-native-loading-spinner-overlay'; // Spinner de carregamento
import NetInfo from "@react-native-community/netinfo" // Verificação de conexão de rede

// Instâncias globais de Professor e Endereco
const coordenadorLogado = new Coordenador('', '', '', '', '', '', '')
const enderecoCoordenador = new Endereco('', '', '', '', '', '', '')

// Exportação das instâncias globais
export { coordenadorLogado, enderecoCoordenador }

// Componente funcional que representa a tela principal após o login do professor
export default ({ navigation }) => {
    const [carregando, setCarregando] = useState(true) // Estado de carregamento inicial
    
    const [conexao, setConexao] = useState(true); // Estado para verificar a conexão de rede

    // Efeito colateral para verificar a conexão de rede ao carregar o componente
    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])

    // Efeito colateral para buscar dados do coordenador ao carregar o componente
    useEffect(() => {
        const fetchCoordenadorData = () => {
            try {
                const user = firebase.auth().currentUser;
                const email = user.email;
                const academiaRef = collection(firebaseBD, "Academias");

                const querySnapshot = getDocs(academiaRef);
                for (const academiaDoc of querySnapshot.docs ) {
                    const academiaNome = academiaDoc.get("nome");
                    const coordenadorNome = coordenadorDoc.get('nome');
                    const coordenadorRef = collection(firebaseBD, "Academias", academiaNome , "Coordenador", coordenadorNome);

                    const coordenadorSnapshot = getDocs(coordenadorRef);
                    for (const coordenadorDoc of coordenadorSnapshot.docs) {
                        if (email == coordenadorDoc.get("email")) {
                            const coordenadorData = coordenadorDoc.data();
                            coordenadorLogado.setNome(coordenadorData.nome);
                            coordenadorLogado.setEmail(coordenadorData.email);
                            coordenadorLogado.setSenha(coordenadorData.senha)
                            coordenadorLogado.setDataNascimento(coordenadorData.dataNascimento);
                            coordenadorLogado.setSexo(coordenadorData.sexo);
                            coordenadorLogado.setProfissao(coordenadorData.profissao);
                            coordenadorLogado.setCpf(coordenadorData.cpf);
                            coordenadorLogado.setTelefone(coordenadorData.telefone);
                            enderecoCoordenador.setBairro(coordenadorData.endereco.bairro)
                            enderecoCoordenador.setCep(coordenadorData.endereco.cep)
                            enderecoCoordenador.setCidade(coordenadorData.endereco.cidade)
                            enderecoCoordenador.setEstado(coordenadorData.endereco.estado)
                            enderecoCoordenador.setRua(coordenadorData.endereco.rua)
                            enderecoCoordenador.setNumero(coordenadorData.endereco.numero)
                            coordenadorLogado.setAcademia(coordenadorData.academia)
                        }
                    }
                }
            } catch (error) {
                console.log(error);
            }
        };
        fetchCoordenadorData()

        setCarregando(false)
    }, []);

    // Renderização condicional enquanto estiver carregando
    if (carregando) {
        return (
            <Spinner
                visible={carregando}
                textContent={'Carregando...'}
                textStyle={[estilo.textoCorLight, estilo.textoP16px]}
            />
        )
    }

    // Renderização da interface da tela principal
    return (
        <SafeAreaView style={[estilo.corLightMenos1, style.container]}>
            <View style={style.areaLogo}>
                <Logo />
            </View>
            <View style={style.areaFrase}>
                <Text style={[estilo.textoCorSecundaria, estilo.tituloH427px, estilo.centralizado]}>
                    Boas vindas {carregando ? coordenadorLogado.getNome() : 'Coordenador'}!
                </Text>
            </View>
            <View style={style.areaBotoes}>
                {/* Botão para acessar turmas */}
                <View style={style.containerBotao}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('')}>
                        <Foundation name="clipboard-pencil" size={120} color="white" />
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>TURMAS</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão para análise do programa de treino */}
                <View style={style.containerBotao}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('')}>
                        <View style={[style.iconeBotao]}>
                            <MaterialCommunityIcons name="clipboard-text-search-outline" size={120} color="white" />
                        </View>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>ACADEMIA</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.areaBotoes}>
                {/* Botão para evolução do treino */}
                <View style={style.containerBotao}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('')}>
                        <View style={[style.iconeBotao]}>
                            <AntDesign name="linechart" size={120} color="white" />
                        </View>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>LISTA ALUNOS</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão para realizar avaliação */}
                <View style={[style.containerBotao]}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => { navigation.navigate('') }}>
                        <View style={[style.iconeBotao]}>
                            <MaterialCommunityIcons name="clipboard-list-outline" size={120} color="white" />
                        </View>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>LISTA PROFESSORES</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <View style={style.areaBotoes}>
                {/* Botão para dados de treino */}
                <View style={style.containerBotao}>
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate("")}>
                        <View style={[{ transform: [{ rotate: '-45deg' }] }, style.iconeBotao]}>
                            <Ionicons name="barbell-outline" size={120} color="white" />
                        </View>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>EXERCICIOS</Text>
                    </TouchableOpacity>
                </View>

                {/* Botão para mensagens */}
                <View style={[style.containerBotao]} >
                    <TouchableOpacity style={[estilo.corPrimaria, style.botao]} onPress={() => navigation.navigate('Chat')}>
                        <View style={[style.iconeBotao]}>
                            <AntDesign name="wechat" size={120} color="white" />
                        </View>
                        <Text style={[estilo.textoSmall12px, estilo.textoCorLight, style.textoBotao]}>MENSAGENS</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </SafeAreaView>
    )
}

// Estilos específicos para a tela
const style = StyleSheet.create({
    container: {
        height: '100%'
    },
    areaLogo: {
        paddingTop: '5%',
        height: '10%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '5%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '3%',
        width: '100%',
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center'
    },
    containerBotao: {
        width: '40%',
        height: '100%',
    },
    botao: {
        alignItems: 'center',
        justifyContent: 'center',
        width: '100%',
        height: '85%',
        borderRadius: 15,
        padding: 5
    },
    iconeBotao: {
        padding: 5,
    },
    textoBotao: {
        textAlign: 'center',
        fontWeight: 'bold'
    }
})
