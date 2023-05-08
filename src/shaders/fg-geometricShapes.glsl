varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_textureGeometricShapes;

void main() {
  float time = u_time;

  vec2 uv = vUv;
  vec2 repeat = vec2(10.0, -1.0);
  uv = fract(uv * repeat + vec2(time*0.01, 0.0));
  vec4 color = texture2D(u_textureGeometricShapes, uv);
  
  gl_FragColor = color;
}