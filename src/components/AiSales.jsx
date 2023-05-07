import React, { useEffect, useRef, useState, setScale } from "react";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls, useHelper } from "@react-three/drei";
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
import fgGradientMapOrange from "../shaders/fg-gradientMapOrange.glsl";

import vertexShader from "../shaders/vertex.glsl";
import { BackSide, CylinderGeometry, DoubleSide , Object3D} from "three";


export const AiSales = () => {
  const aiSalesPurple = useLoader(TextureLoader, "aiSalesPurple.jpg");
  const aiSalesPink = useLoader(TextureLoader, "aiSalesPink.jpg");
  const smileyLinePink = useLoader(TextureLoader, "smileyLinePink.jpg");
  const smileyLinePurple = useLoader(TextureLoader, "smileyLinePurple.jpg");
  const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const gradientMap = useLoader(TextureLoader, "gradientMap.png");
  const gradientMapOrange = useLoader(TextureLoader, "gradientMapOrange.png");

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
    u_textureGradientMapOrange: { value: gradientMapOrange },
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



  const arrayOfMeshes = [
    mesh,
    mesh2,
    mesh3,
    mesh4,
    mesh5,
    mesh6,
    mesh7,
    mesh8,
    mesh9,
    mesh10,


  ];

  useFrame(({ clock }, delta) => {
    console.log('clock.elapsedTime', clock.elapsedTime)
    const time = clock.getElapsedTime();
    const scale = 1 + Math.sin(clock.elapsedTime * 2) * 0.3;
    
   
    arrayOfMeshes.forEach((_mesh, i) => {
      
      const powDelta = Math.pow(time, i / 10);

      _mesh.current.material.uniforms.u_time.value += delta;
      if (time > 2) return

      _mesh.current.scale.set(powDelta, powDelta, powDelta);
     


    });

    // Individual Meshes events

    arrayOfMeshes[4].current.rotation.y += delta 


  });

 
  return (
    <>
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />

      <group position={[0, 0, 0]} rotation={[45, 0, 0]}>
        <mesh
          ref={mesh}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <sphereGeometry attach="geometry" args={[10, 50, 50]} />
          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            transparent={true}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh2}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry args={[20, 20, 5, 60, 1, true]} />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgAiSalesPurple}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh3}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[30, 30, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgSmileyLinePurple}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh4}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[40, 40, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
            side={DoubleSide}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            transparent={true}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh5}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[50, 50, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogo}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh6}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[60, 60, 5, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
            shadowSide={BackSide}
            shadowMap={true} // Add this property
            shadowMapSize={new THREE.Vector2(1024, 1024)}
            castShadow={true}
            receiveShadow={true}
          />
        </mesh>

        <mesh
          ref={mesh7}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[70, 70, 5, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgAiSalesPurple}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
        <mesh
          ref={mesh8}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[80, 80, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMapOrange}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>

        <mesh
          ref={mesh9}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[90, 90, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>

        <mesh
          ref={mesh10}
          position={[0, 0, 0]}
          rotation={[0, 0, 0]}
          castShadow
          receiveShadow
        >
          <cylinderGeometry
            attach="geometry"
            args={[100, 100, 10, 60, 1, true]}
          />

          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgAiSalesPink}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>

      </group>
    </>
  );
};
