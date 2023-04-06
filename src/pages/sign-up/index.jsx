import './style.css'
import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'

import imgContainerRight from '../../assets/img-direita.jpeg'
import { api } from '../../services/connection'

export default function SignUp() {
    const [userSignUp, setUserSignUp] = useState({ nome: '', email: '', senha: '' })
    const [alertSignUp, setAlertSignup] = useState('');

    const navigateTo = useNavigate();

    const sendUserDataSignUp = async (userDataToSend) => {
        try {
            const response = await api.post('/usuario', userDataToSend)
            if (response.status === 201) {
                navigateTo('/login')
            }
        } catch (error) {
            if (error.response.status === 409) {
                return setAlertSignup(error.response.data.message)
            }
            return setAlertSignup('Erro interno do servidor. Favor tente novamente mais tarde.')
        }
    }

    const handleOnChange = ({ target }) => {
        setAlertSignup('')
        setUserSignUp({ ...userSignUp, [target.name]: target.value })
    }

    const handleSubmit = (event) => {
        event.preventDefault();

        if (!userSignUp.nome || !userSignUp.email || !userSignUp.senha) {
            return setAlertSignup('Preencha todos os campos!')
        }

        sendUserDataSignUp(userSignUp)

        setUserSignUp({ nome: '', email: '', senha: '' })
    }

    const handleCancel = () => {
        setUserSignUp({ nome: '', email: '', senha: '' })
    }

    useEffect(() => {
        if (localStorage.getItem('token')) {
            navigateTo('/')
        }
    }, [])

    return (
        <div className='container-sign-up'>

            <form className='form-sign-up' onSubmit={handleSubmit}>
                <span className='alert-sign-up'>
                    {alertSignUp}
                </span>

                <div className='container-input-sign-up'>
                    <h2>
                        Cadastre-se
                    </h2>
                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome'
                        value={userSignUp.nome}
                        onChange={handleOnChange}
                    />

                    <input
                        name='email'
                        type="email"
                        placeholder='E-mail'
                        value={userSignUp.email}
                        onChange={handleOnChange}
                    />
                    <input
                        name='senha'
                        type="password"
                        placeholder='Senha'
                        value={userSignUp.senha}
                        onChange={handleOnChange}
                    />


                    <button>CADASTRAR</button>
                    <button
                        onClick={handleCancel}
                    >CANCELAR</button>
                </div>
                <p>Já tem cadastro? <Link to='/login'>Clique aqui!</Link></p>
            </form>
            <img className='logo-right' src={imgContainerRight} alt="Imagem de celular sendo segurado por uma mão" />
        </div>
    )
}