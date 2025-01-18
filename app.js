let boxes = document.querySelectorAll(".box");
let resetbtn = document.querySelector("#reset");
let newbtn = document.querySelector("#new");
const messagecontainer = document.querySelector('.message-container');
let msg = document.querySelector("#msg");


let turn1 = true;
let count = 0;   //to track the alternative turns for player x and player y
const win_pattern= [
    [0,1,2],
    [0,3,6],
    [0,4,8],
    [1,4,7],
    [2,5,8],
    [2,4,6],
    [3,4,5],
    [6,7,8],
]; //storing all the winning patterns

//resetting the game
const resetgame = () => {
    turn1 = true; 
    count=0;
    messagecontainer.classList.add('hide');
    enableboxes();
};

//adding event listerner to each box
boxes.forEach((box)=>{
    box.addEventListener('click', ()=>{
   
    if(turn1){
            box.innerHTML='X';//this is turn of pl1 hence setting pl2 as false
        turn1=false;
    }
        else{
            box.innerHTML='O';//this is turn for pl2, setting pl1 as flase
            turn1=true;
        }
        boxes.disabled=true;
        //checkwinner();
        count++;
        let iswinner = checkwinner();
        if(count === 9 && !iswinner){
            drawgame();
        }
    });
});


//condition for a draw game
const drawgame = () => {
    msg.innerText=`It's a Draw`;
    messagecontainer.classList.remove("hide");
    disableboxes();
}


//disable all functionality to reset game
const disableboxes = ()=>{
    for(let box of boxes){
        box.disabled=true;
    }
};


//to enable all boxes after game reset
const enableboxes = () => {
    for(let box of boxes){
        box.disabled=false;
        box.innerText="";
    }
};

//to unhide the result value and print the result message
const showwinner = (pos1val) => {
    msg.innerText =`Congratulations, winner is ${pos1val}`;
    messagecontainer.classList.remove("hide");
    disableboxes();
};
//checking for the winning pattern
const checkwinner = ()=>{
    for ( let patterns of win_pattern){
        let pos1val=boxes[patterns[0]].innerHTML;//to access inner test of each box
        let pos2val=boxes[patterns[1]].innerHTML;
        let pos3val=boxes[patterns[2]].innerHTML;

        if(pos1val!='' && pos2val!='' && pos3val!=''){
            if(pos1val===pos2val && pos2val===pos3val){
                showwinner(pos1val);
                return true;
            }
        }
    }
};
//adding evntlistnr to out button to trigger its action
resetbtn.addEventListener("click",resetgame);
newbtn.addEventListener("click",resetgame);

