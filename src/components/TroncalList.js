import React, { Component } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { putFetch, deleteFetch } from '../components/Rest'

export class Troncal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            troncales: {
                nombre: '',
                codTroncal: ''
            }
        };
    }

    static propTypes = {
        troncales: PropTypes.array
    }

    _nuevaTroncal(troncal) {
        console.log(troncal)
        this.setState({ troncales: troncal })
    }

    _handleDelete = (e) => {
        e.preventDefault();
        const { codTroncal } = this.state.troncales
        deleteFetch('http://localhost:9090/troncales/'+ codTroncal)
        .then(data=> {
            console.log(data)
            alert('Troncal eliminada')
            window.history.go("/troncales");
        })
    }

    _handleChange = (e) => {
        let troncales = Object.assign({}, this.state.troncales);
        troncales.nombre = e.target.value;
        this.setState({ troncales })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { troncales } = this.state
        putFetch('http://localhost:9090/troncales/', troncales)
        .then(data => {
            console.log(data)
            alert('Troncal Actualizada')
            window.history.go("/troncales");
        }
        )
    }

    render() {
        const { troncales } = this.props;
        const listTroncales = troncales.map((troncales) =>
            <tr key={troncales.codTroncal}>
                <td className='text-center'>{troncales.codTroncal}</td>
                <td className='text-center'>{troncales.nombre}</td>
                <td className='text-center'>
                    <div className="dropdown show mx-auto">
                        <button className="btn btn-primary dropdown-toggle dropdown-toggle-split" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                            Seleccione
                        </button>
                        <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                            <button type="button" onClick={() => this._nuevaTroncal(troncales)} data-toggle="modal" data-target="#ModalActz"
                                className="dropdown-item text-primary">Actualizar</button>
                            <button type="button" onClick={() => this._nuevaTroncal(troncales)} data-toggle="modal" data-target="#ModalDelete"
                                className="dropdown-item text-danger">Eliminar</button>
                            <div className="dropdown-divider"></div>
                            <Link className="dropdown-item text-primary" to={'/troncales/' + troncales.codTroncal + '/estaciones'}>Ver Estaciones</Link>
                        </div>
                    </div>
                </td>
            </tr>
        );

        return (
            <div>
                <table className="table border border-danger">
                    <thead>
                        <tr>
                            <th className='text-center' scope="col">Codigo Troncal</th>
                            <th className='text-center' scope="col">Nombre</th>
                            <th className='text-center' scope="col">Opción</th>
                        </tr>
                    </thead>
                    <tbody>{listTroncales}</tbody>
                </table>
            <div>
            <Link type="button" to='/registro/troncales' className="btn btn-outline-danger" >Agregar</Link>
            </div>

                <div className="modal fade" id="ModalActz" tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
                    <div className="modal-dialog modal-dialog-centered" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title font-italic Italica text-primary" id="exampleModalLongTitle">Nuevo Nombre</h5>
                                <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true">&times;</span>
                                </button>
                            </div>
                            <div className="modal-body">
                                <form>
                                    <div className="form-group">
                                        <label >Nuevo Nombre</label>
                                        <input value={this.state.troncales.nombre} type="text" onChange={this._handleChange} className="form-control" name="nombre" id="nombre" placeholder="Nuevo Nombre" required />
                                        <small id="emailHelp" className="form-text text-muted">Nuevo nombre para la Troncal.</small>
                                    </div>
                                    <button type="submit" onClick={this._handleSubmit} className="btn btn-primary" >Actualizar</button>
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

