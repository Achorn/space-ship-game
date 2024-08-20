import ExplosionEffect from "../effects/ExplosionEffect";
import GameEntity from "./GameEntity";
import * as THREE from "three";
class Bullet extends GameEntity {
  constructor(position, angle, gameScene) {
    super(position, "bullet");
    this.mass = 1;
    this.radius = 0.05;
    this.gameScene = gameScene;
    this.angle = angle;
    this.load();
    this.speed = 0.06;
    this.existance = 0;
  }

  load = () => {
    //mesh = ball
    this.mesh = new THREE.Mesh(
      new THREE.SphereGeometry(this.radius, 8, 8),
      new THREE.MeshBasicMaterial({ color: 0xffff00 })
    );
    this.mesh.position.copy(this.position);
    this.collider = new THREE.Box3()
      .setFromObject(this.mesh)
      .getBoundingSphere(new THREE.Sphere(this.mesh.position));

    //ammo Physics
    let Ammo = this.game.ammoPhysics.Ammo;
    let transform = new Ammo.btTransform();
    transform.setIdentity();
    transform.setOrigin(
      new Ammo.btVector3(this.position.x, this.position.y, this.position.z)
    );
    transform.setRotation(
      new Ammo.btQuaternion(this.quat.x, this.quat.y, this.quat.z, this.quat.w)
    );

    let motionState = new Ammo.btDefaultMotionState(transform);
    let colShape = new Ammo.btSphereShape(this.radius);
    colShape.setMargin(0.05);

    let localInertia = new Ammo.btVector3(0, 0, 0);
    colShape.calculateLocalInertia(this.mass, localInertia);

    let rbInfo = new Ammo.btRigidBodyConstructionInfo(
      this.mass,
      motionState,
      colShape,
      localInertia
    );
    let body = new Ammo.btRigidBody(rbInfo);

    // body.setFriction(3);
    // body.setRollingFriction(1);

    const pos = new THREE.Vector3();
    pos.copy(this.angle);
    pos.multiplyScalar(14);
    body.setLinearVelocity(new Ammo.btVector3(pos.x, pos.y, pos.z));
    this.game.ammoPhysics.physicsWorld.addRigidBody(body);

    this.mesh.userData.physicsBody = body;
    this.game.ammoPhysics.rigidBodies.push(this.mesh);
  };

  update = (deltaTime) => {
    // this.existance += deltaTime;
    // this.mesh.position.add(this.angle.multiplyScalar(this.speed * deltaTime));
    // const colliders = this.gameScene.gameEntities.filter(
    //   (c) =>
    //     c.collider &&
    //     c !== this &&
    //     c.entityType !== "player" &&
    //     c.collider.intersectsSphere(this.collider)
    // );
    //if collision detected. its no longer needed and should be removed
    // if (colliders.length) {
    // this.shouldDispose = true;
    // explode!!!
    // const explosion = new ExplosionEffect(this.mesh.position, 1);
    // this.gameScene.addToScene(explosion);
    //collide with target?
    // const enemies = colliders.filter((c) => c.entityType === "target");
    // if (enemies.length) {
    // enemies[0].damage(30);
    // }
    // }
    // if (this.existance > 800) this.shouldDispose = true;
  };

  dispose = () => {
    this.mesh.material.dispose();
    this.mesh.geometry.dispose();
  };
}
export default Bullet;
