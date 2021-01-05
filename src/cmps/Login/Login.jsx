import React, { useState } from 'react'
import './Login.scss'
import { setUser } from '../../store/actions/userActions'
import { authService } from '../../services/authService'
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
            const user = await authService.signup(email, password, username)
            if (user) {
                dispatch({ type: 'SET_USER', user })
            }
        } else {
            const user = await authService.login(email, password)
            dispatch({ type: 'SET_USER', user })
        }
    }
    return (
        <form className="form modal">
            {type === 'signup' && <Input
                placeholder="usersname"
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
