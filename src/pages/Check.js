import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import './Check.css'
import Footer from '../components/Footer';

function Check() {

    const navigate = useNavigate();

    const [ number, setNumber ] = useState('');

    const onChangeHandler = event => {
        setNumber(event.target.value.replace(/\D/g, ""));
    };

    const checkOPT = () => {

        if(number == ''){
            alert('Veuillez entrer le code de vérification.');
        }else{

            const subscriber = JSON.parse(localStorage.getItem('phoneNumber'));

            var data = JSON.stringify({
                "token": `${number}`,
                "number": `${subscriber}`
            });

            var config = {
            method: 'post',
            url: 'http://blueviu.camtel.cm/checkcode',
            // url: 'http://localhost:9173/checkcode',
            headers: { 
                'Content-Type': 'application/json'
            },
                data : data
            };

            axios(config).then(function (response) {
                // console.log(JSON.stringify(response.data));

                var json = JSON.stringify(response.data);
                var data = JSON.parse(json);

                // alert(data.authed);

                if(data.authed == false) {
                    alert('Le code de vérification entré est incorrect...');
                }else{
                    navigate("/offer",  { replace: true });
                }
                
                // Gérer le cas ci-dessous
                //     alert('Le code de vérification entré a expiré...');

            }).catch(function (error) {
                alert('Erreur d\'authentification...')
                console.log(error);
            });

        }

    }

    return (
        <div className='check-container'>

            <Header/>

            <div className='check-content'>
                <div><h1>Un code de vérification a été envoyé à votre numéro.</h1></div>
                <div><h1> Veuillez entrer ce code.</h1></div> <br/>
                <div>
                    <TextField 
                        id="outlined-basic"
                        variant="outlined" 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 6 }} 
                        label='CODE'
                        onChange={onChangeHandler}
                        value={number}
                        required 
                    />
                </div> <br/>
                <div>
                    <Button 
                        variant = "primary"
                        className='btn'
                        disabled={number.length < 6}
                        onClick = {checkOPT}
                    >Valider</Button>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default Check;