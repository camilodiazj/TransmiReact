
//import PropTypes from 'prop-types';

export function PutTroncal (props){
    
    var url = 'http://localhost:9090/troncales/'; 
    
    return(
        fetch(url, {
            method: 'PUT',
            body: JSON.stringify(props.troncales),
            headers: {
                'Content-Type': 'application/json'
            }
        }).then(response => {
            console.log(response)
            if (response.status === 201) {
                console.log('Created')
                alert('Troncal actualizada.')
                window.location.href = "troncales";
            }
        })
    )

    
}