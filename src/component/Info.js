import { GAMESTATE } from "../constants";

function Info({handleStart,gameState,runtime,score}){
    const status=((state)=>{
        switch(state){
            case GAMESTATE.RUN: return "😀";
            case GAMESTATE.LOSE:return "😢";
            default:return "🙂";
        }
    })(gameState);

    let runtimeStr=""+runtime,scoreStr=""+score;
    if(runtimeStr.length<4) runtimeStr="0".repeat(4-runtimeStr.length)+runtimeStr;
    if(scoreStr.length<4) scoreStr="0".repeat(4-scoreStr.length)+scoreStr;

    return (
        <div className="info">
            <div className="score"><span>🎰</span>{scoreStr}</div>
            <div className="status" title="重开"><button onClick={handleStart}>{status}</button></div>
            <div className="time"><span>🕙</span>{runtimeStr}</div>
        </div>
    )

}
export default Info;