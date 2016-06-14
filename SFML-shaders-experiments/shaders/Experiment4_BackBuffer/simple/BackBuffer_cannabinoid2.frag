uniform float time;
uniform vec2 resolution;
uniform sampler2D texture;
uniform vec2 mouse; 


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

	vec2 p = gl_FragCoord.xy-resolution/2.0+vec2(0.0, resolution.y*0.3);	
	
	p*=5.5;
	
	vec4 color=vec4(0.0,0.0,0.0,1.0);
	
	float t =sigmaFun(sin(time))/sigmaFun(cos(time));
	
	float x =0.0;
	
	
	float k=time/log(time);
	
	for(int i =1;i<100;i++)
	{


			float r=(1.0+sin(float(i)))*(1.0+0.9*cos(8.0*float(i)))*(1.0+0.1*cos(24.0*float(i)))*(0.9+0.05*cos(200.0*float(i)));
			
			float y=-r*sin(float(i));;
    			float x=r*cos(float(i));


			//vec4 color_new=colormap(1.0/(length(p)), 0.019);


			vec4 color_new=colormap(CalcZ_EquestionOfSauss(p*0.5+200.0*t*vec2(x,y),100.5) , 0.39);
			color.g+=color_new.r*0.1;

	}
	
	color.r=0.01;
	color.b=0.01;

	vec2 coord = gl_TexCoord[0].st;
    vec4 backpixel = texture2D(texture, vec2(coord.x,1.0-coord.y));

	color = max(color,backpixel);

	gl_FragColor = color;
}