import React, { useState } from 'react';
import axios from 'axios';
import {alertReactCrud, closeModal, focus} from "../js/functions.js";

export const HookHelper = () => {
    const url = 'http://190.107.150.60:1510/task/';
    const [result, setResult] = useState();
    const [data, setData] =useState([]);
    const [joperacion, setJoperacion] = useState();
    
    const [jid, setJid] = useState('');
    const [jtarea, setJtarea] = useState('');
    const [jdescripcion, setJdescripcion] = useState('');
    const [jidestado, setJidestado] = useState('');
    const [javance, setJavance] = useState('');
    const [jusuario, setJusuario] = useState('');

    const [jvarFilter, setJvarFilter] = useState();
    const [jvarordering, setJvarordering] = useState();

    // Metodo para filtro en la pagina //
    const getTask = async (idestado, orderid) => {
        setJvarFilter(idestado);
        setJvarFilter(orderid);

        const result = await axios.get(url+idestado+"/"+orderid);
        const resultData = await result;
        setData(resultData.data);
    }



    const submitHandler = async (event) => {
        event.preventDefault();

        if (jtarea == '' ){
            alertReactCrud("El Nombre de la tarea no puede estar vacio.", 'warning');
            if (joperacion == 1){
                focus('ntarea');
            } else {
                focus('etarea');
            }
            return;
        } else if (jdescripcion == ''){
            alertReactCrud("La descripcion de la tarea no puede estar vacio.", 'warning');
            if (joperacion == 1){
                focus('ndescripcion');
            } else {
                focus('edescripcion');
            }
            return;
        } else {
            if (joperacion == 1){
                closeModal('btonNewClose');
            } else {
                if (javance > 100 || javance < 0){
                   alertReactCrud("El avance de la tarea no puede ser mayor a 100 ni menor a 0", 'warning');
                   focus('avance');
                   return
                } else {
                    closeModal('btonEditClose');
                }
            }
        }

        let taskObject;

        var resultApi;

        if (joperacion == 1){
            // Create //
            
            const taskObject = {
                tarea: jtarea,
                descripcion: jdescripcion,
                creado_por: 'admin'
            }

            resultApi = await axios.post(url, taskObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        } else {
            // Update //

            const taskObject = {
                tarea: jtarea,
                descripcion: jdescripcion,
                id_estado: jidestado,
                avance: javance,
                modificado_por: 'admin'
            }

            resultApi = await axios.put(url+jid, taskObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        }
        
        try {
            const data = await resultApi;
            setResult(resultApi.data);

            if (resultApi.data.obj_creado[0].affectedRows > 0){
                if (joperacion == 1) {
                    alertReactCrud("La tarea fue creada exitosamente.", 'success');
                } else {
                    alertReactCrud("La tarea fue actualizada exitosamente.", 'success');
                }
            } else {
                alertReactCrud("Ocurrio un error en el proceso.", 'error');
            }

            getTask(-2, 2);
        } catch (error) {
        console.info(error.message || 'Error desconocido');
      }
    }

    const submitCompletetHandler = async (event) => {
        event.preventDefault();
        
        const taskObject = {
            tarea: jtarea,
            descripcion: jdescripcion,
            id_estado: 4,
            avance: 100,
            modificado_por: "admin"
        }

        const result = await axios.put(url+jid, taskObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        setResult(await result.data);
        alertReactCrud("La tarea fue completada exitosamente.", 'success');
        getTask(-2, 2);
    }
    
    const submitDeleteHandler = async (event) => {
        event.preventDefault();
        
        const taskObject = {
            tarea: jtarea,
            descripcion: jdescripcion,
            id_estado: 5,
            avance: javance,
            modificado_por: "admin"
        }

        const result = await axios.put(url+jid, taskObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        setResult(await result.data);
        alertReactCrud("La tarea fue borrada exitosamente.", 'success');
        getTask(-2, 2);
    }

    const submitCancelHandler = async (event) => {
        event.preventDefault();
        
        const taskObject = {
            tarea: jtarea,
            descripcion: jdescripcion,
            id_estado: 6,
            avance: javance,
            modificado_por: "admin"
        }

        const result = await axios.put(url+jid, taskObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
        setResult(await result.data);
        alertReactCrud("La tarea fue cancelada exitosamente.", 'success');
        getTask(-2, 2);
    }
    
    return {
        getTask,
        data,
        setJid,
        setJtarea,
        setJdescripcion,
        setJidestado,
        setJavance,
        setJusuario,
        setJoperacion,
        submitHandler,
        submitCancelHandler,
        submitCompletetHandler,
        submitDeleteHandler
    }
}
