import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React,{useState} from 'react'
import {Turmas} from '../../classes/Turmas'
import { collection,setDoc,doc, getDocs, getFirestore, where , query, addDoc, querySnapshot, QueryStartAtConstraint} from "firebase/firestore";
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import NetInfo from "@react-native-community/netinfo"
import ModalSemConexao from "../ModalSemConexao";
import { NavigationContainer, useNavigation } from '@react-navigation/native'; // Navegação
import estilo from "../estilo"

export default ({navigation}) => {

    const novaTurma = new Turmas('', '', '', '')

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

    const [nome, setNome ] = useState('')
    const [horario, setHorario] = useState('')
    const [dia, setDia] = useState('')
    const [vaga, setVaga] = useState('')
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

    const handleTurmaCadastro = () => {

        setDoc(doc(firebaseBD, "Coordenador/${novoCoordenador.getNome()}/Academia/${novaAcademia.getNome()}/Turmas", `${novaTurma.getNome()}`), {
            nome: novaTurma.getNome(),
            horario: novaTurma.getHorario(),
            dia: novaTurma.getDia(),
            vaga: novaTurma.getVaga(),
        }).catch((erro) => {
            console.log(`Não foi possível criar o documento. Já existe uma academia cadastrada com este cnpj.`)
        })
    }

    const handleFinalizar = () => { 
        navigation.navigate('Login')
    }

    return (   

            <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
                <View style={styles.inputArea}>
                    <Text style={estilo.tituloH619px}>PREENCHA COM OS DADOS PARA CRIAR TURMAS!</Text>
                    <Text style={estilo.tituloH619px}>CASO NÃO QUEIRA, FINALIZE O CADASTRO.</Text>
                </View>
                <View style={styles.inputArea}>
                    <View style={styles.inputArea}>
                        <Text>Nome da turma:</Text>
                        <TextInput placeholder="Nome da turma" value={nome} style={styles.inputText} onChangeText={(text) => {validaNome(text)}}></TextInput>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Horário da turma:</Text>
                        <TextInput placeholder="Horário da turma" value={horario} style={styles.inputText} keyboardType='numeric' onChangeText={(text) => setHorario(text)}></TextInput>
                    </View>
                    
                    <View style={styles.inputArea}>
                        <Text>Dias da turma:</Text>
                        <TextInput placeholder="Dias da turma" value={dia} style={styles.inputText} onChangeText={(text) => setDia(text)}></TextInput>
                    </View>

                    <View style={styles.inputArea}>
                        <Text>Vagas da turma:</Text>
                        <TextInput placeholder="Vagas da turma" value={vaga} style={styles.inputText} keyboardType='numeric' onChangeText={(text) => setVaga(text)}></TextInput>
                    </View>

                    <View style={styles.inputArea}>
                        <TouchableOpacity onPress={handleTurmaCadastro()} style={[estilo.botao, estilo.corPrimaria]}
                            onPressIn={() => {
                                novaTurma.setNome(nome)
                                novaTurma.setHorario(horario)
                                novaTurma.setDia(dia)
                                novaTurma.setVaga(vaga)

                                if(novaTurma.getNome() == '' || novaTurma.getHorario() == '' || novaTurma.getDia() == '' || novaTurma.getVaga() == ''){
                                    Alert.alert("Há campos não preenchidos.", "Preencha os campos antes de prosseguir.")
                                } else {
                                    handleFinalizarCadastro()
                                }
                            }}>CADASTRAR TURMA</TouchableOpacity>
                    </View>
                </View>
                <View>
                    <TouchableOpacity onPress={handleFinalizar()} style={[estilo.botao, estilo.corPrimaria]}>FINALIZAR</TouchableOpacity>
                </View>
            </ScrollView>

    )
}

const styles = StyleSheet.create({
    inputText: {
        width: '90%',
        height: 50,
        marginTop: 10,
        marginBottom: 30,
        borderRadius: 10,
        elevation: 10,
        paddingHorizontal: 20,
    },
    inputArea: {
        marginLeft: '10%',
        marginVertical: 10
    },
})