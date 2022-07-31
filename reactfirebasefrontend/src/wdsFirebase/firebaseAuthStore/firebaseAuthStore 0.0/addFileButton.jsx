import { useContext } from "react";
import { v4 as uuidV4 } from 'uuid';
import DatabaseContext from "./databaseContext";
import { useState } from 'react';

import { fireStorage } from "./firebaseAuthentic";
import SignInContext from "./signInContext";
import { ROOT_FOLDER } from "./useFolder";

const AddFileButton = ({currentFolder}) => {
    const [uploadFile, setUploadFile] = useState([]);
    const signInContext = useContext(SignInContext);
    const currentUser = signInContext.currentUser;
    const databaseCtx = useContext(DatabaseContext);

    const handleUpload = (e) => {
        const id = uuidV4();
        const file = e.target.files[0];
        if (currentFolder == null || file == null) return;

        setUploadFile(prevUploadingFiles => [
            ...prevUploadingFiles,
            {
                id,
                name: file.name,
                progress: 0,
                error: false,
            }
        ]);

        const filePath = currentFolder === ROOT_FOLDER ?
            `${currentFolder.path.join('/')}/${file.name}` :
            `${currentFolder.path.join('/')}/${currentFolder.name}/${file.name}`;

        const uploadTask = fireStorage
            .ref(`/files/${currentUser.uid}/${filePath}`)
            .put(file);

        uploadTask
            .on('state-changed', snapshot => {
                const progress = snapshot.bytesTransferred / snapshot.totalBytes;
                setUploadFile(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadingFile => {
                        if (uploadingFile.id === id) {
                            return {
                                ...uploadFile,
                                progress,
                            }
                        }
                        return uploadFile;
                    });
                });
            }, () => {
                setUploadFile(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadingFile => {
                        if (uploadingFile.id === id) {
                            return {
                                ...uploadFile,
                                error: true,
                            }
                        }
                        return uploadFile;
                    });
                });
            }, () => {
                setUploadFile(prevUploadingFiles => {
                    return prevUploadingFiles.filter(uploadingFile => {
                        return uploadingFile.id !== id
                    });
                });

                uploadTask
                    .snapshot
                    .ref
                    .getDownloadURL()
                    .then(url => {
                        databaseCtx
                            .files
                            .where('name' == file.name)
                            .where('userId' == currentUser.uid)
                            .where('folderId' == currentFolder.id)
                            .get()
                            .then(existingFiles => {
                                const existingFile = existingFiles.docs[0]
                                if (existingFile) {
                                    existingFile
                                        .ref
                                        .update({ url, });
                                } else {
                                    databaseCtx.files.add({
                                        url,
                                        name: file.name,
                                        createdAt: databaseCtx.getCurrentTimestamp(),
                                        folderId: currentFolder.id,
                                        userId: currentUser.uid,
                                    });
                                }
                            });
                    });
            });
    }

    console.log("fileProgress", uploadFile.progress);
    console.log("fileError", uploadFile.error);
    console.log("fileId", uploadFile.id);

    return (
        <div>
            <label>Upload File:
                <input type='file' onChange={handleUpload} />
            </label>
            
        </div>
    )
}

export default AddFileButton;