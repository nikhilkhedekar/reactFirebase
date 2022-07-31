import React, { useState, useRef } from 'react'

const PostList = () => {
    const [loading, setLoading] = useState(false)
    const [mainList, setMainList] = useState([])
    const toDoListNameRef = useRef()
    const submitHandler = (e) => {
        e.preventDefault()
        const toDoListName = toDoListNameRef.current.value;
        setLoading(true)
        setMainList({
            title: toDoListName,
            list: [],
        },)
        fetch('https://react-fetch-req-default-rtdb.firebaseio.com/data.json', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                mainList,
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
        .catch(err => {
            alert(err)
        })
    }
    return(
        <form onSubmit={submitHandler} >
            <div>
                <label htmlFor='toDoListName' >
                    <input id='toDoListName' type='text' ref={toDoListNameRef} />
                </label>
                <button>Make To Do List</button>
            </div>
        </form>
    )
}


export default PostList
//https://react-fetch-req-default-rtdb.firebaseio.com/