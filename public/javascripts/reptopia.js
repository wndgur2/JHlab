import * as THREE from './three.module.mjs';

// Setup

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / (window.innerHeight*2), 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
  canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio(2);
renderer.setSize(window.innerWidth, window.innerHeight*2);
camera.position.setZ(30);
camera.position.setX(-3);

renderer.render(scene, camera);

// Torus

const geometry = new THREE.TorusGeometry(10, 3, 20, 100);
const material = new THREE.MeshStandardMaterial({ color: 0x1063ff });
const torus = new THREE.Mesh(geometry, material);

scene.add(torus);

// Lights

const pointLight = new THREE.PointLight(0xffffff);
pointLight.position.set(5, 5, 5);

const ambientLight = new THREE.AmbientLight(0xffffff);
scene.add(pointLight, ambientLight);


// Background

const spaceTexture = new THREE.TextureLoader().load('/images/reptopia/space.jpg');
scene.background = spaceTexture;

// Avatar

const jeffTexture = new THREE.TextureLoader().load('/images/reptopia/blooming.jpg');

const jeff = new THREE.Mesh(new THREE.BoxGeometry(5, 5, 5), new THREE.MeshBasicMaterial({ map: jeffTexture }));

scene.add(jeff);

jeff.position.z = -5;
jeff.position.x = 2;

// // Scroll Animation

// function moveCamera() {
//   const t = document.body.getBoundingClientRect().top-50;
//   jeff.rotation.y += 0.01;
//   jeff.rotation.z += 0.01;

//   camera.position.z = t * -0.2;
//   camera.position.x = t * -0.002;
//   camera.rotation.y = t * -0.002;
// }

// document.body.onscroll = moveCamera;
// moveCamera();

// Animation Loop

function animate() {
  requestAnimationFrame(animate);

  torus.rotation.x += 0.01;
  torus.rotation.y += 0.005;
  torus.rotation.z += 0.01;

  jeff.rotation.x += 0.005;

  // controls.update();

  renderer.render(scene, camera);
}

animate();