import './style.css'

import { Link } from 'react-router-dom'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import useUser from '../../hooks/useUser'
import imgContainer from '../../assets/img-esquerda.jpeg'
import { api } from '../../services/connection'

export default function SignIn() {
    const { userToVerify, setUserToVerify } = useUser()
    const [messageAlert, setMessageAlert] = useState('')

    const navigateTo = useNavigate();

    const tryUserLogin = async (userDataLogin) => {
        try {
            const responseLogin = await api.post('/login', userDataLogin)
            const userDataLogged = responseLogin.data

            if (responseLogin.data) {
                localStorage.setItem('token', userDataLogged.token)
                navigateTo('/main')
            }
        } catch (error) {
            return setMessageAlert(error.response.data.message)
        }
    }

    const handleOnChange = ({ target }) => {
        setMessageAlert('')
        setUserToVerify({ ...userToVerify, [target.name]: target.value })
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();

        setMessageAlert('')

        if (!userToVerify.email) {
            return setMessageAlert('Preencha o campo do e-mail!');
        }

        if (!userToVerify.senha) {
            return setMessageAlert('Preencha o campo da senha!');
        }

        tryUserLogin(userToVerify)
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigateTo('/')
        }
    }, [])
    return (
        <div className='container-sign-in'>
            <img className='logo-left' src={imgContainer} alt="Imagem de celular sendo segurado por uma mão" />
            <form className='form-sign-in' onSubmit={handleOnSubmit}>

                <div className='container-input-sign-in'>
                    <p>
                        Bem vindo
                    </p>
                    <h2>
                        Faça login com sua conta
                    </h2>
                    <input
                        name='email'
                        type="email"
                        placeholder='E-mail'
                        value={userToVerify.email}
                        onChange={handleOnChange}
                    />
                    <input
                        name='senha'
                        type="password"
                        placeholder='Senha'
                        value={userToVerify.senha}
                        onChange={handleOnChange}
                    />
                    <span className='alert-message'>
                        {messageAlert}
                    </span>
                    <button>LOGIN</button>
                </div>
                <p>Não tem cadastro? <Link to='/sign-up'>Clique aqui!</Link></p>
            </form>
        </div>
    )
}