import React, { Component } from 'react';
import { postFetch } from '../components/Rest'
import { Link } from 'react-router-dom';

export class RegistroRuta extends Component {

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

    handleOnChange = (e) => {
        let ruta = Object.assign({}, this.state.ruta);
        ruta[e.target.name] = e.target.value;
        this.setState({ ruta })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        console.log(this.state.ruta)
        const { ruta } = this.state;
        postFetch("http://localhost:9090/rutas/listas", ruta)
            .then(status => {
                console.log(status)
                alert('Ruta Agregada')
                //window.history.go("/rutas");
            })
    }

    render() {

        return (
            <React.Fragment>
                <div className='container border border-danger p-4 w-50 h-75' >
                    <form>
                        <div className="form-group">
                            <label > Codigo Ruta</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="codRuta" id="codRuta" placeholder="Codigo Ruta" required />
                            <p></p>
                            <label > Nombre</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="nombre" id="nombre" placeholder="Nombre" required />
                            <p></p>
                            <label > Inicio Operación</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="inicioOperacion" id="horaApertura" placeholder="Inicio Operación" required />
                            <p></p>
                            <label > Fin Operación</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="finOperacion" id="horaCierre" placeholder="Fin Operación" required />
                            <p></p>
                        </div>
                        <div className="row">
                            <div className="col-md-auto">
                                <button type="submit" onClick={this._handleSubmit} className="btn btn-primary btn-center" >Agregar</button>
                            </div>
                            <div className="col-md-auto">
                                <Link type="button" to='/rutas' className="btn btn-outline-danger" >Ver Rutas</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </React.Fragment>
        )
    }
}