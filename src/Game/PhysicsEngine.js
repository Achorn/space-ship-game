import Game from "./Game";

class PhysicsEngine {
  constructor() {
    this.game = new Game();

    this.Ammo;
    this.tmpTrans;
    this.ammoTmpPos;
    this.ammoTmpQuat;
    this.physicsWorld;

    this.rigidBodies = [];

    this.init();
  }

  init() {
    Ammo().then((lib) => {
      this.Ammo = lib;
      this.tmpTrans = new this.Ammo.btTransform();
      this.ammoTmpPos = new this.Ammo.btVector3();
      this.ammoTmpQuat = new this.Ammo.btQuaternion();
      this.setupPhysicsWorld();
    });
  }

  setupPhysicsWorld() {
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
      dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
      overlappingPairCache = new Ammo.btDbvtBroadphase(),
      solver = new Ammo.btSequentialImpulseConstraintSolver();

    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    this.physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));
  }

  update(deltaTime) {
    if (!this.Ammo) return;
    this.physicsWorld.stepSimulation(deltaTime, 10);
    console.log(this.rigidBodies.length);
    for (let i = 0; i < this.rigidBodies.length; i++) {
      let objThree = this.rigidBodies[i];
      let objAmmo = objThree.userData.physicsBody;
      let motionState = objAmmo.getMotionState();
      if (motionState) {
        motionState.getWorldTransform(this.tmpTrans);
        let tpPos = this.tmpTrans.getOrigin();
        let tpQuat = this.tmpTrans.getRotation();
        objThree.position.set(tpPos.x(), tpPos.y(), tpPos.z());
        objThree.quaternion.set(tpQuat.x(), tpQuat.y(), tpQuat.z(), tpQuat.w());
      }
    }
  }
}

export default PhysicsEngine;
