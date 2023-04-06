import { useContext } from "react";

import ContactsContext from "../contexts/ContactsContext";

export default function useContacts() {
    return useContext(ContactsContext)
}