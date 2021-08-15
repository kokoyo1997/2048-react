function Info({handleStart}){
    return (
        <div className="info">
            <div className="score"><span>💣</span>000</div>
            <div className="status"><button onClick={handleStart}>😄</button></div>
            <div className="time"><span>🕙</span>000</div>
        </div>
    )

}
export default Info;