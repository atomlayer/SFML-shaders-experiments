uniform sampler2D texture;
uniform float time;
uniform vec2 resolution;


float sigmaFun(float x)
{
	return 1.0/(1.0+exp(-x));
}

vec4 colormap(float x){

	
	x*=5.05;
	vec4 color = vec4( smoothstep(0.0,1.0,1.0/x),  smoothstep(0.0,1.0,x*x), smoothstep(0.0,1.0,x),1.0);
	

	return color;	
}

float CalcZ_EquestionOfSauss(vec2 xy, float sigma)
{
	return  (1.0 / (2.0 * 3.14 * sigma)) * (dot(xy,xy) / 2.0 * sigma);
}

float Hash( vec2 p)
{
     vec3 p2 = vec3(p.xy,1.0);
    return fract(sin(dot(p2,vec3(37.1,61.7, 12.4)))*3758.5453123);
}

void main( void ) {

	vec2 p = gl_FragCoord.xy-resolution/2.0;	
	
	p*=2.0;
	
	vec4 color=vec4(0.0,0.0,0.0,1.0);
	
	float t =sigmaFun(sin(time));
	
	float x =0.0;
	
	
	float k=time*10000.0;
	
	

	
	for(int i =1;i<500;i++)
	{


			float r=cos(float(i)*k*cos(k))/cos(float(i)/k);
			
		//float r =float(i)*0.01*cos(time);
		
		
			float y=r*sin(float(i)*0.01*sin(time));
    			float x=r*cos(float(i)*0.01*cos(time));
			
			color+=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5));

		
		 k+=0.001;
	}
	

	
	for(int i =1;i<500;i++)
	{


			float r=cos(float(i)*time)/cos(float(i)/k);
			
		//float r =float(i)*0.01*cos(time);
		
		
			float y=r*sin(float(i)*0.01*sin(time));
    			float x=r*cos(float(i)*0.01*cos(time));
			
			color+=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5));

		
		 k+=0.01;
	}
	
	

	
	for(int i =1;i<500;i++)
	{


			float r=float(i)*0.01*sin(time);
			
			float y=r*sin(float(i)*0.01*cos(time));
    			float x=r*cos(float(i)*0.01*sin(time));
			
			color+=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*sigmaFun(cos(time))*vec2(x,y),100.5));
		
		 k+=0.001;
	}
	
	
	color.r=sin(color.r*sin(time));
	
	color.g=0.01;
	
	//color.r=0.01;
	
	color.b=0.01;
	
	gl_FragColor = color;

}
