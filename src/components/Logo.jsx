import React from 'react';
import { useLoader } from '@react-three/fiber';
import { OrbitControls } from '@react-three/drei';
import * as THREE from 'three';
// Define the shaders
const vertexShader = `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision mediump float; // Specify precision for floats
  uniform sampler2D texture;
  varying vec2 vUv;

  void main() {
    gl_FragColor = texture2D(texture, vUv); // For WebGL 1.0 and compatibility
  }
`;

const Octahedron = () => {
  const meshRef = React.useRef();
  
  // Load texture
  const text1 = useLoader(THREE.TextureLoader, 'circle.png');

  return (
    <mesh ref={meshRef} position={[0, 0, 0]}>
      <octahedronGeometry args={[10]} />
      <shaderMaterial
        attach="material"
        args={[{
          vertexShader,
          fragmentShader,
          uniforms: {
            texture: { value: text1 }
          }
        }]}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
};

export const Logo = () => {
  return (
    <>
      <color attach="background" args={["#fff"]} />
      <ambientLight intensity={1} />
      <Octahedron />
      <OrbitControls enableDamping />
    </>
  );
};
