var canvas; // o elemento canvas sobre o qual desenharemos
var ctx; // o "contexto" da canvas que será utilizado (2D ou 3D)
var circles = []; // array para armazenar informações sobre os círculos
var WIDTH = 500; // largura da área retangular
var HEIGHT = 200; // altura da área retangular
var selectedCircle = null; // variável para armazenar o círculo selecionado
var backgroundColorRed = false; // indica se a cor de fundo vermelha está ativada

function Desenhar() {
    if (backgroundColorRed) {
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, WIDTH, HEIGHT);
    } else {
        ctx.clearRect(0, 0, WIDTH, HEIGHT);
    }

    for (var i = 0; i < circles.length; i++) {
        ctx.beginPath();
        ctx.fillStyle = "blue";
        ctx.arc(circles[i].x, circles[i].y, circles[i].radius, 0, Math.PI * 2, true);
        ctx.fill();
    }
}

function LimparTela() {
    ctx.clearRect(0, 0, WIDTH, HEIGHT);
}

function AlterarCorFundoVermelha() {
    backgroundColorRed = !backgroundColorRed; // Inverte o estado da cor de fundo vermelha
}

function Iniciar() {
    canvas = document.getElementById("canvas");
    ctx = canvas.getContext("2d");

    // Adicionando eventos de mouse
    canvas.addEventListener("mousedown", MouseDown, false);
    canvas.addEventListener("mouseup", MouseUp, false);
    canvas.addEventListener("mousemove", MouseMove, false);

    // Adicionando evento de clique para o botão "Adicionar Círculo"
    var addCircleButton = document.getElementById("addCircleButton");
    addCircleButton.addEventListener("click", AdicionarCirculo, false);

    // Adicionando evento de clique para o botão "Cor de Fundo Vermelha"
    var changeBgColorButton = document.getElementById("changeBgColorButton");
    changeBgColorButton.addEventListener("click", AlterarCorFundoVermelha, false);

    return setInterval(Atualizar, 10);
}

function MouseDown(evt) {
    var mousePos = getMousePos(canvas, evt);
    for (var i = circles.length - 1; i >= 0; i--) {
        var circle = circles[i];
        var dx = circle.x - mousePos.x;
        var dy = circle.y - mousePos.y;
        var distance = Math.sqrt(dx * dx + dy * dy);
        if (distance <= circle.radius) {
            selectedCircle = circle;
            break;
        }
    }
}

function MouseUp(evt) {
    selectedCircle = null;
}

function MouseMove(evt) {
    if (selectedCircle) {
        var mousePos = getMousePos(canvas, evt);
        selectedCircle.x = mousePos.x;
        selectedCircle.y = mousePos.y;
    }
}

function AdicionarCirculo() {
    var newCircle = {
        x: Math.random() * WIDTH,
        y: Math.random() * HEIGHT,
        radius: 10
    };
    circles.push(newCircle);
}

function Atualizar() {
    Desenhar();
}

function getMousePos(canvas, evt) {
    var rect = canvas.getBoundingClientRect();
    return {
        x: evt.clientX - rect.left,
        y: evt.clientY - rect.top
    };
}

Iniciar();
