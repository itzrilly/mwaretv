import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import './Login.css';
import Offer from './Offer';

function Login() {
    

    const [ value, setValue ] = useState('');

    const onChangeHandler = event => {
        setValue(event.target.value);
    };

    const generateOTP = () => {
        // var axios = require('axios');
        if(value.slice(0, 3) === '620'){
            // if(value == 9){
                var data = JSON.stringify({
                    "data": {
                        "telephone": '+237'+value
                    }
                });
            // }else{
            //     alert('Veuillez entrer un numero à 9 chiffres!');
            // }
        }else{
            alert('Veuillez entrer un numero Blue de CAMTEL!');
            setValue('');
        }

        // alert(data)

        var config = {
            method: 'post',
            url: 'https://us-central1-blue-app-3f21e.cloudfunctions.net/auth-generateOTP',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));
            if (response.status == 200) {
                window.location = '/check'
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <div className='login-container'>

            <Header data={value} />

            <div className='login-content'>
                <div className='login-form'>
                    <div><h2>Se connecter</h2></div>
                    <div><p>Vous disposez déjà d'un compte MWare TV ? Saisissez votre numéro de téléphone.</p></div>
                    <div>
                        <TextField 
                            id="outlined-basic"
                            label="Numéro de téléphone Blue (620 XX XX XX)" 
                            type="text"
                            variant="outlined" 
                            required
                            className='textfield'
                            onChange={onChangeHandler}
                            value={value} />
                    </div>
                    {/* <div>
                        <TextField
                            id="outlined-password-input"
                            label="Mot de passe"
                            type="password"
                            autoComplete="current-password"
                            className='textfield'
                        />
                    </div> */}
                    
                    <div>
                        <Button 
                            variant = "primary" 
                            className = 'login-btn'
                            onClick = {generateOTP}
                        >Valider</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;