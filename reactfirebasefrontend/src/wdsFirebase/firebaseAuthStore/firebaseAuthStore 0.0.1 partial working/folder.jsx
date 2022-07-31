import { useHistory, Link } from 'react-router-dom';

const Folder = ({ folder }) => {
    return (
        <div>
            <Link to={
                {
                    pathname: `/userDashboard/${folder.id}`,
                    state: {
                        folder,
                    }
                }
            } >{folder.name}</Link>
 
        </div>
    )
}

export default Folder