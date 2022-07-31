import { useReducer, useEffect } from "react"
import { useAuth } from "../contexts/AuthContext"
import { database } from "../firebase"

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
    SELECT_FOLDER: "select-folder",
    UPDATE_FOLDER: "update-folder",
    SET_CHILD_FOLDERS: "set-child-folders",
    SET_CHILD_FILES: "set-child-files",
}

export const ROOT_FOLDER = { name: "Root", id: null, path: [] }

function reducer(state, { type, payload }) {
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
        case ACTIONS.SET_CHILD_FOLDERS:
            return {
                ...state,
                childFolders: payload.childFolders,
            }
        case ACTIONS.SET_CHILD_FILES:
            return {
                ...state,
                childFiles: payload.childFiles,
            }
        default:
            return state
    }
}

export function useFolder(folderId = null, folder = null) {
    const [state, dispatch] = useReducer(reducer, {
        folderId,
        folder,
        childFolders: [],
        childFiles: [],
    })
    const { currentUser } = useAuth()

    useEffect(() => {
        dispatch({ type: ACTIONS.SELECT_FOLDER, payload: { folderId, folder } })
    }, [folderId, folder])

    useEffect(() => {
        if (folderId == null) {
            return dispatch({
                type: ACTIONS.UPDATE_FOLDER,
                payload: { folder: ROOT_FOLDER },
            })
        }

        // database.folders
        //   .doc(folderId)
        //   .get()
        //   .then(doc => {
        //     dispatch({
        //       type: ACTIONS.UPDATE_FOLDER,
        //       payload: { folder: database.formatDoc(doc) },
        //     })
        //   })
        //   .catch(() => {
        //     dispatch({
        //       type: ACTIONS.UPDATE_FOLDER,
        //       payload: { folder: ROOT_FOLDER },
        //     })
        //   })

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
    }, [folderId])

    useEffect(() => {
        // return database.folders
        //   .where("parentId", "==", folderId)
        //   .where("userId", "==", currentUser.uid)
        //   .orderBy("createdAt")
        //   .onSnapshot(snapshot => {
        //     dispatch({
        //       type: ACTIONS.SET_CHILD_FOLDERS,
        //       payload: { childFolders: snapshot.docs.map(database.formatDoc) },
        //     })
        //   })


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
    }, [folderId, currentUser])

    useEffect(() => {
        // return (
        //   database.files
        //     .where("folderId", "==", folderId)
        //     .where("userId", "==", currentUser.uid)
        //     // .orderBy("createdAt")
        //     .onSnapshot(snapshot => {
        //       dispatch({
        //         type: ACTIONS.SET_CHILD_FILES,
        //         payload: { childFiles: snapshot.docs.map(database.formatDoc) },
        //       })
        //     })
        // )


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

        return () => subscribe;
    }, [folderId, currentUser])

    return state
}