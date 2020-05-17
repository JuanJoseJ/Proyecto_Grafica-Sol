//import {OBJLoader} from 'three.js-dev/examples/jsm/loaders/OBJLoader.js'

var scene = new THREE.Scene();
scene.fog = new THREE.Fog(0xcce0ff, 500, 10000);

scene.background = new THREE.Color(0xcccccc);
var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 10000);

var renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);
//camera.position.z = 100;


controls = new THREE.OrbitControls(camera, renderer.domElement);
camera.position.set(0, 20, 100);
controls.update();

controls.maxPolarAngle = (Math.PI - 0.01) / 2;


window.addEventListener('resize', onWindowResize, false);
function onWindowResize() {

    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);

}


var geometry = new THREE.CylinderGeometry(0, 5, 20, 32);
var material = new THREE.MeshLambertMaterial({ color: 0x03adfc });
var cube = new THREE.Mesh(geometry, material);
cube.position.y = 10
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
scene.add(cube);


var texture = new THREE.TextureLoader().load('./styles/assets/piso.jpg');
var texture2 = new THREE.TextureLoader().load('./styles/assets/sol.png');

// immediately use the texture for material creation
var material2 = new THREE.MeshLambertMaterial({ map: texture });

var geometry2 = new THREE.PlaneGeometry(2000, 2000, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })
var plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = -90 * Math.PI / 180
plane.receiveShadow = true;
scene.add(plane);


var geometry3 = new THREE.SphereGeometry(10, 32, 32);
var material3 = new THREE.MeshBasicMaterial({ color: 0xffff00, map: texture2 });
var sphere = new THREE.Mesh(geometry3, material3);
scene.add(sphere);

var texturaReloj = new THREE.TextureLoader().load('./styles/assets/reloj2.jpg');
var materialReloj = new THREE.MeshPhongMaterial({ map: texturaReloj });
var geometry4 = new THREE.PlaneBufferGeometry(200, 200, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })
var reloj = new THREE.Mesh(geometry4, materialReloj);
reloj.rotation.x = -90 * Math.PI / 180
reloj.rotation.z = -90 * Math.PI / 180
reloj.position.x = 45 
reloj.receiveShadow = true;
scene.add(reloj);
reloj.position.y = 0.5

// var directionalLight = new THREE.DirectionalLight(0xffffff, 2);
// directionalLight.position.z = 100
//scene.add(directionalLight);
// directionalLight.shadow.mapSize.width = 512;  // default
// directionalLight.shadow.mapSize.height = 512; // default
// directionalLight.shadow.camera.near = 5;    // default
// directionalLight.shadow.camera.far = 2000;
var light = new THREE.AmbientLight(0x404040);
scene.add(light);


var pointLight = new THREE.PointLight(0xffffff, 1, 5000);
pointLight.position.set(50, 50, 50);
pointLight.castShadow = true; // soft white light
scene.add(pointLight);
pointLight.shadow.mapSize.width = 5000;  // default
pointLight.shadow.mapSize.height = 5000; // default
pointLight.shadow.camera.near = 0.5;       // default
pointLight.shadow.camera.far = 500


var luzX = -20
var luzY = 48    //Y es z
var luzZ = -97


//directionalLight.position.set(luzX, luzY, luzZ)
pointLight.position.set(luzX, luzY, luzZ)
sphere.position.set(luzX, luzY, luzZ)

// var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);

// var loader = new THREE.OBJLoader();
// loader.load('hombre.obj', function(object){
//     object.position.y =10
//     scene.add(object)
// })

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    sphere.rotation.y += 0.01

}

animate();