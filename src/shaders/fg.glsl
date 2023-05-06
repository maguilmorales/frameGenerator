varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_textureLogo;

void main() {
  float time = u_time;

  vec2 uv = vUv; 
  vec4 color = texture2D(u_textureLogo, uv);
  
  gl_FragColor = color;
}