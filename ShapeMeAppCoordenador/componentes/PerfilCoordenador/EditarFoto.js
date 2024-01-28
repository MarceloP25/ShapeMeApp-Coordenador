import React, {useState, useEffect} from "react";
import {Text, View, SafeAreaView, TouchableOpacity, StyleSheet, ScrollView, Image, Dimensions} from "react-native"
import estilo from "../estilo";
import * as ImagePicker from 'expo-image-picker';
import {firebase, firebaseBD} from '../configuracoes/firebaseconfig/config'
import { collection,setDoc,doc, getDocs, getDoc,getFirestore, where , query , addDoc, updateDoc} from "firebase/firestore";
import { getStorage, ref, uploadBytes, getDownloadURL, uploadBytesResumable } from '@firebase/storage';
import { coordenadorLogado } from "../LoginScreen";
import NetInfo from "@react-native-community/netinfo"

const altura = Dimensions.get('window').height

export default ({navigation}) => {
    const [imageUrl, setImageUrl] = useState(null);
    const [conexao, setConxao] = useState(true);

    useEffect(()=> {
        const unsubscribe = NetInfo.addEventListener(state => {
            setConxao(state.type == 'wifi' || state.type == 'cellular')
        })

        return () => {
            unsubscribe()
        }
    }, [])
    const getStoredImage = async () => {
        const storage = getStorage();
        const storeRef = ref(storage, `foto${coordenadorLogado.getCpf()}.jpg`);
        console.log("Deu erro aqui")

        

        try {
          const url = await getDownloadURL(storeRef);
          setImageUrl(url);
        } catch (error) {
          console.log(error);
        }
      };
      const [image, setImage] = useState(null);

      useEffect(() => {
        getStoredImage();
      }, []);  
      const user = firebase.auth().currentUser;



      const pickImage = async () => {
        console.log("Deu erro aqui1");
    
        try {
            let result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.All,
                allowsEditing: true,
                aspect: [1, 1],
                quality: 1,
            });
    
            if (!result.canceled) {
                const storage = getStorage(); // Storage
                const storeRef = ref(storage, `foto${coordenadorLogado.getCpf()}.jpg`);
    
                console.log('result.assets', result.assets[0].uri);
    
                const imageBlob = await getBlobFromUri(result.assets[0].uri);
                
                // Corrigir a função uploadBytesResumable para aceitar apenas dois argumentos
                await uploadBytesResumable(storeRef, imageBlob);
    
                setImage(result.assets[0].uri);
            }
        } catch (error) {
            console.error("Error picking image:", error);
        }
    };
    
    const getBlobFromUri = async (uri) => {
        const blob = await new Promise((resolve, reject) => {
            const xhr = new XMLHttpRequest();
            xhr.onload = function () {
                resolve(xhr.response);
            };
            xhr.onerror = function (e) {
                reject(new TypeError("Network request failed"));
            };
            xhr.responseType = "blob";
            xhr.open("GET", uri, true);
            xhr.send(null);
        });
    
        return blob;
    };
    return (
        <ScrollView>
        <SafeAreaView style={[style.container, estilo.corLightMenos1]}>
        <View style={style.areaFoto}>
        <Image 
        style={{width: 200, height: 200, borderRadius: 100, borderWidth: 2}}
        source={imageUrl ? { uri: imageUrl } : {uri: 'https://firebasestorage.googleapis.com/v0/b/shapemeappbdteste.appspot.com/o/fotopadrao.jpg?alt=media&token=c1f35033-a208-40ce-8d69-52279a798210'} }/>
                <TouchableOpacity 
                 onPress={pickImage}
                 disabled={!conexao}
                    style={[conexao? estilo.corPrimaria : estilo.corDisabled, estilo.botao, {marginTop: '5%', marginBottom: '5%'}, estilo.sombra]} 
                >
                    <Text style={[estilo.textoSmall12px, estilo.textoCorLight, estilo.tituloH523px]}>{conexao? "SELECIONAR FOTO" : "SEM CONEXÃO"}</Text>
                </TouchableOpacity> 
            </View>
                
                <TouchableOpacity style={[estilo.corLightMenos1, style.botaoLight, {marginTop: '5%', marginBottom: '5%'}, estilo.sombra]} onPress={()=>navigation.goBack()}>
                    <Text style={[estilo.textoSmall12px, estilo.textoCorPrimaria, estilo.tituloH523px]}>VOLTAR</Text>
                </TouchableOpacity>            
                </SafeAreaView>
    </ScrollView>
)
}

const style = StyleSheet.create({
container: {
    width: '100%',
    height: altura
},
areaFoto: {
    width: '100%',
    alignItems: 'center',
    marginTop: '5%'

},
foto: {
    width: 200,
    height: 200,
    borderRadius: 100,
    justifyContent: 'center',
    borderWidth: 1
},
areasDeInput: {
    marginLeft: '5%',

},
inputText: {
    width: '100%',
    padding: 10,
    height: 50,
    borderRadius: 10,
    marginVertical: 25,
    elevation: 10
},    
botaoLight: {
    paddingHorizontal: 5,
    paddingVertical: 10,
    alignItems: 'center',
    width: 300,
    borderRadius: 30,
    borderColor: '#0066FF',
    marginLeft: 'auto',
    marginRight: 'auto',
    marginTop: 10,  
    borderWidth: 3,
},

})