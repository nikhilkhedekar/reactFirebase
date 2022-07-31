import { v4 as uuidV4 } from 'uuid'

const App = () => {
    return(
        <div>
            {uuidV4()}
        </div>
    )
}

export default App