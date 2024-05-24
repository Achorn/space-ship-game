import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

/**
 * Debug
 */
const gui = new GUI();

const parameters = {
  materialColor: "#b4e0ee",
};

gui.addColor(parameters, "materialColor").onChange(() => {
  toonMaterial.color.set(parameters.materialColor);
  particlesMaterial.color.set(parameters.materialColor);
});

gui.hide();
/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */

//texture
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

// Material
const toonMaterial = new THREE.MeshToonMaterial({
  color: parameters.materialColor,
  //   gradientMap: gradientTexture,
});

const particlesCount = 1200;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  let i3 = i * 3;
  positions[i3] = (Math.random() - 0.5) * 20;
  positions[i3 + 1] = (Math.random() - 0.5) * 20;
  positions[i3 + 2] = (Math.random() - 0.5) * 20;
}
const ParticlesGeometry = new THREE.BufferGeometry();
ParticlesGeometry.setAttribute(
  "position",
  new THREE.BufferAttribute(positions, 3)
);

const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.materialColor,
  sizeAttenuation: true,
  size: 0.05,
});

//sphere barrier

const sphere = new THREE.Mesh(
  new THREE.SphereGeometry(20),
  new THREE.MeshBasicMaterial({ wireframe: true, color: "black" })
);
scene.add(sphere);

/**
 * Points
 */
let points = new THREE.Points(ParticlesGeometry, particlesMaterial);
scene.add(points);

/**
 *  Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

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

const cameraGroup = new THREE.Group();
scene.add(cameraGroup);

// Base camera
const camera = new THREE.PerspectiveCamera(
  35,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 6;
camera.position.y = -2;
camera.position.x = 4;
cameraGroup.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.autoRotate = true;
controls.autoRotateSpeed = 0.5;
/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true,
});

renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */

const clock = new THREE.Clock();
let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime;

  // Update controls
  controls.update();

  // Render

  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
