import React from 'react';
import Container from 'react-bootstrap/Container';
import Navbar from 'react-bootstrap/Navbar';
import './Header.css';

function Header() {
    return (
        <div className='header-nav'>
            <Navbar className='navbar'>
                <Container className='navbar-container justify-content-center'>
                    <Navbar.Brand href="#home" className='navbar-brand justify-content-center'>
                        <img
                            src="/Blue-TV-Blue-Logo.jpeg"
                            width="100%"
                            height="50"
                            className="logo d-inline-block align-top"
                            alt="mware tv logo"
                        />
                    </Navbar.Brand>
                </Container>
            </Navbar>
        </div>
    );
}

export default Header;