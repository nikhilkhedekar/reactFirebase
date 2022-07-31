import {
    collection,
    getDocs,
    addDocs,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';
import { useState, useEffect } from 'react';

import { fireStore } from './firebaseAuthentic'
import DatabaseContext from './databaseContext';

export function DatabaseContextProvider(props) {
    const [databaseCtx, setDatabaseCtx] = useState({});
    const [foldersCollection, getFoldersCollection] = useState();
    const [filesCollection, getFilesCollection] = useState();
    const folders = collection(fireStore, 'folders');
    const files = collection(fireStore, 'files');
    useEffect(() => {
        const formatData = async () => {
            const folderData = await getDocs(folders);
            const fileData = await getDocs(files);
            console.log("folderData", folderData);
            console.log("fileData", fileData);
            getFoldersCollection(folderData.docs.map(docs => ({
                ...docs.data(),
                id: docs.id,
            })));
            getFilesCollection(fileData.docs.map(docs => ({
                ...docs.data(),
                id: docs.id,
            })));

            setDatabaseCtx({
                folders,
                files,
                formatDoc: doc => {
                    return{
                        ...doc.data(),
                        id: doc.id,
                    }
                },
                foldersCollection,
                filesCollection,
                getCurrentTimestamp: fireStore.fieldValue.serverTimestamp,
            });
            console.log("databaseCtx", databaseCtx);

            formatData();
        }
    }, []);
    return (
        <DatabaseContext.Provider value={databaseCtx} >
            {props.children}
        </DatabaseContext.Provider>
    )
}