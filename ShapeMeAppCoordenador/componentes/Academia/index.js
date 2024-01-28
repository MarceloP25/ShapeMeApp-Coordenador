import { Text, StyleSheet, View, SafeAreaView, ScrollView } from 'react-native'
import React, { Component } from 'react'
import estilo from '../estilo'
import Cabecalho from '../../Cabecalho'
import { useNavigation } from '@react-navigation/native'
import { coordenadorLogado } from '../LoginScreen'
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { collection, getDocs} from "firebase/firestore";

export default (navigation) => {
    const [academia, setAcademia] = useState(null);

    // Função para buscar dados da academia no Firebase
    const buscarDadosAcademia = async () => {
        getDocs(doc(firebaseBD, "Academias", `${coordenadorLogado.getAcademia()}`),{

        })
    };
  
    useEffect(() => {
      buscarDadosAcademia();
    }, []); // Chama a função ao carregar o componente

    return (
        <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
            <SafeAreaView style={styles.container}>
                <Cabecalho navigation={navigation} />

                {academia ? (
                    <View>
                        <Text>Nome: {academia.nome}</Text>
                        <Text>CNPJ: {academia.cnpj}</Text>
                        <Text style={[estilo.tituloH619px, estilo.textoCorSecundaria]}>{academia.getRua()},{academia.getNumero()}, {academia.getCidade()}, {academia.getEstado()}</Text>

                    </View>
                    ) : (
                    <Text>Carregando...</Text>
                )}
                
            </SafeAreaView>
        </ScrollView>

    )
}

const styles = StyleSheet.create({
    container:{
        marginVertical: '2%',
      },
})