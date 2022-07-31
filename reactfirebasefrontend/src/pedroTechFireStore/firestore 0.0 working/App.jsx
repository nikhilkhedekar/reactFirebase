import { useState, useEffect } from 'react';
import { db } from './firebaseConfig';
import {
    collection,
    getDocs,
    addDoc,
    updateDoc,
    deleteDoc,
    doc,
} from 'firebase/firestore';

const App = () => {
    const [users, setUsers] = useState([]);
    const [newName, setNewName] = useState('');
    const [newAge, setNewAge] = useState(0);

    const usersCollection = collection(db, "users");

    const createUser = async (e) => {
        e.preventDefault();
        const response = await addDoc(usersCollection, {
            name: newName,
            age: +newAge,
        });
        console.log("response", response);
        setNewName('');
        setNewAge(0);
    }

    const updateUser = async (id, age) => {
        const userDoc = doc(db, "users", id);
        const newFields = { age: age + 1 };
        await updateDoc(userDoc, newFields);
    }

    const deleteUser = async ( id ) => {
        const userDoc = doc(db, "users", id);
        await deleteDoc(userDoc);
    }

    useEffect(() => {
        const getUsers = async () => {
            const data = await getDocs(usersCollection);
            console.log("data", data);
            setUsers(data.docs.map(docs => ({
                ...docs.data(),
                id: docs.id,
            })));
        }
        console.log("docs", users);
        getUsers();
    }, []);

    return (
        <div>
            <form onSubmit={createUser} >
                <label htmlFor='newName' >
                    <input id='newName' value={newName} onChange={(e) => setNewName(e.target.value)} />
                </label>
                <label>
                    <input id='newAge' value={newAge} onChange={(e) => setNewAge(e.target.value)} />
                </label>
                <button type="Submit" >Add User</button>
            </form>
            <div>
                {users.map((user, i) => {
                    return(
                        <div key={i} >  
                            <h3> {user.name} </h3>
                            <span> {user.age} </span>
                            <button onClick={() => updateUser(user.id, user.age)} > Update Age </button>
                            <button onClick={() => deleteUser(user.id)} > Delete User </button>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export default App