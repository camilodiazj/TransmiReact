import React, { Component } from 'react';
import { ButtonBackToHome } from '../components/ButtonBack'
import { EstacionesList } from '../components/EstacionesList'
import { getFetch } from '../components/Rest' 

export class Estaciones extends Component {

    state = { estaciones: {} }

    componentDidMount() {
        getFetch('http://localhost:9090/estaciones')
        .then(estaciones => {
            console.log(estaciones)
            this.setState({ estaciones })
        })
    }

    render() {
        const { estaciones } = this.state
        if (typeof (estaciones[0]) !== 'undefined') {
            return (
                <div>
                    <div className='container  p-4'>
                        <EstacionesList estaciones={estaciones} />
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h3 className='text-danger text-center p-4' >No hay estaciones</h3>
                    <ButtonBackToHome />
                </div>
            )
        }
    }
}

