import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import React,{useState} from 'react'
import {Turmas} from '../../classes/Turmas'

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
    const [dias, setDias] = useState('')
    const [vagas, setVagas] = useState('')
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

    return (   

            <View>
                <View>
                    <Text>PREENCHA COM OS DADOS PARA CRIAR TURMAS!</Text>
                    <Text>CASO NÃO QUEIRA, FINALIZE O CADASTRO.</Text>
                </View>
                <View>
                    <View>
                        <Text>Nome da turma:</Text>
                        <TextInput placeholder="Nome da turma"></TextInput>
                    </View>

                    <View>
                        <Text>Horário da turma:</Text>
                        <TextInput placeholder="Horário da turma"></TextInput>
                    </View>
                    
                    <View>
                        <Text>Dias da turma:</Text>
                        <TextInput placeholder="Dias da turma"></TextInput>
                    </View>

                    <View>
                        <Text>Vagas da turma:</Text>
                        <TextInput placeholder="Vagas da turma"></TextInput>
                    </View>

                    <View>
                        <TouchableOpacity>CADASTRAR TURMA</TouchableOpacity>
                    </View>
                </View>
            </View>

    )
}

const styles = StyleSheet.create({})