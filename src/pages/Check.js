import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Header from '../components/Header';
import TextField from '@mui/material/TextField';
import './Check.css'
import Footer from '../components/Footer';

function Check(props) {

    const navigate = useNavigate();

    const [ number, setNumber ] = useState('');

    const onChangeHandler = event => {
        setNumber(event.target.value.replace(/\D/g, ""));
    };

    const checkOPT = () => {

        if(number == ''){
            alert('Veuillez entrer le code de vérification.');
        }else{
            var myHeaders = new Headers();
            myHeaders.append("Content-Type", "application/json");
            myHeaders.append("Access-Control-Allow-Origin", "*");
            myHeaders.append("Access-Control-Allow-Methods", "POST, GET, PUT, OPTIONS");

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

                // console.log(response.text());

                Promise.resolve({
                    data: response.text()
                }).then(post => {
                    console.log('Promise DATA: '+JSON.stringify(post.data));
                })
                
            })
            .then(result => {
                console.log(result);
                // alert(result);
            })
            .catch(error => {
                alert('Le code de vérification entré a expiré...');
                console.log('Error: ', error)
            });

            // if(data != ''){
            //     // window.location = '/offer'
            //     navigate("/offer",  { replace: true });
            // }else{
            //     alert('Le code de vérification entré est incorrect...');
            // }
        }

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
                        id="outlined-basic"
                        variant="outlined" 
                        inputProps={{ inputMode: 'numeric', pattern: '[0-9]*', maxLength: 4 }} 
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
                        disabled={number.length < 4}
                        onClick = {checkOPT}
                    >Valider</Button>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default Check;