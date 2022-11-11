import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import './Check.css'

function Check(props) {

    const [ number, setNumber ] = useState('');

    const onChangeHandler = event => {
        setNumber(event.target.value);
    };

    const checkOPT = () => {

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "token": `${number}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'no-cors'
        };

        fetch("http://localhost:9173/checkcode", requestOptions)
        .then(response => {
            let isPending = true;

            Promise.resolve({
                data: response.text()
            }).then(post => {
                isPending = false; 
                console.log('DATA: '+JSON.stringify(post.data))
            })

            if(isPending = false){
                window.location = '/offer'
            }else{
                alert('Le code de vérification entré est incorrect...');
            }
            // console.log(response.text());
            // alert('SUCCESS')
        })
        .then(result => {
            console.log(result)
        })
        .catch(error => {
            alert('Le code de vérification entré a expiré...');
            console.log('error', error)
        });

    }

    return (
        <div className='check-container'>

            <Header/>

            <div className='check-content'>
                <div><h1>Un code de vérification a été envoyé à votre numéro.</h1></div>
                <div><h1> Veuillez entrer ce code.</h1></div> <br/>
                <p>{props.data}</p>
                <div>
                    <TextField 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }} 
                        placeholder='CODE'
                        onChange={onChangeHandler}
                        value={number} />
                </div> <br/>
                <div>
                    <Button 
                        variant = "primary" 
                        onClick = {checkOPT}
                    >Valider</Button>
                </div>
            </div>
        </div>
    );
}

export default Check;