attribute float aRandom;

uniform float uPixelRatio;
uniform float uTime;

varying vec2 vUv;
varying float vRandom;
varying float vProgress;

float progress;
float elevation;

void main()
{
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    progress = mod(uTime * 0.01 + aRandom, 0.1);

    modelPosition.z += progress;

    vec4 viewPosition = viewMatrix * modelPosition;

    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_PointSize = 10.0 * uPixelRatio * (aRandom + 1.0) * 2.0;
    gl_PointSize *= (1.0 / - viewPosition.z);

    gl_Position = projectedPosition;

    vUv = uv;
    vRandom = aRandom;
    vProgress = progress;
}