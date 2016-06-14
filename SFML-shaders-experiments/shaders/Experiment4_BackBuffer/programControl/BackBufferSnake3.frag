uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 

void main( void ) {

	vec2 p =  gl_FragCoord.xy -vec2(mouse.x,resolution.y-mouse.y);

	float scale =0.05;

	p*=scale;


	float xx = 0.0;
	
	float k = time*.07;
	
	for(float i=0.0;i<7.0;i++)
	{
		float r=sin(i*k)/cos(i*k);
			
		float y=r*sin(i);
    		float x=r*cos(i);
		
		xx+=(1.6*sqrt(i))/length(vec2(p.x+10.0*i*x,p.y+10.0*i*y)); 
	}
	
	/*p =  gl_FragCoord.xy -vec2(mouse.x,resolution.y-mouse.y)*100.0*abs(sin(time));

	p*=scale;

	for(float i=0.0;i<10.0;i++)
	{
		float r=sin(i*k)/cos(i*k);
			
		float y=r*sin(i);
    		float x=r*cos(i);
		
		xx+=(1.6*sqrt(i))/length(vec2(p.x+10.0*i*x,p.y+10.0*i*y)); 
	}
	*/
	

	vec4 color = vec4( xx*0.1,xx*0.2,xx*0.5, 1.0 );
	
	
	vec2 coord = gl_TexCoord[0].st;
	
    vec4 backpixel = texture2D(texture,  vec2(1.0-coord.x,coord.y));
	
	color = max(color,backpixel);

	color-=0.002;
	
	gl_FragColor = color;
}