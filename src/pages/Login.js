import React from 'react';
import Button from 'react-bootstrap/Button';
import TextField from '@mui/material/TextField';
import Header from '../components/Header';
import './Login.css';

function Login() {
    return (
        <div className='login-container'>

            <Header/>

            <div className='login-content'>
                <div className='login-form'>
                    <div><h2>Se connecter</h2></div>
                    <div><p>Vous disposez déjà d'un compte mware TV ? Saisissez l'identifiant téléphone de votre compte et le mot de passe.</p></div>
                    <div>
                        <TextField 
                            id="outlined-basic"
                            label="Numéro de téléphone" 
                            type="tel"
                            variant="outlined" 
                            className='textfield' />
                    </div>
                    <div>
                        <TextField
                            id="outlined-password-input"
                            label="Mot de passe"
                            type="password"
                            autoComplete="current-password"
                            className='textfield'
                        />
                    </div>
                    
                    <div>
                        <Button 
                            variant="primary" 
                            className='login-btn'
                            onClick={(e) => {
                                e.preventDefault();
                                window.location.href='./offer';
                            }}
                        >Valider</Button>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Login;