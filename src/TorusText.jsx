import { Suspense, useRef } from 'react'
import { Canvas, useFrame, useThree, useLoader } from "@react-three/fiber";
import { OrbitControls, Torus } from "@react-three/drei";
import fragmentShader from './shaders/fragment.glsl';
import vertexShader from './shaders/vertex.glsl';
import { TextureLoader } from "three/src/loaders/TextureLoader";



const TorusMesh = () => {
  const textureMap = useLoader(TextureLoader, 'dp-txt.png')

  const mat = [{
    uniforms: {
      uTime: { value: 0 },
      uTexture: { value: textureMap },
    },
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    transparent: true
  }]
  
  const meshRef = useRef(null);
  const materialRef = useRef(null);
  

  useFrame((state, delta) => {
    //meshRef.current.rotation.x += delta;
    materialRef.current.uniforms.uTime.value += delta
    // boxRef.current.rotation.y += delta;
  
  });

  return (
    <>
    <mesh ref={meshRef}>
      <torusGeometry args={[10, 3, 100, 100]} />
      {/* <meshStandardMaterial map={textureMap} /> */}
      <shaderMaterial ref={materialRef} args={mat}/>
    </mesh>
    </>
  )
}


function App() {

  const position = [0, 0, 30]

  return (
    <Canvas camera={{ position }}>
      <color attach="background" args={["#EAE5E7"]} />
      //<OrbitControls enableDamping />
      <ambientLight intensity={0.1} />
      <directionalLight color="red" position={[0, 0, 1]} />
      <TorusMesh />
    </Canvas>
  );
}

export default App;
