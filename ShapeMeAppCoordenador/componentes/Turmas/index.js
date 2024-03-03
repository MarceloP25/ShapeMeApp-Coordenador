import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { getDocs, collection, query, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import BotaoSelect from "../BotaoSelect";


export default ({navigation}) => {
    const [turmas, setTurmas] = useState([]);
    const [conexao, setConexao] = useState(true);

    useEffect(() => {
        const unsubscribe = NetInfo.addEventListener((state) => {
            setConexao(state.type === 'wifi' || state.type === 'cellular');
        });

        return () => {
            unsubscribe();
        };
    }, []);

    useEffect(() => {
        const buscarTurmas = async () => {
            try {
                const turmasRef = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Turmas");
                const querySnapshot = await getDocs(turmasRef);
                
                if (!querySnapshot.empty) {
                    const listaTurmas = [];
                    querySnapshot.forEach((doc) => {
                        const nome = doc.data();
                        listaTurmas.push(nome);
                    });
                    
                    setTurmas(listaTurmas);
                } else {
                    console.log("Nenhuma turma encontrada.");
                }
            } catch(error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        buscarTurmas();
    }, []);


    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>

                <View>

                    <Text style={[estilo.tituloH523px, estilo.centralizado]}>CLIQUE PARA VER OS DADOS!</Text>

                    {
                        turmas.map((turma) => (
                            <TouchableOpacity
                                key={turma.nome}
                                onPress={() => navigation.navigate('Dados Turma', { turma: turma})}
                                style={[estilo.botao, estilo.corPrimaria]}
                                >
                                    <Text style={[estilo.tituloH619px, estilo.textoCorLight]}>{turma.nome}</Text>
                            </TouchableOpacity>
                        ))}

                        <TouchableOpacity 
                            style={[estilo.botao, estilo.sombra, estilo.corPrimaria]} 
                            onPress={() => navigation.navigate('Cadastro Turmas')}
                            >
                            <Text style={[estilo.textoCorLight, estilo.tituloH523px]}>CADASTRAR TURMA</Text>
                        </TouchableOpacity>

                </View>

            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '15%',
    },

});
