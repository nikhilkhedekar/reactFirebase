const ToDoItem = (props) => {
    const renderList = props.list.map(data => (
        <ul key={Math.random} >
            <li>{data.item}</li>
        </ul>
    ))
    return(
        <div>
            {renderList}
        </div>

    )
}

export default ToDoItem