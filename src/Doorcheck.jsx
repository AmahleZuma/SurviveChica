import {useState, useEffect} from "react";
import {useSound} from 'use-sound';
import './Securityroom.css'
import doorClose from './sfx/doorOpen.mp3';
import ambience from './sfx/ambience.mp3';

export default function doorCheck(){

    // This is game ambience
    const [playAmbience, {stop}] = useSound(ambience, {loop: true, volume: 0.5});

    const [doorStatus1, setdoorStatus1] = useState("OPEN");
    // If you dont make a separate variable, both elements are affected at once
    const [doorStatus2, setdoorStatus2] = useState("OPEN");

    // This plays the door sound
    const [playdoorClose] = useSound(doorClose, {volume: 1});

    const [ambienceMode, setambienceMode] = useState("OFF")



    function changeDoor1() {
        setdoorStatus1(prev =>
            prev === "OPEN" ? "CLOSED" : "OPEN"
        );

        // Door close sound effect
        playdoorClose();
            
    };

    function changeDoor2() {
        setdoorStatus2(prev =>
            prev === "OPEN" ? "CLOSED" : "OPEN"
        );

        // Door close sound effect
        playdoorClose();
    };

    function playBackground() {
        setambienceMode(prev => {
            if (prev === "OFF") {
                playAmbience();
                return "ON"
            } else if (prev === "ON"){
                stop();
                return "OFF"
            }
        });

    }





    return (
        <div className="page-container">
            <>

                {/* Section 1 - Security room */}
                <div className="security-room-container">
                    <button onClick={changeDoor1} className="button">{doorStatus1}</button>
                    <div className="security-room">
                    
                    </div>
                    <button onClick={changeDoor2} className="button">{doorStatus2}</button>
                </div>


                {/* Section 2 - Party Area and Bathrooms */}
                <div className="section2">
                    <div className="party-area">

                    </div>
                    <div className="bathroom">

                    </div>
                </div>

                {/* Section 3 - Kitchen, Store Area and Office */}
                <div className="section3">
                    <div className="kitchen">

                    </div>
                    <div className="store-area">

                    </div>               
                    <div className="office">

                    </div>    
                </div>
            </>
            <button className="ambience" onClick={playBackground}>
                Ambience {ambienceMode}
            </button>
        </div>

    );
}