import React, { useState } from 'react';
import Box from '@mui/material/Box';
import List from '@mui/material/List';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
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

        // alert(number);
        // alert(offerID)
        // alert('Subscriber number: '+number+' Offer ID: '+offerID);

        // var axios = require('axios');
        // var data = '<soapenv:Envelope xmlns:soapenv="http://schemas.xmlsoap.org/soap/envelope/" xmlns:msg="http://oss.huawei.com/business/intf/webservice/subscribe/msg">\n    <soapenv:Header/>\n    <soapenv:Body>\n        <msg:ChangeOptionalOfferRequestMsg>\n            <RequestHeader>\n                <msg:Version>1</msg:Version> <!--DO NOT TOUCH-->\n                <msg:TransactionId>1</msg:TransactionId> <!--DO NOT TOUCH-->\n                <msg:SequenceId>1</msg:SequenceId> <!--DO NOT TOUCH-->\n                <msg:RequestType>Event</msg:RequestType> <!--DO NOT TOUCH-->\n                <msg:ThirdPartyID>156</msg:ThirdPartyID> <!--SOAP Client / Blue Recharge App ID-->\n                <msg:SerialNo>8948487467</msg:SerialNo> <!--Real Transaction ID to be set by SOAP Client-->\n                <msg:Remark>wsr</msg:Remark> <!--Transaction Remark / Comment-->\n            </RequestHeader>\n            <ChangeOptionalOfferRequest>\n                <msg:SubscriberNo>'+number+'</msg:SubscriberNo> <!--Number benefitting from Activation -->\n                <msg:OptionalOffer>\n                    <msg:Id>'+offerID+'</msg:Id> <!--Optional Offer ID-->\n                    <msg:OperationType>1</msg:OperationType> <!--DO NOT TOUCH-->\n                </msg:OptionalOffer>\n                <msg:PrimaryOfferOrderKey>?</msg:PrimaryOfferOrderKey> <!--DO NOT TOUCH-->\n            </ChangeOptionalOfferRequest>\n        </msg:ChangeOptionalOfferRequestMsg>\n    </soapenv:Body>\n</soapenv:Envelope>';
        
        // var config = {
        //     method: 'post',
        //     url: 'http://192.168.240.7:8280/services/Proxy_SubscribeOptonnal',
        //     headers: { 
        //         'Access-Control-Allow-Origin': 'http://localhost:3000/offer',
        //         'Content-Type': 'text/xml', 
        //         'SOAPAction': 'changeOptionalOffer'
        //     },
        //     data : data
        // };

        // axios(config).then(function (response) {
        //     console.log(JSON.stringify(response.data));
        //     // alert(JSON.stringify(response.data));
        // }).catch(function (error) {
        //     console.log(error);
        //     // alert(error);
        // });

        // console.log(data);


        // alert(offerID);


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