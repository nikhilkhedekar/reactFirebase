import React, { useEffect, useState } from 'react'

import ToDoItem from "./toDoItem"
import ToDoListForm from "./toDoListForm"

const ToDoList = () => {
    
    const [list, setList] = useState([])
    let responseData;
    useEffect(async () => {
        const response = await fetch('https://react-fetch-req-default-rtdb.firebaseio.com/firebaseAppData.json')
        console.log(response)
        responseData = await response.json()
        console.log(responseData)
        const storeData = []
        for (let key in responseData) {
            storeData.push({
                item: responseData[key].text,
            })
        }
        setList(storeData)
        console.log(list)
    }, [])




    return (
        <div>
            <ToDoListForm />
            <ToDoItem list={list} />
        </div>
    )
}

export default ToDoList