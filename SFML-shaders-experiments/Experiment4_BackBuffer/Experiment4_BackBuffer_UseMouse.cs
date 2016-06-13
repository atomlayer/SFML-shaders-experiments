using System.Windows.Forms;
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments.Experiment4_BackBuffer
{
    class Experiment4_BackBuffer_UseMouse : Game
    {
        public Experiment4_BackBuffer_UseMouse(RenderTo render) 
            : base(1800, 1000, "Experiment4_BackBuffer_UseMouse", Color.Blue,render)
        {
        }

        private Texture _texture;
        private RectangleShape _rectangleShape;

        private Shader _shader;

        private float _time;

        private RenderStates _rState;


        private RenderTexture _backTexture;

        public override void Load()
        {

        }

        public override void Initialize()
        {
            _texture = new Texture(window.Size.X,window.Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(window.Size.X, window.Size.Y));
            _rectangleShape.Texture = _texture;

            _shader = new Shader(@"shaders\VertexShader.vert",
                @"shaders\Experiment4_BackBuffer\mouse\BackBuffer1.frag");

            _shader.SetParameter("time", _time);
            _shader.SetParameter("resolution",new Vector2f(window.Size.X,window.Size.Y));
            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

            _backTexture = new RenderTexture(window.Size.X, window.Size.Y);

        }

        

        public override void Update()
        {
            _shader.SetParameter("time", _time);
            _shader.SetParameter("texture",_backTexture.Texture);
            _shader.SetParameter("mouse",new Vector2f(Cursor.Position.X,Cursor.Position.Y));
            _time += 0.005f;
        }

        public override void Render()
        {
            if (RenderTo == RenderTo.Window)
            {
                window.Draw(_rectangleShape, _rState);
                _backTexture.Draw(_rectangleShape, _rState);
            }
            else
            {
                RenderTexture.Draw(_rectangleShape, _rState);
                _backTexture.Draw(_rectangleShape, _rState);
            }
        }
    }
}
