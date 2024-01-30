import React from 'react';
import { Text, SafeAreaView, StyleSheet, View } from 'react-native';
import estilo from '../../estilo';
import Cabecalho from '../../Cabecalho';

export default ({ navigation,route }) => {
    const { turma } = route.params;

    return (
        <SafeAreaView style={styles.container}>
        <Cabecalho navigation={navigation} />
            <View>
                <Text style={[estilo.tituloH619px, estilo.textoCorLightMais1]}>Detalhes da Turma</Text>
                <View style={styles.detalhesContainer}>
                    <Text style={styles.label}>Nome da Turma:</Text>
                    <Text style={styles.valor}>{turma.nome}</Text>

                    <Text style={styles.label}>Horário da Turma:</Text>
                    <Text style={styles.valor}>{turma.horario}</Text>

                    <Text style={styles.label}>Dias da Turma:</Text>
                    <Text style={styles.valor}>{turma.dias}</Text>

                    <Text style={styles.label}>Vagas da Turma:</Text>
                    <Text style={styles.valor}>{turma.vaga}</Text>
                </View>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        marginVertical: '2%',
    },
    detalhesContainer: {
        marginTop: 20,
    },
    label: {
        fontSize: 18,
        fontWeight: 'bold',
        marginVertical: 5,
        color: estilo.textoCorLightMais1.color,
    },
    valor: {
        fontSize: 16,
        marginBottom: 15,
    },
});
