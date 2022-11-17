import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import CircularProgress from '@mui/material/CircularProgress';
import './Check.css'
import Footer from '../components/Footer';

function Check() {

    const navigate = useNavigate();

    const [ number, setNumber ] = useState('');
    const [ loading, setLoading ] = useState(false);

    const onChangeHandler = event => {
        setNumber(event.target.value.replace(/\D/g, ""));
    };

    const subscriber = localStorage.getItem('subscriber_number');

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
        setLoading(true);

        setMinutes(5);
        setSeconds(1);
        
        const subscriber = localStorage.getItem('subscriber_number');

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
                setLoading(false);
                navigate("/check", { replace: true });
            }else {
                setLoading(false);
                alert('Echec d\'envoi du code d\'activation. Veuillez réessayer plus tard...');
            }
            
        }).catch(function (error) {
            setLoading(false);
            console.log(error);
        });
        
    }

    const checkOPT = () => {

        setLoading(true);

        const subscriber = localStorage.getItem('subscriber_number');

        // alert(subscriber)

        if(number == ''){
            alert('Veuillez entrer le code de vérification.');
        }else{

            // alert(subscriber);

            var data = JSON.stringify({
                "token": `${number}`,
                "number": `${subscriber}`
            });

            console.log(data);

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
                console.log(JSON.stringify(response.data));

                if(response.data.authed == true) {
                    // alert('TRUE');
                    setLoading(false);
                    navigate("/offer",  { replace: true });
                }else{
                    setLoading(false);
                    alert('Le code de vérification entré est incorrect...');
                }

                // Gérer le cas ci-dessous
                //     alert('Le code de vérification entré a expiré...');

            }).catch(function (error) {
                // alert('Erreur d\'authentification...')
                console.log(error);
            });

        }

    }

    if (loading) {
        return (
            <div className='circular-progress'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className='check-container'>

            <Header/>

            <div className='check-content'>
                <div><p>Un code de vérification a été envoyé au numéro {subscriber}.</p></div>
                <div><p> Veuillez entrer ce code.</p></div> <br/>
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