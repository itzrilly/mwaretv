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

        var myHeaders = new Headers();
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({
            "subscriberNumber": `${number}`,
            "offerID": `${offerID}`
        });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow',
            mode: 'no-cors'
        };

        fetch("http://localhost:9173/activate", requestOptions)
        .then(response => {
            response.text()
            alert('Offre activée avec succès! Vous allez recevoir les paramètres de connexion par sms.');
        })
        .then(result => console.log(result))
        .catch(error => {
            alert('Echec de transaction.');
            console.log('error', error)
        });

    }

    return (
        <div className='offer-container'>

            <Header/>

            <div class='offer-content'>
                <div className='form-content'>
                    <div><h2>Sélectionnez une offre TV</h2></div>
                    <div>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List component="nav" aria-label="forfaits" className='list'>
                                <ListItemButton
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemText primary="Blue TV 1 = SPOT 100U" secondary='Journalier (24H)' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <ListItemText primary="Blue TV 2 = SPOT 100U" secondary='Hebdomadaire (7jours)' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <ListItemText primary="Blue TV 3 = SPOT 100U" secondary='Mensuel (30 jours)' />
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
        </div>
    );
}

export default Offer;