import './ModalModifyContact.css'

import imgClose from '../../assets/close-icon.png'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useContacts from '../../hooks/useContacts';

import { api } from '../../services/connection'

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


export default function ModalModifyContact() {
    const { contactSelected, contactsList, setContactsList, setContactSelected, openPencil, setopenPencil } = useContacts();
    const token = localStorage.getItem('token')

    const modifyContactData = async (contactDataModified) => {
        const { id: idContactToModify, id_usuario: _, ...newContactData } = contactDataModified;

        try {
            await api.put(`/contatos/${idContactToModify}`, newContactData, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            return console.log(error.response.message)
        }
    }

    const handleClosePencil = () => {
        setopenPencil(false)
    }

    const handleOnChange = ({ target }) => {
        setContactSelected({ ...contactSelected, [target.name]: target.value })
    }


    const handleModifyContact = (event) => {
        event.preventDefault()
        const localList = [...contactsList]

        if (!contactSelected.nome || !contactSelected.email || !contactSelected.telefone) {
            return;
        }

        const indexOfContact = localList.findIndex((contact) => {
            return contact.id === contactSelected.id
        });


        modifyContactData(contactSelected)

        localList[indexOfContact] = {
            ...contactSelected
        }

        setContactsList(localList)

        setopenPencil(false);
    }

    return (
        <Modal
            open={openPencil}
            onClose={handleClosePencil}
        >
            <form onSubmit={handleModifyContact}>
                <Box className='container-modal-pencil' sx={style}>
                    <img
                        src={imgClose}
                        onClick={handleClosePencil}
                    />

                    <h1>Editar contato</h1>

                    <input
                        name='nome'
                        type="text"
                        placeholder='Nome'
                        value={contactSelected.nome}
                        onChange={handleOnChange}
                    />

                    <input
                        name='email'
                        type="text"
                        placeholder='E-mail'
                        value={contactSelected.email}
                        onChange={handleOnChange}
                    />

                    <input
                        name='telefone'
                        type="text"
                        placeholder='Telefone'
                        value={contactSelected.telefone}
                        onChange={handleOnChange}
                    />


                    <button>
                        CADASTRAR
                    </button>
                    <button
                        onClick={handleClosePencil}
                    >
                        CANCELAR
                    </button>

                </Box>
            </form>
        </Modal>
    )
}