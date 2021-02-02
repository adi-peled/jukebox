import React, { useState, useEffect } from 'react'
import './Login.scss'
import { signup, login } from '../../store/actions/userActions'
import { Button, Input } from '@material-ui/core'
import Alert from '@material-ui/lab/Alert';
import { ReactComponent as Upload } from '../../assets/upload.svg';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
//svg
import   userSvg  from '../../assets/img/user.svg'
//icons
import defaultImg from '../../assets/img/defaultUser.jpg'
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
function Login({ type, showSuccess }) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [txt, setTxt] = useState('')
    const [imgString, setImgString] = useState(null)
    const [passwordType, setPasswordType] = useState('password')
    const [showInfo, setShowInfo] = useState(false)

    useEffect(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setTxt('')
    }, [type])

    function validateEmail(email) {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    function validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password)
    }

    const toggleShowPassword = () => {
        passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')

    }
    function showInfoTimeOut(){
        setShowInfo(true)
        setTimeout(()=>{
            setShowInfo(false)
        },3000)
    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        if (!email || !password) {
            setTxt('Fill all inputs')
            return
        }
        let msg
        if (type === 'signup') {
            if (!username) {
                setTxt('Fill all inputs')
                return
            } else {
                if (!validateEmail(email)) {
                    setTxt('email isnt valid')
                    return
                }
                // if (!validatePassword(password)) {
                //     setTxt('password too weak')
                //     return
                // }
            }
            if(!imgString) setImgString(defaultImg) 
            msg = await dispatch(signup(email, password, username, imgString))
        } else {
            msg = await dispatch(login(email, password))
        }
        setTxt(msg)
        showSuccess(true)
        setTimeout(() => {
            showSuccess(false)
        }, 2000)
    }
    return (
        <form className="form  modal flex">
            <div className="title">
                {type === 'signup' ? 'Sign up' : 'Login'}
            </div>

            {type === 'signup' && <Input
                placeholder="Username"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />}
            <Input
                placeholder="Email"
                value={email}
                type="email"
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <div className="form__password-container">

                <Input
                    placeholder="Password"
                    type={passwordType}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                {/* <InfoOutlinedIcon className="infoIcon" onClick={showInfoTimeOut} /> */}

                {passwordType === 'password' ?
                    <VisibilityIcon className="showIcon" onClick={() => toggleShowPassword()} /> :
                    <VisibilityOffIcon className="showIcon" onClick={() => toggleShowPassword()} />}
            </div>
            {/* {showInfo && <Alert severity="info" className="form__info" onClick={() => setShowInfo(!showInfo)}>
                at least 1 capital, 1 lower, numbers and 8 digits.
                 </Alert>} */}

            {type === 'signup' && <div className="form__file-container flex">
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setImgString(base64)} />
                <Upload className={imgString ? "form__svg opacity-0" : "form__svg"} />
                {imgString && <img className="form__img" src={imgString} />}
            </div>}

            {   txt && <h3 className="form__err">{txt}</h3>}

            <Button onClick={(ev) => onSubmit(ev)}>
                {type === 'signup' ? 'Sign up' : 'Login'}
            </Button>

        </form>
    )
}

export default Login
