import { useEffect, useState } from "react";
import { KEYCODE } from "../constants";
import { randomTile, toDown, toLeft, toRight, toUp } from "../tools";
import Board from "./Board";
import Info from "./Info";
function Game(){
    const [boardData,setBoardData]=useState(new Array(16).fill(0));

    const reducer=(state,action)=>{
        switch(action.type){

        }
    }

    const handleStart=()=>{
        let tmp_board=new Array(16).fill(0);
        randomTile(tmp_board);
        setBoardData(tmp_board)
    }

    const handleKeyboard=(e)=>{
        if(KEYCODE[e.keyCode]){
            e.preventDefault();
            let tmp=[...boardData],change=false;
            switch(KEYCODE[e.keyCode]){
                case "LEFT": change=toLeft(tmp);break;
                case "RIGHT": change=toRight(tmp);break;
                case "UP": change=toUp(tmp);break;
                case "DOWN": change=toDown(tmp);break;
                default:break;
            }

           if(change) randomTile(tmp);
           setBoardData(tmp);
        }
    }

    useEffect(()=>{
        document.addEventListener("keyup",handleKeyboard);

        return ()=>{
            document.removeEventListener("keyup",handleKeyboard);
        }
    })

    return (
        <div className="box">
            <main>
                <h1>2048 Game in React</h1>
                <Info handleStart={handleStart}/>
                <Board boardData={boardData}/>
            </main>
            <div className="ref">
                <p>Source Code Link: <a href="https://github.com/kokoyo1997/2048-react" target="_blank" rel="noreferrer">https://github.com/kokoyo1997/2048-react</a></p>
            </div>
        </div> 
    )
}

export default Game;