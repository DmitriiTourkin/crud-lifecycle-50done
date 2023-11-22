import {useEffect, useState} from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";

export default function MainApp() {
    const [notesCurrent, setUpNewNotes] = useState([]);

    useEffect(() => {
        async function getNotes() {
            const response = await fetch(' http://localhost:7070/notes');
            const data = await response.json();
            console.log('MyServerData: ', data);
            setUpNewNotes(data);
        }
    }, []) //componentDidMount;

    return (
        <div className='notes-field'>
            <h1 className='field-title'>Notes</h1>
                <div className='notes-content'>
                {notesCurrent.map(note =>
                    <Note noteData={note}/>
                )}
                </div>
            <div className='notes-new'>
                <NoteForm/>
            </div>
        </div>
    )


}