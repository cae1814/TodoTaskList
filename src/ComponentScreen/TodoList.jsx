import { useState, useEffect } from "react";
import axios from "axios";
import { HookHelper } from "../Hooks/HookHelper.jsx";
import {alertReactCrud} from "../js/functions.js";
import "../assets/font-awesome/css/font-awesome.min.css";

export const TodoList = () => {
  const {getTask, data, submitHandler, submitDeleteHandler, submitCancelHandler, submitCompletetHandler, setJoperacion, setJid, setJtarea, setJdescripcion, setJidestado, setJavance, setJusuario,} = HookHelper();
  
  useEffect(() => { getTask(-2, 2); }, []);

  const [id, setId] = useState();
  const [operacion, setOperacion] = useState();
  const [selectedOption, setSelectedOption] = useState(-2);

  const handleChange = () => {
    const value = event.target.value;
    setSelectedOption(value);
    getTask(value, 2);
  };

  const [tarea, setTarea] = useState();
  const [descripcion, setDescripcion] = useState();
  const [idestado, setIdEstado] = useState();
  const [estado, setEstado] = useState();
  const [avance, setAvance] = useState();
  const [creadoPor, setCreadopor] = useState();

  const l_changeTarea = (p_tarea) => {
    setTarea(p_tarea);
    setJtarea(p_tarea);
  }

  const l_changeDescripcion = (p_descripcion) => {
    setDescripcion(p_descripcion);
    setJdescripcion(p_descripcion);
  }

  const l_changeIdEstado = () => {
    const value = event.target.value;
    setIdEstado(value);
    setJidestado(value);
  }

  const l_changeCreadoPor = (p_creado_por) => {
    setCreadorpor(p_creado_por);
  }

  const l_changeAvance = (p_avance) => {
    setAvance(p_avance);
    setJavance(p_avance);
  }

  const l_getTask = (p_value) => {
    console.info("as "+selectedOption);
    getTask(selectedOption, p_value);
  }

  const l_submitHandler = (p_operacion, p_id, p_tarea, p_descripcion, p_idestado, p_estado, p_avance, p_creadopor) => {
    console.info("["+p_operacion+",["+p_id+"],["+p_tarea+"],["+p_descripcion+"],["+p_idestado+": "+p_estado+"],["+p_avance+"]");
    setOperacion(p_operacion);
    setJoperacion(p_operacion);

    if (p_operacion == 1) {
      // Create //
      // Almacenamiento local //
      setId("");
      setTarea("");
      setDescripcion("");
      setIdEstado("");
      setAvance("");
    } else {
      // Modificar //
      // Hook //
      setJid(p_id);
      setJtarea(p_tarea);
      setJdescripcion(p_descripcion);
      setJidestado(p_idestado);
      setJavance(p_avance);

      setId(p_id);
      setTarea(p_tarea);
      setDescripcion(p_descripcion);
      setIdEstado(p_idestado);
      setEstado(p_estado);
      setAvance(p_avance);
      setCreadopor(p_creadopor);
    }
  }
  

    return (
      <>
        <div className="mt-2 ml-4">
          <nav className="nav nav-pills nav-fill">
            <ul className="nav nav-pills">
              <li className="nav-item">
                <a className="nav-link" href="/">Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link active" aria-current="page" href="/">Todo List</a>
              </li>
            </ul>
          </nav>
        </div>

        <div>
          <section className="container mt-4 mb-1 show" id="crud1">
            <div className="text-start" id="todolist">
              <h5 className="font-size-33 text-right font-color-gray">TODO List</h5>
            </div>
            <div>  
          </div>

            <div className="border pt-3 px-3 col-sm-9 col-md-9 col-lg-9 background-color-app2" style={{ paddingright: "7px" }} >
              <div className="row">
                <div className="col-sm-10 col-md-10 col-lg-10 mb-4 text-end">
                  <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_submitHandler(1)} data-bs-toggle="modal" data-bs-target="#confNew"><i className='fa fa-plus-circle' style={{ fontSize: "16px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-secondary btn-sm effecs" onClick={() => l_getTask(1)}><i className='fa fa-sort-alpha-asc' style={{ fontSize: "14px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-secondary btn-sm effecs" onClick={() => l_getTask(2)}><i className='fa fa-sort-alpha-desc' style={{ fontSize: "14px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_getTask(2)}><i className='fa fa-refresh' style={{ fontSize: "14px" }}></i></button>
                </div>
                <div className="col-sm-2 col-md-2 col-lg-2">
                  <select name="role" id="role" className="form-select selectFilter" aria-label="Default select example" onChange={handleChange}>
                  <option value="-2" defaultValue>Activos</option>
                    <option value="-1">- TODOS -</option>                    
                    <option value="1">Por hacer</option>
                    <option value="2">En progreso</option>
                    <option value="3">Atrasada</option>
                    <option value="4">Finalizada</option>
                    <option value="6">Cancelada</option>
                    <option value="5">Borrado</option>
                  </select>
                </div>
              </div>
              
              <div className="row g-3 align-items-center mb-3">
                <div className="row col-lg-12 col-md-12 col-sm-12">
                { data.length > 0 ? 
                  data.map((item) => (
                  <div  className={`card mb-1 border-estado-${item.idestado}`} key={item.id}>
                    <div className="card-body row">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="mb-1">
                        <div id="todoDescription" className="font-size-12"><i className={`fa ${item.icon} ${item.color}`} style={{ fontSize: "16px" }}></i><span className={`${item.color}`}><b>&nbsp;{item.estado}</b></span></div>
                          <div id="todoDescription" className={`font-size-15 ${item.tipo_letra}`}><b>{item.id} | {item.tarea}</b> &nbsp; &nbsp;</div>
                          <hr className={`hr-line ${item.color}`}></hr>
                          <div id="todoDescription" className={`font-size-13 ${item.tipo_letra}`}><b>Descripción:</b> {item.descripcion}</div>
                          <div id="todoDescription" className={`font-size-11 font-color-gray ${item.tipo_letra}`}><i className='fa fa-user' style={{ fontSize: "13px" }}></i>&nbsp;<b>Modificado por: </b>{item.modificado_por} &nbsp;|&nbsp; <i className='fa fa-calendar-o' style={{ fontSize: "13px" }}></i>&nbsp;<b>Fecha: </b>{item.fecha_modificacion} &nbsp;&nbsp;|&nbsp;&nbsp; <i className='fa fa-user' style={{ fontSize: "13px" }}></i>&nbsp;<b>Creado por: </b>{item.creado_por} &nbsp;|&nbsp; <i className='fa fa-calendar-o' style={{ fontSize: "13px" }}></i>&nbsp;<b>Fecha: </b>{item.fecha_creacion}</div> 
                        </div>
                      </div>
                      <div className="col-lg-2 col-md-2 col-sm-2 text-end">
                        <div>
                          <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_submitHandler(2, item.id, item.tarea, item.descripcion, item.idestado, item.estado, item.avance, item.creado_por)} data-bs-toggle="modal" data-bs-target="#confEdit"><i className='fa fa-edit' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_submitHandler(-1, item.id, item.tarea, item.descripcion, item.idestado, item.estado, item.avance, item.creado_por)} data-bs-toggle="modal" data-bs-target="#confComplete"><i className='fa fa-check-square-o' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_submitHandler(-1, item.id, item.tarea, item.descripcion, item.idestado, item.estado, item.avance, item.creado_por)} data-bs-toggle="modal" data-bs-target="#confCancel"><i className='fa fa-times-circle' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm effecs" onClick={() => l_submitHandler(-1, item.id, item.tarea, item.descripcion, item.idestado, item.estado, item.avance, item.creado_por)} data-bs-toggle="modal" data-bs-target="#confDelete"><i className='fa fa-trash-o' style={{ fontSize: "16px" }}></i></button>
                          <hr className="hr-line-buttons"></hr>
                          <div className="text-start form-floating mb-3">
                            <div className="progress mt-1 effecs" role="progressbar" aria-label="Example with label" aria-valuenow={item.avance} aria-valuemin="0" aria-valuemax="100">
                            { item.idestado >= 4 ? 
                              <div className="progress-bar-deactive" style={{width: item.avance+"%"}}>{item.avance}%</div> :
                              <div className="progress-bar" style={{width: item.avance+"%"}}>{item.avance}%</div>
                            }
                            </div>

                            <div className="font-size-11 font-color-gray">
                              <label htmlFor="floatingTextarea2Disabled">Progreso de la tarea</label>
                            </div>

                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  ))
                  : 
                  <div  className="card mb-1">
                    <div className="card-body row">
                      <div className="col-lg-10 col-md-10 col-sm-10">
                        <div className="mb-1 ">
                         <div id="todoDescription" className="font-size-18"><i className="fa fa-exclamation-triangle font-color-red" style={{ fontSize: "22px" }}></i><span className=""><b>&nbsp;Opps!</b> No hay tareas que mostrar.</span></div>
                        </div>
                      </div>
                    </div>
                  </div>
                  }
                </div>           
              </div>
            </div>
            <br></br>
          </section>
        </div>

        <div className="modal fade" id="confDelete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Delete task | Todo List</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: "16px"}}><span className="font-color-red"><i className='fa fa-exclamation-triangle' style={{ fontSize: "17px" }}></i>&nbsp;<b>Cuidado!</b></span></p>
                <p style={{ fontSize: "16px"}}>¿Esta seguro que desea borrar la tarea <b>{tarea}</b>?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={submitDeleteHandler} data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="confComplete" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Complete task | Todo List</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: "16px"}}><span className="font-color-red"><i className='fa fa-exclamation-triangle' style={{ fontSize: "17px" }}></i>&nbsp;<b>Cuidado!</b></span></p>
                <p style={{ fontSize: "16px"}}>¿Esta seguro que completar la tarea <b>{tarea}</b>?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={submitCompletetHandler} data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="confCancel" data-bs-backdrop="static" data-bs-keyboard="false" tabIndex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Cancel task | Todo List</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <p style={{ fontSize: "16px"}}><span className="font-color-red"><i className='fa fa-exclamation-triangle' style={{ fontSize: "17px" }}></i>&nbsp;<b>Cuidado!</b></span></p>
                <p style={{ fontSize: "16px"}}>¿Esta seguro que desea cancelar la tarea <b>{tarea}</b>?</p>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal">Cancelar</button>
                <button type="button" className="btn btn-primary btn-sm" onClick={submitCancelHandler} data-bs-dismiss="modal">Aceptar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="confNew" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Todo List | Crear Tarea</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="card" style={{ width: "100%"}}>
                  <div className="text-center mt-3">
                    <img src="https://cdn.icon-icons.com/icons2/37/PNG/512/addthelist_a%C3%B1adir_3477.png" className="card-img-top" alt="..." style={{ width: "20%"}} />
                  </div>
                    <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <legend className="font-size-17 text-center"><b>Nueva tarea</b></legend>
                        <div className="mb-2">
                          <label htmlFor="Tarea" className="form-label font-size-14">Tarea</label>
                          <input type="text" name="Tarea" id="Tarea" className="form-control font-size-14" placeholder="Tarea" defaultValue="" onChange={(e) => l_changeTarea(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="descripcion" className="form-label font-size-14">Descripcion</label>
                          <textarea rows="5" cols="33" name="descripcion" id="descripcion" className="form-control font-size-14" placeholder="Descripcion" defaultValue="" onChange={(e) => l_changeDescripcion(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="creador" className="form-label font-size-14">Creado por:</label>
                          <input disabled type="text" name="creador" id="creador" className="form-control font-size-14" placeholder="Creado por:" defaultValue="admin" onChange={(e) => l_changeCreadoPor(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal"><i className='fa fa-check-square' style={{ fontSize: "16px" }}></i>&nbsp;Guardar</button>                    
                    </form>
                    </div>
                  </div>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal"><i className='fa fa-reply' style={{ fontSize: "16px" }}></i>&nbsp;Cancelar</button>
              </div>
            </div>
          </div>
        </div>

        <div className="modal fade" id="confEdit" aria-labelledby="exampleModalLabel" aria-hidden="true">
          <div className="modal-dialog modal-md modal-dialog-centered">
            <div className="modal-content">
              <div className="modal-header">
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Todo List | Editar Tarea</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="card" style={{ width: "100%"}}>
                  <div className="text-center mt-3">
                    <img src="https://img.freepik.com/vector-premium/icono-lista-verificacion-iconos-web-establecidos_925480-66.jpg?w=826" className="card-img-top" alt="..." style={{ width: "20%"}} />
                  </div>
                    <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <legend className="font-size-17 text-center"><b><u>Modificar tarea</u></b></legend>
                        <div className="mb-2">
                          <label htmlFor="Tarea" className="form-label font-size-14">Tarea</label>
                          <input type="text" name="Tarea" id="Tarea" className="form-control font-size-14" placeholder="Tarea" defaultValue={tarea} onChange={(e) => l_changeTarea(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="descripcion" className="form-label font-size-14">Descripcion</label>
                          <textarea rows="3" cols="33" name="descripcion" id="descripcion" className="form-control font-size-14" placeholder="Descripcion" defaultValue={descripcion} onChange={(e) => l_changeDescripcion(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="idestado" className="form-label font-size-14">Estado</label>
                            <select className="form-select" id="taskStatus" onChange={(e) => l_changeIdEstado()}>
                              <option value={idestado} defaultValue>{estado}</option>
                              <option value="1">Por hacer</option>
                              <option value="2">En progreso</option>
                              <option value="4">Finalizada</option>
                              <option value="5">Borrado</option>
                              <option value="6">Cancelada</option>
                            </select>
                        </div>
                        <div className="mb-2">
                          <label htmlFor="avance" className="form-label font-size-14">Avance</label>
                          <input type="number" name="avance" id="avance" className="form-control font-size-14" placeholder="Avance" defaultValue={avance} onChange={(e) => l_changeAvance(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="modificador" className="form-label font-size-14">Creado por:</label>
                          <input disabled type="text" name="modificador" id="modificador" className="form-control font-size-14" placeholder="Modificado por" defaultValue={creadoPor} onChange={(e) => l_changeCreadoPor(e.target.value)} />
                        </div>
                        <button type="submit" className="btn btn-primary btn-sm" data-bs-dismiss="modal"><i className='fa fa-check-square' style={{ fontSize: "16px" }}></i>&nbsp;Guardar</button>                    
                    </form>
                    </div>
                  </div>
                </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-outline-primary btn-sm" data-bs-dismiss="modal"><i className='fa fa-reply' style={{ fontSize: "16px" }}></i>&nbsp;Cancelar</button>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  };
