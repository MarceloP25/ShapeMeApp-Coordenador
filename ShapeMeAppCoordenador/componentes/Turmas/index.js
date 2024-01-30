import React, { useState, useEffect } from 'react';
import { Text, SafeAreaView, StyleSheet, TouchableOpacity, View, ScrollView, Alert } from 'react-native';
import { getDocs, collection, query, where, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';
import NetInfo from '@react-native-community/netinfo';
import estilo from '../estilo';
import { coordenadorLogado } from '../LoginScreen';
import Cabecalho from '../Cabecalho';

export default (navigation) => {
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
                const turmasRef = collection(firebaseBD, `Academias/${coordenadorLogado.getAcademia()}/Turmas`);
                const turmasQuery = query(turmasRef);

                const turmasSnapshot = await getDocs(turmasQuery);

                const listaTurmas = [];
                turmasSnapshot.forEach((doc) => {
                    listaTurmas.push({ id: doc.id, ...doc.data() });
                });

                setTurmas(listaTurmas);
            } catch (error) {
                console.error('Erro ao buscar turmas:', error);
            }
        };

        buscarTurmas();
    }, []);

    const redirecionarParaDetalhes = (turma) => {
        // Aqui você pode navegar para a tela de detalhes ou edição passando os dados da turma como parâmetro
        navigation.navigate('Dados Turma', { turma });
    };

    return (
        <ScrollView alwaysBounceVertical={true} style={[estilo.corLightMenos1]}>
            <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>
            <Cabecalho navigation={navigation} />
                <Text style={estilo.tituloH523px}>CLIQUE EM UMA TURMA PARA VER SEUS DADOS!</Text>

                <View>
                    {conexao ? (
                        turmas.map((turma) => (
                            <TouchableOpacity
                                key={turma.id}
                                style={[estilo.botaoClaro1]}
                                onPress={() => redirecionarParaDetalhes(turma)}>
                                <Text style={[estilo.textoCorLightMais1, estilo.tituloH619px]}>{turma.nome}</Text>
                            </TouchableOpacity>
                        ))
                    ) : (
                        <Text style={estilo.textoCorDanger}>Sem conexão com a internet. Verifique sua conexão.</Text>
                    )}
                </View>

                <View>
                    <TouchableOpacity style={estilo.botao}
                        onPress={navigation.navigate('Editar Turmas')}>
                        <Text>EDITAR TURMA</Text>
                    </TouchableOpacity>
                </View>

                <View>
                    <TouchableOpacity style={estilo.botao}
                        onPress={navigation.navigate('Cadastro Turmas')}>
                        <Text>CADASTRAR TURMA</Text>
                    </TouchableOpacity>
                </View>
            </SafeAreaView>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        marginVertical: '2%',
    },
})