import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';
import Button from 'react-bootstrap/Button';
import './Offer.css';
import Header from '../components/Header';
import axios from 'axios';
import Footer from '../components/Footer';

function Offer({ signOut }) {

    const navigate = useNavigate();

    const [ number, setNumber ] = useState('');
    const [ selectedIndex, setSelectedIndex ] = React.useState(1);
    const [ loading, setLoading ] = useState(false);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    const validateOffer = () => {
        setLoading(true);

        let offerID = 0;

        if(selectedIndex==1){
            offerID = 209616745;
        }else if(selectedIndex==2){
            offerID = 209616746;
        }else{
            offerID = 209616747;
        }

        const number = localStorage.getItem('subscriber_number');
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
            url: 'http://blueviu.camtel.cm:9173/activate',
            headers: { 
                'Content-Type': 'application/json'
            },
            data : data
        };

        axios(config) .then(function (response) {
            console.log(JSON.stringify(response.data));

            setLoading(false);
            localStorage.setItem('result_code', 405000000);
            navigate("/msg", { replace: true });

            // if(response.data.subscribeCRM == 'OK'){
            //     setLoading(false);
            //     localStorage.setItem('result_code', 405000000);
            //     navigate("/msg", { replace: true });
            // }else{
            //     setLoading(false);
            //     // alert('Echec d\'activation de l\'offre');
            //     navigate("/msg", { replace: true });
            //     console.log(response.data);
            // }

            // var json = JSON.stringify(response.data);
            // var data = JSON.parse(json);

            // if(response.data.result.resultCode == 405000000){
            //     setLoading(false);
            //     localStorage.setItem('result_code', 405000000);
            //     navigate("/msg", { replace: true });
            //     // alert('Offre activée avec succès! Vous allez recevoir vos paramètres de connexion par sms.');
            // }else if(data.result.resultCode == 405000614 ) {
            //     setLoading(false);
            //     localStorage.setItem('result_code', 405000614);
            //     navigate("/msg", { replace: true });
            //     // alert('Le solde de votre compte est insuffisant. Veuillez recharger votre compte.');
            // }else if(data.result.resultCode == 405000612) {
            //     setLoading(false);
            //     localStorage.setItem('result_code', 405000612);
            //     navigate("/msg", { replace: true });
            //     // alert('Le service a été commandé, donc ne peut être ajouté.');
            // }else if(data.result.resultCode == 405000615) {
            //     setLoading(false);
            //     localStorage.setItem('result_code', 405000615);
            //     navigate("/msg", { replace: true });
            //     // alert('Le même ensemble de package facultatif vous permet uniquement d\'en sélectionner un.');
            // }else {
            //     setLoading(false);
            //     navigate("/msg", { replace: true });
            //     // alert('Echec de l\'opération. Veuillez réessayer plus tard.');
            // }

        }).catch(function (error) {
            // console.log(error);
            setLoading(false);
            // return(
            //     <div className='msg-red'>
            //         <p>Echec de la transaction. Veuillez réessayer plus tard.</p> <br/><br/>
            //         <p><Link to='/offer'>Retour en arrière</Link></p>
            //     </div>
            // )
            alert('Echec de la transaction. Veuillez réessayer plus tard.');
        });

    }

    if (loading) {
        return (
            <div className='circular-progress'>
                <CircularProgress />
            </div>
        )
    }

    return (
        <div className='offer-container'>

            <Header signOut={signOut} />

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
                                    <ListItemText primary="Blue VIU S" secondary='Journalier (24H) = 600U' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <ListItemText primary="Blue VIU M" secondary='Hebdomadaire (7jours) = 2000U' />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <ListItemText primary="Blue VIU L" secondary='Mensuel (30 jours) = 6000U' />
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