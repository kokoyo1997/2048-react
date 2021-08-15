import { NUMBERCLASS } from "../constants";

function Square({value}){
    const classNumber=NUMBERCLASS[value];
    return (
        <div className={`square ${classNumber}`}>{value!==0?value:""}</div>
    )
}

export default Square;