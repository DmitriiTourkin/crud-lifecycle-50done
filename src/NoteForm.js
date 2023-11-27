import {useEffect, useState} from "react";

function submitForm(event, setNewData, setStateUploaded) {
    event.preventDefault();
    setNewData({id: 0, content: event.target[0].value});//загрузил данные
    setStateUploaded(true);

    event.target[0].value = ''; //очищаю поле
};


//Отправка новой заметки на сервер (рабочий, всё сохраняется)
async function addNewNote(dataForNote, updated, setStateUploaded, updateData) {
    if (updated) {
        const response = await fetch('http://localhost:7070/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForNote),
        })
        setStateUploaded(false); //вот это я передвинул
        updateData(); //это я добавил
    } else {
        console.log('Ты ещё не ввёл данные хоть какие-то');
    }
}

export default function NoteForm(props) {


    const [uploaded, setStateUploaded] = useState(false);
    const [dataForNote, setNewData] = useState({id: 0, content: ""})

    useEffect(() => {addNewNote(dataForNote, uploaded, setStateUploaded, props.updateData)}, [uploaded]); //componentDidUpdate();

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