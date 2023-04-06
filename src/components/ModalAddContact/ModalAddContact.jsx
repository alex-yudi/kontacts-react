import './ModalAddContact.css'

import imgClose from '../../assets/close-icon.png'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';

import useContacts from '../../hooks/useContacts';
import { useEffect } from 'react';
import { api } from '../../services/connection';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    height: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ModalAddContact({ openAddContact, setOpenAddContact }) {
    const token = localStorage.getItem('token')
    const { contactAdd, setContactAdd, contactsList, setContactsList } = useContacts();

    const registerNewContact = async (contactToAdd) => {
        try {
            const response = await api.post('/contatos', contactToAdd, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

        } catch (error) {
            console.log(error.response.data.message)
        }
    }

    const handleClose = () => {
        setContactAdd({ nome: '', email: '', telefone: '' })
        setOpenAddContact(false)
    }

    const handleOnChange = ({ target }) => {
        setContactAdd({ ...contactAdd, [target.name]: target.value })
    }

    const handleOnSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        if (!contactAdd.nome || !contactAdd.email || !contactAdd.telefone) {
            return;
        }

        registerNewContact(contactAdd)

        const localList = [...contactsList]
        const contactWilAdd = {
            ...contactAdd
        }
        localList.push(contactWilAdd)

        setContactsList(localList)

        setContactAdd({ nome: '', email: '', telefone: '' });

        setOpenAddContact(false);
    }



    return (
        <Modal
            open={openAddContact}
            onClose={handleClose}
        >
            <form onSubmit={handleOnSubmit}>
                <Box className='container-modal-add' sx={style}>
                    <img
                        src={imgClose}
                        onClick={handleClose}
                    />

                    <h1>Adicionar contato</h1>
                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome'
                        value={contactAdd.nome}
                        onChange={handleOnChange}
                    />

                    <input
                        name='email'
                        type="email"
                        placeholder='E-mail'
                        value={contactAdd.email}
                        onChange={handleOnChange}
                    />

                    <input
                        name='telefone'
                        type="text"
                        placeholder='Telefone'
                        value={contactAdd.telefone}
                        onChange={handleOnChange}
                    />


                    <button> CADASTRAR </button>
                    <button
                        onClick={handleClose}
                    >
                        CANCELAR
                    </button>
                </Box>
            </form>
        </Modal>
    )
}