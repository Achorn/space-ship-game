import GameEntity from "./GameEntity";
import * as THREE from "three";

class GenericShip extends GameEntity {
  constructor(position, width, height, depth, color) {
    super(position, "ship");

    this.health = 100;
    this.mesh = new THREE.Mesh(
      new THREE.BoxGeometry(width, height, depth),
      new THREE.MeshStandardMaterial({ color: color })
    );
    this.mesh.position.copy(position);

    // AMMO PHYSICS BABY
    let transform = new this.Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new this.Ammo.btVector3(position.x, position.y, position.z)
    );
    transform.setRotation(
      new this.Ammo.btQuaternion(
        this.quat.x,
        this.quat.y,
        this.quat.z,
        this.quat.w
      )
    );
    let motionState = new this.Ammo.btDefaultMotionState(transform);

    let colShape = new this.Ammo.btBoxShape(
      new this.Ammo.btVector3(width * 0.5, height * 0.5, depth * 0.5)
    );
    colShape.setMargin(0.05); //TODO: check if this is the right variable size

    let localInertia = new this.Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(this.mass, localInertia);

    let rbInfo = new this.Ammo.btRigidBodyConstructionInfo(
      this.mass,
      motionState,
      colShape,
      localInertia
    );
    let body = new this.Ammo.btRigidBody(rbInfo);
    body.threeObject = this.mesh;
    this.mesh.userData.object = this;
    this.mesh.userData.tag = "ship";
    this.mesh.userData.physicsBody = body;

    body.setFriction(4);
    body.setRollingFriction(10);
    this.game.ammoPhysics.physicsWorld.addRigidBody(body);
  }

  update = (deltaTime) => {
    // explode???
  };
  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}

export default GenericShip;
