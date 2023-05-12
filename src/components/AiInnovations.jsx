import React, { useRef, useState, useEffect, useMemo } from "react";
import * as THREE from "three";
import { Points, PointsMaterial } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import {
  Cylinder,
  OrbitControls,
  Box,
  Line,
  SpotLight,
} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fgGradientMap from "../shaders/fg-gradientMap.glsl";
import fragmentShader2 from "../shaders/fg-logo.glsl";
import fragmentShader3 from "../shaders/fg-logoSpiral.glsl";
import fragmentShaderText from "../shaders/fg-text-goodAiPurple.glsl";
import fragmentShaderWorld from "../shaders/unused/fragmentWorld.glsl";
import fragmentShaderWorld2 from "../shaders/unused/fragmentWorld2.glsl";
import fragmentShaderText2 from "../shaders/fg-logo.glsl";
import fragmentShaderText3 from "../shaders/unused/fragmentText3.glsl";
import fragmentShaderText4 from "../shaders/unused/fragmentText4.glsl";
import fgLogoCom from "../shaders/fg-logoCom.glsl";
import fgSmileyCom from "../shaders/fg-smileyCom.glsl";

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
import fgSquares3 from "../shaders/fg-squares3.glsl";
import fgGeometricShapesCom from "../shaders/fg-geometricShapesCom.glsl";
import fgCommunication from "../shaders/fg-communication.glsl";
import vertexShader from "../shaders/vertex.glsl";
import vertexCom from "../shaders/vertexCom.glsl";
import vertexShader2 from "../shaders/vertexPerlin.glsl";
import { CylinderGeometry, DoubleSide } from "three";
import { MeshStandardMaterial } from "three";

export const AiInnovations = () => {
  const [shadowMapSize, setShadowMapSize] = useState(2048);
  const [shadowCameraNear, setShadowCameraNear] = useState(1);
  const [shadowCameraFar, setShadowCameraFar] = useState(10);

  const createSpiralGeometry = (turns, height, width, valueAngle) => {
    const divisions = 200;
    const geometry = new THREE.BufferGeometry();
    const vertices = [];
    const indices = [];
    const uvs = []; // UV coordinates for texture mapping

    for (let i = 0; i <= divisions; i++) {
      const angle = (i / divisions) * (Math.PI * valueAngle) * turns;
      const radius = (i / divisions) * valueAngle;
      const xInner = radius * Math.cos(angle);
      const yInner = (i / divisions) * height;
      const zInner = radius * Math.sin(angle);

      const xOuter = (radius + width) * Math.cos(angle);
      const yOuter = (i / divisions) * height;
      const zOuter = (radius + width) * Math.sin(angle);

      vertices.push(xInner, yInner, zInner, xOuter, yOuter, zOuter);

      // Define UV coordinates for each vertex
      const u = i / divisions;
      const vInner = 0;
      const vOuter = 1;
      uvs.push(u, vInner, u, vOuter);

      if (i < divisions) {
        indices.push(i * 2, i * 2 + 1, (i + 1) * 2);
        indices.push(i * 2 + 1, (i + 1) * 2 + 1, (i + 1) * 2);
      }
    }

    geometry.setIndex(indices);
    geometry.setAttribute(
      "position",
      new THREE.Float32BufferAttribute(vertices, 3)
    );
    geometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));

    return geometry;
  };

  const Spiral = ({
    turns = 5,
    height = 4,
    width = 0.5,
    position,
    scale,
    valueAngle,
  }) => {
    const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");

    const uniforms = {
      u_time: { value: 0.0 },
      u_textureLogo: { value: dpLogo },
    };

    const ref = useRef();

    const geometry = useMemo(
      () => createSpiralGeometry(turns, height, width, valueAngle),
      [turns, height, width, valueAngle]
    );

    useFrame((delta) => {
      ref.current.rotation.y += 0.01;
      ref.current.material.uniforms.u_time.value += delta;
    });

    return (
      <>
        <mesh ref={ref} scale={scale}>
          <bufferGeometry attach="geometry" {...geometry} />
          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fragmentShader3}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
      </>
    );
  };
  const Spiral2 = ({
    turns = 5,
    height = 4,
    width = 0.5,
    position,
    scale,
    valueAngle,
  }) => {
    const geometricShapes = useLoader(TextureLoader, "geometricShapes.png");

    const uniforms = {
      u_time: { value: 0.0 },
      u_textureSmileyLinePurple: { value: geometricShapes },
    };

    const ref2 = useRef();

    const geometry = useMemo(
      () => createSpiralGeometry(turns, height, width, valueAngle),
      [turns, height, width, valueAngle]
    );

    useFrame((delta) => {
      ref2.current.rotation.y += 0.01;
      ref2.current.material.uniforms.u_time.value += delta;
    });

    return (
      <>
        <mesh ref={ref2} scale={scale}>
          <bufferGeometry attach="geometry" {...geometry} />
          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgSmileyCom}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
      </>
    );
  };
  const Spiral3 = ({
    turns = 5,
    height = 4,
    width = 0.5,
    position,
    scale,
    valueAngle,
  }) => {
    const gradientMap = useLoader(TextureLoader, "gradientMap.png");
    const uniforms = {
      u_time: { value: 0.0 },
      u_textureGradientMap: { value: gradientMap },
    };

    const ref3 = useRef();

    const geometry = useMemo(
      () => createSpiralGeometry(turns, height, width, valueAngle),
      [turns, height, width, valueAngle]
    );

    useFrame((delta) => {
      ref3.current.rotation.y += 0.01;
      ref3.current.material.uniforms.u_time.value += delta;
    });

    return (
      <>
        <mesh ref={ref3} scale={scale}>
          <bufferGeometry attach="geometry" {...geometry} />
          <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
            transparent={true}
            side={DoubleSide}
          />
        </mesh>
      </>
    );
  };
  const Spiral4 = ({
    turns = 5,
    height = 4,
    width = 0.5,
    position,
    scale,
    valueAngle,
  }) => {
    const ref4 = useRef();

    const geometry = useMemo(
      () => createSpiralGeometry(turns, height, width, valueAngle),
      [turns, height, width, valueAngle]
    );

    useFrame((delta) => {
      ref4.current.rotation.y += 0.01;
    });

    return (
      <>
        <points ref={ref4} scale={scale}>
          <bufferGeometry attach="geometry" {...geometry} />
          <pointsMaterial color={"#ffffff"} size={0.01} />
        </points>
      </>
    );
  };
  const Spheres = ({
    divisions = 10,
    height = 4,
    turns = 10,
    color,
    position,
  }) => {
    const gradientMap = useLoader(TextureLoader, "gradientMap.png");

    const uniforms = {
      u_time: { value: 0.0 },
      u_textureGradientMap: { value: gradientMap },
    };

    const sphereRadius = 0.05; // Radius of the spheres
    const sphereDetail = 32; // Number of segmented faces around the circumference of the sphere
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.5,
      shadowSide: THREE.DoubleSide, // enable shadow casting and receiving
    });

    const [t, setT] = useState(0);

    // Create a single sphere geometry to reuse for all instances
    const sphereGeometry = useMemo(() => {
      return new THREE.SphereGeometry(sphereRadius, sphereDetail, sphereDetail);
    }, [sphereRadius, sphereDetail]);

    // Create an InstancedMesh object with the sphere geometry and material
    const instancedMesh = useMemo(() => {
      const mesh = new THREE.InstancedMesh(
        sphereGeometry,
        material,
        divisions + 1
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      for (let i = 0; i <= divisions; i++) {
        mesh.setMatrixAt(i, new THREE.Matrix4());
      }
      return mesh;
    }, [sphereGeometry, material, divisions]);

    // Animate the spheres
    useFrame(() => {
      setT((prevT) => (prevT + 0.01) % (Math.PI * 2 * turns)); // Increase the angle for the entire group
      instancedMesh.instanceMatrix.needsUpdate = true; // Update the instance matrix attribute
    });

    // Set the position of each instance
    useEffect(() => {
      for (let i = 0; i <= divisions; i++) {
        const angle = t + (i / divisions) * (Math.PI * 2 * turns);
        const radius = (i / divisions) * 2;
        const x = radius * Math.cos(angle);
        const y = (i / divisions) * height;
        const z = radius * Math.sin(angle);
        const matrix = new THREE.Matrix4().makeTranslation(x, y, z);
        instancedMesh.setMatrixAt(i, matrix);
      }
    }, [divisions, height, turns, t, instancedMesh]);

    return <primitive object={instancedMesh} />;
  };
  const Boxes = ({
    divisions = 10,
    height = 4,
    turns = 10,
    color,
    position,
  }) => {
    const gradientMap = useLoader(TextureLoader, "gradientMap.png");

    const uniforms = {
      u_time: { value: 0.0 },
      u_textureGradientMap: { value: gradientMap },
    };

    const boxWidth = 0.05; // Radius of the spheres
    const boxHeight = 0.05; // Radius of the spheres
    const boxDepth = 0.05; // Number of segmented faces around the circumference of the sphere
    const material = new THREE.MeshStandardMaterial({
      color: color,
      roughness: 0.5,
      metalness: 0.5,
      shadowSide: THREE.DoubleSide, // enable shadow casting and receiving
    });
    const [t, setT] = useState(0);

    // Create a single sphere geometry to reuse for all instances
    const boxesGeometry = useMemo(() => {
      return new THREE.BoxGeometry(boxWidth, boxHeight, boxDepth);
    }, [boxWidth, boxHeight, boxDepth]);

    // Create an InstancedMesh object with the sphere geometry and material
    const instancedMesh = useMemo(() => {
      const mesh = new THREE.InstancedMesh(
        boxesGeometry,
        material,
        divisions + 1
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      for (let i = 0; i <= divisions; i++) {
        mesh.setMatrixAt(i, new THREE.Matrix4());
      }
      return mesh;
    }, [boxesGeometry, material, divisions]);

    // Animate the spheres
    useFrame(() => {
      setT((prevT) => (prevT + 0.01) % (Math.PI * 2 * turns)); // Increase the angle for the entire group
      instancedMesh.instanceMatrix.needsUpdate = true; // Update the instance matrix attribute
    });

    // Set the position of each instance
    useEffect(() => {
      for (let i = 0; i <= divisions; i++) {
        const angle = t + (i / divisions) * (Math.PI * 2 * turns);
        const radius = (i / divisions) * 2;
        const x = radius * Math.cos(angle);
        const y = (i / divisions) * height;
        const z = radius * Math.sin(angle);
        const matrix = new THREE.Matrix4().makeTranslation(x, y, z);
        instancedMesh.setMatrixAt(i, matrix);
      }
    }, [divisions, height, turns, t, instancedMesh]);

    return <primitive object={instancedMesh} />;
  };
  const Torus = ({
    divisions = 10,
    radius = 0.03,
    tube = 0.01,
    radialSegments = 20,
    tubularSegments = 20,
    height = 4,
    turns = 10,
    color,
    position,
  }) => {
    const gradientMap = useLoader(TextureLoader, "gradientMap.png");

    const uniforms = {
      u_time: { value: 0.0 },
      u_textureGradientMap: { value: gradientMap },
    };

    const material = new THREE.MeshNormalMaterial({

    });
    const [t, setT] = useState(0);

    // Create a single sphere geometry to reuse for all instances
    const boxesGeometry = useMemo(() => {
      return new THREE.TorusGeometry(radius, tube, radialSegments, tubularSegments);
    }, [radius, tube, radialSegments, tubularSegments]);

    // Create an InstancedMesh object with the sphere geometry and material
    const instancedMesh = useMemo(() => {
      const mesh = new THREE.InstancedMesh(
        boxesGeometry,
        material,
        divisions + 1
      );
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      for (let i = 0; i <= divisions; i++) {
        mesh.setMatrixAt(i, new THREE.Matrix4());
      }
      return mesh;
    }, [boxesGeometry, material, divisions]);

    // Animate the spheres
    useFrame(() => {
      setT((prevT) => (prevT + 0.01) % (Math.PI * 2 * turns)); // Increase the angle for the entire group
      instancedMesh.instanceMatrix.needsUpdate = true; // Update the instance matrix attribute
    });

    // Set the position of each instance
    useEffect(() => {
      for (let i = 0; i <= divisions; i++) {
        const angle = t + (i / divisions) * (Math.PI * 2 * turns);
        const radius = (i / divisions) * 2;
        const x = radius * Math.cos(angle);
        const y = (i / divisions) * height;
        const z = radius * Math.sin(angle);
        const matrix = new THREE.Matrix4().makeTranslation(x, y, z);
        instancedMesh.setMatrixAt(i, matrix);
      }
    }, [divisions, height, turns, t, instancedMesh]);

    return <primitive object={instancedMesh} />;
  };
  return (
    <>
      <ambientLight intensity={0.8} />
      <pointLight position={[0, 10, -5]} intensity={1} color="#fff" />
      <color attach="background" args={["#000000"]} />
      <OrbitControls enableDamping />
      <group position={[0, -2, 0]}>
        <Spiral
          turns={5}
          height={4}
          width={0.2}
          position={{ x: 0, y: 0, z: 0 }}
          valueAngle={[3]}
        />
        <Spiral2
          turns={20}
          height={4}
          width={0.2}
          position={{ x: 0, y: -2, z: 0 }}
          valueAngle={[0.5]}
        />
        <Spiral3
          turns={2}
          height={4}
          width={0.3}
          position={{ x: 0, y: 0, z: 0 }}
          valueAngle={[2]}
        />
        <Spiral4
          turns={3}
          height={4}
          width={0.2}
          position={{ x: 0, y: 0, z: 0 }}
          scale={[2, 0, 2]}
          valueAngle={[2]}
        />
        <Spheres
          turns={3}
          height={4}
          divisions={50}
          color={0x9643ff}
          position={{ x: 0, y: -2, z: 0 }}
          castShadow
        />
        <Boxes
          turns={4}
          height={4}
          divisions={50}
          color={0xf9008e}
          position={{ x: 0, y: 0, z: 0 }}
          castShadow
        />
         <Torus
          turns={5}
          height={5}
          divisions={50}
          color={0xFF7719}
          castShadow
        /> 
      </group>
    </>
  );
};



// const WavingPlane = () => {
//   const planeRef = useRef();
//   const clock = useRef(new THREE.Clock());

//   // Step 1: Define waving properties
//   const amplitude = 1.5;
//   const frequency = 1.0;
//   const speed = 0.01;
//   const pointSize = 7;
//   const amplitudeY = 1.5; // Increase the amplitude for stronger waves on the Y-axis
//   const frequencyY = 1.0; // Increase the frequency for faster oscillation on the Y-axis

//   // Step 2: Create plane geometry
//   const planeGeometry = new THREE.PlaneGeometry(20, 20, 50, 50);

//   // Step 3: Create custom shader material
//   const vertexShader = `
//   uniform float amplitude;
//   uniform float frequency;
//   uniform float frequencyY;
//   uniform float amplitudeY;
//   uniform float speed;
//   uniform float time;

//   varying vec3 vColor;

//   void main() {
//     vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
//     gl_Position = projectionMatrix * mvPosition;

//     float t = time * speed;
//     float x = sin(position.x * frequencyY + t) * amplitudeY * 3.0;
//     float y = sin(position.y * frequency *  + t) * amplitude;
//     float z = sin(position.z * frequency + t) * amplitude;

//     gl_PointSize = ${pointSize.toFixed(1)};

//     // Scale the x, y, and z coordinates to ensure visibility of all points
//     gl_Position.x += x * 0.1;
//     gl_Position.y += y * 0.1;
//     gl_Position.z += z * 0.1;

//     // Interpolate colors based on the point's vertical position
//     float yPos = position.y + 2.5;
//     vec3 color1 = vec3(0.878, 0.671, 0.796); // E0ABCB
//     vec3 color2 = vec3(1.0, 0.949, 0.874); // FFF2DF
//     vColor = mix(color1, color2, yPos / 5.0);
//     }
//   `;

//   const fragmentShader = `
//   varying vec3 vColor;

//   void main() {
//     float radius = 0.5; // Radius of the circular point

//     // Calculate the distance of the fragment from the center of the point
//     float dist = length(gl_PointCoord - vec2(0.5, 0.5));

//     // If the distance is greater than the radius, discard the fragment
//     if (dist > radius) {
//       discard;
//     }

//     // Set the color of the fragment based on the point's color
//     gl_FragColor = vec4(vColor, 1.0);
//   }
//   `;

//   // Step 4: Create points object
//   const pointsMaterial = new THREE.ShaderMaterial({
//     vertexShader,
//     fragmentShader,
//     uniforms: {
//       amplitudeY: { value: amplitudeY },
//       frequencyY: { value: frequencyY },
//       amplitude: { value: amplitude },
//       frequency: { value: frequency },
//       speed: { value: speed },
//       time: { value: 0 },
//     },
//   });

//   const points = new THREE.Points(planeGeometry, pointsMaterial);

//   // Add points object to the scene
//   useFrame(({ clock }) => {
//     const time = clock.getElapsedTime();
//     pointsMaterial.uniforms.time.value = time;

//     const positions = planeGeometry.attributes.position.array;

//     for (let i = 0; i < positions.length; i += 3) {
//       const x = positions[i];
//       const y = positions[i + 1];
//       const z = Math.sin(y * frequency + time) * amplitude;

//       positions[i + 2] = z;
//     }

//     planeGeometry.attributes.position.needsUpdate = true;
//   });

//   return <primitive ref={planeRef} object={points} />;
// };
// // Usage in your React Three Fiber scene component
// export const AiCommunication = () => {
//   return (
//     <>
//     <OrbitControls enableDamping />
//     <mesh rotation={[10,20,0]}>
//       <WavingPlane />
//     </mesh>
//     </>
//   );
// };