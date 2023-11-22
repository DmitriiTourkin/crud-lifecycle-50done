import {useState} from "react";

export default function Note(props) {
    const [data, setNewData] = useState({id: 0, content: ''});


    const changeDataInBackend = () => {
        console.log('Отправка изменений на бэк')
    }

    return (
        <div className='note-wrapper'>
            <div className="note-content">
                <p>Это моя заметка, здесь я написал, что мне нужно сделать со своей комнатой</p>
            </div>
        </div>
    );


}