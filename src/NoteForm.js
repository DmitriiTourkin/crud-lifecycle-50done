import {useEffect, useState} from "react";
function submitForm(event, setNewData, setStateUploaded) {
    event.preventDefault();
    setNewData({id: 0, content: event.target[0].value}); //загрузил данные
    setStateUploaded(true);//Показываю, что всё данные загружены, можно вызывать через useEffect addNewNote()

};
function showChanges(data) {
    console.log(data)
};

async function addNewNote(dataForNote, updated) {
    if (updated) {
        const response = await fetch('http://localhost:7070/notes', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({...dataForNote.content})
        })
        const updateServerData = response.json();
        console.log('Полученные данные: ', updateServerData);
    } else {
        console.log('Ты ещё не ввёл данные хоть какие-то');
    }

}



export default function NoteForm() {
    const [uploaded, setStateUploaded] = useState(false);
    const [dataForNote, setNewData] = useState({id: 0, content: ''})


    useEffect(() => {showChanges(dataForNote, uploaded)}, [dataForNote, uploaded]);
    useEffect(() => {addNewNote(dataForNote, uploaded)}, [uploaded]);

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