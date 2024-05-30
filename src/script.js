import * as THREE from "three";
import GUI from "lil-gui";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import Game from "./Game/Game";
//
/**
 * Debug
 */

const game = new Game(document.querySelector("canvas.webgl"));

heroMesh.add(camera);
// adding camera to hero mesh instead of world

camera.rotateY(-Math.PI * 0.5);
camera.target = heroMesh;
camera.rotateX(-Math.PI * 0.05);

camera.position.x -= 3;
camera.position.y += 0.7;

//update player
heroMesh.position.x += deltaTime;
if (heroMesh.position.x > 10) heroMesh.position.x = -10;
