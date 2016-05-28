
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text.RegularExpressions;
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments
{
    class Experiment3_ArtificialSun : Game
    {
        public Experiment3_ArtificialSun(RenderTo render)
            : base(1920, 1080, "Experiment3_ArtificialSun", Color.Blue,render)
            //: base(500, 500, "Experiment3_ArtificialSun", Color.Blue, render)
        {

        }

        private Texture _texture;
        private RectangleShape _rectangleShape;

        private List<ShaderHolder> _shaderHolders;


        public override void Load()
        {

        }

        class ShaderHolder
        {
            public Shader Shader;

            public RenderStates RenderStates;

            public int LivedTime;

            public ShaderHolder(Shader shader, int livedTime, Texture texture, Game game)
            {
                Shader = shader;

                Shader.SetParameter("time", livedTime);
                Shader.SetParameter("resolution", new Vector2f(game.Size.X, game.Size.Y));
                RenderStates = new RenderStates(Shader);
                RenderStates.Texture = texture;

                LivedTime = livedTime;
            }


        }

        public override void Initialize()
        {

            FrameRateLimit = 30;

            if(RenderTo==RenderTo.Window)
            window.SetFramerateLimit((uint)FrameRateLimit);


            _texture = new Texture(Size.X,Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(Size.X, Size.Y));
            _rectangleShape.Texture = _texture;

            int time = 100;

            
            Regex regex = new Regex(@"(\d+).frag");

            string directory = Directory.GetCurrentDirectory()+@"\shaders\Experiment3_ArtificialSun\";

            var files = Directory.GetFiles(directory)
                .Select(n => new
                {

                    id = Convert.ToInt32(regex.Match(n).Groups[1].Value),
                    fileName = n
                }).OrderBy(n => n.id);


            _shaderHolders = files.Select(n => new ShaderHolder
                (
                new Shader( Directory.GetCurrentDirectory() + @"\shaders\VertexShader.vert",
                n.fileName),
                (int) (time*FrameRateLimit/(float) files.Count()),
                _texture,
                this

                )).ToList();

        }

        private float _time;

        public override void Update()
        {
            if (_shaderHolders.Count > 0)
            {
                ShaderHolder shaderHolder = _shaderHolders.First();

                shaderHolder.Shader.SetParameter("time", _time);
                _time += 0.5f/FrameRateLimit;
                shaderHolder.LivedTime--;

                if (shaderHolder.LivedTime <= 0)
                {
                    _shaderHolders.Remove(shaderHolder);
                    _time = 0;
                }

            }
        }

        public override void Render()
        {
            if (_shaderHolders.Count > 0)
            {
                ShaderHolder shaderHolder = _shaderHolders.First();

                if (RenderTo == RenderTo.Window)
                    window.Draw(_rectangleShape, shaderHolder.RenderStates);
                else
                {
                    RenderTexture.Draw(_rectangleShape, shaderHolder.RenderStates);
                }
            }
        }
    }
}
