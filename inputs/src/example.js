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
cube.position.y = 10
cube.castShadow = true; //default is false
cube.receiveShadow = false; //default
scene.add(cube);


var texture = new THREE.TextureLoader().load('./styles/assets/piso.jpg');
var texture2 = new THREE.TextureLoader().load('./styles/assets/sol.png');
var texture3 = new THREE.TextureLoader().load('./styles/assets/reloj2.png');

// immediately use the texture for material creation
var material2 = new THREE.MeshLambertMaterial({ map: texture });

var geometry2 = new THREE.PlaneGeometry(800, 800, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })
var plane = new THREE.Mesh(geometry2, material2);
plane.rotation.x = -90 * Math.PI / 180
plane.receiveShadow = true;
scene.add(plane);

var materialReloj = new THREE.MeshLambertMaterial({ map: texture3 });

var geometry4 = new THREE.PlaneGeometry(80, 80, 100, 100)
//var material2 = new THREE.MeshLambertMaterial({ color: 0xebe4da, side: THREE.DoubleSide })
var plane2 = new THREE.Mesh(geometry4, materialReloj);
plane2.rotation.x = -90 * Math.PI / 180
plane2.receiveShadow = true;
scene.add(plane2);


var geometry3 = new THREE.SphereGeometry(10, 32, 32);
var material3 = new THREE.MeshBasicMaterial({ color: 0xffff00, map: texture2 });
var sphere = new THREE.Mesh(geometry3, material3);
scene.add(sphere);



var directionalLight = new THREE.DirectionalLight(0xffffff, 7);
directionalLight.castShadow = true;
scene.add(directionalLight);
directionalLight.shadow.mapSize.width = 512;  // default
directionalLight.shadow.mapSize.height = 512; // default
directionalLight.shadow.camera.near = 5;    // default
directionalLight.shadow.camera.far = 2000;
var light = new THREE.AmbientLight(0x404040); // soft white light
scene.add(light);

var luzX = 70
var luzY = 25
var luzZ = -500


    directionalLight.position.set(luzX, luzY, luzZ)

sphere.position.set(luzX, luzY, luzZ)

// var helper = new THREE.CameraHelper(directionalLight.shadow.camera);
// scene.add(helper);
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
    controls.update();
    sphere.rotation.y += 0.01;
     

    
}

animate();