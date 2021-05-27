import './style.css'
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

// Constructing the Scene
const scene = new THREE.Scene();

// Constructing the Camera
const camera = new THREE.PerspectiveCamera(100, window.innerWidth / window.innerHeight, 0.1, 1000);

// Constructing the Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(window.devicePixelRatio);
renderer.setSize(window.innerWidth, window.innerHeight);

renderer.render(scene, camera);

// Icosahedron construction
const geometry = new THREE.IcosahedronGeometry(5, 0);
const material = new THREE.MeshBasicMaterial({ color: 0xFF0000, wireframe: true });
const Ico = new THREE.Mesh(geometry, material);
scene.add(Ico)

//const backgroundTexture = new THREE.TextureLoader().load('euan.png');
//scene.background = backgroundTexture;

// const controls = new OrbitControls(camera, renderer.domElement);

const ambientLight = new THREE.AmbientLight(0xFFFFFF);
scene.add(ambientLight);

function moveCamera() {
  const t = document.body.getBoundingClientRect().top;

  camera.position.z = t * -0.01;
  camera.position.x = t * -0.0002;
  camera.rotation.y = t * -0.0002;
  console.log(camera.position);
}

document.body.onscroll = moveCamera

// A "Gameloop" like function that repeats
function animate() {
  requestAnimationFrame(animate);

  Ico.rotation.x += 0.001;
  Ico.rotation.y += 0.0005;
  Ico.rotation.z += 0.001;

  renderer.render(scene, camera);
}

// Calling the "Gameloop" 
animate()