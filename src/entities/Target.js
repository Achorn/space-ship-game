import ExplosionEffect from "../effects/ExplosionEffect";
import GameEntity from "./GameEntity";
import * as THREE from "three";
class Target extends GameEntity {
  constructor(position, gameScene) {
    super(position, "target");
    this.life = 100;
    this.gameScene = gameScene;
    this.rotationAlterer = Math.random() * 0.5 + 0.5;
    this.load();
  }

  load = () => {
    let width = 1;
    let height = 1;
    let depth = 1;
    const material = new THREE.MeshNormalMaterial();
    const geometry = new THREE.BoxGeometry(width, height, depth);
    this.mesh = new THREE.Mesh(geometry, material);
    this.gameScene.addToScene(this);
    this.mesh.position.copy(this.position);
    this.mesh.rotation.x = (Math.random() - 0.5) * Math.PI * 2;
    this.mesh.rotation.y = (Math.random() - 0.5) * Math.PI * 2;

    // PHYSICS
    let transform = new this.Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new this.Ammo.btVector3(this.position.x, this.position.y, this.position.z)
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
    colShape.setMargin(0.05);

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
    this.mesh.userData.physicsBody = body;
    this.mesh.userData.tag = "target";
    // these nums mean nothing to me in space
    body.setFriction(4);
    body.setRollingFriction(10);
    this.game.ammoPhysics.physicsWorld.addRigidBody(body);
  };

  update = (deltaTime) => {
    //TODO add rotation back when figure out how to update ammo rotation
    // this.mesh.rotation.x += deltaTime * 0.001 * this.rotationAlterer;
    // this.mesh.rotation.y += deltaTime * 0.001 * this.rotationAlterer;
  };

  damage(amount) {
    this.life -= amount;

    if (this.life <= 0) {
      this.shouldDispose = true;
      this.mesh.userData.shouldDispose = true;

      const explosion = new ExplosionEffect(
        this.mesh.position,
        1.8,
        this.mesh.material
      );
      this.gameScene.addToScene(explosion);
      this.gameScene.scoreBoard.addPoint();
    }
  }
  dispose = () => {
    //remove THREEjs object
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();

    //Remove AMMOjs
    let rigidBody = this.mesh.userData.physicsBody;
    this.game.ammoPhysics.physicsWorld.removeRigidBody(rigidBody);
    this.Ammo.destroy(rigidBody.getMotionState());
    this.Ammo.destroy(rigidBody.getCollisionShape());
    this.Ammo.destroy(rigidBody);
  };
}

export default Target;
