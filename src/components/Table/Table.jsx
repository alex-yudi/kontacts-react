import './Table.css';
import { useEffect } from 'react';

import { api } from '../../services/connection'

import ModalModifyContact from '../ModalModifyContact/ModalModifyContact';
import ModalDeleteContact from '../ModalDeleteContact/ModalDeleteContact';

import useContacts from '../../hooks/useContacts'
import Contact from '../Contact/Contact';


export default function Table() {
    const token = localStorage.getItem('token');
    const { contactsList, setContactsList } = useContacts();

    const getContactList = async () => {
        const response = await api.get('/contatos', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        })
        const listofContacts = response.data.list
        setContactsList(listofContacts)
    }

    useEffect(() => {
        getContactList()
    }, [])


    return (
        <>
            <section className="table-container">
                <div className="filter">
                </div>
                <table>
                    <thead>
                        <tr>
                            <th>Nome</th>
                            <th>Email</th>
                            <th>Telefone</th>
                            <th> </th>
                        </tr>
                    </thead>
                    <tbody>
                        {contactsList.map((contact) => (
                            <Contact key={contact.id} userData={contact} />
                        ))}
                    </tbody>
                </table>
            </section>

            <ModalDeleteContact />

            <ModalModifyContact />
        </>
    );
}