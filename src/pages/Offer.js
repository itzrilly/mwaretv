import React from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Button from 'react-bootstrap/Button';
import './Offer.css';
import Header from '../components/Header';

function Offer() {

    const [selectedIndex, setSelectedIndex] = React.useState(1);

    const handleListItemClick = (event, index) => {
        setSelectedIndex(index);
    };

    return (
        <div className='offer-container'>

            <Header/>

            <div class='offer-content'>
                <div className='form-content'>
                    <div><h2>Sélectionnez un tarif</h2></div>
                    <div>
                        <Box sx={{ width: '100%', maxWidth: 360, bgcolor: 'background.paper' }}>
                            <List component="nav" aria-label="forfaits" className='list'>
                                <ListItemButton
                                    selected={selectedIndex === 1}
                                    onClick={(event) => handleListItemClick(event, 1)}
                                >
                                    <ListItemText primary="CloudTV partagé" />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 2}
                                    onClick={(event) => handleListItemClick(event, 2)}
                                >
                                    <ListItemText primary="CloudTV OPEX dédié" />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 3}
                                    onClick={(event) => handleListItemClick(event, 3)}
                                >
                                    <ListItemText primary="CAP dédiés CloudTV" />
                                </ListItemButton>

                                <ListItemButton
                                    selected={selectedIndex === 4}
                                    onClick={(event) => handleListItemClick(event, 4)}
                                >
                                    <ListItemText primary="Sur place CloudTV" />
                                </ListItemButton>
                            </List>
                        </Box>
                    </div> <br/>
                    <div><Button variant="primary" className='v-offer-btn'>Valider</Button></div>
                </div>
            </div>
        </div>
    );
}

export default Offer;