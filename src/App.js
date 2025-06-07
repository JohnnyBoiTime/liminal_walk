import * as THREE from 'three';
import Controls from './Controls';
import Environment from './Environment';
import { PointerLockControls } from 'three/examples/jsm/controls/PointerLockControls.js';

export default class App {
  constructor() {
    this.simulationSpeedMultiplier = 1.0;
    this._Initialize();
  }

  _Initialize() {
    
    // Create the scene 
    this.scene = new THREE.Scene();

    // Set up the render, camera, and scene
    this._SetupRenderer();

    this._SetupCamera();

    this._SetupControls();

    this.environment = new Environment(this.scene);

    this.inputController = new Controls(this.controls, this.camera);

    // Simulation time
    this.clock = new THREE.Clock();
  }

  // Renderers
  _SetupRenderer() {
    
    // Three.js renderer
    this.renderer = new THREE.WebGLRenderer({ antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.renderer.outputEncoding = THREE.sRGBEncoding;
    this.renderer.toneMapping = THREE.ACESFilmicToneMapping;
    this.renderer.toneMappingExposure = 0.25;
    document.body.appendChild(this.renderer.domElement);

    /*
    // Label renderer, to label things!
    this.labelRenderer = new CSS2DRenderer();
    this.labelRenderer.setSize(window.innerWidth, window.innerHeight);
    this.labelRenderer.domElement.style.position = 'absolute';
    this.labelRenderer.domElement.style.top = '0px';
    this.labelRenderer.domElement.style.pointerEvents = 'none';
    document.body.appendChild(this.labelRenderer.domElement);

    */
  }

  // Basic camera setup
  _SetupCamera() {
    const aspect = window.innerWidth / window.innerHeight;
    this.camera = new THREE.PerspectiveCamera(75, aspect, 0.1, 100000);
    this.camera.position.set(10, 100, 500);
  }

  /*
  // Hud stuff
  _SetUpDomElements() {
  
  }

  */

  // Setup for the controls of the simulation
  _SetupControls() {
    const EYE_HEIGHT = 10; // Lock player to the plane
    this.controls = new PointerLockControls(this.camera, this.renderer.domElement);
    const wrapper = this.controls.getObject();
    wrapper.position.set(0, EYE_HEIGHT, 0);
    this.scene.add(wrapper);
    this._RegisterInputEvents();
    // this._SetUpDomElements();
  }

  
  // Have pressing keys do things and resizing camera correctly
  _RegisterInputEvents() {
    document.addEventListener('keydown', (e) => this.inputController.handleKeyDown(e));
    document.addEventListener('keyup',   (e) => this.inputController.handleKeyUp(e));
    window.addEventListener('resize', () => {
      const width = window.innerWidth, height = window.innerHeight;
      this.camera.aspect = width / height;
      this.camera.updateProjectionMatrix();
      this.renderer.setSize(width, height);
      //this.labelRenderer.setSize(width, height);
    })
  }

  // Starts the simulation
  start() {
    this._Animate();
  }

  // Basic animation loop
  _Animate() {
    const delta = this.clock.getDelta();

    this.inputController.update(delta, this.camera);

    this.renderer.render(this.scene, this.camera);
    
    requestAnimationFrame(() => this._Animate());
  }
}