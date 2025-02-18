var rows = 4;
var columns = 4;
var currtile;
var othertile; //blank

var turns = 0;
const audio = new Audio();
audio.src = "Plop.mp4";

var imgOrder = ["0","1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"];
var easyOrder = ["1","2","3","4","5","6","7","8","9","10","11","12","13","14","0","15"];
var correctOrder = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12", "13", "14", "15", "0"];

window.onload = function()
{
    var Shuffled = Shuffle(imgOrder);


    for(let r=0; r < rows; r++)
    {
        for(let c=0; c < columns; c++)
        {
            let tile = document.createElement("img");
            tile.id = r.toString() + "-" + c.toString();
            tile.src = Shuffled.shift() + ".png";// Change here! Change here! Change here! Change here! Change here! Change here! Change here! Change here!
            

            tile.addEventListener("dragstart",dragStart);
            tile.addEventListener("dragover",dragOver);
            tile.addEventListener("dragenter",dragEnter);
            tile.addEventListener("dragleave",dragLeave);
            tile.addEventListener("drop",dragDrop);
            tile.addEventListener("dragend",dragEnd);

            tile.addEventListener("touchstart", touchStart);
            tile.addEventListener("touchmove", touchMove);
            tile.addEventListener("touchend", touchEnd);

            document.getElementById("board").append(tile);
        }
    }
}

for(i=0;i<=4;i++)
{
    for(j=0;j<=4;j++)
    {
        
    }
}



function Shuffle(array) 
{  
    let ShuffledArray = [];
    let usedIndex = [];
    let i = 0;
    while (i < array.length)
    {
        let randomNumber = Math.floor(Math.random(0,) * array.length);
        if(!usedIndex.includes(randomNumber))
        {
            ShuffledArray.push(array[randomNumber]);
            usedIndex.push(randomNumber);
            i++;
        }
    }
    console.log(ShuffledArray)
    return ShuffledArray;
}

function dragStart() 
{
    currtile = this;
}

function dragOver(e)
{
    e.preventDefault();
}

function dragEnter(e) 
{
    e.preventDefault();
}

function dragDrop()
{
    othertile = this;
}

function dragLeave()
{

}

function dragEnd() 
{
    if(!othertile.src.includes("0.png"))
    {
        console.log("poopoo");
        return;
    }
    let curCoords = currtile.id.split("-");
    let r = parseInt(curCoords[0]);
    let c = parseInt(curCoords[1]);

    let otherCoords = othertile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let leftTile = r == r2 && c2 == c-1;
    let rightTile = r == r2 && c2 == c+1;
    let upTile = r == r2-1 && c2 == c;
    let downTile = r == r2+1 && c2 == c;

    isAdjacent = leftTile || rightTile || upTile || downTile
    if(isAdjacent)
    {

        let currImg = currtile.src;
        let otherImg = othertile.src;
        currtile.src = otherImg;
        othertile.src = currImg;
        turns = turns+1;
        document.getElementById("turns").innerText = turns;
        audio.play();
        checkOrder();
    }
}






//Checking Checking Checking Checking Checking Checking Checking Checking Checking Checking


function checkOrder() {
    let currentOrder = [];
    let tiles = document.getElementById("board").getElementsByTagName("img");

    for (let tile of tiles) {
        let src = tile.src.split('/').pop().split('.')[0];
        currentOrder.push(src);
    }

    if (arraysEqual(currentOrder, correctOrder)) {
        alert("Correct order!");
    }
}

function arraysEqual(arr1, arr2) {
    if (arr1.length !== arr2.length) return false;
    for (let i = 0; i < arr1.length; i++) {
        if (arr1[i] !== arr2[i]) return false;
    }
    return true;
}








// This is for touch This is for touch This is for touch This is for touch This is for touch This is for touch This is for touch 




function touchStart(e) {
    e.preventDefault();
    currtile = this;
}

function touchMove(e) {
    e.preventDefault();
    const touch = e.touches[0];
    const element = document.elementFromPoint(touch.clientX, touch.clientY);
    if (element && element.tagName === "IMG") {
        othertile = element;
    }
}

function touchEnd(e) {
    e.preventDefault();
    if (othertile && othertile.src.includes("0.png")) {
        swapTiles();
    }
}

function swapTiles() {
    let curCoords = currtile.id.split("-");
    let r = parseInt(curCoords[0]);
    let c = parseInt(curCoords[1]);

    let otherCoords = othertile.id.split("-");
    let r2 = parseInt(otherCoords[0]);
    let c2 = parseInt(otherCoords[1]);

    let leftTile = r == r2 && c2 == c - 1;
    let rightTile = r == r2 && c2 == c + 1;
    let upTile = r == r2 - 1 && c2 == c;
    let downTile = r == r2 + 1 && c2 == c;

    let isAdjacent = leftTile || rightTile || upTile || downTile;
    if (isAdjacent) {
        let currImg = currtile.src;
        let otherImg = othertile.src;
        currtile.src = otherImg;
        othertile.src = currImg;
        turns = turns + 1;
        audio.play();
        document.getElementById("turns").innerText = turns;
    }
}