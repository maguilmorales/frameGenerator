// varying vec2 vUv;
// uniform float uTime;

// void main() {
//   vUv = uv;

//   float time = uTime;

//   //vec3 transformed = position;
//   //transformed.x += sin(position.z + time);

//   gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
// }



varying vec2 vUv;


void main(){
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position,1.0);
}

