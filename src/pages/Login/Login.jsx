import React, { useState } from 'react'
import './Login.scss'
import { authService } from '../../services/authService'
import { Button, Input } from '@material-ui/core'
function Login() {

    const [email, setEmail] = useState('')
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')


    const signUp = async (ev, email, password, username) => {
        ev.preventDefault()
        console.log(email, password, username);
        // await authService.signUp(email, password, username)
    }
    return (
        <section>
            <form className="form">
                <Input
                    placeholder="usersname"
                    type="text"
                    value={username}
                    onChange={(ev) => setUsername(ev.target.value)}
                />
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
                <Button onClick={(ev) => signUp(ev, email, password, username)}>signup</Button>

            </form>
        </section>
    )
}

export default Login
