import React, { Component } from 'react';
import { postFetch } from '../components/Rest'
import { Link } from 'react-router-dom';

export class RegistroTroncal extends Component {

    constructor(props) {
        super(props)
        this.state = {
            troncal: {
                codTroncal: '',
                nombre: ''
            }
        }
    }

    handleOnChange = (e) => {
        let troncal = Object.assign({}, this.state.troncal);
        troncal[e.target.name] = e.target.value;
        this.setState({ troncal })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        const { troncal } = this.state;
        postFetch("http://localhost:9090/troncales", troncal)
            .then(status => {
                console.log(status)
                alert('Troncal Agregada')
                window.history.go("/troncales");
            })
    }

    render() {

        return (
            <React.Fragment>
                <div className='container border border-danger p-4 w-50 h-75' >
                    <form>
                        <div className="form-group">
                            <label >Codigo Troncal</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="codTroncal" id="codTroncal" placeholder="Nombre" required />
                            <small id="emailHelp" className="form-text text-muted">El codigo identificador debe ser una letra del alfabeto.</small>
                            <p></p>
                            <label >Nombre Troncal</label>
                            <input type="text" onChange={this.handleOnChange} className="form-control" name="nombre" id="nombre" placeholder="Codigo Trocal" required />
                            <small id="emailHelp" className="form-text text-muted">Nombre para la troncal.</small>
                        </div>
                        <div className="row">
                            <div className="col-md-auto">
                                <button type="submit" onClick={this._handleSubmit} className="btn btn-primary btn-center" >Agregar</button>
                            </div>
                            <div className="col-md-auto">
                                <Link type="button" to='/troncales' className="btn btn-outline-danger" >Ver Troncales</Link>
                            </div>
                        </div>
                    </form>
                </div>

            </React.Fragment>
        )
    }
}