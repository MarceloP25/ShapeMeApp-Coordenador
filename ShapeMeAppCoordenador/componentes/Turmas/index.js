import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, View, ScrollView, TouchableOpacity } from 'react-native';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import ListaTurmas from './ListaTurmas'; // Importando o componente ListaTurmas

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
        const buscarTurmas = () => {
            try {
                const turmasRef = collection(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`);
                const turmasQuery = query(turmasRef);

                const turmasSnapshot = getDocs(turmasQuery);

                const listaTurmas = [];
                turmasSnapshot.forEach((doc) => {
                    listaTurmas.push({ id: doc.id, ...doc.data() });
                });

                setTurmas(listaTurmas);
            } catch(error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        buscarTurmas();
    }, []);

    return (
        <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>
            <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1, ]}>

                <View style={styles.areaFrase}>
                    <Text style={[estilo.tituloH523px, estilo.centralizado]}>CLIQUE PARA VER OS DADOS!</Text>
                </View>

                <View style={[{flexGrow:1}]}>
                    <View style={ styles.areaBotoes}>
                        {
                            turmas.map((turma) => (
                                <ListaTurmas
                                    key={turma.id}
                                    turma={turma}
                                    onPress={() => navigation.navigate('Dados Turma', { turma: turma })} />
                            ))
                        }
                    </View>

                    <View style={ styles.areaBotoes}>
                        <TouchableOpacity style={[estilo.botao, estilo.sombra, estilo.corPrimaria]} onPress={() => navigation.navigate('Cadastro Turmas')}>
                            <Text style={[estilo.textoCorLight, estilo.tituloH523px]}>CADASTRAR TURMA</Text>
                        </TouchableOpacity>
                    </View>

                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        marginVertical: '15%',
    },
    areaFrase: {
        marginVertical: '3%',
        height: '20%',
    },
    areaBotoes: {
        height: '25%',
        marginTop: '10%',
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center'
    },    
    botaoTurma: {
        paddingHorizontal: 5,
        paddingVertical: 10,
        alignItems: 'center',
        justifyContent: 'center',
        width: 300,
        height: 80,
        borderRadius: 10,
        marginLeft: 'auto',
        marginRight: 'auto',
        marginTop: 10,  
    },
});
