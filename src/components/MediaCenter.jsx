import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { Points, PointsMaterial } from "three";
import { useFrame, useLoader } from "@react-three/fiber";
import { Cylinder, OrbitControls } from "@react-three/drei";
import { TextureLoader } from "three/src/loaders/TextureLoader";
import fgBasic from "../shaders/fg-basic.glsl";
import vertexShader from "../shaders/vertex.glsl";

import { CylinderGeometry, DoubleSide } from "three";

export const MediaCenter = () => {
    const textureMap = useLoader(TextureLoader, "pictures.png");
    const textureText = useLoader(TextureLoader, "text.png");

    return (
      <>
 
      <OrbitControls enableDamping />
      <color attach="background" args={["#000000"]} />



        <mesh>
        <primitive object={new CylinderGeometry(30, 30, 60, 60, 1, true)} />

          {/* Front Side */}
          <shaderMaterial
            side={THREE.DoubleSide}
            uniforms={{
              u_textureMap: { value: textureMap },
              u_textureText: { value: textureText},
              u_time: { value: 0.0},
            }}
            fragmentShader={ `varying vec2 vUv;
                uniform float u_time;
                uniform sampler2D u_textureMap;
                uniform sampler2D u_textureText;
            
      
                
                void main() {
                    gl_FragColor = gl_FrontFacing ? texture2D(u_textureMap, vUv) : texture2D(u_textureText, vUv);
                }
      `
            }
            vertexShader={vertexShader}
  />
  </mesh>
    
      </>
    );
  };
