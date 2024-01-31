import React, {useState, useEffect} from 'react'
import { Text, View, ScrollView } from 'react-native';
import Logo from './componentes/Logo';
import LoginScreen from './componentes/LoginScreen';
import Home from './componentes/Home';
import SelecaoAluno from './componentes/SelecaoAluno';
import ListaAlunos from './componentes/SelecaoAluno/ListaAlunos';
import PerfilDoAluno from './componentes/SelecaoAluno/PerfilDoAluno';
import Caixinha from './componentes/SelecaoAluno/PerfilDoAluno/Caixinha';
import Parq from './componentes/Parq';
import Anamnese from './componentes/Anamnese';
import DadosCorporais from './componentes/DadosCorporais';
import SentarAlcancar from './componentes/Testes/Tabelas/SentarAlcancar.js';
import Avaliacoes from './componentes/Avaliacoes';
import Exercicios from './componentes/Exercicios';
import Testes from './componentes/Testes/index.js';
import Teste1 from './componentes/Testes/TestesParte1.js';
import ResistenciaAbdominal from './componentes/Testes/Tabelas/ResistenciaAbdominal';
import ResistenciaAbdominal18anos from './componentes/Testes/Tabelas/ResistenciaAbdominal18anos';
import Teste2 from './componentes/Testes/TestesPart2.js';
import IMC from './componentes/Testes/Tabelas/IMC';
import PressaoArterial from './componentes/Testes/Tabelas/PressaoArterial';
import FrequenciaCardiacaDeRepouso from './componentes/Testes/Tabelas/FrequenciaCardiacaDeRepouso';
import Testes3 from './componentes/Testes/TestesParte3.js';
import TabelaDeResultados from './componentes/Testes/Tabelas/TabelaDeResultados';
import FinalizarTestes from './componentes/FinalizarTestes';
import AvisoAvaliacaoFinalizada from './componentes/AvisoAvaliacaoFinalizada';
import Routes from './componentes/Routes/estilo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { NavigationContainer } from '@react-navigation/native';
import PerfilCoordenador from './componentes/PerfilCoordenador';
import EditarFoto from './componentes/PerfilCoordenador/EditarFoto';
import Notificacoes from './componentes/Notificacoes';
import CadastroScreen from './componentes/CadastroScreen/index.js';
import ModalSemConexao from './componentes/ModalSemConexao';
import SelecaoAlunoAnaliseProgramaDeTreino from './componentes/AnaliseDoProgramaDeTreino/SelecaoAlunoAnaliseProgramaDeTreino';
import TelaAnaliseDoProgramaDeTreino from './componentes/TelaAnaliseDoProgramaDeTreino';
import TelasDeEvolucao from './componentes/TelasDeEvolucao';
import SelecaoDaEvolucao from './componentes/TelasDeEvolucao/GraficosEvolutivos/SelecaoDaEvolucao';
import EvolucaoCorporal from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoCorporal';
import EvolucaoDoExercicioSelecao from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDoExercicioSelecao';
import EvolucaoDoExercicio from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDoExercicio';
import EvolucaoDosTestes from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoDosTestes';
import EvolucaoPse from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPse';
import EvolucaoQTR from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoQTR';
import EvolucaoCIT from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoCIT';
import EvolucaoMonotonia from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoMonotonia';
import EvolucaoStrain from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoStrain';
import Chat from './componentes/Chat';
import Mensagens from './componentes/Chat/Mensagens';
import EvolucaoPSEDoExercicioSelecao from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPSEDoExercicioSelecao';
import EvolucaoPseBorg from './componentes/TelasDeEvolucao/GraficosEvolutivos/EvolucaoPseBorg';
import NovaAvaliacao from './componentes/NovaAvaliacao';
import FrequenciaAluno from './componentes/SelecaoAluno/PerfilDoAluno/FrequenciaAluno';
import * as Notification from "expo-notifications"
import ExportCSV from './componentes/ExportCSV/index.js';
import SelecaoAlunoExport from './componentes/ExportCSV/SelecaoAlunoExport.js';
import CadastroAcademiaScreen from './componentes/CadastroAcademiaScreen/index.js';
import CadastroTurmas from './componentes/Turmas/CadastroTurmas/index.js';
import CadastroExercicios from './componentes/Exercicios/CadastroExercicio/index.js';
import EditarExercicios from './componentes/Exercicios/EditarExercicio/index.js';
import ListaExercicios from './componentes/Exercicios/ListaExercicios/index.js';
import DadosExercicios from './componentes/Exercicios/ListaExercicios/DadosExercicios/index.js';
import Academia from './componentes/Academia/index.js';
import PerfilProfessor from './componentes/ListaProfessores/PerfilProfessor/index.js';
import Turmas from './componentes/Turmas/index.js';
import EditarTurmas from './componentes/Turmas/EditarTurmas/index.js';
import DadosTurma from './componentes/Turmas/DadosTurma/index.js';

const Stack = createNativeStackNavigator();

Notification.setNotificationHandler({
  handleNotification:  async () => ({
    shouldPlaySound: true,
    shouldShowAlert: true, 
    shouldSetBadge: true
  })
})

export default function App() {

  
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen name="Login" component={LoginScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Principal" component={Routes} options={{ headerShown: false }} />
        <Stack.Screen name="Cadastro Coordenador" component={CadastroScreen}/>
        <Stack.Screen name="Perfil Aluno" component={PerfilDoAluno}/>
        <Stack.Screen name="Turmas" component={Turmas}/>
        <Stack.Screen name='Cadastro Turmas' component={CadastroTurmas}/>
        <Stack.Screen name="Editar Turmas" component={EditarTurmas}/>
        <Stack.Screen name="Dados Turma" component={DadosTurma}/>
        <Stack.Screen name="PARQ" component={Parq}/>
        <Stack.Screen name="Anamnese" component={Anamnese}/>
        <Stack.Screen name="Cadastro Academia" component={CadastroAcademiaScreen}/>
        <Stack.Screen name="Perfil Academia" component={Academia}/>
        <Stack.Screen name="Perfil" component={PerfilCoordenador}/>
        <Stack.Screen name="Exercicios" component={Exercicios}/>
        <Stack.Screen name="Cadastro Exercicios" component={CadastroExercicios}/>
        <Stack.Screen name="Editar Exercicios" component={EditarExercicios}/>
        <Stack.Screen name="Lista Exercicios" component={ListaExercicios}/>
        <Stack.Screen name="Dados Exercicios" component={DadosExercicios}/>
        <Stack.Screen name="Editar foto" component={EditarFoto}/>
        <Stack.Screen name="Perfil Professor" component={PerfilProfessor}/>
        <Stack.Screen name="Alunos" component={SelecaoAluno}/>
        <Stack.Screen name="Lista Alunos" component={ListaAlunos}/>
        <Stack.Screen name="Avaliações" component={Avaliacoes}/>
        <Stack.Screen name='Modal sem conexão' component={ModalSemConexao} options={{headerShown: false}}/>
        <Stack.Screen name="Seleção Aluno Análise do Programa de Treino" component={SelecaoAlunoAnaliseProgramaDeTreino}/>
        <Stack.Screen name="Avaliações Análise do Programa de Treino" component={Avaliacoes}/>
        <Stack.Screen name="Evolução" component={TelasDeEvolucao} />
        <Stack.Screen name="Seleção da evolução" component={SelecaoDaEvolucao}/>
        <Stack.Screen name="Evolução dados antropométricos" component={EvolucaoCorporal}/>
        <Stack.Screen name="Seleção do exercício" component={EvolucaoDoExercicioSelecao}/>
        <Stack.Screen name="Evolução do exercício" component={EvolucaoDoExercicio}/>
        <Stack.Screen name="Evolução dos testes" component={EvolucaoDosTestes}/>
        <Stack.Screen name="Evolução PSE" component={EvolucaoPse}/>
        <Stack.Screen name='Evolução QTR' component={EvolucaoQTR}/>
        <Stack.Screen name='Evolução CIT' component={EvolucaoCIT}/>
        <Stack.Screen name="Evolução Monotonia" component={EvolucaoMonotonia}/>
        <Stack.Screen name="Evolução Strain" component={EvolucaoStrain}/>
        <Stack.Screen name="Evolução PSE do Exercício Seleção" component={EvolucaoPSEDoExercicioSelecao}/>
        <Stack.Screen name="Evolução PSE do Exercício" component={EvolucaoPseBorg}/>
        <Stack.Screen name="Chat" component={Chat}/>
        <Stack.Screen name='Mensagens' component={Mensagens} options={{headerShown: false}}/>
        <Stack.Screen name='Testes' component={Testes}/>
        <Stack.Screen name="Testes1" component={Teste1}/>
        <Stack.Screen name="Testes2" component={Teste2}/>
        <Stack.Screen name='Testes3' component={Testes3}/>
        <Stack.Screen name="Frequencia do aluno" component={FrequenciaAluno}/>
        <Stack.Screen name="Exportar CSV" component={ExportCSV}/>
        <Stack.Screen name="Seleção Aluno CSV" component={SelecaoAlunoExport}/>
      </Stack.Navigator>
    </NavigationContainer> 
    );
}
