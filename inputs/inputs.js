//funcion que me dara el transcurso del tiempo 

function watchTime(){
    var date = new Date();
    var hour = date.getHours();
    var min = date.getMinutes();
    var sec = date.getSeconds();

    hour = updateTime(hour);
    min = updateTime(min);
    sec = updateTime(sec);

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

