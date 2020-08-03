#ifdef GL_ES
precision mediump float;
#endif

#extension GL_OES_standard_derivatives : enable

uniform float time;
uniform vec2 mouse;
uniform vec2 resolution;

float segment(vec2 position, vec2 start_p, vec2 end_p)
{
	vec2 AP = position - start_p;
	vec2 AB = end_p - start_p;
	float h = clamp(dot(AP, AB) / dot(AB, AB), 0.0, 1.0);
	float seg = length(AP - AB * h);
	return seg;
}

#define MAX_ITERATION 10
float mandelbrot(vec2 c, out vec2 z)
{

	float count = 0.0;
	for (int i = 0; i < MAX_ITERATION; i++)
	{
		z = vec2((z.x*z.x - z.y*z.y), (2.0 * z.x * z.y)) + c;
		if (length(z) > 2.0) break;

		count += 1.0;
	}

	return (count / float(MAX_ITERATION));
}

void main( void ) {

	vec2 po = (( gl_FragCoord.xy / resolution.xy ) - vec2(0.5,0.5)) * 2.0;
	po.x = po.x*(resolution.x / resolution.y) - 0.5;

	vec2 z = po;

	float mb = 1.0;
	vec4 color = vec4(1.0);

	mb += mandelbrot(po, z);
	vec2 A = vec2(sin(time), cos(time))+z;
	mb += mandelbrot(po, z);
	vec2 B = vec2(0.1, 0.1)+z;

	float line_1 = segment(po, A,B);
	vec4 color_1 = color * 0.01 / line_1;
	gl_FragColor = color_1*mb;
}
