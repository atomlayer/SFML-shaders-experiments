uniform float time;
uniform float time1;
uniform float time2;
uniform float time3;
uniform float time4;
uniform float time5;
uniform float time6;
uniform float time7;
uniform float time8;
uniform vec2 resolution;

float iTime = 0.0;
vec3  iResolution = vec3(0.0);

// --------[ Original ShaderToy begins here ]---------- //
vec4 calcLight(vec4 color, vec2 pos, vec2 coord) {
	return color * 0.04/distance(pos / iResolution.y, coord / iResolution.y);
}

void mainImage( out vec4 fragColor, in vec2 fragCoord )
{
    fragColor = vec4(0, 0, 0, 0);

    fragColor += calcLight(
        vec4(abs(cos(time1)), abs(sin(time1)), abs(sin(time1/2.0)), 0.5),
        vec2(abs(sin(time1/1.3)) * iResolution.x, 200.0 + 10.0 * sin(time1*12.0)),
        fragCoord
    );
 
}

void main( void ) {

	//vec2 pos = gl_FragCoord.xy-resolution/2.0;	
	
	//pos*=0.0050;

	
	iTime = time;
    iResolution = vec3(resolution, 0.0);

    mainImage(gl_FragColor, gl_FragCoord.xy);
    gl_FragColor.a = 1.0;
}