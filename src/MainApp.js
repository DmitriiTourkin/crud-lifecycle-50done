import {useEffect, useState} from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";


async function getAllNotes(setUpNewNotes) {
    const response = await fetch('http://localhost:7070/notes');
    const data = await response.json();
    console.log('MyServerData: ', data);
    setUpNewNotes(data);
}
export default function MainApp() {

    const [notesCurrent, setUpNewNotes] = useState([]);

    useEffect(() => {getAllNotes(setUpNewNotes)}, []) //componentDidMount;

    return (
        <div className='notes-field'>
            <h1 className='field-title'>Notes</h1>
                <div className='notes-content'>
                    <div className='flex-container'>
                        {notesCurrent.map(note =>
                            <Note noteData={note} key={note.id}/>
                        )}
                    </div>
                </div>
            <div className='notes-new'>
                <NoteForm/>
            </div>
        </div>
    )
}