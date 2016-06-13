uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 

void main( void ) {

	vec2 p =  gl_FragCoord.xy -resolution/8.0-mouse/2.0;
	
	float xx=0.0;
	
	for(float i=0.0;i<50.0;i+=0.4)
	{
		xx += 0.05*i/(length(p-vec2(5.0*i*sin(i*time),5.0*i*cos(i*time))));
	}
	
	

	vec4 color = vec4( xx,xx*0.4,0.0, 1.0 );
	
	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture, coord);
	
	color = max(color,backpixel);

	
	gl_FragColor = color;
}