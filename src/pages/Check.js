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
            //var axios = require('axios');
            var data = JSON.stringify({
            "data": {
                "token": number
            }
        });

        var config = {
            method: 'post',
            url: 'https://us-central1-blue-app-3f21e.cloudfunctions.net/auth-checkOTP',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config).then(function(response) {
            // alert(response.data.result);
            // console.log(JSON.stringify(response.data));
            // window.location = '/offer'
            if(response.data.result === true){
                window.location = '/offer';
            }else{
                alert('Le code de vérification entré est incorrect...');
            }
        }).catch(function (error) {
            console.log(error);
            alert('Le code de vérification entré est incorrect...');
        });
    }

    return (
        <div className='check-container'>
            {/* <Header/> */}

           

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