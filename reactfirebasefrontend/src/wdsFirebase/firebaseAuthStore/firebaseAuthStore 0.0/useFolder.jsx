import { useReducer, useContext, useEffect } from 'react';
import { firebaseAuth } from './AuthApp';
import DatabaseContext from './databaseContext';
import SignInContext from './signInContext';

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

const folderReducer = (state, action) => {
    switch (action.type) {
        case ACTIONS.SELECT_FOLDER:
            return {
                folderId: action.folderId,
                folder: action.folder,
                childFiles: [],
                childFolders: [],
            }
        case ACTIONS.UPDATE_FOLDER:
            return {
                ...state,
                folder: action.folder,
            }
        case ACTIONS.SET_CHILD_FOLDER:
            return {
                ...state,
                childFolders: action.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: action.childFiles,
            }
        default: return state;
    }
}

export const useFolder = (folderId = null, folder = null) => {
    const [state, dispatch] = useReducer(folderReducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    });
    const signInCtx = useContext(SignInContext);
    const currentUser = signInCtx.currentUser;
    const databaseCtx = useContext(DatabaseContext);
    console.log("databaseCtx", databaseCtx);
    useEffect(() => {
        dispatch({
            type: ACTIONS.SELECT_FOLDER,
            folderId,
            folder,
        });
    }, [folderId, folder]);

    useEffect(() => {
        if (folderId === null || folder === null) {
            dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                folder: ROOT_FOLDER,
            });
        }
    }, []);

    useEffect(() => {
        return databaseCtx.folders
            .doc(folderId)
            .get()
            .then(doc => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    folder: databaseCtx.formatDoc(doc),
                });
            })
            .catch(() => {
                dispatch({
                    type: ACTIONS.UPDATE_FOLDER,
                    folder: ROOT_FOLDER,
                });
            })
        // try {
        //     setFoldersCollection(databaseCtx.foldersCollection);
        //     const getFolder = folderscollection.find(collection => collection.folderId === folderId);
        //     dispatch({
        //         type: ACTIONS.UPDATE_FOLDER,
        //         folder: getFolder,
        //     });
        // } catch (error) {
        //     console.log("useFolder err", error);
        //     dispatch({
        //         type: ACTIONS.UPDATE_FOLDER,
        //         folder: ROOT_FOLDER,
        //     });
        // }
    }, [folderId])

    useEffect(() => {
        return databaseCtx.folders
            .where('parentId' == folderId)
            .where('userId' == currentUser.uid)
            .orderBy('createdAt')
            .onSnapshot(snapshot => {
                dispatch({
                    type: ACTIONS.SET_CHILD_FOLDER,
                    childFolders: databaseCtx.formatDoc(snapshot.docs),
                });
            });
    }, []);

    useEffect(() => {
        return (
            databaseCtx.files
                .where('folderId' == folderId)
                .where('userId' == currentUser.uid)
                .onSnapshot(snapshot => {
                    dispatch({
                        type: ACTIONS.SET_CHILD_FILES,
                        childFiles: databaseCtx.formatDoc(snapshot.docs),
                    });
                })
        );
    }, []);

    return state;
} 