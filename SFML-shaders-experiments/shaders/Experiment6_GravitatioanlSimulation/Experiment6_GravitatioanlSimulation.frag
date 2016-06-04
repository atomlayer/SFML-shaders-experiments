uniform sampler2D texture;
uniform sampler2D texture2;
uniform float time;
uniform vec2 resolution;


varying vec2 center;

void main( void ) 
{
	vec2 p = gl_FragCoord.xy-resolution/2.0;

	vec4 pixel = texture2D(texture2, vec2(0.0,0.0));
	
	float color=(10.6)/length(p+100.0*pixel.xy); 
	gl_FragColor = vec4(color);
}