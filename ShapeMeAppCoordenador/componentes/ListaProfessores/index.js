import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, View, ScrollView, SafeAreaView, TouchableOpacity } from 'react-native';
import estilo from '../estilo';
import Cabecalho from '../Cabecalho';
import { coordenadorLogado } from './LoginScreen';
import { getDocs, collection, query, getFirestore } from 'firebase/firestore';
import { firebaseBD } from '../configuracoes/firebaseconfig/config';

export default ({ navigation }) => {
const [professores, setProfessores] = useState([]);

useEffect(() => {
    const buscarProfessores = async () => {
    try {
        const professoresRef = collection(firebaseBD, 'Academias', coordenadorLogado.getAcademia(), 'Professores');
        const professoresQuery = query(professoresRef);

        const professoresSnapshot = await getDocs(professoresQuery);

        const listaProfessores = [];
        professoresSnapshot.forEach((doc) => {
        listaProfessores.push({ id: doc.id, ...doc.data() });
        });

        setProfessores(listaProfessores);
    } catch (error) {
        console.error('Erro ao buscar professores:', error);
    }
    };

    buscarProfessores();
}, []);

const redirecionarParaPerfil = (professor) => {
    navigation.navigate('Perfil Professor', { professor });
};

return (
    <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
    <SafeAreaView style={[estilo.corLightMenos1, styles.container]}>
        <Cabecalho navigation={navigation} />

        <View>
        {professores.map((professor) => (
            <TouchableOpacity
                key={professor.id}
                onPress={() => redirecionarParaPerfil(professor)}
                style={estilo.botaoClaro1}
                >
                <Text style={estilo.tituloH619px}>{professor.nome}</Text>
            </TouchableOpacity>
        ))}
        </View>
    </SafeAreaView>
    </ScrollView>
);
};

const styles = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
});
