import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
 
import PutItem from './putItem'
import DeleteList from './deleteList'

const GetList = () => {

    const [mainList, setMainList] = useState([])
    useEffect( async () => {
        const response = await fetch('https://react-fetch-req-default-rtdb.firebaseio.com/data.json')
        const responseData = await response.json();
        console.log(responseData)
        const getMainList = [];
        for(let key in responseData){
            getMainList.push({
                id: key,
                title: responseData[key].mainList.title,
                //list: responseData[key].mainList.list,
            })
        }
        setMainList(getMainList)
    }, [])
    const renderMainList = mainList.map(listItem => (
        <div key={listItem.id} >
            <Link to={`/putItem/${listItem.id}`} > {listItem.title} </Link>
            <DeleteList id={listItem.id} />
        </div>
    ))
    
    return(
        <div>
            {renderMainList}
        </div>
    )
}

export default GetList