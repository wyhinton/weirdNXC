export function initializeLights(myScene){
  var reflectionTexture = new BABYLON.HDRCubeTexture("./textures/environment.hdr", myScene, 128, false, true, false, true);
  var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(1, 1, 0), myScene);
  var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 1, -1), myScene);
}

export function initializeParticleSystem(myScene, size, emitRate){

  var particleSystem = new BABYLON.ParticleSystem("particles", 10000, myScene);

  particleSystem.particleTexture = new BABYLON.Texture("data/textures/cloudTest.png", scene);
  particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_STANDARD;
  particleSystem.addDragGradient(0, 0.5)
  particleSystem.minLifetime = 0.3;
  particleSystem.maxLifeTime = 400;
  particleSystem.addSizeGradient(10.0, 1);
  // particleSystem.minSize = 0.00001;
  // particleSystem.maxSize = 0.001;
  particleSystem.minSize = 1;
  particleSystem.maxSize = 10;
  particleSystem.minEmitPower = 1;
  particleSystem.maxEmitPower = 10;
  // particleSystem.addStartSizeGradient(0, 2);
  // particleSystem.blendMode = BABYLON.ParticleSystem.BLENDMODE_MULTIPLY;
  // particleSystem.emitRate = emitRate
  particleSystem.emitter = new BABYLON.Vector3(0, -15, 0); // the starting object, the emitter
  particleSystem.minEmitBox = new BABYLON.Vector3(-1*size, -1*size, -1*size); // Starting all from
  particleSystem.maxEmitBox = new BABYLON.Vector3(size, size, size); // To...
  particleSystem.start();
}

export function dynamicCanvasMaterial(canvasSourceElement, myScene ) {
  var texture = new BABYLON.DynamicTexture("dynamic texture", canvasSourceElement, myScene);
  var textureContext = texture.getContext('2d');
  var mat = new BABYLON.StandardMaterial("mat", myScene);
  mat.emissiveTexture = texture;
  setInterval(function(){
    texture.update()
  }, 10)
  return mat;
}

export function initializeCamera(myScene, enableArc) {
  if (enableArc == true) {
      var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0,0,5), myScene);
  } else {
      var camera = new BABYLON.UniversalCamera("Camera", new BABYLON.Vector3(0,0,5), myScene);
      camera.setTarget(BABYLON.Vector3.Zero());
  }


  var lensEffect = new BABYLON.LensRenderingPipeline('lens', {
      // edge_blur: 1.0,
      // chromatic_aberration: .1,
      // distortion: 1.0,
      // dof_focus_distance: 6,
      // dof_aperture: 6.0,			// set this very high for tilt-shift effect
      // grain_amount: 0.1,
      // dof_pentagon: true,
      // dof_gain: 1.0,
      // dof_threshold: 1,
      // dof_threshold: .1,
      // dof_darken: 0.25
    }, myScene, 1.0, camera
  );
  return camera;
}
