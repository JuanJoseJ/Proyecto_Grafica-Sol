let inputDate = document.getElementById("Date");
let inputTime = document.getElementById("Time");

let inputLatitudGrados = document.getElementById("LatitudGrados");


let inputLongitudGrados = document.getElementById("LongitudGrados");


let fecha = new Date(inputDate.value + " " + inputTime.value);





function logConsole() {


  // la fecha devuelve un objeto de tipo date --> dia mes(resumido) nDia ano hora:minuto:segundos zona horaria (de donde es)
  console.log(fecha);
  console.log(inputDate.value );
  console.log(inputTime.value);
  console.log(inputLatitudGrados.value);
  console.log(inputLongitudGrados.value);
 
}

function CalcularCoordSol(){


}

 
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

watchTime();
logConsole();