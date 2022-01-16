const canvas = document.querySelector("#scene");

function main() {
  const fov = 50;
  const aspect = canvas.clientWidth / canvas.clientHeight;
  const near = 0.1;
  const far = 2000;

  const camera = new THREE.PerspectiveCamera(fov, aspect, near, far);
  camera.position.z = 1;

  const renderer = new THREE.WebGLRenderer({ canvas });

  const scenes = new THREE.Scene();
  const loader = new THREE.TextureLoader();

  const texture = loader.load(
    "https://threejs.org/manual/examples/resources/images/equirectangularmaps/tears_of_steel_bridge_2k.jpg",
    () => {
      const rt = new THREE.WebGLCubeRenderTarget(texture.image.height);
      rt.fromEquirectangularTexture(renderer, texture);
      scenes.background = rt.texture;
    }
  );

  function render() {
    camera.aspect = canvas.clientWidth / canvas.clientHeight;
    camera.updateProjectionMatrix();

    const width = canvas.clientWidth;
    const height = canvas.clientHeight;
    renderer.setSize(width, height);

    renderer.render(scenes, camera);
    requestAnimationFrame(render);
  }
  requestAnimationFrame(render);
}

main();
