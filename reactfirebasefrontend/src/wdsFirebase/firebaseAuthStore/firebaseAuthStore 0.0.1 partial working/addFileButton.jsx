import { useContext } from "react";
import { v4 as uuidV4 } from 'uuid';
// import DatabaseContext from "./databaseContext";
import { useState } from 'react';
import {
    ref,
    getStorage,
    uploadBytesResumable,
    getDownloadURL
} from 'firebase/storage';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
    query,
    orderBy,
    where,
    onSnapshot,
} from 'firebase/firestore';
import { update } from "firebase/database";

import { fireStorage } from "./firebaseAuthentic";
import SignInContext from "./signInContext";
import { ROOT_FOLDER } from "./useFolder";
import { database } from "./firebaseAuthentic";

const AddFileButton = ({ currentFolder }) => {
    const [uploadFile, setUploadFile] = useState([]);
    const signInContext = useContext(SignInContext);
    const currentUser = signInContext.currentUser;
    // const databaseCtx = useContext(DatabaseContext);

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

        // const uploadTask = fireStorage
        //     .ref(`/files/${currentUser.uid}/${filePath}`)
        //     .put(file);
        const storageRef = ref(fireStorage, `/files/${currentUser.uid}/${filePath}`);
        const uploadTask = uploadBytesResumable(storageRef, file);

        uploadTask
            .on('state-changed', snapshot => {
                const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                // console.log('Upload is ' + progress + '% done');
                // switch (snapshot.state) {
                //     case 'paused':
                //         console.log('Upload is paused');
                //         break;
                //     case 'running':
                //         console.log('Upload is running');
                //         break;
                // }
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
            }, (error) => {

                // switch (error.code) {
                //     case 'storage/unauthorized':
                //       // User doesn't have permission to access the object
                //       break;
                //     case 'storage/canceled':
                //       // User canceled the upload
                //       break;

                //     // ...

                //     case 'storage/unknown':
                //       // Unknown error occurred, inspect error.serverResponse
                //       break;
                //   }

                setUploadFile(prevUploadingFiles => {
                    return prevUploadingFiles.map(uploadingFile => {
                        if (uploadingFile.id === id) {
                            return {
                                ...uploadFile,
                                error,
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


                getDownloadURL(uploadTask.snapshot.ref)
                    .then(url => {
                        const existingFiles = query(database.files,
                            where('name', "==", file.name),
                            where('userId', "==", currentUser.uid),
                            where('folderId', "==", currentFolder.id));
                        const existingFile = existingFiles.docs[0];
                        if (existingFile) {
                            update(ref(existingFile), url);
                        } else {
                            addDoc(database.files, {
                                url,
                                name: file.name,
                                createdAt: database.getCurrentTimestamp(),
                                folderId: currentFolder.id,
                                userId: currentUser.uid,
                            });
                        }
                        // databaseCtx
                        //     .files
                        //     .where('name' == file.name)
                        //     .where('userId' == currentUser.uid)
                        //     .where('folderId' == currentFolder.id)
                        //     .get()
                        //     .then(existingFiles => {
                        //         const existingFile = existingFiles.docs[0]
                        //         if (existingFile) {
                        //             existingFile
                        //                 .ref
                        //                 .update({ url, });
                        //         } else {
                        //             databaseCtx.files.add({
                        //                 url,
                        //                 name: file.name,
                        //                 createdAt: databaseCtx.getCurrentTimestamp(),
                        //                 folderId: currentFolder.id,
                        //                 userId: currentUser.uid,
                        //             });
                        //         }
                        //     });
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