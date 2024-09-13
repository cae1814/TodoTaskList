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

  const handleChange = (selectedOption) => {
    const value = event.target.value;
    setSelectedOption(value);
    getTask(value, 2);
  };

  // Borarar
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [role, setRole] = useState();
  const [avatar, setAvatar] = useState();

  const [tarea, setTarea] = useState('');
  const [descripcion, setDescripcion] = useState('');
  const [idestado, setIdEstado] = useState('');
  const [avance, setAvance] = useState('');
  const [usuario, setUsuario] = useState('');

  const l_submitDeletetHandler = (id, name) => {
    setId(id);
    setName(name);
  }

  const l_changeName = (p_name) => {
    setName(p_name);
    setJname(p_name);
  }

  const l_changePassword = (p_password) => {
    setPassword(p_password);
    setJpassword(p_password);
  }

  const l_changeEmail = (p_email) => {
    setEmail(p_email);
    setJemail(p_email);
  }

  const l_changeRole = (p_role) => {
    setRole(p_role);
    setJrole(p_role);
  }

  const l_changeAvatar = (p_avatar) => {
    setAvatar(p_avatar);
    setJavatar(p_avatar);
  }

  const l_submitCompletetHandler = (p_id, p_tarea, p_descripcion) => {
    setId(p_id);
    setTarea(p_tarea);
    setDescripcion(p_descripcion);

    setJid(p_id);
    setJtarea(p_tarea);
    setJdescripcion(p_descripcion);
  }

  const l_submitDeleteHandler = (p_id, p_tarea, p_descripcion) => {
    setId(p_id);
    setTarea(p_tarea);
    setDescripcion(p_descripcion);

    setJid(p_id);
    setJtarea(p_tarea);
    setJdescripcion(p_descripcion);
  }

  const l_submitCancelHandler = (p_id, p_tarea, p_descripcion) => {
    setId(p_id);
    setTarea(p_tarea);
    setDescripcion(p_descripcion);

    setJid(p_id);
    setJtarea(p_tarea);
    setJdescripcion(p_descripcion);
  }

  const l_getTask = (p_value) => {
    console.info("as "+selectedOption);
    getTask(selectedOption, p_value);
  }

  const l_submitNewHandler = (p_operacion, p_id, p_name, p_password, p_email, p_role, p_avatar) => {
    setOperacion(p_operacion);
    setJoperacion(p_operacion);

    // Almacenamiento local //
    setId(p_id);
    setName(p_name);
    setPassword(p_password);
    setEmail(p_email);
    setRole(p_role);
    setAvatar(p_avatar);

    // Hook //
    setIdUser(p_id);
    setJname(p_name);
    setJpassword(p_password);
    setJemail(p_email);
    setJrole(p_role);
    setJavatar(p_avatar);
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
            <div className="border pt-3 px-3 col-sm-9 col-md-9 col-lg-9 backgorund-color-app2" style={{ paddingright: "7px" }} >
              <div className="row">
                <div className="col-sm-10 col-md-10 col-lg-10 mb-4 text-end">
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_submitNewHandler} data-bs-toggle="modal" data-bs-target="#confNew"><i className='fa fa-plus-circle' style={{ fontSize: "16px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => l_getTask(1)}><i className='fa fa-sort-alpha-asc' style={{ fontSize: "14px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-secondary btn-sm" onClick={() => l_getTask(2)}><i className='fa fa-sort-alpha-desc' style={{ fontSize: "14px" }}></i></button>&nbsp;
                  <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_getTask(2)}><i className='fa fa-refresh' style={{ fontSize: "14px" }}></i></button>
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
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_submitUpdatetHandler(2)} data-bs-toggle="modal" data-bs-target="#confEdit"><i className='fa fa-edit' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_submitCompletetHandler(item.id, item.tarea, item.descripcion)} data-bs-toggle="modal" data-bs-target="#confComplete"><i className='fa fa-check-square-o' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_submitCancelHandler(item.id, item.tarea, item.descripcion)} data-bs-toggle="modal" data-bs-target="#confCancel"><i className='fa fa-times-circle' style={{ fontSize: "16px" }}></i></button>&nbsp;
                          <button type="button" className="btn btn-outline-primary btn-sm" onClick={() => l_submitDeleteHandler(item.id, item.tarea, item.descripcion)} data-bs-toggle="modal" data-bs-target="#confDelete"><i className='fa fa-trash-o' style={{ fontSize: "16px" }}></i></button>
                          <hr className="hr-line-buttons"></hr>
                          <div className="text-start form-floating mb-3">
                            <div className="progress mt-1" role="progressbar" aria-label="Example with label" aria-valuenow={item.avance} aria-valuemin="0" aria-valuemax="100">
                            { item.idestado >= 4 ? 
                              <div className="progress-bar-deactive" style={{width: item.avance+"%"}}>{item.avance}%</div> :
                              <div className="progress-bar" style={{width: item.avance+"%"}}>{item.avance}%</div>
                            }
                            </div>

                            <div className="font-size-11 font-color-gray">
                              <label for="floatingTextarea2Disabled">Progreso de la tarea</label>
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
                <p style={{ fontSize: "16px"}}>¿Esta seguro que ca cancelar la tarea <b>{tarea}</b>?</p>
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
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Ejercicio Crud React | User Management</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="card" style={{ width: "100%"}}>
                  <div className="text-center mt-3">
                    <img src={avatar}className="card-img-top" alt="..." style={{ width: "50%"}} />
                  </div>
                    <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <legend className="font-size-17 text-center"><b>{name}</b></legend>
                        <div className="mb-2">
                          <label htmlFor="name" className="form-label font-size-14">Name</label>
                          <input type="text" name="name" id="name" className="form-control font-size-14" placeholder="Name for user" defaultValue={name} onChange={(e) => l_changeName(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="password" className="form-label font-size-14">Password</label>
                          <input type="text" name="password" id="password" className="form-control font-size-14" placeholder="Password for user" defaultValue={password} onChange={(e) => l_changePassword(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="email" className="form-label font-size-14">Email</label>
                          <input type="email" name="email" id="email" className="form-control font-size-14" placeholder="Email for user" defaultValue={email} onChange={(e) => l_changeEmail(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="avatar" className="form-label font-size-14">Avatar Url</label>
                          <input type="text" name="avatar" id="avatar" className="form-control font-size-14" placeholder="Avatar for user" defaultValue={avatar} onChange={(e) => l_changeAvatar(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="role" className="form-label font-size-14">Role</label>
                          <select name="role" id="role" className="form-select" aria-label="Default select example" onChange={(e) => l_changeRole(e.target.value)}>
                            <option value={role} defaultValue>{role}</option>
                            <option value="customer">customer</option>
                            <option value="admin">admin</option>
                          </select>
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
                <h1 className="modal-title" id="staticBackdropLabel" style={{ fontSize: "14px"}} ><b>Ejercicio Crud React | User Management</b></h1>
                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
              </div>
              <div className="modal-body">
                <div className="card" style={{ width: "100%"}}>
                  <div className="text-center mt-3">
                    <img src={avatar}className="card-img-top" alt="..." style={{ width: "50%"}} />
                  </div>
                    <div className="card-body">
                    <form onSubmit={submitHandler}>
                        <legend className="font-size-17 text-center"><b>{name}</b></legend>
                        <div className="mb-2">
                          <label htmlFor="name" className="form-label font-size-14">Name</label>
                          <input type="text" name="name" id="name" className="form-control font-size-14" placeholder="Name for user" defaultValue={name} onChange={(e) => l_changeName(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="password" className="form-label font-size-14">Password</label>
                          <input type="text" name="password" id="password" className="form-control font-size-14" placeholder="Password for user" defaultValue={password} onChange={(e) => l_changePassword(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="email" className="form-label font-size-14">Email</label>
                          <input type="email" name="email" id="email" className="form-control font-size-14" placeholder="Email for user" defaultValue={email} onChange={(e) => l_changeEmail(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="avatar" className="form-label font-size-14">Avatar Url</label>
                          <input type="text" name="avatar" id="avatar" className="form-control font-size-14" placeholder="Avatar for user" defaultValue={avatar} onChange={(e) => l_changeAvatar(e.target.value)} />
                        </div>
                        <div className="mb-2">
                          <label htmlFor="role" className="form-label font-size-14">Role</label>
                          <select name="role" id="role" className="form-select" aria-label="Default select example" onChange={(e) => l_changeRole(e.target.value)}>
                            <option value={role} defaultValue>{role}</option>
                            <option value="customer">customer</option>
                            <option value="admin">admin</option>
                          </select>
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
