import { useState } from "react";

export default function useUserProvider() {
    const [userList, setUserList] = useState([
        { nome: 'Yudi', email: 'yudi@email.com', senha: '123456' },
        { nome: 'Alex', email: 'alex@email.com', senha: '123456' },
    ])
    const [userToVerify, setUserToVerify] = useState({ email: '', senha: '' })

    return {
        userList, setUserList,
        userToVerify, setUserToVerify
    }
}