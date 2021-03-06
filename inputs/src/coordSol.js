
//browser-sync start --server --files "*.html, *.js"    
var alfa,delta,eps,lam,L,g,n,date,T,gst,A,H,h,fi,lon,lat;


function enviarInputs(){
    
    let inputDate = document.getElementById("Date");
    let inputTime = document.getElementById("Time");

    let inputLatitudGrados = document.getElementById("LatitudGrados");


    let inputLongitudGrados = document.getElementById("LongitudGrados");

    var fecha = new Date(inputDate.value + " " + inputTime.value + ":00 GMT-0500");

    console.log(fecha);
    console.log(coordSol(fecha, parseInt(inputLongitudGrados.value,10) ,parseInt(inputLatitudGrados.value,10)));
    
    let cambio = document.getElementById("run");
    console.log(cambio.value)
    watchTime(inputDate.value, fecha, cambio.value);
}



function coordSol(fecha, lon, lat){

    //date = new Date('03-01-2020-16:00:00 GMT-0500'); //Meter aquí la fecha
    date = fecha;

    var pi= Math.PI;

    //son las de medallo
    // lon=-75;
    // lat=6;

    //Conseguir coordenadas ecuatoriales del sol
    n=getJulianDate(date)-2451545;
    var nH=n%1;
    g=357.528+0.9856003*n;
    L=280.460+0.9856474*n
    eps=23.439;
    lam=L*(pi/180)+1.915*(pi/180)*Math.sin(g*(pi/180))+0.02*(pi/180)*Math.sin(2*g*(pi/180));
    delta=Math.asin(Math.sin(eps*(pi/180))*Math.sin(lam));
    alfa=Math.atan(Math.cos(eps*(pi/180))*Math.tan(lam));

    //Transformar a coordenadas horizontales
    T=n/36525;
    fi=lat*(pi/180);
    H=nH*360+lon;
    h=Math.asin(Math.sin(delta)*Math.sin(fi)+Math.cos(delta)*Math.cos(fi)*Math.cos(H*(pi/180)));
    A=Math.asin(-((Math.cos(delta)*Math.sin(H*(pi/180)))/Math.cos(h)));
    if(H<180){
        if(delta>=0){
            A+=0;
        }else{
            A=pi-A;
        }
    }
    //coordenadas rectangulares
    var x,y,z,factor; //sen y cos dan un valor entre -1 y 1, factor es para escalar esa distancia
    factor=100; //Hay que ponerle un numero grande
    x=Math.cos(A); //Direccion Norte
    y=Math.sin(A); //Direccion oriente
    z=Math.sin(h); //Altura

    
    return [x*factor,y*factor,z*factor];
    //return [h*(180/pi),A*(180/pi)]; //coordenadas horizontales en grados
}
/*
X = cos(alt)*cos(az)
Y = cos(alt)*sin(az)
Z = sin(alt)
*/
function getJulianDate(today) {
    if(!today) today = new Date();
    if(typeof today==="string") today = new Date(today);
    return ( ((typeof today==="number") ? today : today.getTime()) / 86400000.0 ) + 2440587.5;
}


 
//funcion que me dara el transcurso del tiempo 
function watchTime(ano_mes_dia, fecha, cambio){
   
    let nuevaFecha = fecha;
    let hour = nuevaFecha.getHours();
    let min = nuevaFecha.getMinutes();
    let sec = nuevaFecha.getSeconds();

    if(cambio){
        min =  cambiarTiempo(min);
    }
    
    hour = mostrarDosDigitos(hour);
    min = mostrarDosDigitos(min);
    sec = mostrarDosDigitos(sec);
  
    nuevaFecha = new Date(ano_mes_dia + " " + hour + ":" + min + ":" + sec +" GMT-0500");
    document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec;
    let t = setTimeout(function(){ watchTime(ano_mes_dia,nuevaFecha) }, 1000); /* setting timer */
}
  
//agrega un 0 a la izquierda a los valores menores de 10
function mostrarDosDigitos(k) {
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}
  
//funcion que va actualizando el tiempo en este caso quiero que lo haga de a 30 min 
function cambiarTiempo(min){

    let cambioMin = min;

    if (cambioMin == 30) {
        cambioMin = 0;
    } else {
        cambioMin += 30;
    }

    return cambioMin;

}