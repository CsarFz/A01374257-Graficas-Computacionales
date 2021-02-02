let WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
let renderer = null,
    canvas = null,
    scene = null,
    camera = null,
    sun = null,
    sphere = null,
    group,
    star;
let velocity = 0,
    angle = Math.PI * 2 / 100,
    g = 10,
    step = 5 / 1000;

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

    let accel = g * Math.sin(angle);
    velocity += accel * step;
    angle += velocity * step;

    group.position.x = (-5 * angle) + 20;
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
    buildLight();
    buildStars();
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
    // Crear el grupo que tendrá el sol y su luz
    group = new THREE.Group();

    // Crear la forma y la luz del sol
    let geometry = new THREE.SphereGeometry(1, 32, 32);
    let sunLight = new THREE.PointLight(0xffee88, 1, 100, 2);

    // Agregar material, color o imagen
    const textureUrl = 'img/sunSurfaceMaterial.jpg';
    let sunTexture = new THREE.TextureLoader().load(textureUrl);
    let material = new THREE.MeshBasicMaterial({
        map: sunTexture
    });

    // Poner la geometría y material juntas dentro de la malla
    sunLight.add(new THREE.Mesh(geometry, material));
    sunLight.position.set(0, 3, 0);
    sunLight.castShadow = true;

    // Sombra que la luz emitirá
    let d = 300;

    sunLight.shadow.camera.left = -d;
    sunLight.shadow.camera.right = d;
    sunLight.shadow.camera.top = d;
    sunLight.shadow.camera.bottom = -d;
    sunLight.shadow.camera.far = 100;
    group.add(sunLight);

    addScene(group);
    group.position.y = 0;
    group.position.z = 0;
    group.position.x = 0;
}

// Inicializa y construye el piso
function buildGround() {
    let geometry = new THREE.PlaneGeometry(100, 100);
    let material = new THREE.MeshStandardMaterial({
        color: 0xE9155F
    });
    // material.color.setHex(0xE9155F);

    let ground = new THREE.Mesh(geometry, material);
    ground.rotation.x = -Math.PI / 2;
    ground.position.y = -1.75;

    addScene(ground);
    ground.receiveShadow = true;
}

// Inicializa la luz de la escena
function buildLight() {
    let light = new THREE.DirectionalLight(0xffffff, 0.26);
    light.position.set(1, 1, 1).normalize();
    addScene(light);
}

// Inicializa y construye cubos y esferas aleatoriamente en la escena
function buildRandomBoxes() {
    // Bucle para crear esferas dándole una posición aleatoria
    for (let i = 0; i < 3; i++) {
        let x = getRandom(10, -4);
        let z = getRandom(4, -4);
        let geometry = new THREE.SphereGeometry(1, 32, 32);
        let material = new THREE.MeshStandardMaterial({
            color: 0x2659fb
        });

        let box = new THREE.Mesh(geometry, material);
        box.castShadow = true;
        box.receiveShadow = true;
        addScene(box);
        box.position.set(x, -1, z);
    }

    // Bucle para crear cubos dándole una posición aleatoria
    for (let i = 0; i < 3; i++) {
        let size = getRandom(2, 1);
        let x = getRandom(10, -6);
        let z = getRandom(5, -5);
        let geometry = new THREE.BoxGeometry(size, size, size);
        let material = new THREE.MeshStandardMaterial({
            color: 0x2659fb
        });

        let box = new THREE.Mesh(geometry, material);
        box.castShadow = true;
        box.receiveShadow = true;
        addScene(box);
        box.position.set(x, -1, z);
    }
    
}

// Retorna un número aleatorio entre min (incluido) y max (excluido)
function getRandom(min, max) {
    return Math.random() * (max - min) + min;
}

// Crea un vec3 que simula un cubo lleno de estrellas en el espacio
function buildStars() {
    let geometry = new THREE.Geometry();

    for (let i = 0; i < 16000; i++) {
        const x = getRandom(-100, 100);
        const y = getRandom(-100, 100);
        const z = getRandom(-100, 100);

        const star = new THREE.Vector3(x, y, z);
        geometry.vertices.push(star);
    }

    const material = new THREE.PointsMaterial({
        color: 0xFFFFFF,
        size: 0.3
    });

    star = new THREE.Points(geometry, material);
    addScene(star);
}