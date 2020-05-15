//funcion que me dara el transcurso del tiempo 


function watchTime(){
  var date = new Date();
  var hour = date.getHours();
  var min = date.getMinutes();
  var sec = date.getSeconds();

  // var midday = "AM";
  // midday = (hour >= 12) ? "PM" : "AM"; /* assigning AM/PM */
  // hour = (hour == 0) ? 12 : ((hour > 12) ? (hour - 12): hour);

  hour = updateTime(hour);
  min = updateTime(min);
  sec = updateTime(sec);

  //document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec + " " + midday;
  document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec;
  var t = setTimeout(function(){ watchTime() }, 1000); /* setting timer */
}

//agrega un 0 a la izquierda a los valores menores de 10
function updateTime(k) {
    if (k < 10) {
      return "0" + k;
    }
    else {
      return k;
    }
}



function logConsole() {

  var inputDate = document.getElementById("Date");
  var inputTime = document.getElementById("Time");
  // var inputLatitudGrados = document.getElementById("LatitudGrados");
  // var inputLatitudMinutos = document.getElementById("LatitudMinutos");
  // var inputLatitudSegundos = document.getElementById("LatitudSegundos");
  // var inputLongitudGrados = document.getElementById("LongitudGrados");
  // var inputLongitudMinutos = document.getElementById("LongitudMinutos");
  // var inputLongitudSegundos = document.getElementById("LongitudSegundos");

  console.log(typeof inputDate.value);
  let fecha = inputDate.value;
  console.log(escrituraFecha(fecha));
  console.log(inputDate.value );
  console.log(inputTime.value);


}

let meses = ["Enero", "Febrero", "Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto", 
            "Septiembre", "Octubre", "Noviembre", "Diciembre"];

function escrituraFecha( fecha ){
  let nuevaFecha = "";
  for (let index = 0; index < fecha.length; index++) {
    if(fecha[index] == "-"){

      nuevaFecha += ",";

    }else{

      nuevaFecha += fecha[index];

    }
  }
  return nuevaFecha;
}
  
watchTime();
logConsole();