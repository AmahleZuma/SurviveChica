import { useState, useEffect, useRef } from "react";
import { useSound } from 'use-sound';
import './Securityroom.css'
import doorClose from './sfx/doorOpen.mp3';
import ambience from './sfx/ambience.mp3';




// Room dimensions based on Game world position
// Not pixel perfect, but logical enough that the animatronic movement makes sense
const ROOMS = {
    // SECURITY: { x: 755, y: 0, width: 390, height: 205 },
    PARTY: { x: 450, y: 205, width: 900, height: 205 },
    TOILET: { x: 1350, y: 205, width: 105, height: 205 },
    KITCHEN: { x: 450, y: 410, width: 300, height: 205 },
    STORE: { x: 750, y: 410, width: 305, height: 205 },
    OFFICE: { x: 1055, y: 410, width: 295, height: 205 },
};

const DANGERZONES = {
    DOOR1: { x: 450, y: 0, width: 300, height: 205 },
    DOOR2: { x: 1550, y: 0, width: 300, height: 205 }
}

const SPAWN = {
    POINT: {x: 500, y: 570},
}



export default function doorCheck() {

    // This is game ambience
    const [playAmbience, { stop }] = useSound(ambience, { loop: true, volume: 0.5 });

    // This is the toggle button for the game ambience
    const [ambienceMode, setambienceMode] = useState("OFF")

    // Door 1
    const [doorStatus1, setdoorStatus1] = useState("OPEN");

    // Door 1 ref
    const door1Ref = useRef("OPEN");

    // If you dont make a separate variable, both elements are affected at once
    // Door 2
    const [doorStatus2, setdoorStatus2] = useState("OPEN");

    // Door 2 ref
    const door2Ref = useRef("OPEN");

    // This plays the door sound
    const [playdoorClose] = useSound(doorClose, { volume: 1 });

    // Security Guard position
    const [securityPos, setsecurityPos] = useState({ x: 925, y: 95 });

    // If THIS does not work I'm jumping in a vat of acid
    const securityRef = useRef({ x: 925, y: 95 })


    // This sets Chica's position
    const [chicaPos, setchicaPos] = useState({ x: 500, y: 570 });

    // Chica ref position
    const chicaRef = useRef({ x: 500, y: 570 })

    // Game Over function
    const [gameOver, setgameOver] = useState(false)






    // Need to add the door refs insice...dont forget the {}


    // Door and Background Noise
    function changeDoor1() {
        setdoorStatus1(prev => {
            const newStatus = prev === "OPEN" ? "CLOSED" : "OPEN";
            door1Ref.current = newStatus;
            return newStatus;
        });
        console.log(`Door1 is closed`);


        // Door close sound effect
        playdoorClose();

    };

    // Automatically sets door1 to open
    useEffect(() => {

        if (doorStatus1 === "CLOSED") {
            const timer = setTimeout(() => {
                setdoorStatus1("OPEN");
                door1Ref.current = "OPEN";
                console.log("Door1 is open")
                playdoorClose();
            }, 7000);

            return () => clearTimeout(timer)
        }


    }, [doorStatus1]);

    function changeDoor2() {
        setdoorStatus2(prev => {
            const newStatus = prev === "OPEN" ? "CLOSED" : "OPEN";
            door2Ref.current = newStatus;
            return newStatus;
        });
        console.log(`Door2 is closed`);

        // Door close sound effect
        playdoorClose();
    };

    // Automatically sets door2 to open
    useEffect(() => {

        if (doorStatus2 === "CLOSED") {
            const timer = setTimeout(() => {
                setdoorStatus2("OPEN");
                door2Ref.current = "OPEN";
                console.log("Door2 is open")
                playdoorClose();
            }, 7000);

            return () => clearTimeout(timer)
        }


    }, [doorStatus2]);

    // Toggle on or off for background noise
    function playBackground() {
        setambienceMode(prev => {
            if (prev === "OFF") {
                playAmbience();
                return "ON"
            } else if (prev === "ON") {
                stop();
                return "OFF"
            }
        });

    }





    // State for CCTV footage
    const [partyCam, setpartyCam] = useState("OFF");
    const [kitchenCam, setkitchenCam] = useState("OFF");
    const [storeCam, setstoreCam] = useState("OFF");
    const [officeCam, setOfficeCam] = useState("OFF");
    const [toiletCam, settoiletCam] = useState("OFF");
    const [feedNum, setfeedNum] = useState(0)


    // Array of CCTV footage
    let cctv = [partyCam, kitchenCam, storeCam, officeCam, toiletCam]


    // Trying to iterate over an array forwards
    function cctvCheckForward() {


        // Party Cam
        if (feedNum === 0) {
            settoiletCam(prev =>
                prev = "OFF"
            );

            setpartyCam(prev =>
                prev = "ON"
            );

            setfeedNum(prev =>
                prev + 1
            );
        }

        // Kitchen Cam
        if (feedNum === 1) {
            setpartyCam(prev =>
                prev = "OFF"
            );

            setkitchenCam(prev =>
                prev = "ON"
            );

            setfeedNum(prev =>
                prev + 1
            )
        }

        // Store Cam
        if (feedNum === 2) {
            setkitchenCam(prev =>
                prev = "OFF"
            );

            setstoreCam(prev =>
                prev = "ON"
            );

            setfeedNum(prev =>
                prev + 1
            );
        }

        // Office Cam
        if (feedNum === 3) {
            setstoreCam(prev =>
                prev = "OFF"
            );

            setOfficeCam(prev =>
                prev = "ON"
            );

            setfeedNum(prev =>
                prev + 1
            );
        }

        // Toilet Cam 
        if (feedNum === 4) {
            setOfficeCam(prev =>
                prev = "OFF"
            );

            settoiletCam(prev =>
                prev = "ON"
            );

            setfeedNum(prev =>
                prev = 0
            )
        }



    }


    // Closes everything and resets values
    function closeCCTV() {
        setpartyCam("OFF");
        setkitchenCam("OFF");
        setstoreCam("OFF");
        setOfficeCam("OFF");
        settoiletCam("OFF");
        setfeedNum(0);
    };

    // Only after I have clicked the forward button
    useEffect(() => {
        console.log(`Party Room is now ${partyCam}`); // Debugging purposes need to see if the change happens
        console.log(`Kitchen is now ${kitchenCam}`);
        console.log(`Store Room is now ${storeCam}`);
        console.log(`Office is now ${officeCam}`);
        console.log(`Toilet is now ${toiletCam}`);
        console.log(`FeedNm is now ${feedNum}`);
    }, [partyCam, kitchenCam, storeCam, officeCam, toiletCam, feedNum])

    // Automatically closes CCTV
    // Checks if any camera is on 
    useEffect(() => {

        const anyCam = partyCam === "ON" || kitchenCam === "ON" || storeCam === "ON" || officeCam === "ON" || toiletCam === "ON";

        if (anyCam) {
            const timer = setTimeout(() => {
                console.log('CCTV is OFF')
                closeCCTV()
            }, 999);
            return () => clearTimeout(timer)
        }
    }, [partyCam, kitchenCam, storeCam, officeCam, toiletCam])



    function jumpScare() {
        return (
            <video className="vid" src="/video/jumpscare.mp4" autoPlay></video>

        )
    }



    // // Chica's AI
    useEffect(() => {

        const roamSpeed = 2;
        const sprintSpeed = 4;
        let currentState;





        const waitcheck = () => {
            console.log("Wait is finished")

            // Turning rooms into keys
            // sorts rooms into arrays
            const roomsArray = Object.keys(ROOMS)

            // Creates index to pick from(random)
            const roomsIndex = Math.floor(Math.random() * roomsArray.length);

            // Random room will be picked
            const rooms = roomsArray[roomsIndex]

            // This will help me get the range so chica wont go to a specific coordinate but more inside the space
            const maxValX = ROOMS[rooms].x + ROOMS[rooms].width;
            const minValX = ROOMS[rooms].x

            const maxValY = ROOMS[rooms].y + ROOMS[rooms].height;
            const minValY = ROOMS[rooms].y

            const rangeX = maxValX - minValX;
            const rangeY = maxValY - minValY;

            // Creates a random width and height to add to the minimum => 
            const randWidth = Math.floor(Math.random() * (rangeX + 1));
            const randHeight = Math.floor(Math.random() * (rangeY + 1));

            // Chica will go to a random location inside a room not a specific coordinate
            const roomX = randWidth + minValX;
            const roomY = randHeight + minValY


            let chicaRoam;
            let bolting = false

            // ROAM
            chicaRoam = setInterval(() => {

                const dx = roomX - chicaRef.current.x;
                const dy = roomY - chicaRef.current.y;

                const distance = Math.sqrt(dx ** 2 + dy ** 2);



                setchicaPos({ ...chicaRef.current })

                // Bolting to kitchen - runs before everything else
                if (bolting) {
                    const sdx = SPAWN.POINT.x - chicaRef.current.x;
                    const sdy = SPAWN.POINT.y - chicaRef.current.y;
                    const spawnDist = Math.sqrt(sdx**2 + sdy**2);
                    const snx = sdx / spawnDist;
                    const sny = sdy / spawnDist;
                    chicaRef.current.x += snx * sprintSpeed;
                    chicaRef.current.y += sny * sprintSpeed;
                    if (spawnDist <= 15) {
                        bolting = false;
                        clearInterval(chicaRoam);
                        setTimeout(waitcheck, 13000);
                    }
                    return; // Skip everything else
                }

                // Back to wait but wait how the fuck do i loop this without hard coding
                if (distance <= 15) {
                    console.log("ARRIVED. Stopping Interval....");
                    clearInterval(chicaRoam);
                    setTimeout(waitcheck, 13000)
                    return;
                };

                // Making changing rooms easier
                let targetX = roomX;
                let targetY = roomY;
                let speed = roamSpeed;


                // Sprint State

                // Door 1 danger zone distance check
                let doorx1 = DANGERZONES.DOOR1.x - chicaRef.current.x;
                let doory1 = DANGERZONES.DOOR1.y - chicaRef.current.y;
                const door1Dist = Math.sqrt(doorx1 ** 2 + doory1 ** 2);

                // Door 2 danger zone distance check
                let doorx2 = DANGERZONES.DOOR2.x - chicaRef.current.x;
                let doory2 = DANGERZONES.DOOR2.y - chicaRef.current.y;
                const door2Dist = Math.sqrt(doorx2 ** 2 + doory2 ** 2);

                // Allowing speed to be aggressive

                if (door1Dist < 500) {

                    // Moving chica to door 1
                    speed = sprintSpeed;
                    targetX = DANGERZONES.DOOR1.x;
                    targetY = DANGERZONES.DOOR1.y;

                    const ndx1 = doorx1 / door1Dist;
                    const ndy1 = doory1 / door1Dist;


                    chicaRef.current.x += ndx1 * speed;
                    chicaRef.current.y += ndy1 * speed;

                    // Checking if youre in the danger zone TODO: FINISH DANGERZONE CHECK
                    if (door1Dist <= 50) {
                        if (door1Ref.current === "OPEN") {
                            setgameOver(true);
                            clearInterval(chicaRoam);
                                setTimeout(() => {
                            window.location.reload();
                        },5500);
                        } else {
                            // Bolt straight to the kitchen
                                bolting = true;
                        }
                    }

                } else if (door2Dist < 500) {
                    speed = sprintSpeed;
                    targetX = DANGERZONES.DOOR2.x;
                    targetY = DANGERZONES.DOOR2.y;

                    const ndx2 = doorx2 / door2Dist;
                    const ndy2 = doory2 / door2Dist;


                    chicaRef.current.x += ndx2 * speed;
                    chicaRef.current.y += ndy2 * speed;

                    if (door2Dist <= 50) {
                        if (door2Ref.current === "OPEN") {
                            setgameOver(true);
                            clearInterval(chicaRoam);
                                setTimeout(() => {
                            window.location.reload();
                        },5500);
                        } else {
                            // Bolt straight to the kitchen
                                bolting = true;
                        }
                    }


                } else {
                    const nx = dx / distance;
                    const ny = dy / distance;

                    chicaRef.current.x += nx * roamSpeed;
                    chicaRef.current.y += ny * roamSpeed;
                    console.log(`${chicaRef.current.x} : ${chicaRef.current.y}`);
                }










            }, 50)





        }
        currentState = setTimeout(waitcheck, 5000);



        return () => {
            clearTimeout(currentState)
        }



    }, [])




    return (
        <div className="page-container">
            <>
                {gameOver === true && <div className="jumpscare" >
                    {jumpScare()}
                </div>}

                <div className="game-world">
                    {/* MAP */}

                    {/* Section 1 - Security room */}
                    <div className="security-room-container">
                        <button onClick={changeDoor1} className="button">{doorStatus1}</button>
                        <div className="security-room"></div>
                        <button onClick={changeDoor2} className="button">{doorStatus2}</button>
                    </div>


                    {/* Section 2 - Party Area and Bathrooms */}
                    <div className="section2">
                        <div className="party-area"></div>
                        <div className="bathroom"></div>
                    </div>

                    {/* Section 3 - Kitchen, Store Area and Office */}
                    <div className="section3">
                        <div className="kitchen"></div>
                        <div className="store-area"></div>
                        <div className="office"></div>
                    </div>

                    {/* Chica*/}
                    <div className="Chica" style={{
                        left: chicaPos.x,
                        top: chicaPos.y
                    }}>
                        Chica
                    </div>


                    {/* Guard */}
                    <div className="Guard" style={{
                        left: securityPos.x,
                        top: securityPos.y
                    }}>
                        Guard
                    </div>


                    {/* Used something called Short Circuit evaluation: If the left side is TRUE then the right side will be rendered, if FALSE then the right side will be ignored */}
                    {/* PartyCam */}
                    {partyCam === "OFF" && (<div className="partyCam" style={{
                        left: ROOMS.PARTY.x,
                        top: ROOMS.PARTY.y
                    }}>
                        <p>Party-Area</p>
                    </div>)}

                    {/* Toilet Cam */}
                    {toiletCam === "OFF" && (<div className="toiletCam" style={{
                        left: ROOMS.TOILET.x,
                        top: ROOMS.TOILET.y
                    }}>
                        <p>Toilet</p>

                    </div>)}

                    {/* Store Room Cam */}
                    {storeCam === "OFF" && (<div className="storeCam" style={{
                        left: ROOMS.STORE.x,
                        top: ROOMS.STORE.y
                    }}>
                        <p>Store-Room</p>
                    </div>)}

                    {/* Kitchen Cam */}
                    {kitchenCam === "OFF" && (<div className="kitchenCam" style={{
                        left: ROOMS.KITCHEN.x,
                        top: ROOMS.KITCHEN.y
                    }}>
                        <p>Kitchen</p>
                    </div>)}

                    {/* Office Cam */}
                    {officeCam === "OFF" && (<div className="officeCam" style={{
                        left: ROOMS.OFFICE.x,
                        top: ROOMS.OFFICE.y
                    }}>
                        <p>Office</p>
                    </div>)}

                </div>
            </>

            {/* Ambience button */}
            <button className="ambience" onClick={playBackground}>
                Ambience {ambienceMode}
            </button>

            {/* Need to find a way to control css using this button  */}
            {/* This rewuires some conditional rendering...and it is called short circuit evaluation */}
            <button className="cctvForward" onClick={cctvCheckForward}>
                ⏩
            </button>

            <button className="closeCCTV" onClick={closeCCTV}>
                ❎
            </button>
        </div>

    );
}

// Animatronic AI behaviour

/*
Chica - the cautious one

aggression is at a 5 out of 10
shes extremely aware of the player
will wait about 15 seconds before moving so not too impatient

she pauses when there is surveillance
will wait when the camera opens
when it closes, changes room
randomly picks a room
is shes close to the door though she will sprint 
but will wait if shes watched while sprinting
and will wait if the door is closed and possibly move to a room further from the player
*/
