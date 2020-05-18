//browser-sync start --server --files "*.html, *.js"    
var alfa, delta, eps, lam, L, g, n, date, T, gst, A, H, h, fi, lon, lat;
var iterar;
var fechaGlobal;

function coordSol(fecha, lon, lat) {

    //date = new Date('03-01-2020-16:00:00 GMT-0500'); //Meter aquí la fecha
    date = fecha;

    var pi = Math.PI;

    //son las de medallo
    // lon=-75;
    // lat=6;

    //Conseguir coordenadas ecuatoriales del sol
    n = getJulianDate(date) - 2451545;
    var nH = n % 1;
    g = 357.528 + 0.9856003 * n;
    L = 280.460 + 0.9856474 * n
    eps = 23.439;
    lam = L * (pi / 180) + 1.915 * (pi / 180) * Math.sin(g * (pi / 180)) + 0.02 * (pi / 180) * Math.sin(2 * g * (pi / 180));
    delta = Math.asin(Math.sin(eps * (pi / 180)) * Math.sin(lam));
    alfa = Math.atan(Math.cos(eps * (pi / 180)) * Math.tan(lam));

    //Transformar a coordenadas horizontales
    T = n / 36525;
    fi = lat * (pi / 180);
    H = nH * 360 + lon;
    h = Math.asin(Math.sin(delta) * Math.sin(fi) + Math.cos(delta) * Math.cos(fi) * Math.cos(H * (pi / 180)));
    A = Math.asin(-((Math.cos(delta) * Math.sin(H * (pi / 180))) / Math.cos(h)));
    if (H < 180) {
        if (delta >= 0) {
            A += 0;
        } else {
            A = pi - A;
        }
    }
    //coordenadas rectangulares
    let x,y,z,factor; //sen y cos dan un valor entre -1 y 1, factor es para escalar esa distancia
    factor=500; //Hay que ponerle un numero grande
    x=Math.cos(A)*Math.cos(h); //Direccion Norte
    y=Math.sin(A)*Math.cos(h); //Direccion oriente
    z=Math.sin(h); //Altura

    
    return [x*factor,-y*factor,z*factor];
    //return [h*(180/pi),A*(180/pi)]; //coordenadas horizontales en grados
}

function getJulianDate(today) {
    if (!today) today = new Date();
    if (typeof today === "string") today = new Date(today);
    return (((typeof today === "number") ? today : today.getTime()) / 86400000.0) + 2440587.5;
}

//funcion que me dara el transcurso del tiempo 
function watchTime(ano_mes_dia, fecha, cambio) {

    let nuevaFecha = fecha;

    let ano = nuevaFecha.getFullYear();
    let mes = nuevaFecha.getMonth() + 1;
    let dia = nuevaFecha.getDate();

    let hour = nuevaFecha.getHours();
    let min = nuevaFecha.getMinutes();
    let sec = nuevaFecha.getSeconds();


    hour = mostrarDosDigitos(hour);
    min = mostrarDosDigitos(min);
    sec = mostrarDosDigitos(sec);

    nuevaFecha = new Date(ano_mes_dia + " " + hour + ":" + min + ":" + sec + " GMT-0500");
    document.getElementById("ano_mes_dia").innerHTML = ano + "-" + mes + "-" + dia;
    document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec;
}

//agrega un 0 a la izquierda a los valores menores de 10
function mostrarDosDigitos(k) {
    if (k < 10) {
        return "0" + k;
    } else {
        return k;
    }
}


var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

// scene.background = new THREE.Color(0xcccccc);
scene.background = new THREE.Color(0xb3d1ff);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
//camera.position.z = 100;

controls = new THREE.OrbitControls(camera, renderer.domElement);
// camera.position.set(0, 20, 100);
camera.position.set(-2.2507412289962487, 234.7144596484875, 258.62585054188287);
controls.update();
controls.maxPolarAngle = (Math.PI - 0.01) / 2;

// function mostrarPosicionCamara(){
//     console.log(camera.position)
// }

window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}

var geometry = new THREE.CylinderGeometry(0, 5, 20, 32);
var material = new THREE.MeshLambertMaterial({ color: 0x03adfc });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 1
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
scene.add(cube);

var texture = new THREE.TextureLoader().load('./styles/assets/piso.jpg');
var texture2 = new THREE.TextureLoader().load('./styles/assets/sol.png');
var texture3 = new THREE.TextureLoader().load('./styles/assets/reloj2.jpg');

// immediately use the texture for material creation
var material2 = new THREE.MeshLambertMaterial({ map: texture });

var geometry2 = new THREE.PlaneGeometry(800, 800, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })
var plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = -90 * Math.PI / 180;

plane.receiveShadow = true;
scene.add(plane);

var materialReloj = new THREE.MeshLambertMaterial({ map: texture3 });

var geometry4 = new THREE.PlaneGeometry(200, 200, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })

var plane2 = new THREE.Mesh(geometry4, materialReloj);
plane2.rotation.x = -90 * Math.PI / 180
plane2.rotation.z = 90 * Math.PI / 180
plane2.position.y = 0.5;
plane2.position.x = -45;
plane2.receiveShadow = true;
plane2.material.side=THREE.DoubleSide;
scene.add(plane2);

var geometry3 = new THREE.SphereGeometry(10, 32, 32);
var material3 = new THREE.MeshBasicMaterial({ color: 0xffff00, map: texture2 });
var sphere = new THREE.Mesh(geometry3, material3);
scene.add(sphere);

var directionalLight = new THREE.PointLight(0xffffff, 4);
directionalLight.castShadow = true;
scene.add(directionalLight);
directionalLight.shadow.mapSize.width = 2000;  // default
directionalLight.shadow.mapSize.height = 2000; // default
directionalLight.shadow.camera.near = 5;    // default
directionalLight.shadow.camera.far = 2000;
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);
directionalLight.intensity=4;

var luzX = 70
var luzY = 25
var luzZ = 500

directionalLight.position.set(luzX, luzY, luzZ)

sphere.position.set(luzX, luzY, luzZ)

//var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
//scene.add(helper);

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    sphere.rotation.y += 0.01;
}

animate();

function enviarInputs() {

    let inputDate = document.getElementById("Date");
    let inputTime = document.getElementById("Time");

    let inputLatitudGrados = document.getElementById("LatitudGrados");

    let inputLongitudGrados = document.getElementById("LongitudGrados");

    var fecha = new Date(inputDate.value + " " + inputTime.value + ":00 GMT-0500");
    fechaGlobal = fecha;

    console.log(inputDate.value);
    let lon = parseInt(inputLongitudGrados.value, 10);
    let lat = parseInt(inputLatitudGrados.value, 10);
    let positionSun = coordSol(fecha, lon, lat)

    console.log(positionSun);
    directionalLight.intensity=1;
    directionalLight.position.set(positionSun[0],positionSun[2],positionSun[1]); //Cambio la posicion del objeto de la luz
    sphere.position.set(positionSun[0],positionSun[2],positionSun[1]); //Cambio posicion de la esfera
    
    console.log(directionalLight.intensity);
    let cambio = false; //la forma de cambiar este valor es undiendo el boton run 
    watchTime(inputDate.value, fecha, cambio);
}

function correrSimulacion(){

    let cambio = true;
    let inputDate = document.getElementById("Date");
    let inputTime = document.getElementById("Time");

    let inputLatitudGrados = document.getElementById("LatitudGrados");

    let inputLongitudGrados = document.getElementById("LongitudGrados");

    let fecha = new Date(inputDate.value + " " + inputTime.value + ":00 GMT-0500");


    cambioDeHoraMostrando(cambio);
    

}

function cambioDeHoraMostrando(cambio) {

    //agrego esta fecha a una global dado el caso de que le pongan stop y quieran seguir
    
    
    let ano = fechaGlobal.getFullYear();
    let mes = fechaGlobal.getMonth() + 1;
    let dia = fechaGlobal.getDate();

    let hour = fechaGlobal.getHours();
    let min = fechaGlobal.getMinutes();
    let sec = fechaGlobal.getSeconds();

   
    if (cambio == true) {
        let arregloTiempo = cambiarTiempo(ano,mes,dia,hour,min);
        ano = arregloTiempo[0];
        mes = arregloTiempo[1];
        dia = arregloTiempo[2];

        hour = arregloTiempo[3];
        min = arregloTiempo[4];
    }

    console.log(ano);
    console.log(mes);
    console.log(dia);

    hour = mostrarDosDigitos(hour);
    min = mostrarDosDigitos(min);
    sec = mostrarDosDigitos(sec);

    // ano-mes-dia
    fechaGlobal = new Date(ano + "-" + mes + "-" + dia + " " + hour + ":" + min + ":" + sec + " GMT-0500");
    document.getElementById("ano_mes_dia").innerHTML = ano + "-" + mes + "-" + dia;
    document.getElementById("clock").innerHTML = hour + " : " + min + " : " + sec;
    iterar = setTimeout(function () { cambioDeHoraMostrando(cambio) }, 1000); /* setting timer */
}

//funcion que va actualizando el tiempo en este caso quiero que lo haga de a 30 min 
function cambiarTiempo(ano,mes,dia,hour,min) {

    let cambioMin = min;
    let cambioHour = hour;
    let cambioDia = dia;
    let cambioAno = ano;
    let cambioMes = mes;

   

    if (cambioMin == 30) {
        cambioMin = 0;
        if(cambioHour === 23){
            cambioHour = 0;
            if(cambioDia === 30 || cambioDia === 31){

                cambioDia = 1;

                if (cambioMes === 12) {
                    cambioMes = 1;
                    cambioAno ++;
                }else{
                    cambioMes ++;
                }
            }else{
                cambioDia ++;
            }
            
        }else{
            cambioHour ++;
        }
        
    }else if(cambioMin < 30 ){
        cambioMin += 30;


    }else if(cambioMin > 30){

        let aux = Math.abs(cambioMin-30);
        if(cambioHour === 23){
            cambioHour = 0;
            if(cambioDia === 30 || cambioDia === 31){

                cambioDia = 1;

                if (cambioMes === 12) {
                    cambioMes = 1;
                    cambioAno ++;
                }else{
                    cambioMes ++;
                }
            }else{
                cambioDia ++;
            }
            
        }else{
            cambioMin = aux;
            cambioHour ++;
        }
        
    }

    //final del dia
  

    return [cambioAno,cambioMes,cambioDia,cambioHour, cambioMin];

}