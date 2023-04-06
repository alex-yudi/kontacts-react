import { useState } from "react";

export default function useContactsProvider() {
    const [openTrash, setopenTrash] = useState(false);
    const [openPencil, setopenPencil] = useState(false);
    const [contactAdd, setContactAdd] = useState({ nome: '', email: '', telefone: '' })
    const [contactsList, setContactsList] = useState([])
    const [contactSelected, setContactSelected] = useState({});

    return {
        openTrash, setopenTrash,
        openPencil, setopenPencil,
        contactsList, setContactsList,
        contactSelected, setContactSelected,
        contactAdd, setContactAdd
    }
}