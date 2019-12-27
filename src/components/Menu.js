import React from 'react';
import { Link } from 'react-router-dom';

export const Menu = () => (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <Link className="navbar-brand font-weight-bold text-danger font-italic Italica" to={'/'}>ApiTransmi</Link>
        <button type="button" className="navbar-toggler" data-toggle="collapse" data-target="#navbarNav"
            aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav">
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to={'#'} id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Troncales
                    </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to={'/registro/troncales'}>Agregar Troncal</Link>
                        <Link className="dropdown-item" to={'/troncales'}>Ver Troncales</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to={'#'} id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Estaciones
                  </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to={'/registro/estaciones'}>Agregar Estación</Link>
                        <Link className="dropdown-item" to={'/estaciones'}>Ver Estaciones</Link>
                    </div>
                </li>
                <li className="nav-item dropdown">
                    <Link className="nav-link dropdown-toggle" to={'#'} id="navbarDropdownMenuLink" data-toggle="dropdown"
                        aria-haspopup="true" aria-expanded="false">
                        Rutas
                  </Link>
                    <div className="dropdown-menu" aria-labelledby="navbarDropdownMenuLink">
                        <Link className="dropdown-item" to={'/registro/rutas'}>Agregar Ruta</Link>
                        <Link className="dropdown-item" to={'/rutas'}>Ver Rutas</Link>
                    </div>
                </li>
            </ul>
        </div>
    </nav>

)