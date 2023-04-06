import './style.css'
import logoutImg from '../../assets/logout.png'
import Table from '../../components/Table/Table'

import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import ModalAddContact from '../../components/ModalAddContact/ModalAddContact';
import { ContactsProvider } from '../../contexts/ContactsContext'

export default function Main() {
    const [openAddContact, setOpenAddContact] = useState(false);
    const handleOpenAddContact = () => setOpenAddContact(true);


    const navigateTo = useNavigate();
    return (
        <>
            <header>
                <h1>Kontacts</h1>
                <img
                    src={logoutImg}
                    alt="Símbolo de logout da página"
                    onClick={() => { navigateTo('/login'); localStorage.removeItem('token') }}
                />
            </header>

            <ContactsProvider>
                <div className='container-main'>
                    <button
                        onClick={handleOpenAddContact}
                    >
                        Adicionar
                    </button>
                    <Table />

                </div>

                <ModalAddContact
                    setOpenAddContact={setOpenAddContact}
                    openAddContact={openAddContact}
                />
            </ContactsProvider>
        </>
    )
}