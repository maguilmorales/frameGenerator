import {
  OrbitControls,
  useFBO,
  Text,
  Text3D,
  SpotLight,
  RandomizedLight,
  RoundedBox,

} from "@react-three/drei";
import { Canvas, useFrame, useLoader } from "@react-three/fiber";
import { Leva, folder, useControls } from "leva";
import { useMemo, useRef } from "react";
import * as THREE from "three";
import { v4 as uuidv4 } from "uuid";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { TextureLoader } from "three/src/loaders/TextureLoader";

const loader = new FontLoader();
const font = loader.load(
  // resource URL
  "https://threejs.org/examples/fonts/gentilis_bold.typeface.json",

  // onLoad callback
  function (font) {
    // do something with the font
    console.log(font);
  },

  // onProgress callback
  function (xhr) {
    console.log((xhr.loaded / xhr.total) * 100 + "% loaded");
  },

  // onError callback
  function (err) {
    console.log("An error happened");
  }
);


export const Stack = () => {
    
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
            value: 0.5,
          },
          uChromaticAberration: {
            value: 0.6,
          },
          uSaturation: { value: 1.1 },
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

  const loader = new FontLoader();
  const matcapTexture = useLoader(TextureLoader, "matcap4.png");
  return (
    <>
      <color attach="background" args={["#000"]} />
      <ambientLight intensity={1} />
      <Text
        font={"/Archivo-Bold.ttf"}
        weight={"bold"}
        color={"white"}
        anchorX="center"
        anchorY="middle"
        fontSize={0.05}
        position={[0.8, 0, 0]}
      >
        The Good Ai
      </Text>

 


      <RoundedBox

        args={[6, 1.5, 6]} // Width, height, depth. Default is [1, 1, 1]
        radius={0.6} // Radius of the rounded corners. Default is 0.05
        smoothness={8} // The number of curve segments. Default is 4
        creaseAngle={0.4} // Smooth normals everywhere except faces that meet at an angle greater than the crease angle
      >
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
      </RoundedBox>
<mesh position={[0,0,5]}>
    <boxGeometry args={[5,5,5]}></boxGeometry>
    <meshNormalMaterial></meshNormalMaterial>
</mesh>

      <OrbitControls enableDamping />
    </>
  );
};
