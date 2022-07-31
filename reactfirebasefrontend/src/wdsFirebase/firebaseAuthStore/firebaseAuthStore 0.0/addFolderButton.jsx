import { useContext, useState } from "react";
import DatabaseContext from "./databaseContext";

import SignInContext from "./signInContext";
import { ROOT_FOLDER } from "./useFolder";

const AddFolderButton = ({currentFolder}) => {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const signInContext = useContext(SignInContext);
    const currentUser = signInContext.currentUser;
    const databaseCtx = useContext(DatabaseContext);

    const openMod = () => {
        setOpen(true);
    }

    const closeMod = () => {
        setOpen(false);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        if(currentFolder == null) return ;

        const path = [...currentFolder.path];
        if(currentFolder != ROOT_FOLDER){
            path.push({
                name: currentFolder.name,
                id: currentFolder.id,
            });
        }

        databaseCtx.folders.add({
            name: name,
            parentId: currentFolder.id,
            userId: currentUser.uid,
            path: path,
            createdAt: databaseCtx.getCurrentTimestamp(),
        });

        setName('');

    }

    return(
        <div>
            <button onClick={openMod} >Open</button>
            <button onClick={closeMod} >Close</button>
            <form onSubmit={handleSubmit} >
                <label>Folder Name:
                    <input value={name} onChange={(e) => setName(e.target.value)} />
                </label>
                <button type='submit' >Add Folder</button>
            </form>
        </div>
    )
}

export default AddFolderButton