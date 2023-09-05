uniform sampler2D tDiffuse;

varying vec2 vUv;

void main()
{
    vec4 color = texture2D(tDiffuse, vUv);

    color.rgb += vec3(vUv, 1.0) * 0.1;
    gl_FragColor = color;
}