let boxes= document.querySelectorAll(".box");
let newGameBtn= document.querySelector("#newBtn");
let resetBtn = document.querySelector(".reset");
let msgContainer= document.querySelector(".msgContainer");
let msg= document.querySelector("#msg");

let turnO=true;
let count= 0;
const winPatterns = [
    [0, 1, 2],
    [0, 3, 6],
    [0, 4, 8],
    [1, 4, 7],
    [2, 5, 8],
    [2, 4, 6],
    [3, 4, 5],
    [6, 7, 8]
];


//actual insertion of X , O  in game
boxes.forEach(box => {
    box.addEventListener("click",() =>{
        
        if(turnO){
            box.innerText="X"; //player x turn
            box.style.color="blue"; //blue color to x
            turnO=false;
        }
        else{
            box.innerText="O"; //player o turn
            box.style.color="green" //green color to o
            turnO=true;
        }
        count++;
        box.disabled = true;
        
        //draw condition
        let isWinner= checkWinner();
        if(count ===9 && !isWinner){
            gameDraw();   
        }
    })
});

//game draw conditions apply
const gameDraw=() =>{
    msg.innerText=`Game was a Draw`;
    msgContainer.classList.remove("hide");
    disableBtn();
}

//reset game conditions apply
const resetGame=() =>{
    turnO=true;
    enableBtn();
    msgContainer.classList.add("hide");
    count=0;
}

//to disable buttons after winner
const disableBtn= () =>{
    for(let box of boxes){
        box.disabled = true;
    }
}

//to enable buttons 
const enableBtn= () =>{
    for(let box of boxes){
        box.disabled = false;
        box.innerText="";
    }
}

//show winner on viewport
const showWinner = (winner) =>{
    msg.innerText= `Congratulations! Winner is ${winner}`;
    msgContainer.classList.remove("hide");
    disableBtn();
}

//to check winning conditions
const checkWinner = () =>{
    for(let  pattern of winPatterns){
        let posVal1= boxes[pattern[0]].innerText;
        let posVal2= boxes[pattern[1]].innerText;
        let posVal3= boxes[pattern[2]].innerText;

        if(posVal1 !="" && posVal2 !="" && posVal3 !="" ){
            if(posVal1 === posVal2 && posVal2 === posVal3){
                showWinner(posVal1);                
            }
        }
    }
}

//add events to both buttons reset and new game
newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);