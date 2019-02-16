uniform float time1;
uniform float time2;
uniform float time3;
uniform float time4;
uniform float time5;
uniform float time6;
uniform float time7;
uniform float time8;
uniform vec2 resolution;


float sigmaFun(float x)
{
	return 1.0/(1.0+exp(-x));
}

vec4 colormap(float x, float scale){

	
	x*=scale;
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
	
	p*=1.0;
	
	vec4 color=vec4(0.0,0.0,0.0,1.0);
	
	float t =sigmaFun(sin(time1));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time1);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}
	
	t =sigmaFun(cos(time2));
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t*sin(time2))/cos(float(i)/k);
			
			float y=r*sin(float(i))*sin(time2*float(i));
    			float x=r*cos(float(i))*sin(time2*float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) ,0.10*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}
	
	
	t =sigmaFun(cos(sin(time3)));
	
	for(int i =1;i<10;i++)
	{


			float r=cos(float(i)*t*cos(time3))/cos(float(i)/k);
			
			float y=r*sin(float(i))*Hash(vec2(t,float(i)));
    			float x=r*cos(float(i))*Hash(vec2(t,float(i)));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5), 0.056*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}
	
	
	float t =sigmaFun(sin(time4));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time4);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}

	
	float t =sigmaFun(sin(time5));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time5);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}


	float t =sigmaFun(sin(time6));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time6);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}


	float t =sigmaFun(sin(time7));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time7);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}


	float t =sigmaFun(sin(time8));
	
	float x =0.0;
	
	
	float k=t*10000.0;
	
	for(int i =1;i<10;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time8);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}


	//color.r=(color.r);
	
	color.g=color.r*0.5;
	
	//color.r=0.01;
	
	color.b=color.g*sigmaFun(sin(time1));
	
	gl_FragColor = color;
}