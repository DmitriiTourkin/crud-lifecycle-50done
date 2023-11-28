import {useEffect, useState} from "react";
import Note from "./Note";
import NoteForm from "./NoteForm";

//Асинхронная функция  получения данных
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
            <h1 className='field-title'>Notes<button className='btn btn-dark round-button' onClick={(e) => updateData()}></button></h1>
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
    )
}