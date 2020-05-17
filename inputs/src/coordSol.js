//datos extraidos del html
let inputDate = document.getElementById("Date");
let inputTime = document.getElementById("Time");

let inputLatitudGrados = document.getElementById("LatitudGrados");


let inputLongitudGrados = document.getElementById("LongitudGrados");


//browser-sync start --server --files "*.html, *.js"    
var alfa,delta,eps,lam,L,g,n,date,T,gst,A,H,h,fi,lon,lat;



//generamos objeto con la fecha ingresada 
let fecha = new Date(inputDate.value + " " + inputTime.value);

function enviarInputs(){

    coordSol(fecha, inputLongitudGrados.value ,inputLatitudGrados.value);
}


function coordSol(fecha, lon, lat){

    //date = new Date('03-01-2020-16:00:00 GMT-0500'); //Meter aquí la fecha
    date = new Date(fecha);

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

console.log(coordSol());
//console.log(getJulianDate('03-02-2000-07:00:00 GMT-0000')-getJulianDate('01-01-2000-12:00:00 GMT-0000'))// 2 de enero del 2000 al medio dia