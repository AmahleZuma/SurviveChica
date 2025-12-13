import {useState} from "react";

export default function doorCheck(){
    const [doorStatus, setdoorStatus] = useState("Closed");

    function changeDoor() {
        setdoorStatus(prev =>
            prev === "Closed" ? "Opened" : "Closed"
        );
        
    }


    return (
        <button onClick={changeDoor}>Door {doorStatus}</button>
    );
}