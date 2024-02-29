import { SafeAreaView, ScrollView, Text, TouchableOpacity, View, StyleSheet } from 'react-native'
import React, { useState, useEffect } from "react"
import { NavigationContainer, useNavigation } from '@react-navigation/native';
import estilo from '../estilo';
import { collection, getDocs } from "firebase/firestore";
import { firebase, firebaseBD } from '../configuracoes/firebaseconfig/config'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Exercicio } from '../../classes/Exercicio';
import { coordenadorLogado } from '../LoginScreen';

export default ({navigation}) =>{

  const [exercicioData, setExercicioData] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  
  // Arrays para armazenar exercícios de cada tipo
  const [alongamentoExercicios, setAlongamentoExercicios] = useState([]);
  const [aerobicoExercicios, setAerobicoExercicios] = useState([]);
  const [forcaSuperioresExercicios, setForcaSuperioresExercicios] = useState([]);
  const [forcaInferioresExercicios, setForcaInferioresExercicios] = useState([]);

  useEffect(() => {
    fetchExercicioData();
  }, []);

  const fetchExercicioData = async () => {
    try {
      const exercicios = [];
      const exercicioRef = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Exercicios");
      const exercicioSnapshot = getDocs(exercicioRef);

      for (const exercicioDoc of exercicioSnapshot.docs) {
        const exercicioData = exercicioDoc.data();
        exercicios.push(exercicioData);

        // Adicionar exercício ao array correspondente ao tipo
        switch (exercicioData.tipo) {
          case "Alongamentos":
            setAlongamentoExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
            break;
          case "Aeróbicos":
            setAerobicoExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
            break;
          case "Força - Membros Superiores":
            setForcaSuperioresExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
            break;
          case "Força - Membros Inferiores":
            setForcaInferioresExercicios((prevExercicios) => [...prevExercicios, exercicioData]);
            break;
          default:
            break;
        }

        const exercicioString = JSON.stringify(exercicioDoc.data());
        AsyncStorage.setItem('exercicioLocal', exercicioString);
      }

      setExercicioData(exercicios);
    } catch (error) {
      console.log(error);
      console.log('Sem exercicios cadastrados')
    }
  }

  return (
    <SafeAreaView style={[estilo.corLightMenos1, {flex: 1}]}>
      <View style={[style.containerBotao, estilo.corLightMenos1]}>
       
        <View >
          {/* Botão exercícios do tipo alongamento */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: alongamentoExercicios })}
          >
            <Text style={estilo.tituloH427px}>ALONGAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo aeróbico */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: aerobicoExercicios })}
          >
            <Text style={estilo.tituloH427px} >AERÓBICO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo força membros superiores */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaSuperioresExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA SUPERIORES</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo força membros inferiores */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaInferioresExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA INFERIORES</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão para cadastrar exercicios*/}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
            onPress={() => navigation.navigate('Cadastro Exercicios')}
          >
            <Text style={[estilo.tituloH427px, estilo.textoCorLight]}>CADASTRAR</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão para editar os exercicios */}
          <TouchableOpacity
            style={[estilo.botao, estilo.sombra, estilo.corPrimaria]}
            onPress={() => navigation.navigate('Editar Exercicios')}
          >
            <Text style={[estilo.tituloH427px, estilo.textoCorLight]}>EDITAR</Text>
          </TouchableOpacity>
        </View>

      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({

  containerBotao: {
    marginVertical: '5%',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    width: '100%',
    height: '80%'
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
});