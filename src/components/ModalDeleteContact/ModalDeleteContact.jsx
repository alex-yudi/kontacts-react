import './ModalDeleContact.css'

import imgClose from '../../assets/close-icon.png'

import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import useContacts from '../../hooks/useContacts';
import { api } from '../../services/connection';



const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};


export default function ModalDeleteContact() {
    const token = localStorage.getItem('token')
    const { contactsList, setContactsList, contactSelected, openTrash, setopenTrash } = useContacts();

    const deleteContact = async (contactDataToDelete) => {
        const { id: idContactToDelete } = contactDataToDelete;

        try {
            await api.delete(`/contatos/${idContactToDelete}`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
        } catch (error) {
            return console.log(error)
        }
    }


    const handleCloseTrash = () => setopenTrash(false);

    const handleExcludeContact = () => {
        const localList = [...contactsList];

        const listFiltered = localList.filter((contact) => {
            return contact !== contactSelected;
        })
        deleteContact(contactSelected)

        setContactsList(listFiltered);
        handleCloseTrash();
    }

    return (
        <Modal
            open={openTrash}
            onClose={handleCloseTrash}
        >

            <Box className='container-modal-trash' sx={style}>
                <img
                    src={imgClose}
                    onClick={handleCloseTrash}
                />
                <h1>Confirma exclusão?</h1>

                <p> Deseja excluir o contato {contactSelected.nome}?</p>

                <button
                    onClick={handleExcludeContact}
                >
                    EXCLUIR
                </button>
                <button
                    onClick={handleCloseTrash}
                >
                    CANCELAR
                </button>
            </Box>

        </Modal>
    )
}