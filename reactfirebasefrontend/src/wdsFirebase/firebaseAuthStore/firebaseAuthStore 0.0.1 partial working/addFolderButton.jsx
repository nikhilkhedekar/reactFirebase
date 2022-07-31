import { useContext, useState } from "react";
// import DatabaseContext from "./databaseContext";
import { addDoc } from "firebase/firestore";
import { database } from "./firebaseAuthentic";

import SignInContext from "./signInContext";
import { ROOT_FOLDER } from "./useFolder";

const AddFolderButton = ({ currentFolder }) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const signInContext = useContext(SignInContext);
    const currentUser = signInContext.currentUser;
    // const databaseCtx = useContext(DatabaseContext);

    const openMod = () => {
        setOpen(true);
    }

    const closeMod = () => {
        setOpen(false);
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        //if (currentFolder == null) return;

        //const path = [...currentFolder.path];
        // if (currentFolder != ROOT_FOLDER) {
        //     path.push({
        //         name: currentFolder.name,
        //         id: currentFolder.id,
        //     });
        // }

        await addDoc(database.folders, {
            name: name,
            //parentId: currentFolder.id,
            //userId: "Pu3DtprHDjaQvcNyTlUj4HURUir2",
            //path: path,
            //createdAt: database.getCurrentTimestamp(),
        });

        setName('');

    }

    return (
        <div>
            <button onClick={openMod} >Open</button>
            <button onClick={closeMod} >Close</button>
            {open &&
                <form onSubmit={handleSubmit} >
                    <label>Folder Name:
                        <input value={name} onChange={(e) => setName(e.target.value)} />
                    </label>
                    <button type='submit' >Add Folder</button>
                </form>
            }
        </div>
    )
}

export default AddFolderButton