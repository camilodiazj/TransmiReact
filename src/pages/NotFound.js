import React from 'react';
import {ButtonBackToHome} from '../components/ButtonBack'


export const NotFound = () => (
    <div className='container fluid' >
        <center>
            <img src={require('../elements/technical_difficulties.jpg')} alt='technical difficulties' />
            <ButtonBackToHome/>
        </center>
    </div>
)