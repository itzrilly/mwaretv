import React, { useState, useEffect } from 'react';
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

    const [ minutes, setMinutes ] = useState(5);
    const [ seconds, setSeconds ] = useState(1);

    useEffect(() => {
        const interval = setInterval(() => {
            if (seconds > 0) {
                setSeconds(seconds - 1);
            }
      
            if (seconds === 0) {
                if (minutes === 0) {
                    clearInterval(interval);
                } else {
                    setSeconds(59);
                    setMinutes(minutes - 1);
                }
            }
        }, 1000);
      
        return () => {
            clearInterval(interval);
        };
    }, [seconds]);

    const resendOTP = () => {
        setMinutes(5);
        setSeconds(1);
        
        const subscriber = JSON.parse(localStorage.getItem('phoneNumber'));

        var data = JSON.stringify({
            "telephone": subscriber
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

            if(response.data['secret'] == 'OK'  && response.data['token'] == 'OK' && response.data['sms'] == 'OK' ) {
                navigate("/check", { replace: true });
            }else {
                alert('Echec d\'envoi du code d\'activation. Veuillez réessayer...');
            }
            
        }).catch(function (error) {
            console.log(error);
        });
        
    }

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
            url: 'http://blueviu.camtel.cm:9173/checkcode',
            // url: 'http://localhost:9173/checkcode',
            headers: { 
                'Content-Type': 'application/json'
            },
                data : data
            };

            axios(config).then(function (response) {
                // console.log(JSON.stringify(response.data));

                // var json = JSON.stringify(response.data);
                // var data = JSON.parse(json);

                // alert(response.data['authed']);

                if (response.data['authed']){
                    // alert(response.data['authed']);
                    navigate("/offer",  { replace: true });
                }else if(!response.data['authed']){
                    alert(!response.data['authed']);
                    // alert('Le code de vérification entré est incorrect...');
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
                </div> <br/>

                <div className='timer'>
                    { seconds > 0 || minutes > 0 ? 
                        (
                            <p>
                                Temps restant: {minutes < 10 ? `0${minutes}` : minutes}:{seconds < 10 ? `0${seconds}` : seconds}
                            </p>
                        ) : (
                            <p>Vous n'avez pas reçu de code ?</p>
                        )
                    }

                    <button
                        disabled={seconds > 0 || minutes > 0}
                        style={{
                            color: seconds > 0 || minutes > 0 ? "#DFE3E8" : "#FF5630",
                        }}
                        onClick={resendOTP}
                        className='regenerateOPT-btn'
                    >
                        Renvoyer le code
                    </button>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default Check;