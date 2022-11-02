import React from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import TextField from '@mui/material/TextField';

import './Login.css'

function Login() {
    return (
        <div className='login-container'>
            
            <div className='header-nav'>
                <Navbar className='navbar'>
                    <Container className='navbar-container justify-content-center'>
                        <Navbar.Brand href="#home" className='navbar-brand justify-content-center'>
                            <img
                                src="/MwareTV-Logo.png"
                                width="100%"
                                height="50"
                                className="logo d-inline-block align-top"
                                alt="mware tv logo"
                            />
                        </Navbar.Brand>
                    </Container>
                </Navbar>
            </div>

            <div className='login-content'>
                <div className='login-form'>
                    <div><h2>Se connecter</h2></div>
                    <div><p>Vous disposez déjà d'un compte mware TV ? Saisissez l'identifiant téléphone de votre compte et le mot de passe.</p></div>
                    <div>
                        <TextField 
                            id="outlined-basic"
                            label="Téléphone" 
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
                    
                    <div><Button variant="primary" className='login-btn'>Valider</Button></div>
                </div>
            </div>

        </div>
    );
}

export default Login;