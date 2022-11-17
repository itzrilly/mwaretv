import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Message.css';

const Message = () => {

    const resultCode = localStorage.getItem('result_code');

    return (
        <div className='msg-container'>
            <Header/>
            
            <div className='msg-content'>
                {(() => {
                    if(resultCode == 405000000) {
                        return(
                            <div className='msg'>
                                <p>Offre activée avec succès! Vous allez recevoir vos paramètres de connexion par sms.</p> <br/>
                                <p>Vous pouvez télécharger l'application en cliquant sur un des liens ci-dessous: </p> <br/>
                                <p>iOS application: <Link to='/' >Blue VIU</Link></p>
                                <p>Android application: <Link to='/' >Blue VIU</Link></p> <br/><br/>
                                <p><Link to='/offer'>Retour en arrière</Link></p>
                            </div>
                        )
                    }else if(resultCode == 405000614) {
                        return(
                            <div className='msg-red'>
                                <p>Le solde de votre compte est insuffisant. Veuillez recharger votre compte.</p> <br/><br/>
                                <p><Link to='/offer'>Retour en arrière</Link></p>
                            </div>
                        )
                    }else if(resultCode == 405000612) {
                        return(
                            <div className='msg-red'>
                                <p>Le service a été commandé, donc ne peut être ajouté.</p> <br/><br/>
                                <p><Link to='/offer'>Retour en arrière</Link></p>
                            </div>
                        )
                    }else if(resultCode == 405000615) {
                        return(
                            <div className='msg-red'>
                                <p>Le même ensemble de package facultatif vous permet uniquement d'en sélectionner un.</p> <br/><br/>
                                <p><Link to='/offer'>Retour en arrière</Link></p>
                            </div>
                        )
                    }else {
                        return(
                            <div className='msg-red'>
                                <p>Echec de l'opération. Veuillez réessayer plus tard.</p> <br/><br/>
                                <p><Link to='/offer'>Retour en arrière</Link></p>
                            </div>
                        )
                    }
                })}
            </div>

            <Footer/>
        </div>
    );
};

export default Message;