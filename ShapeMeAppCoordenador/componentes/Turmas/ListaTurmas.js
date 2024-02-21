import React from 'react';
import { TouchableOpacity, Text } from 'react-native';
import estilo from '../estilo';

const ListaTurmas = ({ turma, onPress }) => {
    return (
        <TouchableOpacity
            style={[styles.botaoTurma, estilo.sombra, estilo.corLight]}
            onPress={onPress}>
            <Text style={[estilo.textoCorDark, estilo.tituloH427px]}>{turma.nome}</Text>
        </TouchableOpacity>
    );
};

export default ListaTurmas;
