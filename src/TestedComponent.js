import React, {useState} from 'react'

export default function MyComponent() {
    const [isShown, setIsShown] = useState(true);
    const myStyle = {color: 'wheat'}
    return (
        <div>
            <button onClick={() => setIsShown(!isShown)}>click here</button>
            {isShown && <div className='toggled-text' style={myStyle}>Text goes here</div> }
        </div>
    )
}
