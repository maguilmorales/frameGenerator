uniform float u_time;
uniform vec2 u_resolution;
uniform vec3 u_color1;
uniform vec3 u_color3;
varying vec2 vUv;

float random (vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
}

float noise (vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);
    vec2 u = f * f * (3.0 - 2.0 * f);

    return mix(mix(random(i + vec2(0.0, 0.0)), 
                    random(i + vec2(1.0, 0.0)), u.x),
               mix(random(i + vec2(0.0, 1.0)), 
                    random(i + vec2(1.0, 1.0)), u.x), u.y);
}

void main() {
    vec2 st = vUv;
    vec3 color = mix(u_color1, u_color3, st.x);

    float noiseValue = noise(vec2(st.y + u_time * 1.5, 0.0));
    color = mix(color, u_color1, noiseValue);

    gl_FragColor = vec4(color, 1.0);
}
