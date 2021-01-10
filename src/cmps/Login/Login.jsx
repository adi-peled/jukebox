import React, { useState, useEffect } from 'react'
import './Login.scss'
import { signup, login } from '../../store/actions/userActions'
import { Button, Input } from '@material-ui/core'
import { ReactComponent as Upload } from '../../assets/upload.svg';
import FileBase from 'react-file-base64'
import { useDispatch } from 'react-redux'
//icons
import VisibilityIcon from '@material-ui/icons/Visibility';
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import InfoIcon from '@material-ui/icons/Info';
import InfoOutlinedIcon from '@material-ui/icons/InfoOutlined';
function Login({ type }) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [txt, setTxt] = useState('')
    const [imgString, setImgString] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const [showInfo, setShowInfo] = useState(false)


    useEffect(() => {
        setUsername('')
        setEmail('')
        setPassword('')
        setTxt('')
    }, [type])

    useEffect(() => {
        console.log({ imgString });
    }, [imgString])




    function validatePassword(password) {
        var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");
        return strongRegex.test(password)
    }


    const toggleShowPassword = () => {
        passwordType === 'password' ? setPasswordType('text') : setPasswordType('password')

    }

    const onSubmit = async (ev) => {
        ev.preventDefault()
        if (!email || !password) {
            setTxt('Fill all inputs')
            return
        }
        if (type === 'signup') {
            if (!username) {
                setTxt('Fill all inputs')
                return
            }
        }
        if (!validatePassword(password)) {
            setTxt('password too weak')
            return
        }

        let msg
        if (type === 'signup') {
            msg = await dispatch(signup(email, password, username, imgString))

        } else {
            msg = await dispatch(login(email, password))
        }
        setTxt(msg)
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
                onChange={(ev) => setEmail(ev.target.value)}
            />

            <div className="form__password-container">

                <Input
                    placeholder="Password"
                    type={passwordType}
                    value={password}
                    onChange={(ev) => setPassword(ev.target.value)}
                />
                <InfoOutlinedIcon className="infoIcon" onClick={() => setShowInfo(!showInfo)} />

                {passwordType === 'password' ?
                    <VisibilityIcon className="showIcon" onClick={() => toggleShowPassword()} /> :
                    <VisibilityOffIcon className="showIcon" onClick={() => toggleShowPassword()} />}
            </div>
            {showInfo && <h3 className="form__info" onClick={() => setShowInfo(!showInfo)}>
                1 capital, 1 lower numbers and 8 digits
                 </h3>}


            {type === 'signup' && <div className="form__file-container">
                <FileBase type="file" multiple={false} onDone={({ base64 }) => setImgString(base64)} />
                <Upload className="form__svg" />
            </div>}

            {   txt && <h3>{txt}</h3>}

            <Button onClick={(ev) => onSubmit(ev)}>
                {type === 'signup' ? 'Sign up' : 'Login'}
            </Button>

        </form>
    )
}

export default Login
