import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {EstacionesList} from '../components/EstacionesList'
import {ButtonBackToHome} from '../components/ButtonBack'

export class DetailRuta extends Component {

    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }

    state = {estaciones: {}}

    _fetchEstacion({id}){
        fetch('http://localhost:9090/rutas/'+id+'/estaciones')
        .then(response => response.json())
        .then(estaciones => {
            console.log(estaciones)
            this.setState({estaciones})
        })
    }

    componentDidMount(){
        console.log(this.props.match)
        const { id } = this.props.match.params
        this._fetchEstacion({id})
    }

    render() {
        const { estaciones } = this.state
        if (typeof (estaciones[0]) !== 'undefined') {
            return (
                <div>
                    <div className='container  p-4'>
                        <EstacionesList estaciones={estaciones} />
                        <ButtonBackToHome />
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h3 className='text-danger text-center p-4' >La ruta seleccionada no tiene estaciones relacionadas.</h3>
                    <ButtonBackToHome />

                </div>
            )
        }
    }
}


