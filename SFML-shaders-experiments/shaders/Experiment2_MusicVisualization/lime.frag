uniform float time;
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
	return 1.0/(1.0+150.0*exp(-x));
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



void main( void ) {

	vec2 p = gl_FragCoord.xy-resolution/2.0;	
	
	p*=0.3;
	
	vec4 color=vec4(0.0,0.0,0.0,1.0);
	
	


	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(0.000,-10.0),10.0), 0.5*sigmaFun(time1));

	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(0.000,-10.0),100.0),0.5*sigmaFun(time2));
	

	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(10.0,10.00),100.0), 0.5*sigmaFun(time3));
	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(10.0,10.0),100.0), 0.5*sigmaFun(time4));
	


	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(-10.0,10.000),100.0), 0.5*sigmaFun(time4));


	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(-10.0,10.000),100.0), 0.5*sigmaFun(time5));
	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(10.0,0.0),100.0), .5*sigmaFun(time6));

	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(10.0,0.000),100.0), .5*sigmaFun(time7));
	
	color+=colormap(CalcZ_EquestionOfSauss(p+vec2(10,-10.00),100.0), 0.5*sigmaFun(time8));
	
	color.g-=0.9;

	color.b=0.0;
	
	gl_FragColor = color;
}