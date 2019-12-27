import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { putFetch, getFetch, deleteFetch } from '../components/Rest';

export class EstacionesList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            troncales: {},
            estacion: {
                codEstacion: '',
                nombre: '',
                estado: '',
                horaApertura: '',
                horaCierre: '',
                codTroncal: ''
            }
        }
        this._fetchTroncal()
    }

    static propTypes = {
        estaciones: PropTypes.array,
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }

    _setEstacion = (estacion) => {
        this.setState({ estacion })
    }

    handleOnChange = (e) => {
        let estacion = Object.assign({}, this.state.estacion);
        estacion[e.target.name] = e.target.value;
        this.setState({ estacion })
    }

    _notSubmit = () => {
        let estacion = {};
        this.setState({ estacion })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { estacion } = this.state
        putFetch('http://localhost:9090/estaciones/', estacion)
            .then(data => {
                console.log(data)
                alert('Estación Actualizada')
                window.history.go("/estaciones");
            }
            )
    }

    _fetchTroncal = () => {
        getFetch('http://localhost:9090/troncales')
            .then(troncales => {
                this.setState({ troncales })
                this.setState({ troncalAdded: true })
            })
    }

    _handleDelete = (e) => {
        e.preventDefault();
        const { codEstacion } = this.state.estacion
        deleteFetch('http://localhost:9090/estaciones/' + codEstacion)
            .then(data => {
                console.log(data)
                alert('Estación eliminada')
                window.history.go("/estaciones");
            })
    }


    render() {
        const { estaciones } = this.props;
        const { troncales, troncalAdded } = this.state;
        let listTroncales = [];
        if (troncalAdded) {
            listTroncales = troncales.map((troncal) =>
                <option key={troncal.codTroncal} value={troncal.codTroncal}>{troncal.codTroncal}</option>
            );
        }

        const listEstaciones = estaciones.map((estacion) =>
            <tr key={estacion.codEstacion}>
                <td className='text-center'>{estacion.codEstacion}</td>
                <td className='text-center'>{estacion.nombre}</td>
                <td className='text-center'>{estacion.estado}</td>
                <td className='text-center'>{estacion.horaApertura}</td>
                <td className='text-center'>{estacion.horaCierre}</td>
                <td className='text-center'>{estacion.codTroncal}</td>
                <td className='text-center'>
                    <div className="dropdown show mx-auto">
                        <button className="btn btn-primary dropdown-toggle dropdown-toggle-split" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Seleccione
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button onClick={() => (this._setEstacion(estacion))} type="button" data-toggle="modal" data-target="#ModalActz"
                                className="dropdown-item text-primary">Actualizar</button>
                            <button onClick={() => (this._setEstacion(estacion))} type="button" data-toggle="modal" data-target="#ModalDelete"
                                className="dropdown-item text-danger">Eliminar</button>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item text-primary" to={'/estaciones/' + estacion.codEstacion + '/rutas'}>Ver Rutas</Link>
                        </div>
                    </div>
                </td>
            </tr>
        );

        if (!troncalAdded) {
            return (
                <React.Fragment>
                    <table className="table border border-danger">
                        <thead>
                            <tr>
                                <th className='text-center' scope="col">Codigo Estación</th>
                                <th className='text-center' scope="col">Nombre</th>
                                <th className='text-center' scope="col">Estado</th>
                                <th className='text-center' scope="col">Hora Apertura</th>
                                <th className='text-center' scope="col">Hora Cierre</th>
                                <th className='text-center' scope="col">Codigo Troncal</th>
                                <th className='text-center' scope="col">Opción</th>
                            </tr>
                        </thead>
                        <tbody>{listEstaciones}</tbody>
                    </table>
                    <div>
                        <Link type="button" to='/registro/estaciones' className="btn btn-outline-danger" >Agregar</Link>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <table className="table border border-danger">
                        <thead>
                            <tr>
                                <th className='text-center' scope="col">Codigo Estación</th>
                                <th className='text-center' scope="col">Nombre</th>
                                <th className='text-center' scope="col">Estado</th>
                                <th className='text-center' scope="col">Hora Apertura</th>
                                <th className='text-center' scope="col">Hora Cierre</th>
                                <th className='text-center' scope="col">Codigo Troncal</th>
                                <th className='text-center' scope="col">Opción</th>
                            </tr>
                        </thead>
                        <tbody>{listEstaciones}</tbody>
                    </table>
                    <div>
                        <Link type="button" to='/registro/estaciones' className="btn btn-outline-danger" >Agregar</Link>
                    </div>
                    <div className="modal fade" id="ModalActz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                        <div className="modal-dialog modal-dialog-centered" role="document">
                            <div className="modal-content">
                                <div className="modal-header">
                                    <h5 className="modal-title font-italic Italica text-primary" id="exampleModalLongTitle">Actualizar Estación</h5>
                                    <button type="button" className="close" data-dismiss="modal" aria-label="Close" onClick={this._notSubmit}>
                                        <span aria-hidden="true">&times;</span>
                                    </button>
                                </div>
                                <div className="modal-body">
                                    <form>
                                        <div className="form-group">
                                            <label > Nuevo Nombre</label>
                                            <input type="text" value={this.state.estacion.nombre} onChange={this.handleOnChange} className="form-control" name="nombre" id="nombre" placeholder="Nombre" required />
                                            <p></p>
                                            <label > Nuevo Estado</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <label name='Estado' className="input-group-text" htmlFor="inputGroupSelect03">Estado</label>
                                                </div>
                                                <select value={this.state.estacion.estado} onChange={this.handleOnChange} className="custom-select" id="inputGroupSelect03" name="estado">
                                                    <option value="Abierta">Abierta</option>
                                                    <option value="Cerrada">Cerrada</option>
                                                    <option value="Bloqueada">Bloqueada</option>
                                                </select>
                                            </div>
                                            <p></p>
                                            <label > Nueva Hora Apertura</label>
                                            <input type="text" value={this.state.estacion.horaApertura} onChange={this.handleOnChange} className="form-control" name="horaApertura" id="horaApertura" placeholder="Hora Apertura" required />
                                            <p></p>
                                            <label > Nueva Hora Cierre</label>
                                            <input type="text" value={this.state.estacion.horaCierre} onChange={this.handleOnChange} className="form-control" name="horaCierre" id="horaCierre" placeholder="Hora Cierre" required />
                                            <p></p>
                                            <label > Nuevo Codigo Troncal</label>
                                            <div className="input-group">
                                                <div className="input-group-prepend">
                                                    <label name='codTroncal' className="input-group-text" htmlFor="inputGroupSelect01">Troncal</label>
                                                </div>
                                                <select value={this.state.estacion.codTroncal} onChange={this.handleOnChange} className="custom-select" id="inputGroupSelect01" name="Troncal">
                                                    {listTroncales}
                                                </select>
                                            </div>
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
                </React.Fragment>
            )
        }

    }
}