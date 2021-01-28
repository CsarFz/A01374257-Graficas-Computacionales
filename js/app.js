let WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
let renderer = null,
    canvas = null,
    scene = null,
    camera = null,
    sun = null,
    sphere = null;
let star;
let textureLoader = new THREE.TextureLoader();

$(document).ready(() => {
    let canvas = document.getElementById('canvas-sun');
    canvas.width = WIDTH;
    canvas.height = HEIGHT;

    // Crear escena
    createScene(canvas);

    // Ejecutar
    run();
});

function render() {
    requestAnimationFrame(render);
    renderer.render(scene, camera);
}

function run() {
    requestAnimationFrame(function () {
        run();
    });

    // Render
    renderer.render(scene, camera);
}

function createScene(canvasDom) {

    canvas = canvasDom;
    renderer = new THREE.WebGLRenderer({
        canvas: canvas,
        antialias: true
    });
    renderer.setSize(WIDTH, HEIGHT);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;

    scene = new THREE.Scene();

    buildCamara();
    buildControls();
    buildSun();
    buildGround();
    buildRandomBoxes();
}

// Añade items a la escena
function addScene(item) {
    scene.add(item)
}

// Inicializa los controles del mouse
function buildControls() {
    let controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.update();
}


// Iniciala la camara
function buildCamara() {
    const ANGLE = 45;
    const ASPECT = WIDTH / HEIGHT;
    const NEAR = 1;
    const FAR = 4000;

    camera = new THREE.PerspectiveCamera(ANGLE, ASPECT, NEAR, FAR);
    camera.position.z = 10;
    addScene(camera);
}


// Inicializa y construye el sol
function buildSun() {
    // Crear la forma
    let geometry = new THREE.SphereGeometry(1, 32, 32);

    // Agregar material, color o imagen
    // const textureUrl = 'img/sunSurfaceMaterial.jpg';
    // let sunTexture = new THREE.TextureLoader().load(textureUrl);
    let material = new THREE.MeshBasicMaterial({
        color: 0xF9D71C,
        wireframe: true
    });

    // Poner la geometría y material juntas dentro de la malla
    sun = new THREE.Mesh(geometry, material);
    sun.rotation.x = Math.PI;
    sun.rotation.y = Math.PI / 2;

    addScene(sun);
}

// Inicializa y construye el piso
function buildGround() {
    let geometry = new THREE.PlaneGeometry(100, 100);
    let material = new THREE.MeshBasicMaterial({
        color: 0xE9155F
    });
    // material.color.setHex(0xE9155F);

    let ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -4;

    addScene(ground);
    ground.receiveShadow = true;
}

// Inicializa y construye cubos aleatoriamente en la escena
function buildRandomBoxes() {
    for (let i = 0; i < 4; i++) {
        let size = getRandom(2, 1);
        let x = getRandom(4, -4);
        let z = getRandom(4, -4);
        let geometry = new THREE.BoxGeometry(size, size, size);
        let material = new THREE.MeshBasicMaterial({
            color: 0xFFFFFF,
            wireframe: true
        });

        let box = new THREE.Mesh(geometry, material);
        addScene(box);
        box.position.set(x, -3, z);
    }
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}
