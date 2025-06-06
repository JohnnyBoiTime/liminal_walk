import * as THREE from 'three';

export default class Environment {
    constructor(scene) {
        this.scene = scene;
        this._SetupLights();
        this._SetupGround();

    }

    // Set up lights for the scene
    _SetupLights() {
        const hemiLight = new THREE.HemisphereLight(0xffffff, 0x444444, 5);
        hemiLight.position.set(0, 200, 0);
        this.scene.add(hemiLight);

       
    }

    // What we will walk on
    _SetupGround() {
        const groundGeo = new THREE.PlaneGeometry(2000, 2000, 100, 100);
        const groundMat = new THREE.MeshStandardMaterial({ 
            color: 0x777777,
            roughness: 0.8,
            metalness: 0.2,
        })

        const ground = new THREE.Mesh(groundGeo, groundMat);
        ground.rotation.x = -Math.PI / 2;
        ground.receiveShadow = true;
        this.scene.add(ground);
    }


    /* Update environment
    update(delta) {

    }

    */
}