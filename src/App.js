import React, { Component } from 'react';
import './App.css';
import { Switch, Route } from 'react-router-dom'
import 'bulma/css/bulma.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Detail } from './pages/DetailsEstacion'
import { DetailRuta } from './pages/DetailsRuta'
import { DetailTroncal } from './pages/DetailsTroncal'
import Home from './pages/Home'
import { NotFound } from './pages/NotFound'
import { Troncales } from './pages/Troncal'
import { Estaciones } from './pages/Estaciones'
import { Rutas } from './pages/Rutas'
import { Menu } from './components/Menu'
import { RegistroTroncal } from './pages/AddTroncal'
import { RegistroEstacion } from './pages/AddEstacion'
import { RegistroRuta } from './pages/AddRuta'

export default class App extends Component {

  render() {
    const url = new URL(document.location)
    const hashId = url.searchParams.has('id')
    if (hashId) {
      return (
        <div>
          <Menu />
          <Detail id={url.searchParams.get('id')} />
        </div>
      )
    }
    return (
      <div>
        <Menu />
        <Switch>
          <Route exact path='/' component={Home} />
          <Route path='/estaciones/:id/rutas' component={Detail} />
          <Route path='/rutas/:id/estaciones' component={DetailRuta} />
          <Route path='/troncales/:id/estaciones' component={DetailTroncal} />
          <Route path='/troncales' component={Troncales} />
          <Route path='/estaciones' component={Estaciones} />
          <Route path='/rutas' component={Rutas} />
          <Route path='/registro/troncales' component={RegistroTroncal}/>
          <Route path='/registro/estaciones' component={RegistroEstacion}/>
          <Route path='/registro/rutas' component={RegistroRuta}/>
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}


