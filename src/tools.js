import { SIZE } from "./constants";

export function idx2Loc(idx){
    let col=idx % SIZE;
    let row=Math.floor(idx/SIZE);
    return [row,col]
}

export function randomTile(board){
    let arr=[];
    for(let i=0;i<board.length;i++){
        if(board[i]===0) arr.push(i);
    }
    let r=Math.floor(Math.random()*arr.length);
    let n=Math.floor(Math.random()*2)===1?4:2;
    board[arr[r]]=n;
}

export function toLeft(board){
    let changeFlag=false;
    let score=0;
    for(let i=0;i<SIZE;i++){ //按行处理
        //全部往左排
        for(let j=0;j<SIZE;j++){
            if(board[i*SIZE+j]===0){
                for(let k=j+1;k<SIZE;k++){
                    if(board[i*SIZE+k]!==0){
                        [board[i*SIZE+j],board[i*SIZE+k]]=[board[i*SIZE+k],board[i*SIZE+j]];
                        changeFlag=true;
                        break;
                    }
                }
            }
        }
        //合并
        let k=1;
        while(k<SIZE&&board[i*SIZE+k]!==0){
            if(board[i*SIZE+k]===board[i*SIZE+k-1]){
                board[i*SIZE+k-1]=2*board[i*SIZE+k-1];
                for(let j=k;j<SIZE;j++){
                    board[i*SIZE+j]=j===SIZE-1?0:board[i*SIZE+j+1];
                }
                // board[i*SIZE+k]=k===SIZE-1?0:board[i*SIZE+k+1];
                changeFlag=true;
                score+=board[i*SIZE+k-1];
            }
            k++;
        }

    }
    return [changeFlag,score];
}

export function toRight(board){
    let init=[...board];
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<Math.floor(SIZE/2);j++){
            [init[SIZE*i+j],init[SIZE*i+SIZE-j-1]]=[init[SIZE*i+SIZE-j-1],init[SIZE*i+j]]
        }
    }
    let change=toLeft(init);
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            board[SIZE*i+j]=init[SIZE*i+SIZE-j-1];
        }
    }
    return change;
}

export function toUp(board){
    let init=[];
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            init[SIZE*i+j]=board[SIZE*j+SIZE-i-1];
        }
    }
    let change=toLeft(init);
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            board[SIZE*i+j]=init[SIZE*(SIZE-j-1)+i];
        }
    }
    return change;
}

export function toDown(board){
    let init=[];
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            init[SIZE*i+j]=board[SIZE*(SIZE-j-1)+i];
        }
    }
    let change=toLeft(init);
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            board[SIZE*i+j]=init[SIZE*j+SIZE-i-1];
        }
    }
    return change;
}

export function gameover(board){
    for(let i=0;i<SIZE;i++){
        for(let j=0;j<SIZE;j++){
            if(board[i*SIZE+j]===0) return false;
            if(i>0&&board[i*SIZE+j]===board[(i-1)*SIZE+j]) return false;
            if(j>0&&board[i*SIZE+j]===board[i*SIZE+j-1]) return false;
        }
    }
    return true;
}
