import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fragmentShader from "./shaders/fragment.glsl";
import fragmentShader2 from "./shaders/fragment2.glsl";
import fragmentShaderText from "./shaders/fragmentText.glsl";
import fragmentShaderWorld from "./shaders/fragmentWorld.glsl";
import fragmentShaderWorld2 from "./shaders/fragmentWorld2.glsl";
import fragmentShaderText2 from "./shaders/fragmentText2.glsl";
import fragmentShaderText3 from "./shaders/fragmentText3.glsl";
import fragmentShaderText4 from "./shaders/fragmentText4.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { CylinderGeometry, DoubleSide } from "three";

function Typography() {
  const textureMap = useLoader(TextureLoader, "wb.jpg");
  const textureWorld = useLoader(TextureLoader, "dp-star.png");
  const textureLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const textureSmiley = useLoader(TextureLoader, "dp-smiley.png");
  const textureAiBlack = useLoader(TextureLoader, "aiBlack.jpg");
  const textureAiPurple = useLoader(TextureLoader, "aiPurple.jpg");
  const textureWbPurple = useLoader(TextureLoader, "wb-purple.jpg");
  const textureWbPink = useLoader(TextureLoader, "wb-pink.jpg");

  const uniforms = {
    u_time: { value: 0.0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_color1: { value: new THREE.Color("#9643FF") },
    u_color2: { value: new THREE.Color("#F9008E") },
    u_color3: { value: new THREE.Color("#FF7719") },
    u_color4: { value: new THREE.Color("#9FFF90") },
    u_texture: { value: textureMap },
    u_textureWorld: { value: textureWorld },
    u_textureLogo: { value: textureLogo },
    u_textureSmiley: { value: textureSmiley },
    u_textureAiPurple: { value: textureAiPurple },
  };

  const mesh = useRef(null);
  const mesh2 = useRef(null);
  const mesh3 = useRef(null);
  const mesh4 = useRef(null);
  const mesh5 = useRef(null);
  const mesh6 = useRef(null);

  useFrame((state, delta) => {
    mesh.current.material[1].uniforms.u_time.value += delta;
    mesh.current.material[0].uniforms.u_time.value += delta;
    mesh.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 2) * Math.PI * 0.0006;
    mesh2.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 3) * Math.PI * 0.0009;
    mesh3.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 3) * Math.PI * 0.0009;
    mesh4.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 3) * Math.PI * 0.0009;
    mesh5.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 3) * Math.PI * 0.0006;
    mesh6.current.rotation.x +=
      Math.sin(state.clock.elapsedTime * 3) * Math.PI * 0.001;
  });

  useFrame((state, delta) => {
    mesh2.current.material[1].uniforms.u_time.value += delta;
    mesh2.current.material[0].uniforms.u_time.value += delta;
  });

  console.log(mesh);
  return (
    <>
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />

      <mesh ref={mesh2} position={[0, 40, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 1]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText2}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld2}
          vertexShader={vertexShader}
        />
      </mesh>
      <mesh ref={mesh} position={[0, 20, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 60]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld2}
          vertexShader={vertexShader}
        />
      </mesh>
      <mesh ref={mesh3} position={[0, 0, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 60]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText3}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld}
          vertexShader={vertexShader}
        />
      </mesh>
      <mesh ref={mesh4} position={[0, -20, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 1]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText2}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShader2}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld2}
          vertexShader={vertexShader}
        />
      </mesh>
      <mesh ref={mesh5} position={[0, -40, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 60]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText4}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld}
          vertexShader={vertexShader}
        />
      </mesh>
      <mesh ref={mesh6} position={[0, -60, 0]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 1]} />

        <shaderMaterial
          attach="material-0"
          uniforms={uniforms}
          fragmentShader={fragmentShaderText2}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
        <shaderMaterial
          attach="material-1"
          uniforms={uniforms}
          fragmentShader={fragmentShader}
          vertexShader={vertexShader}
        />
        <shaderMaterial
          attach="material-2"
          uniforms={uniforms}
          fragmentShader={fragmentShaderWorld2}
          vertexShader={vertexShader}
        />
      </mesh>
    </>
  );
}
export default Typography;
