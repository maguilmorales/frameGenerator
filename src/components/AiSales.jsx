import React, { useRef } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fgGradientOrange from "../shaders/fg-gradientOrange.glsl";
import fgGradientPink from "../shaders/fg-gradientPink.glsl";
import fgLogo from "../shaders/fg-logo.glsl";
import fgSmileyLinePink from "../shaders/fg-smileyLinePink.glsl";
import fgSmileyLinePurple from "../shaders/fg-smileyLinePurple.glsl";
import fgAiSalesPurple from "../shaders/fg-text-aiSalesPurple.glsl";
import fgAiSalesPink from "../shaders/fg-text-aiSalesPink.glsl";
import fgGradientMap from "../shaders/fg-gradientMap.glsl";

import vertexShader from "../shaders/vertex.glsl";
import { CylinderGeometry, DoubleSide } from "three";

export const AiSales = () => {

  const aiSalesPurple = useLoader(TextureLoader, "aiSalesPurple.jpg");
  const aiSalesPink = useLoader(TextureLoader, "aiSalesPink.jpg");
  const smileyLinePink = useLoader(TextureLoader, "smileyLinePink.jpg");
  const smileyLinePurple = useLoader(TextureLoader, "smileyLinePurple.jpg");
  const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const gradientMap = useLoader(TextureLoader, "gradientMap.png");


  const uniforms = {
    u_time: { value: 0.0 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_color1: { value: new THREE.Color("#9643FF") },
    u_color2: { value: new THREE.Color("#F9008E") },
    u_color3: { value: new THREE.Color("#FF7719") },
    u_color4: { value: new THREE.Color("#9FFF90") },
    u_textureAiSalesPurple: { value: aiSalesPurple },
    u_textureAiSalesPink: { value: aiSalesPink },
    u_textureSmileyLinePink: { value: smileyLinePink },
    u_textureSmileyLinePurple: { value: smileyLinePurple },
    u_textureLogo: { value: dpLogo },
    u_textureGradientMap: { value: gradientMap },
  };

  const mesh = useRef(null);
  const mesh2 = useRef(null);
  const mesh3 = useRef(null);
  const mesh4 = useRef(null);
  const mesh5 = useRef(null);
  const mesh6 = useRef(null);
  const mesh7 = useRef(null);
  const mesh8 = useRef(null);
  const mesh9 = useRef(null);
  const mesh10 = useRef(null);
  const mesh11 = useRef(null);
  const mesh12 = useRef(null);
  const mesh13 = useRef(null);
  const mesh14 = useRef(null);
  const mesh15 = useRef(null);
  const mesh16 = useRef(null);
  const mesh17 = useRef(null);
  const mesh18 = useRef(null);
  const mesh19 = useRef(null);
  const mesh20 = useRef(null);

  useFrame((state, delta) => {
    // mesh.current.material[1].uniforms.u_time.value += delta;
    mesh.current.material.uniforms.u_time.value += delta;



  });



  console.log(mesh2);
  return (
    <>
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />
    <group position={[15, 0, 0]}>
      <mesh ref={mesh} position={[0, 0, 0]} rotation={[0, 0, 0]}>
        <sphereGeometry attach="geometry" args={[10, 50, 50]} />
        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
        />
      </mesh>

      <mesh ref={mesh2} position={[0, 0, 0]} rotation={[0, 0, 0.4]}>
        <cylinderGeometry args={[20, 20, 10, 60, 1, true]} />

        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fgAiSalesPurple}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh3} position={[0, 0, 0]} rotation={[0, 0, 0.6]}>
        <cylinderGeometry attach="geometry" args={[30, 30, 10, 60, 1, true]} />

        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fgSmileyLinePurple}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh4} position={[0, 0, 0]} rotation={[0, 0, 0.8]}>
        <cylinderGeometry attach="geometry" args={[40, 40, 10, 60, 1, true]} />

        <shaderMaterial
          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh5} position={[0, 0, 0]} rotation={[0, 0, 1]}>
        <cylinderGeometry attach="geometry" args={[50, 50, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh6} position={[0, 0, 0]} rotation={[0, 0, 1.4]}>
        <cylinderGeometry attach="geometry" args={[60, 60, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh7} position={[0, 0, 0]} rotation={[0, 0, 1.6]}>
        <cylinderGeometry attach="geometry" args={[70, 70, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh8} position={[0, 0, 0]} rotation={[0, 0, 1.8]}>
        <cylinderGeometry attach="geometry" args={[80, 80, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh9} position={[0, 0, 0]} rotation={[0, 0, 2]}>
        <cylinderGeometry attach="geometry" args={[90, 90, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh10} position={[0, 0, 0]} rotation={[0, 0, 2.4]}>
        <cylinderGeometry attach="geometry" args={[100, 100, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh11} position={[0, 0, 0]} rotation={[0, 0, 2.6]}>
        <cylinderGeometry attach="geometry" args={[110, 110, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh12} position={[0, 0, 0]} rotation={[0, 0, 2.8]}>
        <cylinderGeometry attach="geometry" args={[120, 120, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh13} position={[0, 0, 0]} rotation={[0, 0, 3]}>
        <cylinderGeometry attach="geometry" args={[130, 130, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientPink}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh14} position={[0, 0, 0]} rotation={[0, 0, 3.2]}>
        <cylinderGeometry attach="geometry" args={[140, 140, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgAiSalesPurple}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh15} position={[0, 0, 0]} rotation={[0, 0, 3.4]}>
        <cylinderGeometry attach="geometry" args={[150, 150, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgSmileyLinePink}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh16} position={[0, 0, 0]} rotation={[0, 0, 3.6]}>
        <cylinderGeometry attach="geometry" args={[160, 160, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgSmileyLinePink}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh17} position={[0, 0, 0]} rotation={[0, 0, 3.8]}>
        <cylinderGeometry attach="geometry" args={[170, 170, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh18} position={[0, 0, 0]} rotation={[0, 0, 4]}>
        <cylinderGeometry attach="geometry" args={[180, 180, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgAiSalesPurple}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh19} position={[0, 0, 0]} rotation={[0, 0, 4.4]}>
        <cylinderGeometry attach="geometry" args={[190, 190, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgLogo}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>

      <mesh ref={mesh20} position={[0, 0, 0]} rotation={[0, 0, 4.6]}>
        <cylinderGeometry attach="geometry" args={[200, 200, 10, 60, 1, true]} />

        <shaderMaterial

          uniforms={uniforms}
          fragmentShader={fgGradientMap}
          vertexShader={vertexShader}
          transparent={true}
          side={DoubleSide}
        />
      </mesh>
      </group>

    </>
  );
}

