uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 



void main( void ) {

	vec2 p =  gl_FragCoord.xy -vec2(mouse.x,resolution.y-mouse.y);

	float scale =0.5;

	p*=scale;


	vec4 color = vec4(0.0,0.0,0.0,1.0);

	for(float i=0.0;i<2.0;i+=0.05)
	{
		float xx=   1.6*sqrt(i)/length(vec2(p.x+100.0*i*sin(time*i),p.y+100.0*i*cos(time*i)*sin(time)));
		color+=vec4(sin(xx*i),cos(xx*xx*i),sin(xx*i)*cos(xx),1.0);
	}


	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(coord.x,1.0-coord.y));

	color = max(color,backpixel);


	color-=0.02;

	gl_FragColor = color;
}