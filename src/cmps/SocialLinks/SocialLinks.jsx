import React from 'react'
import './SocialLinks.scss'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import AddIcon from '@material-ui/icons/Add';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
function SocialLinks(props) {
    const url = window.location.href

    function copyToClipboard() {
        const el = document.createElement('textarea');
        el.value = url;
        el.setAttribute('readonly', '');
        el.style.position = 'absolute';
        el.style.left = '-9999px';
        document.body.appendChild(el);
        el.select();
        document.execCommand('copy');
        document.body.removeChild(el);
    }
    return (
        <div className="social-links-section flex space-between">
            <div className="social-links-section-add">
            <FavoriteBorderIcon/>
            <AddIcon/>
            </div>
            <div className="social-links-section-social">
                <AttachFileSharpIcon onClick={copyToClipboard} /> 
                <a href={`whatsapp://send?text=${url}`}><WhatsAppIcon/></a>
                <a href={`https://www.facebook.com/sharer/sharer.php?href=${url}`} target="_blank"> <FacebookIcon/> </a>
            </div>
        </div>
    )
}

export default SocialLinks
