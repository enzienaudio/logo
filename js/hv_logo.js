/**
 * HVLogo Nimoy Da Voronoici
 *
 * Creates a server-client based interactive voronoi diagram
 *
 */

(function(window) {

  var HVLogo = function(domElement) {

    this.shouldUpdate = false;
    this.width = window.innerWidth;
    this.height = window.innerHeight;

    // init scene
    this.scene = new THREE.Scene();

    // init renderer
    this.renderer = new THREE.WebGLRenderer({antialias: true});
    domElement.getElementById('canvascontainer').appendChild(this.renderer.domElement);
    this.renderer.setSize(this.width, this.height);
    this.renderer.setClearColor(0x000000);
    this.renderer.setPixelRatio(window.devicePixelRatio);

    // init camera
    this.camera = new THREE.PerspectiveCamera(45, (this.width / this.height), 1, 10000);
    this.camera.position.set(0, 0, 500);
    this.camera.lookAt(new THREE.Vector3(0, 0, 0));

    // init controls
    this.controls = new THREE.TrackballControls(this.camera);
    this.controls.rotateSpeed = 1.0;
    this.controls.zoomSpeed = 0.2;
    this.controls.panSpeed = 0.8;
    this.controls.noZoom = false;
    this.controls.noPan = false;
    this.controls.staticMoving = true;
    this.controls.dynamicDampingFactor = 0.3;

    var r = 50;
    var cubeGeom = new THREE.BoxGeometry(r, r, r);

    var cubeMesh = new THREE.Mesh(cubeGeom, new THREE.MeshBasicMaterial({vertexColors: THREE.VertexColors}));
    var faceIndices = [ 'a', 'b', 'c', 'd' ];
    var faceColors = [ 0xFF4D94, 0xADFF5C, 0x1975FF, 0xE6E600 ];

    var cubes = [
      [[1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 1, 1, 1, 1], [1, 0, 1, 0, 1]],
      [[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
      [[1, 1, 1, 1, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1], [1, 0, 0, 0, 1]],
      [[1, 0, 0, 0, 1], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [0, 0, 0, 0, 0], [1, 0, 0, 0, 0]],
      [[1, 1, 1, 0, 1], [0, 0, 1, 0, 1], [0, 0, 1, 1, 1], [0, 0, 1, 0, 1], [1, 1, 1, 0, 1]],
    ]

    // colour faces
    for (var f in cubeGeom.faces) {
      var face = cubeGeom.faces[f];
      var numSides = (face instanceof THREE.Face3 ) ? 3 : 4;
      for (var i = 0; i < numSides; ++i) {
        var point = cubeGeom.vertices[face[faceIndices[i]]];
        face.vertexColors[i] = new THREE.Color(faceColors[i]);
      }
    }

    for (var z = 0; z < 5; ++z) {
      for (var y = 0; y < 5; ++y) {
        for (var x = 0; x < 5; ++x) {
          if (cubes[y][z][x]) {
            var box = cubeMesh.clone();
            box.position.set(r*(x-2), r*((5-y)-3), r*(-z)-2);
            this.scene.add(box);
          }
        }
      }
    }
  };

  HVLogo.prototype.render = function() {
    this.controls.update();
    this.renderer.render(this.scene, this.camera);
  };

  HVLogo.prototype.update = function() {
    if (this.shouldUpdate)
    {
      // do processing here
      this.shouldUpdate = false;
    }
  };

  window.HVLogo = HVLogo;

})(window);