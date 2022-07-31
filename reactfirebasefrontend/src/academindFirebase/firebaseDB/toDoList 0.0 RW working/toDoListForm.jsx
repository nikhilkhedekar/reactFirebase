import React, { useState, useRef } from 'react'

const ToDoListForm = () => {
    const [loading, setLoading] = useState(false)
    const itemRef = useRef()
    const submitHandler = (e) => {
        e.preventDefault();
        const item = itemRef.current.value;
        setLoading(true)
        fetch('https://react-fetch-req-default-rtdb.firebaseio.com/firebaseAppData.json',{
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                text: item,
            })
        }).then(res => {
            setLoading(false)
           
        })
        .catch(err => alert(err))
    }
    return(
        <form onSubmit={submitHandler} >
            <label htmlFor='item' >
            <input id='item' type='text' ref={itemRef}  />
            </label>
            {!loading && <button>Add Item</button> }
            {loading && 'laoding...'}
        </form>
    )
}

export default ToDoListForm