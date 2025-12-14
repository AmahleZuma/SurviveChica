import {useState} from "react";

export default function doorCheck(){
    const [doorStatus1, setdoorStatus1] = useState("Closed");
    // If you dont make a separate variable, both elements are affected at once
    const [doorStatus2, setdoorStatus2] = useState("Closed");

    function changeDoor1() {
        setdoorStatus1(prev =>
            prev === "Closed" ? "Opened" : "Closed"
        );
        
    }

    function changeDoor2() {
        setdoorStatus2(prev =>
            prev === "Closed" ? "Opened" : "Closed"
        );
    }


    return (
        <>
            <button onClick={changeDoor1}>Door 1 {doorStatus1}</button>
            <button onClick={changeDoor2}>Door 2 {doorStatus2}</button>
        </>

    );
}