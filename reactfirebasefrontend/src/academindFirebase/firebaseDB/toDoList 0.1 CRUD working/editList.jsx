import React, { useState, useRef } from 'react'
import { useParams } from 'react-router-dom'

const EditList = () => {
    const params = useParams()
    const listId = params.listIds
    const [list, setList] = useState([])
    const [loading, setLoading] = useState(false)
    const listItemRef = useRef()
    const submitHandler = (e) => {
        e.preventDefault()
        const listItem = listItemRef.current.value;
        setList(preState => {
            const oldState = [...preState];
            const newState = { listItem, };
            oldState.push(newState)
            return oldState;
        })
        setLoading(true)
        fetch(`https://react-fetch-req-default-rtdb.firebaseio.com/data/${listId}/mainList.json`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                list: list,
            }),
        })
        .then(res => {
            setLoading(false)
            console.log(res)
            return res.json()
        })
        .then(data => {
            console.log(data)
        })
        .catch(err => alert(err))
    }
    return(
        <form onSubmit={submitHandler} >
            <label htmlFor='listItem' > 
                <input ref={listItemRef} id='listItem' type='text' />
            </label>
            <button>Add Item to List</button>
        </form>
    )
}

export default EditList