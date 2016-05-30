uniform float time;
uniform vec2 resolution;

float sphere(vec2 p, float r)
{
	float expressionUnderRoot=r*r - p.x*p.x - p.y*p.y;
	if (expressionUnderRoot<0.0)
    		return 0.0;
	else
    		return sqrt(expressionUnderRoot)/r;

}


vec4 colormap(float x){

	
	x*=0.5;
	if(x==0.0)
		return vec4(0.0,0.0,0.0,1.0);
	else
		return vec4( 1.0*x*x,  sin(x)*cos(x), 0.1*x,x);

}


void main( void ) {

	vec2 p = gl_FragCoord.xy-resolution/2.0;
	
	p*=1.0;
	

	vec4 color=vec4(0.0,0.0,0.0,1.0);

	float k=time*100.0;
	
	for(float i =1.0;i<10.0;i++)
	{


			float r=sin(i*k)/cos(i/k);
			
			float y=r*sin(i)*200.0;
    		float x=r*cos(i)*200.0;
			
			vec4 color_new=colormap(sphere(p-vec2(x,y),50.0));
			color+=color_new;
		

	}
	
	gl_FragColor = color;

}