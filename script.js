let boxes = document.querySelectorAll(".box");
let newbtn = document.querySelector("#new");
let msgContainer = document.querySelector(".msg-container")
let msg = document.querySelector(".msg");
let move = document.querySelector(".move");

let turnO = true;

let count = 0;
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

boxes.forEach((box)=>{
    box.addEventListener("click",()=>{
        if (turnO) {
            box.innerText = "O";
            turnO = false;
            move.innerText="Move : X"
        } else {
            move.innerText="Move : O"
            box.innerText = "X";
            turnO = true;
        }
        box.disabled = true;
        count++;
        let isWinner =  checkWinner();
        if(count === 9 && !isWinner){
            gameDraw()
        }
    })
});
const gameDraw = () => {
    msg.innerText = `Game was a Draw.`;
    msg.classList.remove("hide");
    disabledBoxes();
    move.innerText="Move"
  };
const disabledBoxes = ()=>{
      for( let box of boxes){
          box.disabled = true;
      }
  }

const newGame = ()=>{
    turnO = true;
    count = 0;
    enableBoxes();
    msg.classList.add("hide");
    move.innerText="Move : O"
}

const enableBoxes = ()=>{
    for( let box of boxes){
        box.disabled = false;
        box.innerText = "";
    }
}

const showWinner = (winner) =>{
    msg.innerText = `Congratulations, Winner is ${winner}`;
    msg.classList.remove("hide");
    disabledBoxes()
}


const checkWinner = () =>{
    for (let pattern of winPatterns){
        let pos1val = boxes[pattern[0]].innerText;
        let pos2val = boxes[pattern[1]].innerText;
        let pos3val = boxes[pattern[2]].innerText;

        if(pos1val != "" && pos2val != "" && pos3val != ""){
            if(pos1val === pos2val && pos2val === pos3val){
                console.log("winner", pos1val);
                showWinner(pos1val)
                move.innerText="Move"
                return true;
            }
        }
    }
};

newbtn.addEventListener("click", newGame);