import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Plane, OrbitControls, Instance, Instances } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fragmentShader from "./shaders/fragment.glsl";
import vertexShader from "./shaders/vertex.glsl";
import { DoubleSide } from "three";

function App() {
  function RoundedRect() {
    const { width, height, radius } = useControls({
      width: { value: 50, min: 41, max: 100, step: 1 },
      height: { value: 50, min: 41, max: 100, step: 1 },
      radius: { value: 20, min: 1, max: 30, step: 1 },
    });

    const roundedRectShape = new THREE.Shape();

    const x = 0;
    const y = 0;

    roundedRectShape.moveTo(x, y + radius);
    roundedRectShape.lineTo(x, y + height - radius);
    roundedRectShape.quadraticCurveTo(x, y + height, x + radius, y + height);
    roundedRectShape.lineTo(x + width - radius, y + height);
    roundedRectShape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    roundedRectShape.lineTo(x + width, y + radius);
    roundedRectShape.quadraticCurveTo(x + width, y, x + width - radius, y);
    roundedRectShape.lineTo(x + radius, y);
    roundedRectShape.quadraticCurveTo(x, y, x, y + radius);

    return roundedRectShape;
  }

  const texture = useLoader(TextureLoader, "map2.png");

  const { colorFrame, opacity, countOfFrames } = useControls({
    colorFrame: { value: "#7C52FF" },
    // alphaMapText: {value: textureMap },
    opacity: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.001,
    },
    countOfFrames: {
      value: 1,
      min: 1,
      max: 6,
      step: 1,
    },
  });

  function updateInstancesZ(reff, x, y, z) {
    useFrame(() => {
      reff.current.instanceMatrix.needsUpdate = true;
      const instanceCount = reff.current?.instanceMatrix?.count;
      for (let i = 0; i < instanceCount; i++) {
        const instanceMatrix = new THREE.Matrix4().fromArray(
          instRef.current.instanceMatrix.array,
          i * 16
        );
        instanceMatrix.setPosition(new THREE.Vector3(x, y, z));
        reff.current.instanceMatrix.setMatrixAt(i, instanceMatrix);
      }
    });
  }

  const instRef = useRef(null);
  const zPos = 20;
  const xPos = 20;
  const yPos = 20;

  console.log(instRef);
  function updates() {
    useEffect(() => {
      // Call updateInstancesZ with your instancedMesh ref and the desired z position value
      updateInstancesZ(instRef, xPos, yPos, zPos);
    }, [instRef, xPos, yPos, zPos]);
  }

  return (
    <Canvas camera={{ position: [90, 90, 100] }}>
      <OrbitControls enableDamping />
      <color attach="background" args={["black"]} />
      <ambientLight intensity={1} />

      <Instances
      >
        <shapeGeometry args={[RoundedRect()]} />
        <meshStandardMaterial
          side={DoubleSide}
          color={colorFrame}
          opacity={opacity}
          transparent={true}
        />
        <Instance scale={1} position={[0, 0, 10]} />
        <Instance scale={1} position={[0, 0, 20]} />
        <Instance scale={1} position={[0, 0, 30]} />
        <Instance scale={1} position={[0, 0, 40]} />

      </Instances>
    </Canvas>
  );
}
export default App;
