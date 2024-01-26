import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default ({ navigation }) => {
    const handleVoltar = () => {
        navigation.goBack();
    };

    return (
        <View style={styles.cabecalhoContainer}>
        <TouchableOpacity onPress={handleVoltar} style={styles.iconeVoltar}>
            <Ionicons name="arrow-back" size={24} color="black" />
        </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    cabecalhoContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#F8FAFF',
        height: 60,
        paddingHorizontal: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
    },
    iconeVoltar: {
        marginRight: 10,
    },
    titulo: {
        fontSize: 18,
    },
});
