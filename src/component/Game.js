import { useEffect, useState } from "react";
import { GAMESTATE, KEYCODE } from "../constants";
import { gameover, randomTile, toDown, toLeft, toRight, toUp } from "../tools";
import Board from "./Board";
import Info from "./Info";
function Game(){
    const [boardData,setBoardData]=useState(new Array(16).fill(0));
    const [gameState,setGameState]=useState(GAMESTATE.READY);
    const [runtime,setRuntime]=useState(0);
    const [score,setScore]=useState(0);

    const reducer=(state,action)=>{
        switch(action.type){

        }
    }

    const handleStart=()=>{
        let tmp_board=new Array(16).fill(0);
        randomTile(tmp_board);
        setBoardData(tmp_board);
        setGameState(GAMESTATE.RUN);
        setRuntime(0);
        setScore(0);
    }

    const handleKeyboard=(e)=>{
        if(KEYCODE[e.keyCode]){
            e.preventDefault();
            let tmp=[...boardData],change=false,scoreAdd=0;
            switch(KEYCODE[e.keyCode]){
                case "LEFT": [change,scoreAdd]=toLeft(tmp);break;
                case "RIGHT": [change,scoreAdd]=toRight(tmp);break;
                case "UP": [change,scoreAdd]=toUp(tmp);break;
                case "DOWN": [change,scoreAdd]=toDown(tmp);break;
                default:break;
            }

           if(change){
                randomTile(tmp);
                if(gameover(tmp)) setGameState(GAMESTATE.LOSE);
           }

           setBoardData(tmp);
           setScore(prev=>prev+scoreAdd);
        }
    }

    useEffect(()=>{
        let timer=null
        if(gameState===GAMESTATE.RUN){
            timer=setInterval(()=>{
                setRuntime(prev=>prev+1);
            },1000);
        }else if(timer){
            clearInterval(timer);
            timer=null;
        }

        return ()=>{
            if(timer) clearInterval(timer);
        }
    },[gameState]);

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
                <Info handleStart={handleStart} gameState={gameState} runtime={runtime} score={score}/>
                <Board boardData={boardData}/>
            </main>
            <div className="ref">
                <p>Source Code Link: <a href="https://github.com/kokoyo1997/2048-react" target="_blank" rel="noreferrer">https://github.com/kokoyo1997/2048-react</a></p>
            </div>
        </div> 
    )
}

export default Game;