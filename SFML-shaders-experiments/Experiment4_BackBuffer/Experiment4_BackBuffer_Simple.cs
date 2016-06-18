using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments.Experiment4_BackBuffer
{
    class Experiment4_BackBuffer_Simple : Game
    {
        public Experiment4_BackBuffer_Simple(RenderTo render) 
            : base(1800, 1000, "Experiment4_BackBuffer_Simple", Color.Blue,render)
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
                @"shaders\Experiment4_BackBuffer\simple\BackBufferCheckerboard4.frag");

            _shader.SetParameter("time", _time);
            _shader.SetParameter("resolution",new Vector2f(Size.X, Size.Y));
            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

            _backTexture = new RenderTexture(Size.X, Size.Y);
        }

        

        public override void Update()
        {
            _shader.SetParameter("time", _time);
            _shader.SetParameter("texture",_backTexture.Texture);
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
