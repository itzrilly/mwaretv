import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import './Login.css';
import Footer from '../components/Footer';

function Login() {

    const navigate = useNavigate();

    const [ value, setValue ] = useState('');

    const onChangeHandler = event => {
        setValue(event.target.value.replace(/\D/g, ""));
    };

    const generateOTP = () => {

        var data = JSON.stringify({
            "telephone": value
        });

        var config = {
            method: 'post',
            url: 'http://blueviu.camtel.cm:9173/getcode',
            // url: 'http://localhost:9173/getcode',
        headers: { 
            'Content-Type': 'application/json'
        },
            data : data
        };

        axios(config).then(function (response) {
            console.log(JSON.stringify(response.data));

            // var json = JSON.stringify(response.data);
            // var data = JSON.parse(json);

            // alert(data.token);

            if(response.data['secret'] == 'OK'  && response.data['token'] == 'OK' && response.data['sms'] == 'OK' ) {
                navigate("/check", { replace: true });
            }else {
                alert('Echec d\'envoi du code d\'activation. Veuillez réessayer...');
            }

            // navigate("/check", { replace: true });
        }).catch(function (error) {
            console.log(error);
        });

    }

    return (
        <div className='login-container'>

            <Header/>

            <div className='login-content'>
                <div className='login-form'>
                    <div><h2>Se connecter</h2></div>
                    <div><p>Installez l'application Blue VIU disponible sur Google PlayStore et AppStore et Connectez-vous en saisissant votre numéro de téléphone.</p></div>
                    <div>
                        <TextField 
                            id="outlined-basic"
                            label="Numéro de téléphone Blue (620 XX XX XX)" 
                            type="text"
                            variant="outlined" 
                            required
                            className='textfield'
                            onChange={onChangeHandler}
                            value={value}
                            inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 9 }}  
                        />
                    </div>
                    
                    <div>
                        <Button 
                            variant = "primary" 
                            className = 'login-btn'
                            disabled={value.length < 9}
                            onClick = {generateOTP}
                        >Valider</Button>
                    </div> <br/>

                    <div>
                        <p>Cliquez sur le lien du Store correspondant à votre device en bas de cette page pour accéder à l'application mobile. </p>
                    </div>
                </div>
            </div>

            <Footer/>
        </div>
    );
}

export default Login;