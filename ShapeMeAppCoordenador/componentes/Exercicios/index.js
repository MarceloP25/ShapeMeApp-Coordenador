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

  const [modalVisible, setModalVisible] = useState(false);
  
  // Arrays para armazenar exercícios de cada tipo
  const [alongamentoExercicios, setAlongamentoExercicios] = useState([]);
  const [aerobicoExercicios, setAerobicoExercicios] = useState([]);
  const [forcaSuperioresExercicios, setForcaSuperioresExercicios] = useState([]);
  const [forcaInferioresExercicios, setForcaInferioresExercicios] = useState([]);

  useEffect(() => {
    const fetchExercicioData = async () => {
      try {
        const exercicioRef = collection(firebaseBD, "Academias", coordenadorLogado.getAcademia(), "Exercicios");
        const querySnapshot =  await getDocs(exercicioRef);
        
        if (!querySnapshot.empty) {
          const exerciciosAlongamento = [];
          const exerciciosAerobico = [];
          const exerciciosMembrosSup = [];
          const exerciciosMembrosInf = [];
          querySnapshot.forEach((doc) => {
            const exercicioData = doc.data();
            const exercicio = new Exercicio(
                exercicioData.nome,
                exercicioData.tipo,
                exercicioData.musculos,
                exercicioData.variacao,
                exercicioData.execucao,
                exercicioData.imagem
            );
            // Adicione o exercício ao array correspondente
            if (exercicioData.tipo === "Alongamentos") {
                exerciciosAlongamento.push(exercicio);
            } else if (exercicioData.tipo === "Aeróbicos") {
                exerciciosAerobico.push(exercicio);
            } else if (exercicioData.tipo === "Força - Membros Superiores") {
                exerciciosMembrosSup.push(exercicio);
            } else if (exercicioData.tipo === "Força - Membros Inferiores") {
                exerciciosMembrosInf.push(exercicio);
            }
          });
          
          setAlongamentoExercicios(exerciciosAlongamento);
          setAerobicoExercicios(exerciciosAerobico);
          setForcaSuperioresExercicios(exerciciosMembrosSup);
          setForcaInferioresExercicios(exerciciosMembrosInf);

        } else {
          console.log('Sem exercicios cadastrados')
        }

      } catch (error) {
        console.log(error);
        console.log('Sem exercicios cadastrados')
      }
    };

    fetchExercicioData();
  }, []);


  return (
    <SafeAreaView style={[estilo.corLightMenos1, {flex: 1}]}>
      <View style={[style.containerBotao, estilo.corLightMenos1]}>
       
        <View >
          {/* Botão exercícios do tipo alongamento */}
          <TouchableOpacity
            style={[estilo.botaoClaro2, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: alongamentoExercicios })}
          >
            <Text style={estilo.tituloH427px}>ALONGAMENTO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo aeróbico */}
          <TouchableOpacity
            style={[estilo.botaoClaro2, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: aerobicoExercicios })}
          >
            <Text style={estilo.tituloH427px} >AERÓBICO</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo força membros superiores */}
          <TouchableOpacity
            style={[estilo.botaoClaro2, estilo.sombra, estilo.corLightMenos1 ]}
            onPress={() => navigation.navigate('Lista Exercicios', { exercicios: forcaSuperioresExercicios })}
          >
            <Text style={estilo.tituloH427px}>FORÇA SUPERIORES</Text>
          </TouchableOpacity>
        </View>

        <View >
          {/* Botão exercícios do tipo força membros inferiores */}
          <TouchableOpacity
            style={[estilo.botaoClaro2, estilo.sombra, estilo.corLightMenos1 ]}
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

      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({

  containerBotao: {
    marginVertical: '2%',
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