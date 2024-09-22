

// import { useMemo } from 'react';
// import * as THREE from 'three';
// import { Octahedron, OrbitControls } from '@react-three/drei';



// function Circle({ position, rotation }) {
//   return (
//     <mesh position={position} rotation={rotation}>
//       <circleGeometry args={[1, 32]} /> {/* Adjust the circle size */}
//       <meshBasicMaterial color="black"  />
//     </mesh>
    
//   );
// }

// function CirclesOnOctahedron() {
//   const { positions, rotations } = useMemo(() => {
//     const geometry = new THREE.OctahedronGeometry(2.4); // Radius of 1 for the octahedron
//     const vertices = geometry.attributes.position.array;
//     const faceCenters = [];
//     const faceRotations = [];

//     // Iterate through each face (grouped in triplets of vertices)
//     for (let i = 0; i < vertices.length; i += 9) {
//       // Get the three vertices of the face
//       const v1 = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
//       const v2 = new THREE.Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
//       const v3 = new THREE.Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

//       // Compute the face center (average of the three vertices)
//       const faceCenter = new THREE.Vector3()
//         .add(v1)
//         .add(v2)
//         .add(v3)
//         .divideScalar(3);
//       faceCenters.push(faceCenter);

//       // Calculate the normal for the face (for rotation)
//       const faceNormal = new THREE.Vector3()
//         .subVectors(v2, v1)
//         .cross(new THREE.Vector3().subVectors(v3, v1))
//         .normalize();

//       // Create a quaternion to rotate the circle to align with the face normal
//       const quaternion = new THREE.Quaternion().setFromUnitVectors(
//         new THREE.Vector3(0, 0, 1), // Default normal for flat circle
//         faceNormal
//       );

//       const rotationEuler = new THREE.Euler().setFromQuaternion(quaternion);
//       faceRotations.push(rotationEuler.toArray());
//     }

//     return { positions: faceCenters, rotations: faceRotations };
//   }, []);

//   return (
//     <>
    
//       {positions.map((pos, idx) => (
//         <Circle key={idx} position={pos} rotation={rotations[idx]} />
//       ))}
//     </>
//   );
// }


// export const Logo = () => {
//   return (
//     <>
    
//       <OrbitControls enableDamping />
//       <ambientLight intensity={1} /> {/* Adjust lighting */}
//       <CirclesOnOctahedron />
  
//     </>
//   );
// }




// GRADIENT



import { useMemo, useState, useEffect } from 'react';
import * as THREE from 'three';
import { OrbitControls } from '@react-three/drei';



function ExtrudedCircle({ position, rotation }) {
  // Define extrusion settings
  const extrudeSettings = { depth: 0.01, bevelEnabled: false }; // Adjust depth for extrusion

  // Define the shape of the circle
  const shape = useMemo(() => {
    const circleShape = new THREE.Shape();
    const radius = 0.5; // Adjust the circle size
    const segments = 100; // Increase the number of segments for smoother curvature
    circleShape.absarc(0, 0, radius, 0, Math.PI * 2, true, segments);
    return circleShape;
  }, []);

  return (
    
    <mesh position={position} rotation={rotation}>
      <extrudeGeometry args={[shape, extrudeSettings]} />
      <meshPhongMaterial color="0xffffff"  />
    </mesh>
  );
}

function CirclesOnOctahedron() {
  const { positions, rotations } = useMemo(() => {
    const geometry = new THREE.OctahedronGeometry(1.2); // Radius of 1 for the octahedron
    const vertices = geometry.attributes.position.array;
    const faceCenters = [];
    const faceRotations = [];

    // Iterate through each face (grouped in triplets of vertices)
    for (let i = 0; i < vertices.length; i += 9) {
      const v1 = new THREE.Vector3(vertices[i], vertices[i + 1], vertices[i + 2]);
      const v2 = new THREE.Vector3(vertices[i + 3], vertices[i + 4], vertices[i + 5]);
      const v3 = new THREE.Vector3(vertices[i + 6], vertices[i + 7], vertices[i + 8]);

      const faceCenter = new THREE.Vector3()
        .add(v1)
        .add(v2)
        .add(v3)
        .divideScalar(3);

      const faceNormal = new THREE.Vector3()
        .subVectors(v2, v1)
        .cross(new THREE.Vector3().subVectors(v3, v1))
        .normalize();

      faceCenters.push(faceCenter);

      const quaternion = new THREE.Quaternion().setFromUnitVectors(
        new THREE.Vector3(0, 0, 1), // Default normal for flat circle
        faceNormal
      );
      const rotationEuler = new THREE.Euler().setFromQuaternion(quaternion);
      faceRotations.push(rotationEuler.toArray());
    }

    const selectedIndices = [0, 1, 2, 3, 4, 5, 6, 7]; // Adjust which faces to use
    const selectedPositions = selectedIndices.map((index) => faceCenters[index]);
    const selectedRotations = selectedIndices.map((index) => faceRotations[index]);

    return { positions: selectedPositions, rotations: selectedRotations };
  }, []);

  return (
    <>
      {positions.map((pos, idx) => (
        <ExtrudedCircle key={idx} position={pos} rotation={rotations[idx]} />
      ))}
    </>
  );
}

export const Logo = () => {
  
  return (
    <>
      <OrbitControls enableDamping />
      {/* Adding fog to create a fading effect for distant objects */}
      <fog attach="fog" args={['#f9008e', 4, 6]} /> {/* Adjust the color and range */}
      
      <ambientLight intensity={10} />

        <CirclesOnOctahedron />
 
    </>
  );
}

