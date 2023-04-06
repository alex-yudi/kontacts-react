
import imageTrash from '../../assets/icon-trash.png'
import imagePencil from '../../assets/icon-pencil.png'

import useContacts from "../../hooks/useContacts";

export default function Contact({ userData }) {
    const { setContactSelected, setopenTrash, setopenPencil } = useContacts();

    const handleOpenTrash = () => {
        setContactSelected(userData);
        setopenTrash(true)
    }

    const handleOpenPencil = () => {
        setContactSelected(userData);
        setopenPencil(true);
    }



    return (
        <>
            <tr>
                <td>{userData.nome}</td>
                <td>{userData.email}</td>
                <td>{userData.telefone}</td>
                <td className="edit-icons">
                    <img src={imageTrash}
                        onClick={handleOpenTrash}
                    />
                    <img src={imagePencil}
                        onClick={handleOpenPencil}
                    />
                </td>
            </tr>

        </>
    )
}