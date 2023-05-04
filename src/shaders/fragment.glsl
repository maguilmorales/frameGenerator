varying vec2 vUv;

void main() {


  vec2 uv = vUv;
  
  float strength = vUv.y * 10.0;
  vec4 color = vec4(strength,strength,strength, 1.0);
  
  gl_FragColor = color;
}


