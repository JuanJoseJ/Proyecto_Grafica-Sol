var alfa,delta,eps,lam,L,g,n,date,T,gst,A,H,h,fi,lon,lat;
console.log(coordSol());
console.log(getJulianDate('01-01-2000-12:00:00 GMT-0000'))

function coordSol(){
    date = new Date('December 17, 1995 03:24:00 GMT-0000'); //Meter aquí la fecha dada
    lon=-75;
    lat=6
    fi=lat;
    n=getJulianDate('02-01-2000-12:00:00 GMT-0000')-2451545; //Esto funciona para fechas posteriores al '01-01-2000-12:00:00 GMT-0000'
    g=357.528+0.9856003*n;
    L=280.460+0.9856474*n;
    lam=L+1.915*Math.sin(g)+0.02*Math.sin(2*g);
    eps=23.439;
    delta=Math.asin(Math.sin(eps)*Math.sin(lam));
    alfa=Math.atan(Math.cos(eps)*Math.tan(lam));
    T=n/36525;
    gst=24110.54841+8640184.812866*T+0.093104*(T^2)-0.0000062*(T^3);
    H=gst+(lon/15)-alfa;
    h=Math.asin(Math.sin(delta)*Math.sin(fi)+Math.cos(delta)*Math.cos(fi)*Math.cos(H));
    A=Math.asin(-(Math.cos(delta)*Math.sin(H))/Math.cos(h));
    return [h, A];
}

function getJulianDate(today) {
    if(!today) today = new Date();
    if(typeof today==="string") today = new Date(today);
    return ( ((typeof today==="number") ? today : today.getTime()) / 86400000.0 ) + 2440587.5;
}