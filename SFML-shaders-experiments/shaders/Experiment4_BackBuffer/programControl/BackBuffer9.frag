uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 



void main( void ) {

	vec2 p =  gl_FragCoord.xy -resolution/2.0-vec2(sin(time)*mouse.x,cos(time)*(resolution.y-mouse.y));

	float scale =1.5;

	p*=scale;


	vec4 color = vec4(0.0,0.0,0.0,1.0);

	for(float i=0.0;i<2.0;i+=0.05)
	{
		float xx=   1.6*sqrt(i)/length(vec2(p.x+100.0*i,p.y+100.0*i));
		color+=vec4(fract(xx)*0.5,fract(xx)*0.5,0.0,1.0);
	}


	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(coord.x,1.0-coord.y));

	color = max(color,backpixel);
	
	color-=0.02;
	color.g+=0.02;
	color.b+=0.02;
	

	gl_FragColor = color;
}