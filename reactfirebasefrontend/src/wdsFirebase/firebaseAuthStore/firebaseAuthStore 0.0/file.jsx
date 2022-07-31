const  File = (file) => {
    return(
        <div>
            <a href={file.url} target='_blank' > {file.name} </a>
        </div>
    );
}

export default File