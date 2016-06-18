uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 



void main( void ) {

	vec2 p =  gl_FragCoord.xy -resolution/2.0-vec2(cos(mouse.x*time)*mouse.x,sin(time*mouse.y)*(resolution.y-mouse.y));

	float scale =1.0;

	p*=scale;


	vec4 color = vec4(0.0,0.0,0.0,1.0);

	for(float i=0.0;i<2.0;i+=0.05)
	{
		float xx=   1.0*sqrt(i)/length(vec2(p.x+20.0*i*sin(time*mouse.x)/cos(sin(time)),p.y+20.0*i*cos(time*mouse.y)));
		color+=vec4(fract(xx)*0.5,fract(xx)*0.5,0.0,1.0);
	}


	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(coord.x,1.0-coord.y));

	if(sin(mouse.x*mouse.y)>0.95)
	{
		backpixel.r-=0.007;
		backpixel.g-=0.002;
		backpixel.b-=0.002;
	}
	
	color = max(color,backpixel);


	gl_FragColor = color;
}

