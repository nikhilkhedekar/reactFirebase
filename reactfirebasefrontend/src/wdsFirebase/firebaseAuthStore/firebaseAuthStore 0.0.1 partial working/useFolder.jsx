import { useReducer, useContext, useEffect } from 'react';
import { firebaseAuth } from './App';
//import DatabaseContext from './databaseContext';
import SignInContext from './signInContext';
import { database } from './firebaseAuthentic';

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

const ACTIONS = {
    SELECT_FOLDER: 'SELECT_FOLDER',
    UPDATE_FOLDER: 'UPDATE_FOLDER',
    SET_CHILD_FOLDER: 'SET_CHILD_FOLDER',
    SET_CHILD_FILES: 'SET_CHILD_FILES',
}

export const ROOT_FOLDER = {
    name: 'Root',
    id: null,
    paht: [],
}

const folderReducer = (state, { type, payload }) => {
    switch (type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: payload.folderId,
                folder: payload.folder,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: payload.folder,
            }
        case ACTIONS.SET_CHILD_FOLDER:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default: return state;
    }
}


 //select and update doc needs to update itis wrong calling
export const useFolder =  (folderId = null, folder = null) => {
    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });
    const signInCtx = useContext(SignInContext);
    const currentUser = signInCtx.currentUser;
    // databaseCtx = useContext(DatabaseContext);
    //console.log("databaseCtx", databaseCtx);
    console.log("databse", database)
    useEffect( async () => {
        
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            payload: {
                folderId,
                folder,
            }
        });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId === null || folder === null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                paylaod: {
                    folder: ROOT_FOLDER,
                }
            });
        }


             // >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
             try {
                const getFolders = doc(database.folders, "folders", folderId);
                const getFolder = getDocs(getFolders);
                console.log("updateFolder", getFolder)
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    payload: {
                        folder: database.formatDoc(getFolder),
                    }
                });
            } catch (error) {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    folder: ROOT_FOLDER,
                });
            }
    //         //>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>

        // database.folders.doc("folderId").get().then(doc => {
        //     dispatch({
        //         type: ACTIONS.UPDATE_FOLDER,
        //         folder: database.formatDoc(doc),
        //     });
        // }).catch(() => {
        //     dispatch({
        //         type: ACTIONS.UPDATE_FOLDER,
        //         folder: ROOT_FOLDER,
        //     });
        // });


    
   



        // const getFolder = getDocs(database.folders)
        //     .then(doc => {
        //         dispatch({
        //             type: ACTIONS.UPDATE_FOLDER,
        //             folder: database.formatDoc(doc),
        //         });
        //         console.log("useFolderFolderDoc", doc)
        //     })
        //     .catch((err) => {
        //         dispatch({
        //             type: ACTIONS.UPDATE_FOLDER,
        //             folder: ROOT_FOLDER,
        //         });
        //         console.log("getFolderError", err);
        //     })
        // console.log("useFolderFolder", getFolder);


        //return getFolder;
        //     //return () => getFolder;


        //     // try {
        //     //     setFoldersCollection(databaseCtx.foldersCollection);
        //     //     const getFolder = folderscollection.find(collection => collection.folderId === folderId);
        //     //     dispatch({
        //     //         type: ACTIONS.UPDATE_FOLDER,
        //     //         folder: getFolder,
        //     //     });
        //     // } catch (error) {
        //     //     console.log("useFolder err", error);
        //     //     dispatch({
        //     //         type: ACTIONS.UPDATE_FOLDER,
        //     //         folder: ROOT_FOLDER,
        //     //     });
        //     // }



    }, [folderId]);





    useEffect(() => {
        const getFolder = query(database.folders,
            where('userId', '==', "Pu3DtprHDjaQvcNyTlUj4HURUir2"),
            where('parentId', '==', folderId),
            orderBy('createdAt'));
        console.log("getFolderUseFolder", getFolder);
        const subscribe = onSnapshot(getFolder, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FOLDER,
                payload: {
                    childFolders: snapshot.docs.map(database.formatDoc)
                }
            })
        });

        console.log("subscribeUseFolder", subscribe);
        console.log("currentUserUseFolder", currentUser);

        return () => subscribe;
        //return () => subscribe;


        // return database.folders
        //     .where('parentId' == folderId)
        //     .where('userId' == currentUser.uid)
        //     .orderBy('createdAt')
        //     .onSnapshot(snapshot => {
        //         dispatch({
        //             type: ACTIONS.SET_CHILD_FOLDER,
        //             childFolders: database.formatDoc(snapshot.docs),
        //         });
        //     });
    }, [folderId]);

    useEffect(() => {
        const getFile = query(database.files,
            where('userId', "==", "Pu3DtprHDjaQvcNyTlUj4HURUir2"),
            where('parentId', '==', folderId),
        );
        console.log("getFileUseFolder", getFile);
        const subscribe = onSnapshot(getFile, (snapshot) => {
            dispatch({
                type: ACTIONS.SET_CHILD_FILES,
                payload: {
                    childFiles: snapshot.docs.map(database.formatDoc)
                }
            });
        });

        return () =>  subscribe;
        //return () => subscribe;


        // return database.files
        //     .where('folderId' == folderId)
        //     .where('userId' == currentUser.uid)
        //     .onSnapshot(snapshot => {
        //         dispatch({
        //             type: ACTIONS.SET_CHILD_FILES,
        //             childFiles: database.formatDoc(snapshot.docs),
        //         });
        //     })
    }, []);

    return state;
} 