import { useLocation, useParams } from "react-router-dom"

import { useFolder } from "./useFolder";
import AddFileButton from "./addFileButton";
import AddFolderButton from "./addFolderButton";
import Folder from "./folder";
import File from './file'

const UserDashboard = () => {
    const params = useParams();
    const folderId = params.folderId;
    //const locationState = useLocation().state;
    const state = useLocation();
    console.log('useLocationState', state);
    const {
        folder,
        childFolders,
        childFiles,
    } = useFolder(folderId, state.folder);
    console.log("dashboardFolder", folder);
    return (
        <div>
            <div>
                <AddFileButton currentFolder={folder} />
                <AddFolderButton currentFolder={folder} />
            </div>
            <div>
                {childFolders.length > 0 &&
                (
                    <div>
                        {childFolders.map(childFolder => {
                            <div key={childFolder.id} >
                                <Folder folder={childFolder} />
                            </div>
                        })}
                    </div>
                )}
            </div>
            <div>
                {
                    childFolders.length > 0 && childFiles.length > 0 && <hr />
                }
            </div>
            <div>
                {
                    childFiles.length > 0 && (
                        <div>
                            {childFiles.map(childFile => (
                                <div key={childFile.id} >
                                    <File file={childFile} />
                                </div>
                            ))}
                        </div>
                    )
                }
            </div>
        </div>
    )
}

export default UserDashboard