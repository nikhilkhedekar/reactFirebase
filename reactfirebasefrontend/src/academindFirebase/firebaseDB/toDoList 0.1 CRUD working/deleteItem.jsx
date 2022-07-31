const DeleteItem = (props) => {
    const deleteItemHandler = async () => {
        const response = await fetch(`https://react-fetch-req-default-rtdb.firebaseio.com/data/${props.listId}/mainList/list/${props.itemId}.json`, {
            method: 'DELETE',
        })
        const responseData = response.json()
        console.log(responseData)
    }
    return(
        <button onClick={deleteItemHandler} > Delete Item </button>
    )
}

export default DeleteItem