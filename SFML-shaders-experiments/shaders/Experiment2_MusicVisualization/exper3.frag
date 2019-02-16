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


void main( void ) {

	vec2 pos = gl_FragCoord.xy-resolution/2.0;	
	
	pos*=0.0050*time1;

	const float pi = 3.14159;
	const float n = 27.;
	
	float radius = length(pos)*10. - 2.0 * cos(time3*time4 / 2.0) - 1.0;
	float t = atan(pos.y, pos.x)/pi;
	
	float brightness = 1.0;
	
	for (float i = 0.0; i < n; i++)
	{
	      brightness += 1./n /abs( (2.-2.*cos(1.-i/10.)) * sin((time1*time2*time3*time4*time5*10-0.5*cos(4.*time2+16.*radius))*(1.+sqrt(i*time1))/(pi)-10.0*pi*(t + i/n) ) - radius*time1*time2);
	}
	
	vec3 colorRGB = vec3(.2 ,.2, .6) * brightness;
	
	
	if(length(pos) > radius) colorRGB *= pow(  (length(pos)+1.6) / (radius+1.6)  ,  -1. );
	
	
	gl_FragColor = vec4(colorRGB / (colorRGB + 1.), 1.);
	
}