import { ROOT_FOLDER } from "./useFolder";

const FolderBreadcrumbs = (currentFolder) => {
    let path = currentFolder === ROOT_FOLDER ? [] : [ROOT_FOLDER];
    if(currentFolder) path = [...path, ...currentFolder.path];
    return(
        <div>

        </div>
    )
}

export default FolderBreadcrumbs