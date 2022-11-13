import React from 'react';
import './Footer.css';

function Footer() {
    return (
        <div className='footer'>
            {/* <div className='white-logo'>
                <img
                    src="/Blue-TV-Blue-Logo.jpeg"
                    className="blue-white-logo"
                    alt="BlueTV Logo"
                />
            </div> */}
            <div className='stores-logos'>
                <div>
                    <img
                        src="/Iosappstore.jpeg"
                        className="appstore-logo"
                        alt="BlueTV Logo"
                    />
                </div>
                <div>
                    <img
                        src="/Google-Play-Logo.png"
                        className="gplay-logo"
                        alt="BlueTV Logo"
                    />
                </div>
            </div>
        </div>
    );
}

export default Footer;