import React, { Component } from 'react';
import { EstacionesList } from '../components/EstacionesList';
import { SearchForm } from '../components/SearchForm';


export default class Homne extends Component {
    state = { usedSearch: false, results: [] }

    _handleResults = (results) => {
        this.setState({ results, usedSearch: true })
    }

    _renderResults = () => {
        return (
            typeof this.state.results === 'undefined' ?
                <p>Sin resultados</p>
                : <EstacionesList estaciones={this.state.results} />
        )
    }

    render() {
        return (
            <div className="App">

                <div className='SearchForm-wrapper'>
                    <SearchForm onResults={this._handleResults} />
                </div>
                {
                    this.state.usedSearch ?
                        this._renderResults()
                        : <small>Use the form to search a station</small>
                }
            </div>
        )
    }
}