import {useEffect, useState} from "react";
import {render} from "@testing-library/react";
function submitForm(event, setNewData, setStateUploaded) {
    event.preventDefault();
    setNewData({id: 0, content: event.target[0].value}); //загрузил данные
    setStateUploaded(true);//Показываю, что всё данные загружены, можно вызывать через useEffect addNewNote()
};



async function getAllNotes() {
    try {
        const response = await fetch('http://localhost:7070/notes');
        return response.json();
    } catch {
        console.error('Что-то не так с получением данных')
    }
}



//Отправка новой заметки на сервер (рабочий, всё сохраняется)
async function addNewNote(dataForNote, updated, setStateUploaded) {
    console.log('dataForNote: ', dataForNote);
    if (updated) {
        const response = await fetch('http://localhost:7070/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForNote),
        })
    } else {
        console.log('Ты ещё не ввёл данные хоть какие-то');
    }
    setStateUploaded(false);
}

export default function NoteForm(props) {
    const [uploaded, setStateUploaded] = useState(false);
    const [dataForNote, setNewData] = useState({id: 0, content: ""})

    useEffect(() => {getAllNotes()}, []); //componentDidMount()
    useEffect(() => {addNewNote(dataForNote, uploaded, setStateUploaded)}, [uploaded]); //componentDidUpdate();

    return (
        <div className='new-note-wrapper'>
            <div className='note-wrapper'>
                <div className="note-content">
                    <form onSubmit={(e) => submitForm(e, setNewData, setStateUploaded)}>
                        <h1>new note ✍🏻</h1>
                        <input className='note-content-input' type='text'/>
                        <button className='add-new-note-btn btn btn-dark' type='submit'>Добавить</button>
                    </form>
                </div>
            </div>
        </div>
    );

}