import {saveTask,getTasks,onGetTasks,deleteTask,getTask,updateTask} from "./firebase.js"

const $contanedorTareas = document.getElementById("contanedor-tareas")
const $formu_tareas = document.getElementById("formu-tareas")

let editSatus = false;
let id = ""

//CON ESTE CODIGO LISTAMOS NUESTROS DATOS O SEA LEER DATOS EN TIEMPO REAL

window.addEventListener("DOMContentLoaded", async()=>{
    
    //ESTO SE LEE ASI: ESTARÉ LEYENDO LOS DATOS Y CUANDO RECIBA UNO , ESTO ES LO QUE HARÉ

    onGetTasks((querySnapshot)=>{

        let html = ""
    
        querySnapshot.forEach(doc => {
            
            const tarea = doc.data()
    
            html += `
            <div class="container_element">
    
                <h3>${tarea.titulo}</h3>
                <p>${tarea.descripcion}</p>
                <button class="btn-borrar" data-id ="${doc.id}">Borrar</button>
                <button class="btn-edit" data-id ="${doc.id}">Editar</button>
            
            </div>`
        })
    
        $contanedorTareas.innerHTML = html

        //CON ESTE CODIGO ELIMINAMOS DATOS

        const btns_Borrar = $contanedorTareas.querySelectorAll(".btn-borrar")

        btns_Borrar.forEach(boton =>{
            boton.addEventListener("click",(e)=>{
                deleteTask(e.target.dataset.id)
            })
        })

        //CON ESTE CODIGO EDITAMOS O ACTUALIZAMOS
        
        const btns_edit = $contanedorTareas.querySelectorAll(".btn-edit")

        btns_edit.forEach(btn =>{

            btn.addEventListener ("click", async (e) =>{

                const doc = await getTask(e.target.dataset.id)

                const Task = doc.data()

                $formu_tareas["tarea-input"].value= Task.titulo
                $formu_tareas["descrip-tarea"].value = Task.descripcion

                editSatus = true;
                id = e.target.dataset.id

                $formu_tareas[btn-tarea].innerText = "Update"
            })
        })

    })

})



//CON ESTE CODIGO GUARDAMOS DATOS

$formu_tareas.addEventListener("submit", (e)=>{

    e.preventDefault();

    const $titulo = $formu_tareas["tarea-input"]
    const $descripcion = $formu_tareas["descrip-tarea"]

    // saveTask($titulo.value, $descripcion.value)

    if (!editSatus){
        

        saveTask($titulo.value, $descripcion.value)

    }else{

        updateTask(id ,{
            titulo : $titulo.value,
            descripcion : $descripcion.value,
        })
        editSatus= false
    }

    $formu_tareas.reset()
})  








