/* 

Passo a passo para desenhar no canvas

- Quando o click do mouse ABAIXAR, ative o modo desenho.
- Quando o mouse se MOVER, se o modo desenho estiver ativado, desenhe.
- Quando o click do mouse LEVANTAR, desative o modo desenhe.

*/

//Cor inical
let currentColor = 'black';
let canDraw = false;
let mouseX = 0;
let mouseY = 0;



let screen = document.querySelector('#tela');
let ctx = screen.getContext('2d'); //Pegando a dimensão da tela, nesse caso é 2D


//Eventos

document.querySelectorAll('.colorArea .color').forEach(item => {
    item.addEventListener('click', colorClickEvent);

});

screen.addEventListener('mousedown', mouseDownEvent);

screen.addEventListener('mousemove', mouseMoveEvent);

screen.addEventListener('mouseup', mouseUpEvent);

document.querySelector('.clear').addEventListener('click', clearScreen);




//Funções


function colorClickEvent(e) {
    let color = e.target.getAttribute('data-color');
    currentColor = color;

    document.querySelector('.color.active').classList.remove('active');
    e.target.classList.add('active');
}


function mouseDownEvent(e){
    canDraw = true;
     mouseX = e.pageX - screen.offsetLeft;
     mouseY = e.pageY - screen.offsetTop;

    
}

function mouseMoveEvent(e){
   if(canDraw){
      
       draw(e.pageX, e.pageY);
   }
}

function mouseUpEvent(){
    canDraw = false;
    
}

function draw(x,y){

    let pointX = x- screen.offsetLeft;
    let pointY = y- screen.offsetTop;

    ctx.beginPath(); //Caracteristicas da linha
    ctx.lineWidth = 3;  //Grossura da linha
    ctx.lineJoin = 'round'; //Formato dela, nesse caso redonda
    ctx.moveTo(mouseX , mouseY); //Mover o cursor para a posição do mouse
    ctx.lineTo(pointX , pointY); //Faz o desenho até o mouse
    ctx.closePath(); //Fecha o processo do desenho
    ctx.strokeStyle = currentColor; //Cor da linha
    ctx.stroke(); //Finaliza o processo do desenho

    //Desenhar

    mouseX = pointX;
    mouseY = pointY;



}

function clearScreen(){
    ctx.setTransform(1, 0, 0, 1, 0, 0);
    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
}