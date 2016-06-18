uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 

void main( void ) {

	vec2 p =  gl_FragCoord.xy -resolution/2.0;

	p*=0.005;
	
	

	float xx = 0.0;
	
	float k = time*.07;

	xx+=1.0/(sin(p.x*time)+cos(p.y*time)/*+length(p)*/); 

	

	vec4 color = vec4( xx,xx*0.4,0.0, 1.0 );
	
	
	vec2 coord = gl_TexCoord[0].st;
    vec4 backpixel = texture2D(texture, vec2(coord.x,1.0-coord.y));
	color = max(color,backpixel);

	color-=0.002;

	gl_FragColor = color;
}