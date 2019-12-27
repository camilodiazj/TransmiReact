import React from 'react';

export const ButtonBackToHome = () =>(
    <button type="button" onClick={() => (window.history.back())} className="btn btn-outline-danger">Volver</button>
)
