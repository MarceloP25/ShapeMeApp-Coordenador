import React, {useState, useEffect} from "react"
import { Text, View, StyleSheet,ScrollView, SafeAreaView, TextInput, TouchableOpacity, Alert, Modal} from "react-native"
import estilo from "../estilo"
import RadioBotao from "../RadioBotao"
import { useFonts } from 'expo-font';
import BotaoSelect from "../BotaoSelect"
import { TextInputMask } from 'react-native-masked-text';
import {Academia} from '../../classes/Academia'
import { AppLoading } from 'expo';
import {Endereco} from '../../classes/Endereco'
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc, querySnapshot, QueryStartAtConstraint} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";

export default ({navigation}) => {
    const novaAcademia = new Academia('', '', '', '', '', '', '')
    const enderecoAcademia = new Endereco('', '', '', '', '', '', '')

    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener(state => {
        setConexao(state.type === 'wifi' || state.type === 'cellular')
        })

        return () => {
        unsubscribe()
        }
    }, [])

    const checkWifiConnection = () => {
        NetInfo.fetch().then((state) => {
        if (state.type === 'wifi' || state.type === 'cellular') {
            console.log('Conectado ao Wi-Fi');
            setConexao(true)
        } else {
            console.log('Não conectado ao Wi-Fi');
            setConexao(false)
        }
        });
    };
    useEffect(() => {
        checkWifiConnection();
    }, []);

    const [nome, setNome] = useState('')
    const [nomeInvalido, setNomeInvalido] = useState(false);

    const validaNome = (text) => {
    const nomeValido = /^[\p{L}\s]*$/u;
    if (nomeValido.test(text)) {
        setNomeInvalido(false);
    } else {
        setNomeInvalido(true);
    }
        setNome(text);
    };

    const [Cnpj, setCnpj] = useState('')
    const [CnpjInvalido, setCnpjInvalido] = useState(false);

    const validaECorrigeCnpj = (text) => {
        setCnpj(text);
        setCnpjInvalido(!validarCnpj(text));
    };

    const [cep, setCep] = useState('')
    const [cepInvalido, setCepInvalido] = useState(false)

    const [estado, setEstado] = useState('')
    const [estadoInvalido, setEstadoInvalido] = useState(false)

    const [cidade, setCidade] = useState('')
    const [cidadeInvalida, setCidadeInvalida] = useState(false);
    
    const [bairro, setBairro] = useState('')
    const [bairroInvalido, setBairroInvalido] = useState(false)

    const [rua, setRua] = useState('')
    const [ruaInvalida, setRuaInvalida] = useState(false)

    const [numero, setNumero] = useState('')
    const [complemento, setComplemento] = useState('')

    setDoc(doc(firebaseBD, "Academia", `${novaAcademia.getNome()}`), {
        nome: novaAcademia.getNome(),
        cnpj: novaAcademia.getCnpj(),
        endereco: {
            rua: enderecoAcademia.getRua(),
            cidade: enderecoAcademia.getCidade(),
            estado: enderecoAcademia.getEstado(),
            numero: enderecoAcademia.getNumero(),
            complemento: enderecoAcademia.getComplemento(),
        },
        }).then(() => {
        alert("Academia criada com sucesso!")
        firebase.auth().createUserWithEmailAndPassword(novoCoordenador.getEmail(), novoCoordenador.getSenha())
        .then((userCredential) => {
            console.log(userCredential)

        }).catch((error) => {
            alert("Ocorreu um erro no seu cadastro.")
        })
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe uma academia cadastrada com este cnpj.`)
        });
        setDoc(doc(firebaseBD, "Academia", `${novaAcademia.getNome()}`, "Notificações", `Notificação${ano}|${mes}|${dia}`), {
            data: `${dia}/${mes}/${ano}`,
            nova: false,
            remetente: 'Gustavo & cia',
            texto: "É um prazer recebê-lo em nosso aplicativo. Desenvolvido por Gustavo Vaz Teixeira, João Bastista, Mateus Novaes, Sérgio Muinhos e Marcelo Patrício, em parceria com o Instituto Federal do Sudeste de Minas Gerais, o ShapeMeApp foi criado para proporcionar a você uma experiência interativa e personalizada durante seus treinos.",
            tipo: "sistema",
            titulo: "Bem-vindo ao ShapeMeApp!"
        })
        navigation.navigate("Login")
    }