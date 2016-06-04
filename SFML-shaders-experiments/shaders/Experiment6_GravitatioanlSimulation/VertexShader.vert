
varying vec2 center;

void main()
{
    gl_Position = ftransform();
	gl_TexCoord[0] = gl_TextureMatrix[0] * gl_MultiTexCoord0;
	gl_PointSize = 10.0 ;
	
	center = gl_Position.xy;
}