import Square from "./Square";

function Board({boardData}){
    
    return (
        <div className="board">
            {Array(16).fill(null).map((ele,idx)=>(
                <Square value={boardData[idx]} key={idx} />
            ))}    
        </div>
    )
}

export default Board;