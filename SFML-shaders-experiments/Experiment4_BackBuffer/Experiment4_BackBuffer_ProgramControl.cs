using System;
using System.Windows.Forms;
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments.Experiment4_BackBuffer
{
    class Experiment4_BackBuffer_ProgramControl : Game
    {
        public Experiment4_BackBuffer_ProgramControl(RenderTo render) 
            : base(1800, 1000, "Experiment4_BackBuffer_ProgramControl", Color.Blue,render)
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
            _texture = new Texture(Size.X, Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(Size.X, Size.Y));
            _rectangleShape.Texture = _texture;

            _shader = new Shader(@"shaders\VertexShader.vert",
                @"shaders\Experiment4_BackBuffer\programControl\BackBufferSnake3.frag");

            _shader.SetParameter("time", _time);
            _shader.SetParameter("resolution",new Vector2f(Size.X, Size.Y));
            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

            _backTexture = new RenderTexture(Size.X, Size.Y);

            _position = new Vector2f(Size.X/2.0f, Size.Y/2.0f);

        }


        private Vector2f _position;
        Vector2f _velosity = new Vector2f(1.5f,1.5f);
        Random  _random = new Random();


        public override void Update()
        {
            _shader.SetParameter("time", _time);
            _shader.SetParameter("texture",_backTexture.Texture);
            _shader.SetParameter("mouse",_position);
            _time += 0.005f;


            _position += new Vector2f(_velosity.X*(float)((_random.NextDouble()>0.5?-1:1)* _random.NextDouble()),
            _velosity.Y * (float)((_random.NextDouble() > 0.5 ? -1 : 1) * _random.NextDouble()));
            if (_position.X >= Size.X-100 || _position.X <=0)
                _velosity.X *= -1;
            if (_position.Y >= Size.Y-100 || _position.Y <=0)
                _velosity.Y *= -1;
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
