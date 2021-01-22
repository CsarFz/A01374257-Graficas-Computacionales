let WIDTH = window.innerWidth,
    HEIGHT = window.innerHeight;
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75, WIDTH / HEIGHT, 0.1, 1000);

let renderer = new THREE.WebGLRenderer();
renderer.setSize(WIDTH, HEIGHT);
$('#bulb').append(renderer.domElement);

$('window').on('resize', () => {
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
});

constrols = new THREE.OrbitControls(camera, renderer.domElement);

camera.position.z = 3;

const sun = () => {
    // Crear la forma
    let geometry = new THREE.SphereGeometry(1, 5, 8);
    // Agregar material, color o imagen
    let material = new THREE.MeshBasicMaterial({ color: 0xe9155f, wireframe: true, opacity: 0.7 });
    let sphere = new THREE.Mesh(geometry, material);
    scene.add(sphere);
}

const update = () => {
    // cube.rotation.x += 0.01;
    // cube.rotation.y += 0.005;
}

// Dibujar escena
const render = () => {
    renderer.render(scene, camera);
}

const init = () => {
    requestAnimationFrame(init);

    sun();
    update();
    render();
}

init();
