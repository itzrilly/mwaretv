import React from 'react';
import { Link } from 'react-router-dom';
import Footer from '../components/Footer';
import Header from '../components/Header';
import './Message.css';

const Message = ({ signOut }) => {

    const resultCode = localStorage.getItem('result_code');

    return (
        <div className='msg-container'>
            <Header signOut={signOut} />
            
            <div className='msg-content'>
                { resultCode == 0 ? (
                    <div className='msg'>
                        <p>Offre activée avec succès! Vous allez recevoir vos paramètres de connexion par sms.</p> <br/>
                        <p>Vous pouvez télécharger l'application en cliquant sur un des liens ci-dessous: </p> <br/>
                        <p>iOS application: <Link to='/' >Blue VIU</Link></p>
                        <p>Android application: <Link to='/' >Blue VIU</Link></p> <br/><br/>
                        <p><Link to='/offer'>Retour en arrière</Link></p>
                    </div> ) : resultCode == 1 ? (
                    <div className='msg-red'>
                        <p>Le solde de votre compte est insuffisant. Veuillez recharger votre compte.</p> <br/><br/>
                        <p><Link to='/offer'>Retour en arrière</Link></p>
                    </div> ) : resultCode == 2 ? (
                    <div className='msg-red'>
                        <p>Echec d'envoi des paramètres de connexion</p> <br/><br/>
                        <p><Link to='/offer'>Retour en arrière</Link></p>
                    </div>
                    ) : resultCode == 3 ? (
                    <div className='msg-red'>
                        <p>Le serveur met trop de temps à répondre, vous devrez déjà avoir réçu vos paramètres de connexion. Veuillez vérifier les messages réçus dans votre téléphone.</p> <br/><br/>
                        <p><Link to='/offer'>Retour en arrière</Link></p>
                    </div> ) : (
                    <div className='msg-red'>
                        <p>Echec de l'opération. Veuillez réessayer plus tard.</p> <br/><br/>
                        <p><Link to='/offer'>Retour en arrière</Link></p>
                    </div>  )
                }
            </div>

            <Footer/>
        </div>
    );
};

export default Message;