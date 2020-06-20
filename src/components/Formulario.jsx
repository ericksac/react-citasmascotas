import React, { Fragment, useState } from 'react'
import uuid from 'uuid/dist/v4';
import PropTypes from 'prop-types';

const Formulario = ({crearcita}) => {

    //Crear state de citas
    const [cita, actualizarCita] = useState({
        mascota: '',
        propietario:'',
        fecha:'',
        hora:'',
        sintomas:''
    })
    const [error , actualizarError] = useState(false);
    //Función cuando un usuario escribe en los inputs
    const actualizarState = e =>{
        actualizarCita({
            ...cita, 
            [e.target.name]: e.target.value
         })
    }

    //Extraer los valores
    const {mascota, propietario, fecha, hora, sintomas} = cita;

    //Cuando el usuario envia cita
    const submitCita = e =>{
        e.preventDefault();        
        //Validar
        if(mascota.trim() ==='' || propietario.trim() ===''
        || fecha.trim() ===''|| hora.trim() ===''|| sintomas.trim() ==='')
        {
            actualizarError(true);
            return;
        }

        //Eliminar mensaje de error
        actualizarError(false);

        //Asignar un id
        cita.id = uuid();
        //Crear cita
        crearcita(cita);
        //Reiniciar el form
        actualizarCita({
            mascota: '',
            propietario:'',
            fecha:'',
            hora:'',
            sintomas:''
        })
    }

    return (
        <Fragment>
            <h2>Crear Cita</h2>

            {error ? <p className="alerta-error"> Todos los campos son obligatorios</p> : null}

            <form 
                onSubmit={submitCita}
            >
                <label htmlFor=""> Nombre de Mascota</label>
                <input type="text"
                        name="mascota"
                        className= "u-full-width"
                        placeholder = "Nombre de la mascota"
                        onChange={actualizarState}
                        value={mascota}
                />

                <label htmlFor=""> Nombre del dueño</label>
                <input type="text"
                        name="propietario"
                        className= "u-full-width"
                        placeholder = "Dueño de la mascota"
                        onChange={actualizarState}
                        value={propietario}
                />

                <label htmlFor=""> Fecha</label>
                <input type="date"
                        name="fecha"
                        className= "u-full-width"
                        onChange={actualizarState}
                        value={fecha}
                />
                <label htmlFor=""> Hora</label>
                <input type="time"
                        name="hora"
                        className= "u-full-width"
                        onChange={actualizarState}
                        value={hora}
                />
                <label htmlFor=""> Sintomas</label>
                <textarea name="sintomas"
                            className="u-full-width"
                            onChange={actualizarState}
                            value={sintomas}
                ></textarea>
                <button type="submit" className="u-full-width button-primary">
                   Agregar Cita 
                </button>
            </form>
        </Fragment>
    )
}

Formulario.propTypes = {
    crearCita: PropTypes.func.isRequired
}

export default Formulario;