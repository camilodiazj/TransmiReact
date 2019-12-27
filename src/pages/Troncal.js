import React, { Component } from 'react';
import { Troncal } from '../components/TroncalList'
import { ButtonBackToHome } from '../components/ButtonBack'
import { getFetch } from '../components/Rest'

export class Troncales extends Component {

    state = { troncales: {} }

    componentDidMount() {
        getFetch('http://localhost:9090/troncales')
        .then(troncales => {
            console.log(troncales)
            this.setState({troncales})
        })
    }

    render() {
        const { troncales } = this.state
        if (typeof (troncales[0]) !== 'undefined') {
            return (
                <div>
                    <div className='container  p-4'>
                        <Troncal troncales={troncales} />
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h3 className='text-danger text-center p-4' >No hay troncales</h3>
                    <ButtonBackToHome />
                </div>
            )
        }
    }
}

