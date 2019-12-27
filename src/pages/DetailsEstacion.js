import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Ruta } from '../components/Ruta';
import { ButtonBackToHome } from '../components/ButtonBack'


export class Detail extends Component {
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }

    state = { rutas: {} }

    _fetchRuta({ id }) {
        console.log(id)
        fetch('http://localhost:9090/estaciones/' + id + '/rutas')

            .then(resp => resp.json())
            .then(rutas => {
                console.log({ rutas })
                this.setState({ rutas })

            })
        fetch('http://localhost:9090/estaciones/' + id + '/rutas')
            .then(res =>
                res.status)
            .then(res => {
                if (res === 200) {
                    console.log("Status: " + res);
                }
            })

    }

    _goBack = () => {
        window.history.back()
    }

    componentDidMount() {
        console.log(this.props.match)
        const { id } = this.props.match.params
        this._fetchRuta({ id })
        
    }

    render() {
        const { rutas } = this.state
        if (typeof (rutas[0]) !== 'undefined') {
            return (
                <div>
                    <div className='container  p-4'>
                        <Ruta rutas={rutas} />
                        <ButtonBackToHome />
                    </div>

                </div>
            )
        } else {
            return (
                <div className='container'>
                    <h3 className='text-danger text-center p-4' >La estación seleccionada no tiene rutas registradas.</h3>
                    <ButtonBackToHome />

                </div>
            )
        }
    }
} 
