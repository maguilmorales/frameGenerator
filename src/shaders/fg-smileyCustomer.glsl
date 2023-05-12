varying vec2 vUv;
uniform float u_time;
uniform float valueY;
uniform sampler2D u_textureSmileyLinePurple;

void main() {
  float time = u_time;

  vec2 uv = vUv;
  vec2 repeat = vec2(1.0, valueY);
  uv = fract(uv * repeat);
  
  vec4 color = texture2D(u_textureSmileyLinePurple, uv);
  
  gl_FragColor = color;
}