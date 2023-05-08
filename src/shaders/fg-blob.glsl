varying vec2 vUv;
uniform float u_time;
uniform sampler2D u_textureGradientMap;
const vec3 color1 = vec3(0.96, 0, 0.98); // F400F9
const vec3 color2 = vec3(0.49, 0.32, 1); // 7C52FF

float rand(vec2 n) {
  return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 n) {
  const vec2 d = vec2(0.0, 1.0);
  vec2 b = floor(n), f = smoothstep(vec2(0.0), vec2(1.0), fract(n));
  return mix(mix(rand(b), rand(b + d.yx), f.x), mix(rand(b + d.xy), rand(b + d.yy), f.x), f.y);
}

void main() {
  float time = u_time;
  float noiseValue = noise(vUv * 10.0 + time * 0.1);
  vec3 color = mix(color1, color2, noiseValue);
  gl_FragColor = vec4(color, 1.0);
}
