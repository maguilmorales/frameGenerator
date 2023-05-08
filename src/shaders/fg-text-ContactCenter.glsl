varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_textureAiContactCenter;

void main() {
  float time = u_time;

  vec2 uv = vUv;
  vec2 repeat = vec2(6.0, 1.0);
  uv = fract(uv * repeat + vec2(time*-0.1, 0.0));
  
  vec4 color = texture2D(u_textureAiContactCenter, uv);
  
  gl_FragColor = color;
}