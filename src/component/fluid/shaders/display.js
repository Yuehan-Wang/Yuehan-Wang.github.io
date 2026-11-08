export default `
precision highp float;
precision mediump sampler2D;

varying vec2 vUv;
uniform sampler2D uTexture;

void main () {
  // Soft roll-off instead of hard clipping, so bright dye keeps its hue near the cursor.
  vec3 c = texture2D(uTexture, vUv).rgb;
  gl_FragColor = vec4(1.0 - exp(-c * 1.6), 1.0);
}
`
