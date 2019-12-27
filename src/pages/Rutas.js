import React, { Component } from 'react'
import { Ruta } from '../components/Ruta'
import { getFetch } from '../components/Rest'

export class Rutas extends Component {

    state = { rutas: {} }
    
    componentDidMount() {
        getFetch('http://localhost:9090/rutas')
        .then(rutas => {
            console.log(rutas)
            this.setState({rutas})
        })
    }

    render() {
        const { rutas } = this.state
        if (typeof (rutas[0]) !== 'undefined') {
            return (
                <div>
                    <div className='container  p-4'>
                        <Ruta rutas={rutas} />
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h3 className='text-danger text-center p-4' >No hay rutas</h3>
                </div>
            )
        }
    }
}


