import Game from "./Game";

class PhysicsEngine {
  constructor() {
    this.game = new Game();

    this.Ammo;
    this.tmpTrans;
    this.ammoTmpPos;
    this.ammoTmpQuat;
    this.physicsWorld;
    this.dispatcher;
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
      this.setupContactResultCallback();
    });
  }

  setupPhysicsWorld() {
    let collisionConfiguration = new Ammo.btDefaultCollisionConfiguration(),
      dispatcher = new Ammo.btCollisionDispatcher(collisionConfiguration),
      overlappingPairCache = new Ammo.btDbvtBroadphase(),
      solver = new Ammo.btSequentialImpulseConstraintSolver();
    this.dispatcher = dispatcher;
    this.physicsWorld = new Ammo.btDiscreteDynamicsWorld(
      dispatcher,
      overlappingPairCache,
      solver,
      collisionConfiguration
    );
    this.physicsWorld.setGravity(new Ammo.btVector3(0, 0, 0));
  }

  setupContactResultCallback() {
    this.cbContactResult = new this.Ammo.ConcreteContactResultCallback();
    this.cbContactResult.addSingleResult = (
      cp,
      colObj0Wrap,
      partId0,
      index0,
      colObj1Wrap,
      partId1,
      index1
    ) => {
      let contactPoint = Ammo.wrapPointer(cp, this.Ammo.btManifoldPoint);

      const distance = contactPoint.getDistance();
      // console.log(distance);
      // if (distance > 0) return;

      let colWrapper0 = this.Ammo.wrapPointer(
        colObj0Wrap,
        this.Ammo.btCollisionObjectWrapper
      );
      let rb0 = this.Ammo.castObject(
        colWrapper0.getCollisionObject(),
        Ammo.btRigidBody
      );

      let colWrapper1 = this.Ammo.wrapPointer(
        colObj1Wrap,
        Ammo.btCollisionObjectWrapper
      );
      let rb1 = this.Ammo.castObject(
        colWrapper1.getCollisionObject(),
        Ammo.btRigidBody
      );

      let threeObject0 = rb0.threeObject;
      let threeObject1 = rb1.threeObject;

      //OBJECTS INCLUDE BULLET
      if (
        threeObject0.userData.tag == "bullet" ||
        threeObject1.userData.tag == "bullet"
      ) {
        if (threeObject0.userData.tag == "bullet") {
          threeObject0.userData.object.hit(threeObject1);
        } else {
          threeObject1.userData.object.hit(threeObject0);
        }
      }
    };
  }
  checkContact(physicsBody) {
    this.physicsWorld.contactTest(physicsBody, this.cbContactResult);
  }

  update(deltaTime) {
    if (!this.Ammo) return;
    this.removeDisposedRigidBodies();

    this.physicsWorld.stepSimulation(deltaTime, 10);
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
    this.detectCollision();
  }
  detectCollision() {
    for (let i = 0, il = this.dispatcher.getNumManifolds(); i < il; i++) {
      const contactManifold = this.dispatcher.getManifoldByIndexInternal(i);
      for (let j = 0, jl = contactManifold.getNumContacts(); j < jl; j++) {
        const contactPoint = contactManifold.getContactPoint(j);
      }
    }
  }
  removeDisposedRigidBodies() {
    //for messing with disposed rigid bodies in the future
    // const toBeDisposed = this.rigidBodies.filter(
    //   (rigidBody) => rigidBody.userData.shouldDispose
    // );

    this.rigidBodies = [
      ...this.rigidBodies.filter(
        (rigidBody) => !rigidBody.userData.shouldDispose
      ),
    ];
  }
}

export default PhysicsEngine;
