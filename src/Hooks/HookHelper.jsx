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
    const [jidestado, setJidEstado] = useState('');
    const [javance, setJavance] = useState('');
    const [jusuario, setJusuario] = useState('');
    const [jcreador, setJcreador] = useState('');
    const [jmodificador, setJmodificador] = useState('');

    // Metodo para filtro en la pagina //
    const getTask = async (idestado, orderid) => {;
        const result = await axios.get(url+idestado+"/"+orderid);
        const resultData = await result;
        setData(resultData.data);
    }

    const submitHandler = async (event) => {
        event.preventDefault();
        const userObject = {
            tarea: jtarea,
            descripcion: jdescripcion,
            idestado: joperacion===1 ? 1 : jidestado,
            avance: joperacion===1 ? 0 : javance,
            creador: jcreador,
            modificador: joperacion===1 ? '': jmodificador
        }

        var url;
        var resultApi;

        if (joperacion == 1){
            // Create //
            resultApi = await axios.post(url, userObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
            //console.info("Creando ...");
        } else {
            // Update //
            url = 'http://190.107.150.60:1510/task/'+idUser;
            resultApi = await axios.put(url+iduser, userObject, {headers: {"Content-Type":"application/json", "Accept":"application/json"}});
            //console.info("Actualizando ...");
        }
        
        try {
            const data = await resultApi;
            setResult(resultApi.data);
            //console.info("resultApi "+ resultApi.data.id);

            if (resultApi.data.id > 0){
                if (joperacion == 1) {
                    alertReactCrud("El usuario "+resultApi.data.name+" fue creado exitosamente.\n", 'success');
                } else {
                    alertReactCrud("El usuario "+resultApi.data.name+" fue actualizado exitosamente.\n", 'success');
                }
            } else {
                alertReactCrud("Ocurrio un error en el proceso.", 'error');
            }

            getTask(-1);
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
        setJidEstado,
        setJavance,
        setJusuario,
        setJoperacion,
        submitHandler,
        submitCancelHandler,
        submitCompletetHandler,
        submitDeleteHandler
    }
}
