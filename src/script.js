import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import GUI from "lil-gui";

/**
 * Base
 */
// Debug
const gui = new GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("/textures/particles/2.png");
//particles

//materials
const particleGeometry = new THREE.SphereGeometry(1, 32, 32);
const particleMaterial = new THREE.PointsMaterial({
  size: 0.1,
  sizeAttenuation: true,
  transparent: true,
});
particleMaterial.alphaMap = particleTexture;
particleMaterial.color = new THREE.Color("");
// particleMaterial.alphaTest = 0.001;
// particleMaterial.depthTest = false;
particleMaterial.depthWrite = false; // the best one it seems
particleMaterial.blending = THREE.AdditiveBlending;
particleMaterial.vertexColors = true;

//points
const particles = new THREE.Points(particleGeometry, particleMaterial);
scene.add(particles);

const customGeometry = new THREE.BufferGeometry();
const count = 20000;
const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}
customGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

customGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
const customParticles = new THREE.Points(customGeometry, particleMaterial);
scene.add(customParticles);

// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial("black")
// );
// scene.add(cube);
/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 8;
camera.position.y = 10;
camera.position.x = -1.5;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  //update particles
  // customParticles.rotation.y = -elapsedTime * 0.2;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = customGeometry.attributes.position.array[i3];

    const z = customGeometry.attributes.position.array[i3 + 2];
    customGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime + x + z
    );
  }
  customGeometry.attributes.position.needsUpdate = true;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
