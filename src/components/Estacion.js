import React, { Component } from 'react';
import PropTypes from 'prop-types'
import {Link} from 'react-router-dom';

export class Estacion extends Component {
    static propTypes = {
        id: PropTypes.string,
        codEstacion: PropTypes.string,
        nombre: PropTypes.string,
        estado: PropTypes.string,
        horaApertura: PropTypes.string,
        horaCierre: PropTypes.string,
        codTroncal: PropTypes.string
    }
    render() {
        const { id, codEstacion, nombre, estado, horaApertura, horaCierre, codTroncal } = this.props
        return (
                <tbody>
                    <tr>
                        <Link to={'/detalles/'+id} text='center'>{codEstacion}</Link>
                        <td>{nombre}</td>
                        <td>{estado}</td>
                        <td>{horaApertura}</td>
                        <td>{horaCierre}</td>
                        <td>{codTroncal}</td>
                    </tr>
                </tbody>
            

        )
    }

}