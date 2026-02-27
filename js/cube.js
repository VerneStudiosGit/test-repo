(function () {
  var canvas = document.getElementById('bg-cube');
  var renderer = new THREE.WebGLRenderer({ canvas: canvas, alpha: true });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(window.devicePixelRatio);

  var scene = new THREE.Scene();
  var camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.z = 3;

  var geometry = new THREE.BoxGeometry(1.5, 1.5, 1.5);
  var material = new THREE.MeshBasicMaterial({ wireframe: true, color: 0x3b82f6 });
  var cube = new THREE.Mesh(geometry, material);
  scene.add(cube);

  function animate() {
    requestAnimationFrame(animate);
    cube.rotation.x += 0.005;
    cube.rotation.y += 0.007;
    renderer.render(scene, camera);
  }

  animate();

  window.addEventListener('resize', function () {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });
})();
