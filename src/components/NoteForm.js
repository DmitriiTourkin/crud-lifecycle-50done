import {useEffect, useState} from "react";

function submitForm(event, setNewData, setStateUploaded) {
    event.preventDefault();
    setNewData({id: 0, content: event.target[0].value});
    setStateUploaded(true);

    event.target[0].value = '';
};


//Отправка новой заметки на сервер (рабочий, всё сохраняется)
async function addNewNote(dataForNote, uploaded, setStateUploaded, updateData) {
    if (uploaded) {
        await fetch('http://localhost:7070/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(dataForNote),
        })
        setStateUploaded(false);
        updateData();
    } else {
        console.log('');
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
                        <h1>новая заметка ✍🏻</h1>
                        <input className='multiline-input' type='text'/>
                        <button className='add-new-note-btn btn btn-dark round-button send-button ' type='submit'>▶️</button>
                    </form>
                </div>
            </div>
        </div>
    );
}