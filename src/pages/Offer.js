import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Alert from '@mui/material/Alert';
import Button from 'react-bootstrap/Button';
import './Offer.css';
import Header from '../components/Header';
import axios from 'axios';
import Footer from '../components/Footer';

function Offer() {

    const [ number, setNumber ] = useState('');
    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const validateOffer = () => {
        let offerID = 0;

        if(selectedIndex==1){
            offerID = 209616745;
        }else if(selectedIndex==2){
            offerID = 209616746;
        }else{
            offerID = 209616747;
        }

        const number = JSON.parse(localStorage.getItem('phoneNumber'));
        if (number) {
            setNumber(number);
        }

        var data = JSON.stringify({
            "subscriberNumber": `${number}`,
            "offerID": `${offerID}`
        });

        var config = {
            method: 'post',
            // url: 'http://localhost:9173/activate',
            url: 'http://blueviu.camtel.cm/activate',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config) .then(function (response) {
            // console.log(JSON.stringify(response.data));

            var json = JSON.stringify(response.data);
            var data = JSON.parse(json);

            // alert(data.result.resultCode);

            if(data.result.resultCode == 405000000){
                alert('Offre activée avec succès! Vous allez recevoir vos paramètres de connexion par sms.');
            }else if(data.result.resultCode == 405000614 ) {
                alert('Le solde de votre compte est insuffisant.');
            }else if(data.result.resultCode == 405000612) {
                alert('Le service a été commandé, donc ne peut être ajouté.');
            }else if(data.result.resultCode == 405000615) {
                alert('Le même ensemble de package facultatif vous permet uniquement d\'en sélectionner un.');
            }else {
                alert('Echec de l\'opération. Veuillez réessayer plus tard.');
            }

        }).catch(function (error) {
            // console.log(error);
            alert('Echec de l\'opération. Veuillez réessayer plus tard.');
        });

    }

    return (
        <div className='offer-container'>

            <Header/>

            <div class='offer-content'>
                <div className='form-content'>
                    <div><h2>Sélectionnez une offre TV</h2></div>
                    <div className='box'>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List component="nav" aria-label="forfaits" className='list'>
                                <ListItemButton
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemText primary="Blue VIU S" secondary='Journalier (24H) = SPOT 100U' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <ListItemText primary="Blue VIU M" secondary='Hebdomadaire (7jours) = SPOT 100U' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <ListItemText primary="Blue VIU L" secondary='Mensuel (30 jours) = SPOT 100U' />
                                </ListItemButton>
                            </List>
                        </Box>
                    </div> <br/>
                    <div>
                        <Button 
                            variant="primary" 
                            className='v-offer-btn'
                            onClick={validateOffer}
                        >Valider</Button>
                    </div>
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default Offer;