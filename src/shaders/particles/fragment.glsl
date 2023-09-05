varying vec2 vUv;
varying float vRandom;
varying float vProgress;

void main()
{
	//Normal circles
    vec2 xy = gl_PointCoord.xy - vec2(0.5);
    float ll = length(xy);
    float alpha = step(ll, 0.5);

	//Fading circles
	// float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
	// float alpha = 0.05 / distanceToCenter - 0.1;

    gl_FragColor = vec4(vec3(1.0), alpha);
}