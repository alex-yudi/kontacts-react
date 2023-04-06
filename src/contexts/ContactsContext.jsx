import { createContext } from "react";
import useContactsProvider from '../hooks/useContactsProvider'

const ContactsContext = createContext({});

export function ContactsProvider({ children }) {
    const contactsProvider = useContactsProvider()

    return (
        <ContactsContext.Provider value={contactsProvider}>

            {children}

        </ContactsContext.Provider>
    )
}

export default ContactsContext;