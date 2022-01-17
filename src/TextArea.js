import { useEffect, useState } from 'react';

export default function TextArea(props) {
    const [inputState, setInputState] = useState([]);

    const onKeyDown = (e) => {
        e.preventDefault();
        // console.log('onKeyDown', e);
        const keyCode = e.code;

        // update input state
        setInputState((prevState) => {
            const newState = [...prevState];
            // add keyCode to state if not already in state
            if (!newState.includes(keyCode)) {
                newState.push(keyCode);
            }
            return newState;
        });
    };

    const onKeyUp = (e) => {
        e.preventDefault();
        // console.log('onKeyUp', e);
        const keyCode = e.code;

        // update input state
        setInputState((prevState) => {
            const newState = [...prevState];
            // remove keyCode from state if it exists
            const index = newState.indexOf(keyCode);
            if (index > -1) {
                newState.splice(index, 1);
            }
            return newState;
        });
    };

    useEffect(() => {
        console.log('inputState', inputState);
    }, [inputState]);

    return (
        <div 
            contentEditable="true" 
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp} 
        >
            <p>paragraph</p>
        </div>
    );
}

