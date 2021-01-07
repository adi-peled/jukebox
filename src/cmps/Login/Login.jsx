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
            <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={(ev) => setPassword(ev.target.value)}
            />
            <Button onClick={(ev) => onSubmit(ev, email, password, username)}>
                {type === 'signup' ? 'Sign up' : 'Login'}
            </Button>

        </form>
    )
}

export default Login
