
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments
{
    class Experiment4_BackBuffer : Game
    {
        public Experiment4_BackBuffer(RenderTo render) 
            : base(1800, 1000, "Shader1 PolarPlot", Color.Blue,render)
        {
            RenderTo=RenderTo.Image;
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

            _shader = new Shader(@"shaders\VertexShader.vert",
                @"shaders\Experiment1_PolarPlot.frag");

            _shader.SetParameter("time", _time);
            _shader.SetParameter("resolution",new Vector2f(window.Size.X,window.Size.Y));
            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

        }

        

        public override void Update()
        {
            _shader.SetParameter("time", _time);
            _time += 0.05f;
        }

        public override void Render()
        {
            if(RenderTo == RenderTo.Window)
                window.Draw(_rectangleShape, _rState);
            else
            {
                RenderTexture.Draw(_rectangleShape, _rState);
            }
        }
    }
}
