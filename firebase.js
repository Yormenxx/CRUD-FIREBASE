
// Import the functions you need from the SDKs you need

import { initializeApp } from "https://www.gstatic.com/firebasejs/9.15.0/firebase-app.js";
import {
    getFirestore, 
    collection ,
    addDoc, 
    getDocs,
    getDoc,
    deleteDoc,
    doc,
    onSnapshot,
    updateDoc
} from "https://www.gstatic.com/firebasejs/9.15.0/firebase-firestore.js"


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

//Esta parte debe cambiarse  por el propio firebase personal 

// const firebaseConfig = {

//     apiKey: "AIzaSyDmwIRUhdPFmD_iN0wS_69L8uMB6xUHHGk",

//     authDomain: "js-crud-a6e75.firebaseapp.com",

//     projectId: "js-crud-a6e75",

//     storageBucket: "js-crud-a6e75.appspot.com",

//     messagingSenderId: "299510086080",

//     appId: "1:299510086080:web:6d7a3ff67aa8139b80b025"

// };


// Initialize Firebase

const app = initializeApp(firebaseConfig);

const db = getFirestore()

//CON ESTE CODIGO GUARDAMOS LOS DATOS
export const saveTask = (titulo,descripcion)=>{
   addDoc(collection(db, "tareas"), {titulo, descripcion})
}




export const  getTasks = ()=> getDocs(collection(db,"tareas"))

    
export const onGetTasks = (callback) => onSnapshot(collection(db,"tareas"),callback)

export const deleteTask= id => deleteDoc(doc(db,"tareas",id))


export const getTask = id => getDoc(doc(db , "tareas", id))

export const updateTask = (id, nuevCampo) => updateDoc(doc(db, "tareas", id),nuevCampo)


export {
    onSnapshot,
    collection,
    db
}
