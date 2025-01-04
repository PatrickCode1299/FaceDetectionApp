import React, { useState } from 'react';
import Robot from './images/facedetection.jpg';
import './styles/component.css';
import Signup from './Signup';

const SiteDescription = () => {
    const [robotState, changeRobotState] = useState(true);


    const handleClick = () => {
        changeRobotState(prevState => !prevState);
    };

    return (
        <div className='container-for-description'>
            <div className='app-title'>
                <h2>Face Recognition</h2>
                <p>We are trying to implement facial recognition for user authentication.</p>
                <button onClick={handleClick}>Try Registering.</button>
            </div>
            <div className='robot-img'>
                <div className='robot-div'>
                    {robotState ? <img src={Robot} className='robot' alt="Robot" /> : <Signup />}
                </div>
            </div>
        </div>
    );
};

export default SiteDescription;
