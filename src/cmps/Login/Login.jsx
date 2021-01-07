import React, { useState } from 'react'
import './Login.scss'
import { signup, login } from '../../store/actions/userActions'
import { Button, Input } from '@material-ui/core'
import { useDispatch } from 'react-redux'
function Login({ type }) {

    const dispatch = useDispatch()
    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const onSubmit = async (ev, email, password, username) => {
        ev.preventDefault()
        if (type === 'signup') {
            dispatch(signup(email, password, username))
        } else {
            dispatch(login(email, password))
        }
    }
    return (
        <form className="form  modal flex">
            <div className="title">
                {type === 'signup' ? 'Signup' : 'Login'}
            </div>
            {type === 'signup' && <Input
                placeholder="username"
                type="text"
                value={username}
                onChange={(ev) => setUsername(ev.target.value)}
            />}
            <Input
                placeholder="email"
                type="text"
                value={email}
                onChange={(ev) => setEmail(ev.target.value)}
            />
            <Input
                placeholder="password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button onClick={(ev) => onSubmit(ev, email, password, username)}>
                {type === 'signup' ? 'Signup' : 'Login'}
            </Button>

        </form>
    )
}

export default Login
