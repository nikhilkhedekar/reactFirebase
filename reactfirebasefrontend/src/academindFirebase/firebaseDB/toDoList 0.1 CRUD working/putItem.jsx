import React, { useState, useEffect, useRef } from 'react'
import { useParams } from 'react-router-dom'
import DeleteItem from './deleteItem';

import EditList from './editList';

const PutItem = () => {
    const params = useParams();
    const listId = params.listIds;
    const [list, setList] = useState([])
    let responseData;

    useEffect(async () => {
        const response = await fetch(`https://react-fetch-req-default-rtdb.firebaseio.com/data/${listId}.json`)
        responseData = await response.json()
        console.log(responseData.mainList)
        const getData = [];
        for (let key in responseData.mainList.list) {
            getData.push({
                id: key,
                listTitle: responseData.title,
                listItem: responseData.mainList.list[key].listItem,
            })
        }
        setList(getData)
    }, [])

    const renderList = list.map(item => (
        <div>
            <ul key={item.id} >
                <li> {item.listItem} <DeleteItem listId={listId} itemId={item.id} /> </li>
            </ul>
            {console.log(item.listItem)}
            {console.log(item.id)}
        </div>
    ))

    return (
        <div>
            <header>{list.listTitle}</header>
            <EditList />
            <div>
                {renderList}
            </div>
        </div>
    )
}

export default PutItem
//https://console.firebase.google.com/u/0/project/react-fetch-req/database/react-fetch-req-default-rtdb/data/data/-MkvC6JRmiUG-39tOj_j