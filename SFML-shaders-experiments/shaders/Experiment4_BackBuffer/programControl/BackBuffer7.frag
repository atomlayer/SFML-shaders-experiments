uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 

void main( void ) {

	vec2 p =  gl_FragCoord.xy -vec2(mouse.x,resolution.y-mouse.y);

	float scale =2.5;

	p*=scale;


	float xx = 0.0;

	for(float i=0.0;i<10.0;i+=0.1)
	{
		xx+=(1.6*sqrt(1))/length(vec2(p.x+100.0*i*sin(time),p.y+100.0*i*cos(time))); 
	}

	vec4 color = vec4( xx*0.3,xx*0.8,xx*0.3, 1.0 );
	
	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(coord.x,1.0-coord.y));

	color = max(color,backpixel);

	color.r+=0.002*sin(time);
	color.b-=0.002*sin(time);

	gl_FragColor = color;
}