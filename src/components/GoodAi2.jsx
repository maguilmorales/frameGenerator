import {
  OrbitControls,
  useFBO,
  Text,
  Text3D,
  SpotLight,
  RandomizedLight,
  Instance,
  Instances

} from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Leva, folder, useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";

const range = (start, end, step = 1) => {
    let output = [];
    if (typeof end === "undefined") {
      end = start;
      start = 0;
    }
    for (let i = start; i <= end; i += step) {
      output.push(i);
    }
    return output;
  };



// position={[-0.2, 0.2, 0]} rotation={[0, 0, -2.8]}>

// const Sphere = () => {
//     const sphereMesh = useRef();

//     useFrame((state, delta) => {
//       //sphereMesh.current.rotation.x += delta;
//     });

//     return (
//       <mesh
//         ref={sphereMesh}
//         position={[-1.5, 0, -1]}
//       >
//         <sphereGeometry args={[0.8, 20, 20]} />
//         <meshNormalMaterial />
//       </mesh>
//     );
//   };

//   const Torus = () => {
//     const torusMesh = useRef();

//     // useFrame((state, delta) => {
//     //   torusMesh.current.rotation.y += delta;
//     // });

//     return (
//       <mesh
//         ref={torusMesh}
//         position={[0, 0.8, 0]}
//         rotation={[16, 0, 0]}
//       >
//         <torusGeometry args={[3, 0.35, 20, 100, 3]} />
//         <meshNormalMaterial side={THREE.DoubleSide} />
//       </mesh>
//     );
//   };

//   const TorusSmall = () => {
//     const torusSmallMesh = useRef();

//     useFrame((state, delta) => {
//       //torusSmallMesh.current.rotation.z -= delta;
//     });

//     return (
//       <mesh
//         ref={torusSmallMesh}
//         position={[1.5, 0, 0]}
//         rotation={[0, 0, -2]}
//       >
//         <torusGeometry args={[0.8, 0.3, 20, 100, 3]} />
//         <meshNormalMaterial side={THREE.DoubleSide} />
//       </mesh>
//     );
//   };

//   const SemiSphere = () => {
//     const semiSphereMesh = useRef();

//     useFrame((state, delta) => {
//       semiSphereMesh.current.rotation.y += delta;
//     });

//     const material = new THREE.MeshNormalMaterial();
//     const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
//     const verts = sphereGeom.attributes.position.array;
//     for (let i = 0; i < verts.length; i += 3) {
//       if (verts[i + 1] < 0) verts[i + 1] = 0;
//     }

//     return (
//       <mesh
//         ref={semiSphereMesh}
//         position={[0, -3.3, 0]}
//         geometry={sphereGeom}
//         material={material}
//       />
//     );
//   };

const Cylinder = ({ position, rotation }) => {
  const cylinderMesh = useRef();

  useFrame((state, delta) => {
    cylinderMesh.current.rotation.y += delta;
    cylinderMesh.current.rotation.x += delta;
    cylinderMesh.current.rotation.z += delta;
  });

  return (
    <mesh ref={cylinderMesh} position={position} rotation={rotation}>
      <cylinderGeometry args={[0.3, 0.3, 4, 20, 5]} />
      <meshNormalMaterial side={THREE.DoubleSide} />
    </mesh>
  );
};

const Geometries = ({ position, rotation, radius }) => {
  // This reference gives us direct access to our mesh
  const mesh = useRef();
  const part = useRef();
  const backgroundGroup = useRef();

  // This is our main render target where we'll render and store the scene as a texture
  const mainRenderTarget = useFBO();
  const backRenderTarget = useFBO();

  const {
    light,
    shininess,
    diffuseness,
    fresnelPower,
    iorR,
    iorY,
    iorG,
    iorC,
    iorB,
    iorP,
    saturation,
    chromaticAberration,
    refraction,
  } = useControls({
    light: {
      value: new THREE.Vector3(-1.0, 1.0, 1.0),
    },
    diffuseness: {
      value: 0.2,
    },
    shininess: {
      value: 15.0,
    },
    fresnelPower: {
      value: 8.0,
    },
    ior: folder({
      iorR: { min: 1.0, max: 2.333, step: 0.001, value: 1.15 },
      iorY: { min: 1.0, max: 2.333, step: 0.001, value: 1.16 },
      iorG: { min: 1.0, max: 2.333, step: 0.001, value: 1.18 },
      iorC: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorB: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
      iorP: { min: 1.0, max: 2.333, step: 0.001, value: 1.22 },
    }),
    saturation: { value: 1.0, min: 1, max: 1.25, step: 0.01 },
    chromaticAberration: {
      value: 0.07,
      min: 0,
      max: 1.5,
      step: 0.01,
    },
    refraction: {
      value: 0.25,
      min: 0,
      max: 1,
      step: 0.01,
    },
  });

  const uniforms = useMemo(
    () => ({
      uTexture: {
        value: null,
      },
      uIorR: { value: 1.0 },
      uIorY: { value: 1.0 },
      uIorG: { value: 1.0 },
      uIorC: { value: 1.0 },
      uIorB: { value: 1.0 },
      uIorP: { value: 1.0 },
      uRefractPower: {
        value: 0.2,
      },
      uChromaticAberration: {
        value: 1.0,
      },
      uSaturation: { value: 1.0 },
      uShininess: { value: 40.0 },
      uDiffuseness: { value: 0.2 },
      uFresnelPower: { value: 8.0 },
      uLight: {
        value: new THREE.Vector3(-1.0, 1.0, 1.0),
      },
      winResolution: {
        value: new THREE.Vector2(
          window.innerWidth,
          window.innerHeight
        ).multiplyScalar(Math.min(window.devicePixelRatio, 2)), // if DPR is 3 the shader glitches 🤷‍♂️
      },
    }),
    []
  );

  useFrame((state, delta) => {
    const { gl, scene, camera } = state;
    mesh.current.visible = false;

    mesh.current.material.uniforms.uDiffuseness.value = diffuseness;
    mesh.current.material.uniforms.uShininess.value = shininess;
    mesh.current.material.uniforms.uLight.value = new THREE.Vector3(
      light.x,
      light.y,
      light.z
    );
    mesh.current.material.uniforms.uFresnelPower.value = fresnelPower;

    mesh.current.material.uniforms.uIorR.value = iorR;
    mesh.current.material.uniforms.uIorY.value = iorY;
    mesh.current.material.uniforms.uIorG.value = iorG;
    mesh.current.material.uniforms.uIorC.value = iorC;
    mesh.current.material.uniforms.uIorB.value = iorB;
    mesh.current.material.uniforms.uIorP.value = iorP;

    mesh.current.material.uniforms.uSaturation.value = saturation;
    mesh.current.material.uniforms.uChromaticAberration.value =
      chromaticAberration;
    mesh.current.material.uniforms.uRefractPower.value = refraction;

    gl.setRenderTarget(backRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = backRenderTarget.texture;
    mesh.current.material.side = THREE.BackSide;

    mesh.current.visible = true;

    gl.setRenderTarget(mainRenderTarget);
    gl.render(scene, camera);

    mesh.current.material.uniforms.uTexture.value = mainRenderTarget.texture;
    mesh.current.material.side = THREE.FrontSide;

    gl.setRenderTarget(null);

    mesh.current.rotation.x += delta;
    mesh.current.rotation.y += delta;
  });
  const sphereGeom = new THREE.SphereGeometry(1, 32, 32);
  const verts = sphereGeom.attributes.position.array;
  for (let i = 0; i < verts.length; i += 3) {
    if (verts[i + 1] < 0) verts[i + 1] = 0;
  }

  return (
    <mesh ref={mesh} position={position} rotation={rotation}>
      <tetrahedronGeometry args={[radius, 0]} />
      <shaderMaterial
        key={uuidv4()}
        vertexShader={`
            varying vec3 worldNormal;
            varying vec3 eyeVector;
            
            void main() {
              vec4 worldPos = modelMatrix * vec4(position, 1.0);
              vec4 mvPosition = viewMatrix * worldPos;
            
              gl_Position = projectionMatrix * mvPosition;
            
              // vec3 transformedNormal = modelMatrix * normal;
              worldNormal = normalize(modelMatrix * vec4(normal, 0.0)).xyz;
              eyeVector =  normalize(worldPos.xyz - cameraPosition);
            }
            `}
        fragmentShader={`
            uniform float uIorR;
            uniform float uIorY;
            uniform float uIorG;
            uniform float uIorC;
            uniform float uIorB;
            uniform float uIorP;
            
            uniform float uSaturation;
            uniform float uChromaticAberration;
            uniform float uRefractPower;
            uniform float uFresnelPower;
            uniform float uShininess;
            uniform float uDiffuseness;
            uniform vec3 uLight;
            
            uniform vec2 winResolution;
            uniform sampler2D uTexture;
            
            varying vec3 worldNormal;
            varying vec3 eyeVector;
            
            vec3 sat(vec3 rgb, float adjustment) {
              const vec3 W = vec3(0.2125, 0.7154, 0.0721);
              vec3 intensity = vec3(dot(rgb, W));
              return mix(intensity, rgb, adjustment);
            }
            
            float fresnel(vec3 eyeVector, vec3 worldNormal, float power) {
              float fresnelFactor = abs(dot(eyeVector, worldNormal));
              float inversefresnelFactor = 1.0 - fresnelFactor;
              
              return pow(inversefresnelFactor, power);
            }
            
            float specular(vec3 light, float shininess, float diffuseness) {
              vec3 normal = worldNormal;
              vec3 lightVector = normalize(-light);
              vec3 halfVector = normalize(eyeVector + lightVector);
            
              float NdotL = dot(normal, lightVector);
              float NdotH =  dot(normal, halfVector);
              float kDiffuse = max(0.0, NdotL);
              float NdotH2 = NdotH * NdotH;
            
              float kSpecular = pow(NdotH2, shininess);
              return  kSpecular + kDiffuse * diffuseness;
            }
            
            const int LOOP = 16;
            
            void main() {
              float iorRatioRed = 1.0/uIorR;
              float iorRatioGreen = 1.0/uIorG;
              float iorRatioBlue = 1.0/uIorB;
            
              vec2 uv = gl_FragCoord.xy / winResolution.xy;
              vec3 normal = worldNormal;
              vec3 color = vec3(0.0);
            
              for ( int i = 0; i < LOOP; i ++ ) {
                float slide = float(i) / float(LOOP) * 0.1;
            
                vec3 refractVecR = refract(eyeVector, normal,(1.0/uIorR));
                vec3 refractVecY = refract(eyeVector, normal, (1.0/uIorY));
                vec3 refractVecG = refract(eyeVector, normal, (1.0/uIorG));
                vec3 refractVecC = refract(eyeVector, normal, (1.0/uIorC));
                vec3 refractVecB = refract(eyeVector, normal, (1.0/uIorB));
                vec3 refractVecP = refract(eyeVector, normal, (1.0/uIorP));
            
                float r = texture2D(uTexture, uv + refractVecR.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 0.5;
            
                float y = (texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 +
                            texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y * 2.0 -
                            texture2D(uTexture, uv + refractVecY.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z) / 6.0;
            
                float g = texture2D(uTexture, uv + refractVecG.xy * (uRefractPower + slide * 2.0) * uChromaticAberration).y * 0.5;
            
                float c = (texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).y * 2.0 +
                            texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).z * 2.0 -
                            texture2D(uTexture, uv + refractVecC.xy * (uRefractPower + slide * 2.5) * uChromaticAberration).x) / 6.0;
                      
                float b = texture2D(uTexture, uv + refractVecB.xy * (uRefractPower + slide * 3.0) * uChromaticAberration).z * 0.5;
            
                float p = (texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).z * 2.0 +
                            texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).x * 2.0 -
                            texture2D(uTexture, uv + refractVecP.xy * (uRefractPower + slide * 1.0) * uChromaticAberration).y) / 6.0;
            
                float R = r + (2.0*p + 2.0*y - c)/3.0;
                float G = g + (2.0*y + 2.0*c - p)/3.0;
                float B = b + (2.0*c + 2.0*p - y)/3.0;
            
                color.r += R;
                color.g += G;
                color.b += B;
            
                color = sat(color, uSaturation);
              }
            
              // Divide by the number of layers to normalize colors (rgb values can be worth up to the value of LOOP)
              color /= float( LOOP );
            
              // Specular
              float specularLight = specular(uLight, uShininess, uDiffuseness);
              color += specularLight;
            
              // Fresnel
              float f = fresnel(eyeVector, normal, uFresnelPower);
              color.rgb += f * vec3(1.0);
            
              gl_FragColor = vec4(color, 1.0);
            }
            `}
        uniforms={uniforms}
      />
    </mesh>
  );
};

const Particles = () => {
    const groupRef = useRef();
  
    useFrame((state, delta) => {
      const group = groupRef.current;
      group.rotation.y += delta * 0.2;
    });
  
    const createParticle = (index) => {
      const geometry = new THREE.SphereGeometry(0.1, 10, 10);
      const material = new THREE.MeshStandardMaterial({ color: 'hotpink' });
      const particle = new THREE.Mesh(geometry, material);
      particle.position.set(
        Math.random() - 0.5,
        Math.random() - 0.5,
        Math.random() - 0.5
      ).normalize();
      particle.position.multiplyScalar(20 + Math.random());
      particle.rotation.set(
        Math.random() * 2,
        Math.random() * 2,
        Math.random() * 2
      );
  
      return (
        <mesh
          key={index}
          geometry={particle.geometry}
          material={particle.material}
          position={particle.position}
          rotation={particle.rotation}
        />
      );
    };
  
    const particleCount = 500;
    const particles = Array.from(Array(particleCount).keys()).map((index) =>
      createParticle(index)
    );
  
    return <group ref={groupRef}>{particles}</group>;
  };
export const GoodAi2 = () => {
    const backgroundGroup = useRef();
    const columns = range(-15.5, 20.5, 5.5);
    const rows = range(-15.5, 20.5, 5.5);

const galaxy = useLoader(TextureLoader, "texture.jpg");

  return (
    <>
      <color attach="background" args={["black"]} />
      <ambientLight intensity={1} />


            {/* <group ref={backgroundGroup}>
        {columns.map((col, i) =>
          rows.map((row, j) => (
            <mesh position={[col, row, -4]}>
              <sphereGeometry args={[0.2, 20]} />
              <meshStandardMaterial color="white" />
            </mesh>
          ))
        )}
      </group> */}

<Particles/>

      <Geometries radius={2} />
      <Cylinder position={[-0.2, 0.2, 0]} rotation={[0, 0, -2.8]} />

      <Geometries position={[-5, 0, 0]} radius={1} />
      <Cylinder position={[-5, -0.2, 0]} rotation={[0, 0, 2.4]} />

      <Geometries position={[5, 0, 0]} radius={1.5} />
      <Cylinder position={[5, 0.2, 0]} rotation={[0, 0, -3.5]} />


<mesh position={[0, 0, -10]}>
    <planeGeometry args={[30,20]}/>
    <meshStandardMaterial map={galaxy}/>
</mesh>

        {/* <Text
          font={"/Archivo-Bold.ttf"}
          weight={"bold"}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5}
          position={[0, 0, -3]}
        >
          Ai emotional companion
        </Text>
        <Text
          font={"/Archivo-Bold.ttf"}
          weight={"bold"}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5}
          position={[0, 2, -3]}
        >
          Ai emotional companion
        </Text>
        <Text
          font={"/Archivo-Bold.ttf"}
          weight={"bold"}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5}
          position={[0, -2, -3]}
        >
          Ai emotional companion
        </Text>
        <Text
          font={"/Archivo-Bold.ttf"}
          weight={"bold"}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5}
          position={[0, -4, -3]}
        >
          Ai emotional companion
        </Text>
        <Text
          font={"/Archivo-Bold.ttf"}
          weight={"bold"}
          color={"white"}
          anchorX="center"
          anchorY="middle"
          fontSize={1.5}
          position={[0, 4, -3]}
        >
          Ai emotional companion
        </Text> */}

      <OrbitControls enableDamping />
    </>
  );
};
