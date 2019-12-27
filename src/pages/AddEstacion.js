import React, { Component } from 'react';
import { postFetch, getFetch } from '../components/Rest'
import { Link } from 'react-router-dom';

export class RegistroEstacion extends Component {

    constructor(props) {
        super(props)
        this.state = {
            troncalAdded: false,
            troncales: {},
            estacion: {
                codEstacion: '',
                nombre: '',
                estado: 'Abierta',
                horaApertura: '',
                horaCierre: '',
                codTroncal: ''
            }
        }
    }

    handleOnChange = (e) => {
        let estacion = Object.assign({}, this.state.estacion);
        estacion[e.target.name] = e.target.value;
        this.setState({ estacion })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { estacion } = this.state;
        postFetch("http://localhost:9090/estaciones", estacion)
            .then(status => {
                console.log(status)
                alert('Estación Agregada')
                console.log(estacion)
                window.history.go("/estaciones");
            })
    }

    componentDidMount() {
        getFetch('http://localhost:9090/troncales')
            .then(troncales => {
                this.setState({ troncales })
                this.setState({ troncalAdded: true })
            })
    }

    render() {
       
        const { troncales, troncalAdded } = this.state;
        let listTroncales = [];
        if (troncalAdded) {
            listTroncales = troncales.map((troncal) =>
                <option key={troncal.codTroncal} value={troncal.codTroncal}>{troncal.codTroncal}</option>
            );
        }
        

        if (troncalAdded) {
            return (
                <React.Fragment>
                    <div className='container border border-danger p-4 w-50 h-75' >
                        <form>
                            <div className="form-group">
                                <label >Codigo Estación</label>
                                <input type="text" onChange={this.handleOnChange} className="form-control" name="codEstacion" id="codEstacion" placeholder="Codigo Estación" required />
                                <p></p>
                                <label >Nombre</label>
                                <input type="text" onChange={this.handleOnChange} className="form-control" name="nombre" id="nombre" placeholder="Nombre" required />
                                <p></p>
                                <label > Nuevo Estado</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label name='Estado' className="input-group-text" htmlFor="inputGroupSelect03">Estado</label>
                                    </div>
                                    <select onChange={this.handleOnChange} className="custom-select" id="inputGroupSelect03" name="estado">
                                        <option value="Abierta">Abierta</option>
                                        <option value="Cerrada">Cerrada</option>
                                        <option value="Bloqueada">Bloqueada</option>
                                    </select>
                                </div>
                                <p></p>
                                <label > Nueva Hora Apertura</label>
                                <input type="text" onChange={this.handleOnChange} className="form-control" name="horaApertura" id="horaApertura" placeholder="Hora Apertura" required />
                                <p></p>
                                <label > Nueva Hora Cierre</label>
                                <input type="text" onChange={this.handleOnChange} className="form-control" name="horaCierre" id="horaCierre" placeholder="Hora Cierre" required />
                                <p></p>
                                <label > Nuevo Codigo Troncal</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label name='Troncal' className="input-group-text" htmlFor="inputGroupSelect01">Troncal</label>
                                    </div>
                                    <select  onChange={this.handleOnChange} className="custom-select" id="inputGroupSelect01" name="codTroncal">
                                        <option value="" defaultValue>Seleccionar...</option>
                                        {listTroncales}
                                    </select>
                                </div>
                            </div>
                            <div className="row">
                            <div className="col-md-auto">
                                <button type="submit" onClick={this._handleSubmit} className="btn btn-primary btn-center" >Agregar</button>
                            </div>
                            <div className="col-md-auto">
                                <Link type="button" to='/estaciones' className="btn btn-outline-danger" >Ver Estaciones</Link>
                            </div>
                        </div>
                            
                        </form>
                    </div>
                </React.Fragment>
            )
        } else {
            return (
                <React.Fragment>
                    <div className='container border border-danger p-4 w-50 h-75' >
                        <form>
                            <div className="form-group">
                                <label >Nombre</label>
                                <input type="text" onChange={this._handleName} className="form-control" name="nombre" id="nombre" placeholder="Nombre" required />
                                <p></p>
                                <label > Nuevo Estado</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label name='Estado' className="input-group-text" htmlFor="inputGroupSelect03">Estado</label>
                                    </div>
                                    <select onChange={this._handleState} className="custom-select" id="inputGroupSelect03" name="Estado">
                                        <option value="Abierta">Abierta</option>
                                        <option value="Cerrada">Cerrada</option>
                                        <option value="Bloqueada">Bloqueada</option>
                                    </select>
                                </div>
                                <p></p>
                                <label > Nueva Hora Apertura</label>
                                <input type="text" onChange={this._handleOpeningTime} className="form-control" name="horaApertura" id="horaApertura" placeholder="Hora Apertura" required />
                                <p></p>
                                <label > Nueva Hora Cierre</label>
                                <input type="text" onChange={this._handleClosingTime} className="form-control" name="horaCierre" id="horaCierre" placeholder="Hora Cierre" required />
                                <p></p>
                                <label > Nuevo Codigo Troncal</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <label name='Troncal' className="input-group-text" htmlFor="inputGroupSelect01">Troncal</label>
                                    </div>
                                    <select onChange={this._handleTroncalCode} className="custom-select" id="inputGroupSelect01" name="Troncal">
                                        {/* {listTroncales}  */}
                                    </select>
                                </div>
                            </div>
                            <button onClick={this._handleSubmit} type="submit" className="btn btn-primary" >Actualizar</button>
                        </form>
                    </div>
                </React.Fragment>
            )
        }

    }
}