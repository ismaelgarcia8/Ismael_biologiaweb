//base de datos local de preguntas
const bd_juego = [
    {
        id:0,
        pregunta:"¿Dónde realizan las plantas la fotosíntesis?",
        op0:"En las hojas",
        op1:"Tallo",
        op2:"Aire",
        correcta:"0"
    },
    {
        id:1,
        pregunta:"¿Qué músculo impulsa la sangre por todo nuestro cuerpo?",
        op0:"Cerebro",
        op1:"Corazón",
        op2:"Pulmones",
        correcta:"1"
    },
    {
        id:2,
        pregunta:"¿Qué necesitan las células para dividirse?",
        op0:"Energia",
        op1:"Nada",
        op2:"Sangre",
        correcta:"0"
    },
    {
        id:3,
        pregunta:"¿Cuántas fases tiene la fotosíntesis?",
        op0:"Luminosa y oscura",
        op1:"Activa y pasiva",
        op2:"Primaria y secundaria",
        correcta:"0"
    },
    {
        id:4,
        pregunta:"¿Qué explica Mendel con sus leyes?",
        op0:" La herencia dejada por los padres a los hijos",
        op1:" Funcionamiento de órganos reproductores",
        op2:"Genética",
        correcta:"2"
    },
    {
        id:5,
        pregunta:"¿En qué teoría se basa la teoria la actual teoría de la evolución?",
        op0:" En la de Darwin",
        op1:" En la de G. Cuvier",
        op2:"En la de Lamark",
        correcta:"0"
    },
    {
        id:6,
        pregunta:"¿Cuántas etápas tiene el proceso digestivo?",
        op0:"6",
        op1:"5",
        op2:"4",
        correcta:"2"
    },
    {
        id:7,
        pregunta:"¿Qué estructuras aumentan la superficie de absorción en el intestino?",
        op0:"Ciegos intestinales, válvula en espiral y vellosidades",
        op1:"Capilares",
        op2:"Válvulas intestinales",
        correcta:"0"
    },
    {
        id:8,
        pregunta:"¿Qué forma las moléculas de ARN?",
        op0:"ADN",
        op1:"Una sola cadena de nucleótidos",
        op2:"Las dos son correctas",
        correcta:"1"
    },
    {
        id:9,
        pregunta:"¿Qué es un gen dominante?",
        op0:"El que domina a otro débil",
        op1:"El que es muy fuerte",
        op2:"El que está escrito en el ADN y además lo vemos en el aspecto de la persona",
        correcta:"2"
    }
]


let respuestas = [];

let cantiCorrectas = 0;

let numPregunta = 0;


function cargarPreguntas(){
    
    const pregunta = bd_juego[numPregunta];

    const contenedor = document.createElement("div");
    contenedor.className = "contenedor-pregunta";
    contenedor.id = pregunta.id;
    const h2 = document.createElement("h2");
    h2.textContent = pregunta.id + 1 + " - " + pregunta.pregunta;
    contenedor.appendChild(h2);
    const opciones = document.createElement("div");

   
    const label1 = crearLabel("0",pregunta.op0);
    const label2 = crearLabel("1",pregunta.op1);
    const label3 = crearLabel("2",pregunta.op2);

   
    opciones.appendChild(label1);
    opciones.appendChild(label2);
    opciones.appendChild(label3);

    
    contenedor.appendChild(opciones);
    document.getElementById("juego").appendChild(contenedor);
}


function crearLabel(num, txtOpcion){
    const label = document.createElement("label");
    label.id = "l" + numPregunta + num;
    const input = document.createElement("input");
    input.setAttribute("type", "radio");
    input.name = "p" + numPregunta;
    input.setAttribute("onclick", "seleccionar(" + numPregunta+","+num+")");
    const span = document.createElement("span");
    const correccion = document.createElement("span");
    correccion.id = "p" + numPregunta + num;
    span.textContent = txtOpcion;
    label.appendChild(input);
    label.appendChild(span);
    label.appendChild(correccion);

    return label;
}


for(i=0;i < bd_juego.length;i++){
    cargarPreguntas();
    
    numPregunta++;
}


function seleccionar(pos, opElegida){
    respuestas[pos] = opElegida;
}


let corregir = document.getElementById("corregir");
corregir.onclick = function(){
    
    for(i=0;i<bd_juego.length;i++){
        
        const pregunta = bd_juego[i];
        if(pregunta.correcta == respuestas[i]){ //respuesta correcta
            cantiCorrectas++;
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta correcta";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }else{//no acerto
            let id = "p" + i + respuestas[i];
            let idCorreccion = "p" + i + pregunta.correcta;
            document.getElementById(i).className = "contenedor-pregunta incorrecta";
            document.getElementById(id).innerHTML = "&#x2715;";
            document.getElementById(id).className = "no-acierto";
            document.getElementById(idCorreccion).innerHTML = "&check;";
            document.getElementById(idCorreccion).className = "acierto";
        }
    }

    
    let inputs = document.getElementsByTagName("input");
    for(i=0;i<inputs.length;i++){
        inputs[i].disabled = true;
    }

    
    window.scrollTo(0,0);
    
    h2 = document.createElement("h2");
    h2.className = "resultado";
    h2.textContent = cantiCorrectas + " CORRECTAS - " + (10-cantiCorrectas) + " INCORRECTAS";
    document.getElementById("juego").appendChild(h2);
}