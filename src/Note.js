import {useState} from "react";

export default function Note(props) {
    const [data] = useState({id: props.noteData.id, content: props.noteData.content});
    const deleteNoteHandler = async () => {
        const url = 'http://localhost:7070/notes/' + data.id.toString();

        await fetch(url, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        props.updateData(); //функция из главного компонента для обновления данных на странице сразу
    }

    return (
        <div className="flex-item">
            <div className='note-wrapper'>
                <div className="note-content">
                    <p>{props.noteData.content}</p>
                    <button className="btn btn-danger round-button" onClick={(e) => deleteNoteHandler()}>Удалить</button>
                </div>
            </div>
        </div>
    );


}