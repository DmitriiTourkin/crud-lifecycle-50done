import {useEffect, useState} from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";


const getAllNotes = async () => {
    const response = await fetch('http://localhost:7070/notes');
    return await response.json();
};

export default function MainApp() {
    const [currentData, setNewData] = useState([]);

    const updateData = () => {
        getAllNotes().then(data => setNewData(data));
    };

    useEffect(() => {getAllNotes().then(data => setNewData(data))}, []); //componentDidMount; первоначальная загрузка для рендера

    return (
        <div className='notes-field'>
            <div className='greeting-block'>
                <h1 className='field-title'>Ваши заметки</h1>
                <button className='btn reset-button round-button field-title' onClick={(e) => updateData()}>🔁</button>
            </div>
                <div className='notes-content'>
                    <div className='flex-container'>
                        {currentData.map(note =>
                            <Note noteData={note} key={note.id} updateData={updateData}/>
                        )}
                    </div>
                </div>
            <div className='notes-new'>
                <NoteForm updateData={updateData}/>
            </div>
        </div>
    );
};