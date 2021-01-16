import React, { useState } from 'react'
import './SocialLinks.scss'
import FavoriteBorderIcon from '@material-ui/icons/FavoriteBorder';
import FavoriteIcon from '@material-ui/icons/Favorite';
import AttachFileSharpIcon from '@material-ui/icons/AttachFileSharp';
import AddIcon from '@material-ui/icons/Add';
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import Alert from '@material-ui/lab/Alert';
import { WhatsappShareButton} from "react-share";
function SocialLinks({ showAddSong, onLike, isLiked }) {
    const url = window.location.href
    const [isCopied, setIsCopied] = useState(false)
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
        setIsCopied(true)
        setTimeout(() => {
            setIsCopied(false)
        }, 1000)
    }


    return (
        <div className="social-links flex space-between">
            <div className="social-links__add">
                {isLiked ? <FavoriteIcon className="liked" onClick={onLike} /> : <FavoriteBorderIcon onClick={onLike} />}
                <AddIcon onClick={() => showAddSong(true)} />
            </div>

            {isCopied && <Alert className="social-links__success" severity="success" >
                success!  Link copied to copy To clipboard
                </Alert>}
            <div className="social-links-section-social">
                <AttachFileSharpIcon onClick={copyToClipboard} />
                <WhatsappShareButton url={url} title="share music box"> 
                <WhatsAppIcon/>
                </WhatsappShareButton>
                <a href={`https://www.facebook.com/sharer/sharer.php?href=${url}`} target="_blank"> <FacebookIcon /> </a>
            </div>
        </div>
    )
}

export default SocialLinks
