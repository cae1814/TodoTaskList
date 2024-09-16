import React, { useState } from 'react';
import axios from 'axios';
import {alertReactCrud} from "../js/functions.js";

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
            console.info("resultApi.data "+ resultApi.data.obj_creado[0]);
            console.info("setAwa "+ resultApi.data.obj_creado[0].affectedRows);

            if (resultApi.data.obj_creado[0].affectedRows > 0){
                if (joperacion == 1) {
                    alertReactCrud("La tarea fue creada exitosamente.\n"+resultApi.data.obj_creado[0].info, 'success');
                } else {
                    alertReactCrud("La tarea fue actualizada exitosamente.\n"+resultApi.data.obj_creado[0].info, 'success');
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
        alertReactCrud("El registro fue guardado exitosamente.\n"+result[0], 'success');
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
        alertReactCrud("El registro fue borrado exitosamente.\n"+result[0], 'success');
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
        alertReactCrud("El registro fue cancelado exitosamente.\n"+result[0], 'success');
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
