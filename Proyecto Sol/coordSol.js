
//browser-sync start --server --files "*.html, *.js"    
var alfa,delta,eps,lam,L,g,n,date,T,gst,A,H,h,fi,lon,lat;
console.log(coordSol());
//console.log(getJulianDate('01-02-2000-12:00:00 GMT-0000')-getJulianDate('01-01-2000-12:00:00 GMT-0000'))// 2 de enero del 2000 al medio dia

function coordSol(){
    date = new Date('12-24-2020-18:00:00 GMT-0500'); //Meter aquí la fecha
    var pi= Math.PI;
    lon=-75;
    lat=6;
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
    //gst=24110.54841+8640184.812866*T+0.093104*(T^2)-0.0000062*(T^3);
    //H=gst+lon/15//-alfa*(180/pi);
    H=nH*360+lon;
    h=Math.asin(Math.sin(delta)*Math.sin(fi)+Math.cos(delta)*Math.cos(fi)*Math.cos(H*(pi/180)));
    A=Math.asin(-((Math.cos(delta)*Math.sin(H*(pi/180)))/Math.cos(h)));
    if(H<180){
        if(delta>=0){
            A+=pi;
        }else{
            A=pi-A;
        }
    }
    return [h*(180/pi),A*(180/pi)];
}

function getJulianDate(today) {
    if(!today) today = new Date();
    if(typeof today==="string") today = new Date(today);
    return ( ((typeof today==="number") ? today : today.getTime()) / 86400000.0 ) + 2440587.5;
}