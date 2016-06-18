uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 



void main( void ) {

	vec2 p =  gl_FragCoord.xy -resolution/2.0;

	float scale =0.005;

	p*=scale;

	p-=vec2(sin(time),cos(time));

	vec4 color = vec4(0.0,0.0,0.0,1.0);


	float xx= sin(length(p)*10.0);


	color+=vec4(xx*0.1,xx*0.6,xx*0.8,1.0);



	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(coord.x,1.0-coord.y));

	//if(sin(mouse.x*mouse.y)>0.95)
	{
		backpixel.r-=0.007;
		backpixel.g-=0.002;
		backpixel.b-=0.005;
	}
	
	color = max(color,backpixel);


	gl_FragColor = color;
}