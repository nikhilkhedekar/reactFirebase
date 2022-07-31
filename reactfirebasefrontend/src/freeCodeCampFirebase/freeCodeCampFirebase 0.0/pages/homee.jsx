import { PureComponent } from "react";
import axios from 'axios';

class Home extends PureComponent{
    constructor() {
        super()
        this.state = {
            screams: [],
        }
    }
    componentDidMount(){
        const getScreams = axios.get("http://localhost:5000/fir-cloudfunc-624b1/us-central1/api/screams");
        console.log("Screams", getScreams);
    }
    render(){
        return(
           <div>
            HOme
           </div> 
        )
    }
}

export default Home