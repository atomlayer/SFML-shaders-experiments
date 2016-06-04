uniform sampler2D texture;
uniform float time;
uniform vec2 resolution;


varying vec2 center;

void main( void ) 
{
	vec2 p = gl_FragCoord.xy/*-resolution/2.0*/;

	float color=(1.6)/length(/*p+*/center); 
	gl_FragColor = vec4(color);
}