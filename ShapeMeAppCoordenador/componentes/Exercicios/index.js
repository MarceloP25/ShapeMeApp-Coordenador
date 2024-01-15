import { SafeAreaView, ScrollView, Text, TouchableOpacity, View } from 'react-native'
import React, { useState, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import estilo from '../estilo';
import { collection, setDoc, doc, getDocs, getFirestore, where, query, addDoc, querySnapshot, QueryStartAtConstraint } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import { Exercicio } from '../../classes/Exercicio'

let exercicioBusca = new Exercicio()

export default ({navigation, route}) =>{

  const {academia} = route.params // arrumar o route para passar o nome da academia do coordenador
  const [exercicioData, setexercicioData] = useState([])
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    console.log("Chamou a função")
    fetchexercicioData()
}, [])
    const fetchexercicioData = async () => {
        try {
            const academiaRef = collection(firebaseBD, "Academias");
            const querySnapshot = await getDocs(academiaRef);
            for (const academiaDoc of querySnapshot.docs) {
            const academiaNome = academiaDoc.get("nome");
            const exercicioRef = collection(firebaseBD, "Academias", academiaNome, "Exercicios");
            const exercicioSnapshot = await getDocs(exercicioRef);
            
            if (exercicioSnapshot.empty) {
              // A coleção "Exercicios" não existe, mostrar o modal e interromper o processamento
              setModalVisible(true);
              return;
            }

            for (const exercicioDoc of exercicioSnapshot.docs) {
                const exercicioData = exercicioDoc.data();
                setexercicioData((prevData) => [...prevData, exercicioData]);

                exercicioBusca.setNome(exercicioData.nome);
                exercicioBusca.setEmail(exercicioData.tipo);
                exercicioBusca.setSenha(exercicioData.musculos)
                exercicioBusca.setDataNascimento(exercicioData.descricao);
                exercicioBusca.setSexo(exercicioData.variacao);
                exercicioBusca.setProfissao(exercicioData.execucao);
                exercicioBusca.setCpf(exercicioData.imagem);

                const exercicioString = JSON.stringify(exercicioDoc.data())
                AsyncStorage.setItem('exercicioLocal', exercicioString)
                }
            }
        }catch (error) {
            console.log(error);
        }
    }
  
  
    return (
      <ScrollView alwaysBounceVertical={true} style={estilo.corLightMenos1}>
        <SafeAreaView style={style.container}>


        {/* Modal para redirecionar o usuário para a tela de cadastro */}
        {modalVisible && (
          <View style={style.modalContainer}>
            <Text style={style.modalText}>A coleção "Exercicios" não existe. Cadastre-se agora!</Text>
            <TouchableOpacity
              style={[estilo.botao, estilo.sombra]}
              onPress={() => {
                setModalVisible(false);
                navigation.navigate('Cadastro Exercicios')
              }}
            >
              <Text style={estilo.tituloH427px}>Ir para o cadastro</Text>
            </TouchableOpacity>
          </View>
        )}

          <View style={style.containerBotao}>
            {/* Botão exercícios do tipo alongamento */}
            <TouchableOpacity style={[estilo.botaoClaro1, estilo.sombra]}>
              <Text style={estilo.tituloH427px} >ALONGAMENTO</Text>
            </TouchableOpacity>
          </View>

          <View style={style.containerBotao}>
            {/* Botão exercícios do tipo aeróbico */}
            <TouchableOpacity style={[estilo.botaoClaro1, estilo.sombra]}>
              <Text style={estilo.tituloH427px}>AERÓBICO</Text>
            </TouchableOpacity>
          </View>

          <View style={style.containerBotao}>
            {/* Botão exercícios do tipo força membros superiores */}
            <TouchableOpacity style={[estilo.botaoClaro1, estilo.sombra]}>
              <Text style={estilo.tituloH427px}>FORÇA SUPERIORES</Text>
            </TouchableOpacity>
          </View>

          <View style={style.containerBotao}>
            {/* Botão exercícios do tipo força membros inferiores */}
            <TouchableOpacity style={[estilo.botaoClaro1, estilo.sombra]}>
              <Text style={estilo.tituloH427px}>FORÇA INFERIORES</Text>
            </TouchableOpacity>
          </View>
        </SafeAreaView>
      </ScrollView>
    )
  
}

const style = StyleSheet.create({
  container:{
    marginVertical: '2%',
  },
  containerBotao: {
    width: '40%',
    height: '100%',
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F8FAFF",
  },
  modalText: {
    fontSize: 18,
    color: "#FF6262",
    marginBottom: 20,
  },
})