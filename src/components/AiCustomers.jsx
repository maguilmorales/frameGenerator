import React, { useRef, useMemo } from "react";
import * as THREE from "three";
import { Points, PointsMaterial } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fgGradientMap from "../shaders/fg-gradientMap.glsl";
import vertexShader from "../shaders/vertex.glsl";
import fgStars from "../shaders/fg-stars.glsl";
import fgGeometricShapesCom from "../shaders/fg-geometricShapesCom.glsl";
import fragmentWorld from "../shaders/unused/fragmentWorld.glsl";
import fgLogoCom from "../shaders/fg-logoCom.glsl";
import fgSmileyLinePink from "../shaders/fg-smileyLinePink.glsl";
import fgSmileyCustomer from "../shaders/fg-smileyCustomer.glsl";
import fgBlob from "../shaders/fg-blob.glsl";
import fgGradientMapOrange from "../shaders/fg-gradientMapOrange.glsl";
import fgLogoCustomers from "../shaders/fg-logoCustomers.glsl";
import fgWorld from "../shaders/unused/fragmentWorld.glsl";
import fragmentShader3 from "../shaders/fg-logoSpiral.glsl";
import fgGeometricShapes from "../shaders/fg-geometricShapes.glsl";
import fgSmileyCom from "../shaders/fg-smileyCom.glsl";
import { CylinderGeometry, DoubleSide } from "three";
import { ShapeGeometry, MeshStandardMaterial, ShaderMaterial, Shape, Vector2, CurvePath, CatmullRomCurve3, TubeGeometry, Mesh, MeshBasicMaterial  } from 'three';

export const AiCustomers = () => {

  const aiSalesPurple = useLoader(TextureLoader, "aiSalesPurple.jpg");
  const aiSalesPink = useLoader(TextureLoader, "aiSalesPink.jpg");
  const smileyLinePink = useLoader(TextureLoader, "smileyLinePink.jpg");
  const smileyLinePurple = useLoader(TextureLoader, "smileyLinePurple.jpg");
  const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");
  const gradientMap = useLoader(TextureLoader, "gradientMap.png");
  const gradientMapOrange = useLoader(TextureLoader, "gradientMapOrange.png");
  const geometricShapes = useLoader(TextureLoader, "geometricShapes.png");
  const squares = useLoader(TextureLoader, "galaxy.png");

  const meshTorus = useRef(null);
  const meshBox = useRef(null);
  const meshCircle = useRef(null);
  const meshCircle2 = useRef(null);
  const meshCircle4 = useRef(null);
  const meshTorusKnot = useRef(null);
  const meshTorus2 = useRef(null);
  const meshTorus9 = useRef(null);
  const meshTorus10 = useRef(null);
  const meshPoints4 = useRef(null);
  const meshCircle3 = useRef(null);
  const meshTorusKnot2 = useRef(null);
  const meshPoints3 = useRef(null);
  const meshPoints = useRef();
  const meshPoints2 = useRef();
  const meshPoints10 = useRef();
  const meshPoints20 = useRef();

  const uniforms = {
    u_time: { value: 0.0 },
    u_intensity: { value: 0.3 },
    u_resolution: {
      value: new THREE.Vector2(window.innerWidth, window.innerHeight),
    },
    u_color1: { value: new THREE.Color("#9643FF") },
    u_color2: { value: new THREE.Color("#F9008E") },
    u_color3: { value: new THREE.Color("#FF7719") },
    u_color4: { value: new THREE.Color("#9FFF90") },
    valueY: { value: 10 },
    u_textureAiSalesPurple: { value: aiSalesPurple },
    u_textureAiSalesPink: { value: aiSalesPink },
    u_textureSmileyLinePink: { value: smileyLinePink },
    u_textureSmileyLinePurple: { value: smileyLinePurple },
    u_textureLogo: { value: dpLogo },
    u_textureGradientMap: { value: gradientMap },
    u_textureGradientMapOrange: { value: gradientMapOrange },
    u_textureGeometricShapes: { value: geometricShapes },
    u_textureSquares: { value: squares },
  };

  useFrame((state, delta) => {
    meshBox.current.material.uniforms.u_time.value += delta;
    meshBox.current.rotation.x += delta;
    meshBox.current.rotation.y += delta;
    meshBox.current.rotation.z += delta;
    meshTorusKnot.current.rotation.z += delta;
    meshTorusKnot2.current.rotation.z += delta;
    meshCircle.current.rotation.z += delta;
    meshCircle2.current.rotation.z += delta;
    meshCircle3.current.rotation.z += delta;
    meshCircle4.current.rotation.z += delta;
    meshPoints3.current.rotation.x += delta;
    meshPoints.current.rotation.x += delta;
    meshPoints.current.rotation.y += delta;
    meshPoints.current.rotation.z += delta;
    meshPoints2.current.rotation.x -= delta;
    meshPoints10.current.rotation.x -= delta;
    meshPoints10.current.rotation.y -= delta;
    meshPoints10.current.rotation.z -= delta;
    meshPoints2.current.rotation.y -= delta;
    meshPoints2.current.rotation.z -= delta;
    meshPoints4.current.rotation.z -= delta;
    meshTorus.current.rotation.x -= delta;
    meshTorus.current.rotation.y -= delta;
    meshTorus9.current.rotation.z += delta;
    meshTorus9.current.rotation.x += delta;
    meshTorus9.current.rotation.y += delta;
    meshTorus.current.rotation.z -= delta;
    meshTorus2.current.rotation.x -= delta;
    meshTorus2.current.rotation.y -= delta;
    meshTorus2.current.rotation.z -= delta;
    meshTorus10.current.rotation.z -= delta;
    meshTorus10.current.rotation.x -= delta;
    meshTorus10.current.rotation.y -= delta;
    meshPoints10.current.rotation.z -= delta;
    meshPoints20.current.rotation.z -= delta;
  });

  const Ribbon = () => {
    const meshRef = useRef();
  
    const numPoints = 100; // Number of points to define the ribbon
    const curveAmount = 0.05; // Amount of curve for the points
    const ribbonWidth = 0.5; // Width of the ribbon
    const textureSpeed = 2; // Speed factor for texture movement
    const textureAmplitude = 0.1; // Amplitude of the texture movement
  
    // Create the path for the trefoil knot shape
    const path = [];
    for (let t = 0; t < numPoints; t++) {
      const k = (t / numPoints) * 2 * Math.PI;
      const x = Math.sin(3 * k) * 2;
      const y = Math.sin(2 * k) * 2;
      const z = Math.cos(3 * k) * 2;
      path.push(new THREE.Vector3(x, y, z));
    }
  
    // Connect the last point to the first point to close the shape
    path.push(path[0]);
  
    // Create the geometry by extruding a rectangular shape along the path
    const ribbonShape = new THREE.Shape([
      new THREE.Vector2(-ribbonWidth / 2, 0),
      new THREE.Vector2(ribbonWidth / 2, 0),
      new THREE.Vector2(ribbonWidth / 2, curveAmount),
      new THREE.Vector2(-ribbonWidth / 2, curveAmount),
    ]);
  
    const ribbonGeometry = new THREE.ExtrudeGeometry(ribbonShape, {
      steps: numPoints,
      extrudePath: new THREE.CatmullRomCurve3(path),
      bevelEnabled: false,
    });
  
    // Calculate texture coordinates based on vertex positions with car-on-a-rollercoaster effect
    const vertices = ribbonGeometry.getAttribute("position");
    const uvs = [];
    for (let i = 0; i < vertices.count; i++) {
      const vertex = new THREE.Vector3().fromBufferAttribute(vertices, i);
      const u = (vertex.x + ribbonWidth / 2) / ribbonWidth; // Normalize x position to range [0, 1]
      const v = (vertex.y / curveAmount + Math.sin(vertex.y * textureSpeed) * textureAmplitude) % 1; // Calculate y position with sine wave function and wrap it between [0, 1]
      uvs.push(u, v);
    }
    ribbonGeometry.setAttribute("uv", new THREE.Float32BufferAttribute(uvs, 2));
  
    // Create the material
    const ribbonMaterial = new THREE.ShaderMaterial({
      uniforms: {
        u_time: { value: 0 },
        u_texture: { value: smileyLinePink },
      },
      vertexShader: `
        uniform float u_time;
        varying vec2 vUv;
  
        void main() {
          vUv = uv;
          vec3 transformed = vec3(position);
          gl_Position = projectionMatrix * modelViewMatrix * vec4(transformed, 1.0);
        }
      `,
      fragmentShader: `
      varying vec2 vUv;
      uniform float u_time;
      uniform sampler2D u_texture;
      
      void main() {
        float time = u_time;
      
        vec2 uv = vUv;
        uv = fract(uv + vec2(time, 0.0));
        
        vec4 color = texture2D(u_texture, uv);
        
        gl_FragColor = color;
      }
      `,
    });
  
    useFrame((state, delta) => {
      if (meshRef.current) {
        // Rotate the ribbon
        // meshRef.current.rotation.y += 0.01;
        meshRef.current.material.u_time += delta  
      }
    });
  
    return (
      <mesh geometry={ribbonGeometry} material={ribbonMaterial} ref={meshRef}>
        {/* Add any additional properties or children */}
      </mesh>
    );
  };
  
const color = new THREE.Color('#9643FF')
  return (

    <>
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />
      <ambientLight intensity={1} />
      <Ribbon />
      <group position={[0, 10, 0]}>
      <mesh ref={meshCircle3} position={[-20, 0, 0]}>
      <circleGeometry args={[2, 50 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogoCustomers}
            vertexShader={vertexShader}
          />
      </mesh>

      <mesh ref={meshTorusKnot2} position={[20, 0, 0]}>
      <torusKnotGeometry args={[1, 0.8, 100, 100 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints10} position={[10, 0, 0]}>
        <sphereGeometry args={[4, 30, 30]} />
        <pointsMaterial color={"#9FFF90"} size={0.1} />
      </points>

      <mesh ref={meshTorus10} position={[0, 0, 0]}>
      <torusGeometry args={[2, 1, 100, 100 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMapOrange}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints4} position={[-10, 0, 0]}>
        <sphereGeometry args={[2, 10, 30]} />
        <pointsMaterial color={"#9FFF90"} size={0.1} />
      </points>
      </group>
      <group position={[0, 0, 0]}>
      <mesh ref={meshCircle4} position={[-20, 0, 0]}>
      <circleGeometry args={[4, 50 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgSmileyCustomer}
            vertexShader={vertexShader}
          />
      </mesh>

      <mesh ref={meshBox} position={[-10, 0, 0]}>
      <boxGeometry args={[4, 4, 4 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogoCom}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints20} position={[0, 0, 0]}>
        <sphereGeometry args={[4, 30, 30]} />
        <pointsMaterial color={"#9643FF"} size={0.1} />
      </points>

      <mesh ref={meshTorus} position={[10, 0, 0]}>
      <torusGeometry args={[2, 1, 100, 100 ]} />
      <meshNormalMaterial />
      </mesh>

      <points ref={meshPoints2} position={[20, 0, 0]}>
        <sphereGeometry args={[4, 10, 30]} />
        <pointsMaterial color={"#ffffff"} size={0.1} />
      </points>
      </group>
      <group position={[0, 20, 0]}>
      <mesh ref={meshCircle} position={[-20, 0, 0]}>
      <circleGeometry args={[4, 50 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMapOrange}
            vertexShader={vertexShader}
          />
      </mesh>

      <mesh ref={meshBox} position={[-10, 0, 0]}>
      <boxGeometry args={[4, 4, 4 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogoCom}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints} position={[0, 0, 0]}>
        <sphereGeometry args={[4, 30, 30]} />
        <pointsMaterial color={"#9643FF"} size={0.1} />
      </points>

      <mesh ref={meshTorus} position={[10, 0, 0]}>
      <torusGeometry args={[2, 1, 100, 100 ]} />
      <meshNormalMaterial />
      </mesh>

      <points ref={meshPoints2} position={[20, 0, 0]}>
        <sphereGeometry args={[4, 10, 30]} />
        <pointsMaterial color={"#ffffff"} size={0.1} />
      </points>
      </group>
      <group position={[0, -10, 0]}>
      <mesh ref={meshCircle} position={[-20, 0, 0]}>
      <circleGeometry args={[3, 50 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogoCustomers}
            vertexShader={vertexShader}
          />
      </mesh>

      <mesh ref={meshBox} position={[20, 0, 0]}>
      <boxGeometry args={[4, 4, 4 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgLogoCustomers}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints} position={[0, 0, 0]}>
        <sphereGeometry args={[2, 30, 30]} />
        <pointsMaterial color={"#F9008E"} size={0.1} />
      </points>

      <mesh ref={meshTorus9} position={[10, 0, 0]}>
      <torusGeometry args={[1, 0.5, 100, 100 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
          />
      </mesh>
     

      <points ref={meshPoints2} position={[-10, 0, 0]}>
        <sphereGeometry args={[4, 10, 30]} />
        <pointsMaterial color={"#ffffff"} size={0.1} />
      </points>
      </group>
      <group position={[0, -20, 0]}>
      <mesh ref={meshCircle2} position={[-20, 0, 0]}>
      <circleGeometry args={[4, 50 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMap}
            vertexShader={vertexShader}
          />
      </mesh>

      <mesh ref={meshTorusKnot} position={[-10, 0, 0]}>
      <torusKnotGeometry args={[2, 0.8, 100, 100 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgGradientMapOrange}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints3} position={[10, 0, 0]}>
        <sphereGeometry args={[4, 30, 30]} />
        <pointsMaterial color={"#FF7719"} size={0.1} />
      </points>

      <mesh ref={meshTorus2} position={[0, 0, 0]}>
      <torusGeometry args={[2, 1, 100, 100 ]} />
      <shaderMaterial
            uniforms={uniforms}
            fragmentShader={fgSmileyLinePink}
            vertexShader={vertexShader}
          />
      </mesh>

      <points ref={meshPoints4} position={[20, 0, 0]}>
        <sphereGeometry args={[2, 10, 30]} />
        <pointsMaterial color={"#9FFF90"} size={0.1} />
      </points>
      </group>

    </>
  );
};

// export const AiCustomers = () => {
//   const textureMap = useLoader(TextureLoader, "wb.jpg");
//   const textureWorld = useLoader(TextureLoader, "dp-star.png");
//   const textureLogo = useLoader(TextureLoader, "dp-logo.jpg");
//   const textureSmiley = useLoader(TextureLoader, "dp-smiley.png");
//   const textureAiBlack = useLoader(TextureLoader, "aiBlack.jpg");
//   const textureAiPurple = useLoader(TextureLoader, "aiPurple.jpg");
//   const textureWbPurple = useLoader(TextureLoader, "wb-purple.jpg");
//   const textureWbPink = useLoader(TextureLoader, "wb-pink.jpg");
//   const aiSalesPurple = useLoader(TextureLoader, "aiSalesPurple.jpg");
//   const aiSalesPink = useLoader(TextureLoader, "aiSalesPink.jpg");
//   const smileyLinePink = useLoader(TextureLoader, "smileyLinePink.jpg");
//   const smileyLinePurple = useLoader(TextureLoader, "smileyLinePurple.jpg");
//   const dpLogo = useLoader(TextureLoader, "dp-logo.jpg");
//   const gradientMap = useLoader(TextureLoader, "gradientCustomers.png");
//   const gradientMapOrange = useLoader(TextureLoader, "gradientMapOrange.png");
//   const geometricShapes = useLoader(TextureLoader, "geometricShapes.png");
//   const squares = useLoader(TextureLoader, "galaxy.png");
//   const aiContactCenter = useLoader(TextureLoader, "AiContactCenter.jpg");
//   const aiStars = useLoader(TextureLoader, "stars.png");

//   const uniforms = {
//     u_time: { value: 0.0 },
//     u_resolution: {
//       value: new THREE.Vector2(window.innerWidth, window.innerHeight),
//     },
//     u_color1: { value: new THREE.Color("#9643FF") }, //purple
//     u_color2: { value: new THREE.Color("#F9008E") }, //pink
//     u_color3: { value: new THREE.Color("#FF7719") }, //orange
//     u_color4: { value: new THREE.Color("#9FFF90") }, //green
//     u_texture: { value: textureMap },
//     u_textureStars: { value: aiStars },
//     u_textureWorld: { value: textureWorld },
//     u_textureSmiley: { value: textureSmiley },
//     u_textureAiPurple: { value: textureAiPurple },
//     u_textureAiSalesPurple: { value: aiSalesPurple },
//     u_textureAiSalesPink: { value: aiSalesPink },
//     u_textureSmileyLinePink: { value: smileyLinePink },
//     u_textureSmileyLinePurple: { value: smileyLinePurple },
//     u_textureLogo: { value: dpLogo },
//     u_textureGradientMap: { value: gradientMap },
//     u_textureGradientMapOrange: { value: gradientMapOrange },
//     u_textureGeometricShapes: { value: geometricShapes },
//     u_textureSquares: { value: squares },
//     u_textureSquares2: { value: squares },
//     u_textureAiContactCenter: { value: aiContactCenter },
//   };

//   const mesh = useRef(null);
//   const flower = useRef(null);
//   const star = useRef(null);
//   const mesh3 = useRef(null);
//   const mesh2 = useRef(null);
//   const geom2 = useRef(null);
//   const mesh5 = useRef(null);
//   const mesh6 = useRef(null);
//   const geom3 = useRef(null);
//   const geom = useRef(null);
//   const group1 = useRef(null);
//   const group2 = useRef(null);
//   const group3 = useRef(null);

//   useFrame((state, delta) => {
//     if (mesh.current && mesh.current.material && mesh.current.material.uniforms) {
//       mesh.current.material.uniforms.u_time.value += delta;
//     }
//     if (flower.current) {
//       flower.current.rotation.z -= delta;
//     }
//     if (star.current) {
//       star.current.rotation.z += delta;
//     }
//     if (geom2.current) {
//       geom2.current.rotation.z -= delta;
//     }
//     if (mesh2.current) {
//       mesh2.current.rotation.z -= delta;
//     }
//     if (mesh3.current) {
//       mesh3.current.rotation.z -= delta;
//     }
//     if (group1.current) {
//       group1.current.rotation.x += delta;
//     }
//     if (group2.current) {
//       group2.current.rotation.x -= delta;
//     }
//     if (group3.current) {
//       group3.current.rotation.x += delta;
//     }
//   });
  
//   const Star = () => {
//     const starShape = new Shape();
//     const radiusOuter = 2; // Outer radius of the star
//     const radiusInner = 1.5; // Inner radius of the star
//     const numPoints = 20; // Number of points on the star
    
//     // Create the star shape
//     for (let i = 0; i < numPoints * 2; i++) {
//       const radius = i % 2 === 0 ? radiusOuter : radiusInner;
//       const angle = (i * Math.PI) / numPoints - Math.PI / 2;
//       const x = Math.cos(angle) * radius;
//       const y = Math.sin(angle) * radius;
//       if (i === 0) {
//         starShape.moveTo(x, y);
//       } else {
//         starShape.lineTo(x, y);
//       }
//     }
    
//     // Create the star geometry
//     const starGeometry = new ShapeGeometry(starShape);
    
//     // Add other necessary code such as materials and rendering
//     const starMaterial = new MeshStandardMaterial({
//       color: '#D3BCFF',
//     });
    
//     return (
//       <mesh ref={star} geometry={starGeometry} material={starMaterial} position={[5, 0, 0]}>
//         {/* Add any additional properties or children */}
//       </mesh>
//     );
//   };
  
//   const Flower = () => {

//     const starShape = new THREE.Shape();
//     const numPoints = 10; // Number of points on the star
//     const outerRadius = 2; // Outer radius of the star
//     const innerRadius = 0.5; // Inner radius of the star
//     const curveAmount = 0.1; // Amount of curve for the points
  
//     for (let i = 0; i < numPoints * 2; i++) {
//       const radius = i % 2 === 0 ? outerRadius : innerRadius;
//       const angle = (i * Math.PI) / numPoints - Math.PI / 2;
//       const x = Math.cos(angle) * radius;
//       const y = Math.sin(angle) * radius;
//       if (i === 0) {
//         starShape.moveTo(x, y);
//       } else {
//         const controlPointX = Math.cos(angle) * (radius + curveAmount);
//         const controlPointY = Math.sin(angle) * (radius + curveAmount);
//         const pointX = Math.cos(angle) * radius;
//         const pointY = Math.sin(angle) * radius;
//         starShape.quadraticCurveTo(controlPointX, controlPointY, pointX, pointY);
//       }
//     }
  
//     const starGeometry = new THREE.ShapeGeometry(starShape);
//     const starMaterial = new THREE.ShaderMaterial({ 
//       uniforms: uniforms,
//       fragmentShader: fgGradientMapOrange,
//       vertexShader: vertexShader,
//       side: Dou
//      });
  
//     return <mesh ref={flower} geometry={starGeometry} material={starMaterial} position={[-5, 0, 0]}/>;
//   };

//   return (
//     <>
//      <ambientLight intensity={1} />
//       <OrbitControls enableDamping />
//       <color attach="background" args={["#000000"]} />
//       <group ref={group1}>
//       <mesh ref={mesh} position={[0, 0, 0]}>
//         <circleGeometry attach="geometry" args={[2, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgGradientMap}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <Star />
//       <Flower />
//       <mesh ref={mesh} position={[-9.5, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgLogoCustomers}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <mesh ref={geom} position={[9, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgWorld}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       </group >

//       <group ref={group2} position={[-5, 5, 0]}>
//       <mesh ref={mesh2} position={[0, 0, 0]}>
//         <circleGeometry attach="geometry" args={[2, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgBlob}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <Star />
//       <Flower />
//       <mesh ref={mesh3} position={[-9.5, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgLogoCustomers}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <mesh ref={geom2} position={[9, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgWorld}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       </group>

//       <group ref={group3} position={[5, -5, 0]}>
//       <mesh ref={mesh5} position={[0, 0, 0]}>
//         <circleGeometry attach="geometry" args={[2, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgGradientMap}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <Star />
//       <Flower />
//       <mesh ref={mesh6} position={[-9.5, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgLogoCustomers}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       <mesh ref={geom3} position={[9, 0, 0]}>
//         <circleGeometry attach="geometry" args={[1.5, 50]} />
//         <shaderMaterial
//           uniforms={uniforms}
//           fragmentShader={fgWorld}
//           vertexShader={vertexShader}
//           transparent={true}
//           side={DoubleSide}
//         />
//       </mesh>
//       </group>
//     </>
//   );
// };
