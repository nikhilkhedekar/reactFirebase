const DeleteList = (props) => {
    
    const deleteListHsndler = async () => {
        const response = await fetch(`https://react-fetch-req-default-rtdb.firebaseio.com/data/${props.id}.json`, {
            method: 'DELETE',
        })
        const responseData = response.json()
        console.log(responseData)
    }
    return(
        <button onClick={deleteListHsndler} > Delete List </button>
    )
}

export default DeleteList