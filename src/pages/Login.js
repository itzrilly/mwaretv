import React, { useState } from 'react';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import './Login.css';

function Login() {

    const [ value, setValue ] = useState('');

    const onChangeHandler = event => {
        setValue(event.target.value);
    };

    const generateOTP = async () => {
        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");
        myHeaders.append("Access-Control-Allow-Methods", "POST");
        myHeaders.append("Access-Control-Allow-Origin", "*");

        if(value.slice(0, 3) === '620'){
            var raw = JSON.stringify({
                "telephone": `${value}`
            });
            localStorage.setItem('phoneNumber', JSON.stringify(value));
        }else{
            alert('Veuillez entrer un numero Blue de CAMTEL!');
            setValue('');
        }

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'no-cors',
        };

        await fetch("http://localhost:9173/getcode", requestOptions)
        .then(response => {
            // console.log(response.json())
            // alert(myString);
            window.location = '/check'
        })
        .then(data => {
            console.log(data)
        })
        .catch(error => {
            console.log('ERRROORRRRR');
            console.log('error', error)
        });
    }

    return (
        <div className='login-container'>

            <Header/>

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