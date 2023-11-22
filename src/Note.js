import {useState} from "react";

export default function Note(props) {
    const [data, setNewData] = useState({id: 0, content: ''});


    return (
        <div className="flex-item">
            <div className='note-wrapper'>
                <div className="note-content">
                    <p>{props.noteData.content}</p>
                </div>
            </div>
        </div>
    );


}