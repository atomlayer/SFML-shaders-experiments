uniform sampler2D texture;
uniform sampler2D texture2;
uniform float time;
uniform vec2 resolution;



void main( void ) 
{
	vec2 p = gl_FragCoord.xy-resolution*0.5;
	
	p*=0.07;
	
	float color = 0.0;
	
	for(float i=0;i<4;i++)
	{
		for (float j=0;j<4;j++)
		{
			vec4 pixel = texture2D(texture2, vec2(i,j));
			color+=(0.1/**sqrt(pixel.a)*/)/length(p+20.0*pixel.xy);
		}
	}
	gl_FragColor = vec4(color);
}