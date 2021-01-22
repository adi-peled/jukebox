import React from 'react'
import './Footer.scss'

import { ReactComponent as Gitgub } from '../../assets/github.svg';
import { ReactComponent as Linkedin } from '../../assets/linkedin.svg';
import adiImg from '../../assets/adi.jpeg'
import maorImg from '../../assets/maor.jpg'
function Footer() {
    return (
        <footer className="footer flex">
            <div className="footer__developer flex">
                <img className="footer__img" src={adiImg} />
                <label >Adi Peled</label>
                <div className="footer__social-icons flex">
                    <a target="_blank" href="https://github.com/adi-peled?tab=repositories">
                        <Gitgub className="footer__svg" />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/adi-peled1/">
                        <Linkedin className="footer__svg" />
                    </a>
                </div>
            </div>
            <div className="footer__developer flex">
                <img className="footer__img" src={maorImg} />
                <label >Maor Bason</label>
                <div className="footer__social-icons flex">
                    <a target="_blank" href="https://github.com/maorba6?tab=repositories">
                        <Gitgub className="footer__svg" />
                    </a>
                    <a target="_blank" href="https://www.linkedin.com/in/maor-bason-657680202/">
                        <Linkedin className="footer__svg" />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
