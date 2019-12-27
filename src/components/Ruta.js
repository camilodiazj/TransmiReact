import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { putFetch, deleteFetch } from '../components/Rest'

export class Ruta extends Component {
    constructor(props) {
        super(props)
        this.state = {
            ruta: {
                codRuta: '',
                nombre: '',
                inicioOperacion: '',
                finOperacion: ''
            }
        }
    }

    static propTypes = {
        rutas: PropTypes.array
    }

    _handleName = (e) => {
        let ruta = Object.assign({}, this.state.ruta);
        ruta.nombre = e.target.value;
        this.setState({ ruta })
    }

    _handleOpeningTime = (e) => {
        let ruta = Object.assign({}, this.state.ruta);
        ruta.inicioOperacion = e.target.value;
        this.setState({ ruta })
    }

    _handleClosingTime = (e) => {
        let ruta = Object.assign({}, this.state.ruta);
        ruta.finOperacion = e.target.value;
        this.setState({ ruta })
    }

    _setRuta = (ruta) => {
        this.setState({ ruta })
    }

    _handleDelete = (e) => {
        e.preventDefault();
        const { codRuta } = this.state.ruta
        deleteFetch('http://localhost:9090/rutas/' + codRuta)
            .then(data => {
                console.log(data)
                alert('Estación eliminada')
            })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { ruta } = this.state
        putFetch('http://localhost:9090/rutas/', ruta)
            .then(data => {
                console.log(data)
                alert('Ruta Actualizada')
                window.history.go("/rutas");
            }
            )
    }

    render() {
        const { rutas } = this.props;
        const listRutas = rutas.map((rutas) =>
            <tr key={rutas.codRuta}>
                <td className='text-center'>
                    <Link to={'/rutas/' + rutas.codRuta + '/estaciones'}>{rutas.codRuta}</Link>
                </td>
                <td className='text-center'>{rutas.nombre}</td>
                <td className='text-center'>{rutas.inicioOperacion}</td>
                <td className='text-center'>{rutas.finOperacion}</td>
                <td className='text-center'>
                    <div className="dropdown show mx-auto">
                        <button className="btn btn-primary dropdown-toggle dropdown-toggle-split" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Seleccione
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button onClick={() => (this._setRuta(rutas))} type="button" data-toggle="modal" data-target="#ModalActz"
                                className="dropdown-item text-primary">Actualizar</button>
                            <button onClick={() => (this._setRuta(rutas))} type="button" data-toggle="modal" data-target="#ModalDelete"
                                className="dropdown-item text-danger">Eliminar</button>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item text-primary" to={'/rutas/' + rutas.codRuta + '/estaciones'}>Ver Estaciones</Link>
                        </div>
                    </div>
                </td>
            </tr>
        );

        return (
            <div>
                <table className="table">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">Codigo Ruta</th>
                            <th className='text-center' scope="col">Nombre</th>
                            <th className='text-center' scope="col">Inicio Operación</th>
                            <th className='text-center' scope="col">Fin Operación</th>
                            <th className='text-center' scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody>{listRutas}</tbody>
                </table>
                <div>
                    <Link type="button" to='/registro/estaciones' className="btn btn-outline-danger" >Agregar</Link>
                </div>
                <div className="modal fade" id="ModalActz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-italic Italica text-primary" id="exampleModalLongTitle">Actualizar Ruta</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this._notSubmit}>
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label > Nuevo Nombre</label>
                                        <input type="text" value={this.state.ruta.nombre} onChange={this._handleName} className="form-control" name="nombre" id="nombre" placeholder="Nombre" required />
                                        <p></p>
                                        <label > Nuevo Inicio Operación</label>
                                        <input type="text" value={this.state.ruta.inicioOperacion} onChange={this._handleOpeningTime} className="form-control" name="inicioOperacion" id="horaApertura" placeholder="Inicio Operación" required />
                                        <p></p>
                                        <label > Nuevo Fin Operación</label>
                                        <input type="text" value={this.state.ruta.finOperacion} onChange={this._handleClosingTime} className="form-control" name="finOperacion" id="horaCierre" placeholder="Fin Operación" required />
                                        <p></p>
                                    </div>
                                    <button onClick={this._handleSubmit} type="submit" className="btn btn-primary" >Actualizar</button>
                                </form>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ModalDelete" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-italic Italica text-danger" id="exampleModalLongTitle">¿Estás seguro de eliminar la Troncal?</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <p>Se eliminaran todas las estaciones relacionadas.</p>
                                <button type="submit" onClick={this._handleDelete} className="btn btn-danger" >Eliminar</button>
                                <button type="button" className="btn btn-secondary" data-dismiss="modal" aria-label="Close">Cancelar</button>
                            </div>
                            <div className="modal-footer">
                            </div>
                        </div>
                    </div>
                </div>
            </div >
        )
    }

}


