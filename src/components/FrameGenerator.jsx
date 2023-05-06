import React, { useRef, useEffect } from "react";
import { Canvas, useFrame, useLoader, useThree } from "@react-three/fiber";
import { Plane, OrbitControls, Instance, Instances, Line } from "@react-three/drei";
import * as THREE from "three";
import { useControls } from "leva";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { DoubleSide } from "three";
import { LineGeometry } from "three-stdlib";
import { Shape, ExtrudeBufferGeometry, LineBasicMaterial, Group } from "three";


function FrameGenerator() {


  const instRef = useRef(null)

  function RoundedLineShape() {

    const { width, height, radius, color } = useControls({
      width: { value: 50, min: 41, max: 100, step: 1 },
      height: { value: 50, min: 41, max: 100, step: 1 },
      radius: { value: 6, min: 1, max: 30, step: 1 },
      color: { value: "#7C52FF" },

    });

    const shape = new Shape();

    const x = -30;
    const y = 0;

    shape.moveTo(x, y + radius);
    shape.lineTo(x, y + height - radius);
    shape.quadraticCurveTo(x, y + height, x + radius, y + height);
    shape.lineTo(x + width - radius, y + height);
    shape.quadraticCurveTo(
      x + width,
      y + height,
      x + width,
      y + height - radius
    );
    shape.lineTo(x + width, y + radius);
    shape.quadraticCurveTo(x + width, y, x + width - radius, y);
    shape.lineTo(x + radius, y);
    shape.quadraticCurveTo(x, y, x, y + radius);
  
    const points = shape.getPoints();
    const geometry = new THREE.BufferGeometry().setFromPoints(points);
    const material = new THREE.LineBasicMaterial({ color });
    return <primitive object={new THREE.Line(geometry, material)} />;
  }

  function RoundedRect() {

    const { width, height, radius } = useControls({
      width: { value: 50, min: 41, max: 100, step: 1 },
      height: { value: 50, min: 41, max: 100, step: 1 },
      radius: { value: 6, min: 1, max: 30, step: 1 },
    });

    const roundedRectShape = new THREE.Shape();

    const x = -30;
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

  const textureMap = useLoader(TextureLoader, "trans2.png");
  const colorMap = useLoader(TextureLoader, "mapColor.png");

  const { colorFrame, opacity, countOfFrames, backgroundColorFrame } = useControls({
    colorFrame: { value: "#7C52FF" },
    backgroundColorFrame: { value: "#000000" },
    opacity: {
      value: 0.3,
      min: 0,
      max: 1,
      step: 0.001,
    },
    countOfFrames: {
      value: 1,
      min: 1,
      max: 20,
      step: 1,
    },
  });
  
  console.log(countOfFrames)

  return (
    <>
      <OrbitControls enableDamping />
      <color attach="background" args={[backgroundColorFrame]} />
      <ambientLight intensity={1} />

      <Instances>
      
        <shapeGeometry args={[RoundedRect()]} />
        <meshStandardMaterial
          side={DoubleSide}
          color={colorFrame}
          opacity={opacity}
          transparent={true}
          alphaMap={textureMap}
        />
        
        {Array(countOfFrames).fill(0).map((frame, index) => ( 
          <Instance scale={1} position={[0, 0, 10 + 10 * index ]} key={index} /> 
        ))}

      </Instances> 

      {Array(countOfFrames).fill(0).map((frame, index) => ( 
          <group position={[0, 0, 10 + 10 * index]} key={index}>
          <RoundedLineShape width={20} height={25} radius={5} color={'white'}  />
          </group>
        ))}

      
          </>
  );
}
export default FrameGenerator;
