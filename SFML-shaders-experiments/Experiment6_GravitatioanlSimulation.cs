
using System.Drawing;
using System.Drawing.Imaging;
using System.IO;
using SFML.Graphics;
using SFML.System;
using Color = SFML.Graphics.Color;

namespace SFML_shaders_experiments
{
    class Experiment6_GravitatioanlSimulation : Game
    {
        public Experiment6_GravitatioanlSimulation(RenderTo render) 
            : base(1800, 1000, "Experiment6_GravitatioanlSimulation", Color.Blue,render)
        {

        }

        private Texture _texture;
        private RectangleShape _rectangleShape;

        private Shader _shader;

        private float _time;

        private RenderStates _rState;

        public override void Load()
        {

        }

        public override void Initialize()
        {
            _texture = new Texture(window.Size.X,window.Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(window.Size.X, window.Size.Y));
            _rectangleShape.Texture = _texture;

            _shader = new Shader(@"shaders\Experiment6_GravitatioanlSimulation\VertexShader.vert",
                @"shaders\Experiment6_GravitatioanlSimulation\Experiment6_GravitatioanlSimulation.frag");

            _shader.SetParameter("time", _time);
            _shader.SetParameter("resolution",new Vector2f(window.Size.X,window.Size.Y));
            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;
        }

        

        public override void Update()
        {
          
            _shader.SetParameter("time", _time);
            _shader.SetParameter("texture2", GetTexture());
            _time += 0.05f;
        }

        public byte[] ImageToByte(System.Drawing.Image img)
        {
            ImageConverter converter = new ImageConverter();
                return (byte[])converter.ConvertTo(img, typeof(byte[]));
        }


        Texture GetTexture()
        {
            Bitmap bitmap = new Bitmap(2, 2, PixelFormat.Format32bppArgb);

            System.Drawing.Color color = System.Drawing.Color.FromArgb(255, 127, 127, 127);

            bitmap.SetPixel(0, 0, color);
            bitmap.SetPixel(0, 1, color);
            bitmap.SetPixel(1, 0, color);
            bitmap.SetPixel(1, 1, color);

            return new Texture(ImageToByte(bitmap));
        }

        public override void Render()
        {

            


            window.Draw(_rectangleShape, _rState);


            /*if (RenderTo == RenderTo.Window)
                window.Draw(_rectangleShape, _rState);
            else
            {
                RenderTexture.Draw(_rectangleShape, _rState);
            }*/
        }
    }
}
