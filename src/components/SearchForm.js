import React, { Component } from 'react';


export class SearchForm extends Component {
    state = {
        inputMovie: ''
    }

    _handleChange = (e) => {
        this.setState({ inputMovie: e.target.value })
    }

    _handleSubmit = (e) => {
        e.preventDefault();
        //alert(this.state.inputMovie)
        const {inputMovie} = this.state
        fetch('http://localhost:9090/estaciones/'+inputMovie)
        .then(res => res.json())
        .then(results => { 
            console.log({results})
            this.props.onResults(results)
        })
        
    }
 
    render() {
        return (
            <form onSubmit={this._handleSubmit}>
                <div className="field has-addons">
                    <div className="control">
                        <input
                            className="input"
                            onChange={this._handleChange}
                            type="text"
                            placeholder="Buscar Estaciones"
                        />
                    </div>
                    <div className="control">
                        <button className="button is-info">
                            Search
                    </button>
                    </div>
                </div>
            </form>
        )
    }
}