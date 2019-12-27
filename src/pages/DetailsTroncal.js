import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {ButtonBackToHome} from '../components/ButtonBack';
import {EstacionesList} from '../components/EstacionesList';


export class DetailTroncal extends Component{
    
    static propTypes = {
        match: PropTypes.shape({
            params: PropTypes.object,
            isExact: PropTypes.bool,
            path: PropTypes.string,
            url: PropTypes.string
        })
    }
    
    state = {estaciones:{}}

    _fecthEstaciones({id}){
        fetch('http://localhost:9090/troncales/'+id+'/estaciones')
        .then(response => response.json())
        .then(estaciones => {
            console.log(estaciones)
            this.setState({estaciones})
        })
    }

    componentDidMount(){
        console.log(this.props)
        const {id} = this.props.match.params
        console.log(id)
        this._fecthEstaciones({id})
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
                    <h3 className='text-danger text-center p-4' >La troncal seleccionada no tiene estaciones registradas.</h3>
                    <ButtonBackToHome />

                </div>
            )
        }
    }
} 