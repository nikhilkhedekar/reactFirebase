import { useHistory } from 'react-router-dom';

const Folder = ({folder}) => {
    const history = useHistory();
    const openFolder = () => {
        history.push(`/folder/${folder.id}`)
    }
    return(
        <div>
            <button onClick={openFolder} > {folder.name} </button>
        </div>
    )
}

export default Folder