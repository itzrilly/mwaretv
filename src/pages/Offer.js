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
    // const [ selectedIndex, setSelectedIndex ] = React.useState(1);
    const [ loading, setLoading ] = useState(false);

    // const handleListItemClick = (event, index) => {
    //     setSelectedIndex(index);
    // };

    const validateOffer = (offerID) => {
        setLoading(true);

        // let offerID = 0;

        // if(selectedIndex==1){
        //     offerID = 209616745;
        // }else if(selectedIndex==2){
        //     offerID = 209616746;
        // }else{
        //     offerID = 209616747;
        // }

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

        axios(config).then(function (response) {

            console.log(response.data);

            if(response.data.subscribeCRM.status == true) {
                if(response.data.checkExistMWare.status == true) {
                    if(response.data.smstoUser.status == true) {
                        setLoading(false);
                        localStorage.setItem('result_code', 0);
                        navigate("/msg", { replace: true });
                    }else{
                        setLoading(false);
                        localStorage.setItem('result_code', 3);
                        navigate("/msg", { replace: true });
                        console.log(response.data);
                    }
                }else{
                    setLoading(false);
                    localStorage.setItem('result_code', 2);
                    navigate("/msg", { replace: true });
                    console.log(response.data);
                }
            }else{
                setLoading(false);
                localStorage.setItem('result_code', 1);
                navigate("/msg", { replace: true });
                console.log(response.data);
            }

        }).catch(function (error) {
            console.log(error);
            setLoading(false);
            alert('Transaction échouée. Veuillez réessayer plus tard.');
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
                    <div><h1>Sélectionnez une offre Blue VIU</h1></div> <br/>

                    <div className='box-offer'>
                        <div className='title'>
                            <h1>Forfaits</h1>
                            <p>Chaines phares</p>
                            <p>Validité</p>
                            <p>Prix</p>
                            <p>*</p>
                        </div>
                        <div className='offer f-offer'>
                            <h1>S</h1>
                            <p>SuperSport 1</p>
                            <p>24H</p>
                            <p>600 U</p>
                            <Button 
                                variant="primary" 
                                className='v-offer-btn'
                                onClick={() => validateOffer(209616747)}
                            >Valider</Button>
                        </div>
                        <div className='offer s-offer'>
                            <h1>M</h1>
                            <p>SuperSport 1 & 2</p>
                            <p>7 Jours</p>
                            <p>2000 U</p>
                            <Button 
                                variant="primary" 
                                className='v-offer-btn'
                                onClick={() => validateOffer(209616747)}
                            >Valider</Button>
                        </div>
                        <div className='offer t-offer'>
                            <h1>L</h1>
                            <p>SuperSport 1, 2 & 3</p>
                            <p>30 Jours</p>
                            <p>6000 U</p>
                            <Button 
                                variant="primary" 
                                className='v-offer-btn'
                                onClick={() => validateOffer(209616747)}
                            >Valider</Button>
                        </div>
                    </div>

                    {/* <div className='box'>
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
                    </div> <br/> */}
                    {/* <div>
                        <Button 
                            variant="primary" 
                            className='v-offer-btn'
                            onClick={validateOffer}
                        >Valider</Button>
                    </div> */}
                </div>
            </div>

            <Footer/>

        </div>
    );
}

export default Offer;