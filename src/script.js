import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Game from "./Game/Game";
//
/**
 * Debug
 */

const game = new Game(document.querySelector("canvas.webgl"));

if (false == true) {
  //hiding original code
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
    new THREE.SphereGeometry(10),
    new THREE.MeshBasicMaterial({ wireframe: true, color: "black" })
  );
  scene.add(sphere);

  //ships
  const kingShip = new THREE.BoxGeometry(1.4, 0.6, 4);
  const enemyMaterial = new THREE.MeshStandardMaterial({ color: "red" });
  const teamMaterial = new THREE.MeshStandardMaterial({ color: "blue" });
  const enemyShip = new THREE.Mesh(kingShip, enemyMaterial);
  const teamShip = new THREE.Mesh(kingShip, teamMaterial);
  scene.add(enemyShip, teamShip);

  teamShip.position.set(2, 0, 4);
  enemyShip.position.set(-2, 0, -4);

  //smaller transporters

  const tansShipGeometry = new THREE.BoxGeometry(0.8, 0.25, 1.2);
  const enemyTransShip1 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
  const teamTransShip1 = new THREE.Mesh(tansShipGeometry, teamMaterial);
  const enemyTransShip2 = new THREE.Mesh(tansShipGeometry, enemyMaterial);
  const teamTransShip2 = new THREE.Mesh(tansShipGeometry, teamMaterial);
  scene.add(teamTransShip1, enemyTransShip1, teamTransShip2, enemyTransShip2);
  enemyTransShip1.position.set(0.5, -0.5, -4);
  enemyTransShip2.position.set(-3, 1, -3);
  teamTransShip1.position.set(0, -0, 2);
  teamTransShip2.position.set(4, 1.5, 0);

  //fighters

  const heroShip = new THREE.BoxGeometry(0.4, 0.4, 0.4);
  const heroMaterial = new THREE.MeshStandardMaterial({ color: "orange" });
  const heroMesh = new THREE.Mesh(heroShip, heroMaterial);
  scene.add(heroMesh);
  heroMesh.position.set(-10, 0, 0);

  /**
   * Points
   */
  // let points = new THREE.Points(ParticlesGeometry, particlesMaterial);
  // scene.add(points);

  /**
   *  Lights
   */
  // const ambientLight = new THREE.AmbientLight("#1b1a20", 2);
  // const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
  // directionalLight.position.set(1, 1, 0);
  // scene.add(directionalLight, ambientLight);

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
  camera.lookAt(0, 0, 0);
  // cameraGroup.add(camera);
  heroMesh.add(camera);
  camera.rotateY(-Math.PI * 0.5);
  camera.target = heroMesh;
  camera.rotateX(-Math.PI * 0.05);
  // camera.target.position.copy(heroMesh);

  camera.position.x -= 3;
  camera.position.y += 0.7;

  // camera.lookAt(heroMesh);
  // camera.position.x -= 1;
  // camera.position.y -= 1;
  // camera.position.z -= 1;
  // camera.
  // Controls
  // const controls = new OrbitControls(camera, canvas);
  // controls.enableDamping = true;
  // controls.autoRotate = true;
  // controls.autoRotateSpeed = 0.5;
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

    //update player
    heroMesh.position.x += deltaTime;
    if (heroMesh.position.x > 10) heroMesh.position.x = -10;
    // camera.lookAt(heroMesh);

    // Update controls
    // controls.update();

    // Render

    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
  };

  tick();
}
