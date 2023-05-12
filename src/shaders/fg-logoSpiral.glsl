varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_textureLogo;

void main() {
  float time = u_time;

  vec2 uv = vUv;
  vec2 repeat = vec2(100.0, 1.0);
  uv = fract(uv * repeat);
  
  vec4 color = texture2D(u_textureLogo, uv);
  
  gl_FragColor = color;
}