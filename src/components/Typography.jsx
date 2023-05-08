import React, { useRef } from "react";
import * as THREE from "three";
import  { Points, PointsMaterial  } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fgGradientMap from "../shaders/fg-gradientMap.glsl";
import fragmentShader2 from "../shaders/fg-logo.glsl";
import fragmentShaderText from "../shaders/fg-text-goodAiPurple.glsl";
import fragmentShaderWorld from "../shaders/unused/fragmentWorld.glsl";
import fragmentShaderWorld2 from "../shaders/unused/fragmentWorld2.glsl";
import fragmentShaderText2 from "../shaders/fg-logo.glsl";
import fragmentShaderText3 from "../shaders/unused/fragmentText3.glsl";
import fragmentShaderText4 from "../shaders/unused/fragmentText4.glsl";

import fgSmileyLinePink from "../shaders/fg-smileyLinePink.glsl";
import fgSmileyLinePurple from "../shaders/fg-smileyLinePurple.glsl";
import fgAiSalesPurple from "../shaders/fg-text-aiSalesPurple.glsl";
import fgAiSalesPink from "../shaders/fg-text-aiSalesPink.glsl";
import fgGradientMapOrange from "../shaders/fg-gradientMapOrange.glsl";
import fgGeometricShapes from "../shaders/fg-geometricShapes.glsl";
import fgSquares from "../shaders/fg-squares.glsl";
import fgBlob from "../shaders/fg-blob.glsl";
import fgContactCenter from "../shaders/fg-text-ContactCenter.glsl";
import fg from "../shaders/fg.glsl";
import fgOrange from "../shaders/fgOrange.glsl";
import fgSquares2 from "../shaders/fg-squares2.glsl";
import vertexShader from "../shaders/vertex.glsl";
import vertexShader2 from "../shaders/vertexPerlin.glsl";
import { CylinderGeometry, DoubleSide } from "three";

export const Typography = () => {
  const textureMap = useLoader(TextureLoader, "wb.jpg");
  const textureWorld = useLoader(TextureLoader, "dp-star.png");
  const textureLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const textureSmiley = useLoader(TextureLoader, "dp-smiley.png");
  const textureAiBlack = useLoader(TextureLoader, "aiBlack.jpg");
  const textureAiPurple = useLoader(TextureLoader, "aiPurple.jpg");
  const textureWbPurple = useLoader(TextureLoader, "wb-purple.jpg");
  const textureWbPink = useLoader(TextureLoader, "wb-pink.jpg");
  const aiSalesPurple = useLoader(TextureLoader, "aiSalesPurple.jpg");
  const aiSalesPink = useLoader(TextureLoader, "aiSalesPink.jpg");
  const smileyLinePink = useLoader(TextureLoader, "smileyLinePink.jpg");
  const smileyLinePurple = useLoader(TextureLoader, "smileyLinePurple.jpg");
  const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const gradientMap = useLoader(TextureLoader, "gradientMap.png");
  const gradientMapOrange = useLoader(TextureLoader, "gradientMapOrange.png");
  const geometricShapes = useLoader(TextureLoader, "geometricShapes.png");
  const squares = useLoader(TextureLoader, "galaxy.png");
  const aiContactCenter = useLoader(TextureLoader, "AiContactCenter.jpg");

  const uniforms = {
    u_time: { value: 0.0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_color1: { value: new THREE.Color("#9643FF") }, //purple
    u_color2: { value: new THREE.Color("#F9008E") }, //pink
    u_color3: { value: new THREE.Color("#FF7719") }, //orange
    u_color4: { value: new THREE.Color("#9FFF90") }, //green
    u_texture: { value: textureMap },
    u_textureWorld: { value: textureWorld },
    u_textureSmiley: { value: textureSmiley },
    u_textureAiPurple: { value: textureAiPurple },

    u_textureAiSalesPurple: { value: aiSalesPurple },
    u_textureAiSalesPink: { value: aiSalesPink },
    u_textureSmileyLinePink: { value: smileyLinePink },
    u_textureSmileyLinePurple: { value: smileyLinePurple },
    u_textureLogo: { value: dpLogo },
    u_textureGradientMap: { value: gradientMap },
    u_textureGradientMapOrange: { value: gradientMapOrange },
    u_textureGeometricShapes: { value: geometricShapes },
    u_textureSquares: { value: squares },
    u_textureSquares2: { value: squares },
    u_textureAiContactCenter: { value: aiContactCenter },
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

  let direction = 1;

  useFrame((state, delta) => {
    mesh2.current.material[1].uniforms.u_time.value += delta;
    mesh2.current.material[0].uniforms.u_time.value += delta;
    mesh2.current.material[2].uniforms.u_time.value += delta;

    const maxScale = 1.2;
    const minScale = 0.8;
    const scaleSpeed = 0.001;
   

    mesh.current.scale.x += scaleSpeed * direction;
    mesh.current.scale.y += scaleSpeed * direction;
    mesh.current.scale.z += scaleSpeed * direction;
    mesh5.current.scale.x += scaleSpeed * direction;
    mesh5.current.scale.y += scaleSpeed * direction;
    mesh5.current.scale.z += scaleSpeed * direction;

    if (mesh.current.scale.x >= maxScale || mesh.current.scale.x <= minScale) {
      direction *= -1;
    }
  });

  console.log(mesh);

  function Sphere() {
    const meshPoints = useRef();
  
    useFrame(() => {
      meshPoints.current.rotation.x += 0.001;
      meshPoints.current.rotation.y += 0.001;
    });
    
    return (
      <points ref={meshPoints} position={[0, 0, 50]}>
        <sphereGeometry args={[150, 150, 20]}/>
        <pointsMaterial color={'#9643FF'}  size={0.8} />
      </points>
    );
  }



  return (
    <>
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />
      <group position={[0, 20, 0]}>
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
            fragmentShader={fg}
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
          <cylinderGeometry attach="geometry" args={[60, 60, 7, 100, 100]} />

          <shaderMaterial
            attach="material-0"
            uniforms={uniforms}
            fragmentShader={fgSmileyLinePurple}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
          <shaderMaterial
            attach="material-2"
            uniforms={uniforms}
            fragmentShader={fgSquares2}
            vertexShader={vertexShader}
          />
          <shaderMaterial
            attach="material-1"
            uniforms={uniforms}
            fragmentShader={fgSquares2}
            vertexShader={vertexShader}
          />
        </mesh>
        <mesh ref={mesh3} position={[0, 0, 0]}>
          <cylinderGeometry attach="geometry" args={[60, 60, 7, 60, 60]} />

          <shaderMaterial
            attach="material-0"
            uniforms={uniforms}
            fragmentShader={fgContactCenter}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
          <shaderMaterial
            attach="material-2"
            uniforms={uniforms}
            fragmentShader={fgOrange}
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
            fragmentShader={fgGeometricShapes}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
          <shaderMaterial
            attach="material-1"
            uniforms={uniforms}
            fragmentShader={fragmentShaderWorld2}
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
            fragmentShader={fgSquares}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
          <shaderMaterial
            attach="material-2"
            uniforms={uniforms}
            fragmentShader={fgOrange}
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
            fragmentShader={fgContactCenter}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
          <shaderMaterial
            attach="material-1"
            uniforms={uniforms}
            fragmentShader={fgOrange}
            vertexShader={vertexShader}
          />
          <shaderMaterial
            attach="material-2"
            uniforms={uniforms}
            fragmentShader={fragmentShaderWorld2}
            vertexShader={vertexShader}
          />
        </mesh>
      </group>
      <Sphere/>




    </>
  );
};
