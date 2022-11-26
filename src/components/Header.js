import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import LogoutIcon from '@mui/icons-material/Logout';
import './Header.css';

function Header() {

    // console.log(window.location.pathname); 

    if(window.location.pathname=='/'){
        console.log('Login page');
    }

    return (
        <div className='header-nav'>
            <Navbar className='navbar'>
                <Container className={`navbar-container ${window.location.pathname == '/' ? 'justify-content-center' : 'justify-content-between' }`}>
                    <Navbar.Brand href="/" className='navbar-brand justify-content-center'>
                        <img
                            src="/Blue viu_White.png"
                            width="100%"
                            height="50"
                            className="logo d-inline-block align-top"
                            alt="mware tv logo"
                        />
                    </Navbar.Brand>
                    { window.location.pathname=='/' ? '' :
                        (<div className='log-out-btn'><LogoutIcon/> Déconnexion</div>)
                    }
                </Container>
            </Navbar>
        </div>
    );

}

export default Header;