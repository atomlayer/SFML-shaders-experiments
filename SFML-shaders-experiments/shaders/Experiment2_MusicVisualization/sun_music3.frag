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


vec4 Sun(float time, vec2 p, vec4 color)
{
	float t =sigmaFun(sin(time));
	
	float x =0.0;
	
	
	float k=t*10.0;
	
	for(int i =1;i<5;i++)
	{


			float r=sin(float(i)*t)/cos(float(i)/k)*sin(time);
			
			float y=r*sin(float(i));
    			float x=r*cos(float(i));
			
			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5*t+200.0*t*vec2(x,y),100.5) , 0.01*float(i));
			color+=color_new;
		

		
		 k+=0.001;
	}
	

	
	
	
	//color.r=(color.r);
	
	color.g=color.r*0.5;
	
	return color;
}






void main( void ) {

	vec2 p = gl_FragCoord.xy-resolution/2.0;	
	
	p*=2.0;
	
	vec4 color=vec4(0.0,0.0,0.0,1.0);
	
	color = Sun(time1, p, color);
	color = Sun(time2, p, color);
	color = Sun(time3, p, color);
	color = Sun(time4, p, color);
	color = Sun(time5, p, color);
	color = Sun(time6, p, color);
	color = Sun(time7, p, color);
	color = Sun(time8, p, color);
	 

	
	color.b=color.g*sigmaFun(sin(time1));
	
	gl_FragColor = color;
}