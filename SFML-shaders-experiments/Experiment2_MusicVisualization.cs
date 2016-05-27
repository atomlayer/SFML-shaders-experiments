
using System.Collections.Generic;
using System.IO;
using System.Media;
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments
{
    class Experiment2_MusicVisualization : Game
    {
        public Experiment2_MusicVisualization(RenderTo render) 
            : base(500, 500, "Shader1 PolarPlot", Color.Blue,render)
        {

        }

        private Texture _texture;
        private RectangleShape _rectangleShape;

        private Shader _shader;

        private RenderStates _rState;

        private List<short> _frames;

        private SoundPlayer _soundPlayer;

        public override void Load()
        {

            string musicFile = @"music\Kaguya's Theme - Lunatic Princess (1) (online-audio-converter.com).wav";

            FileStream fileStream = new FileStream(musicFile, FileMode.Open);
            WaveData waveData = new WaveData(fileStream);

            int time = waveData.NumberOfFrames / waveData.BytesPerSecond;

            int countOfFrames = (int)(time / (1 / (float)FrameRateLimit));

            _frames = new List<short>(countOfFrames);

            int bias = waveData.NumberOfFrames/countOfFrames;

            for (int i = 0; i < waveData.NumberOfFrames; i+=bias)
            {
                _frames.Add(waveData.Samples[0][i]);
            }


            _soundPlayer = new SoundPlayer();

            _soundPlayer.SoundLocation =musicFile ;
            _soundPlayer.Load();

        }

        public override void Initialize()
        {


            _texture = new Texture(window.Size.X,window.Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(window.Size.X, window.Size.Y));
            _rectangleShape.Texture = _texture;

            _shader = new Shader(@"shaders\VertexShader.vert",
                @"shaders\Experiment2_MusicVisualization.frag");

            _shader.SetParameter("frequency", 0);
            _shader.SetParameter("resolution",new Vector2f(window.Size.X,window.Size.Y));

  

            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

            _soundPlayer.Play();
        }

        private int index;

        public override void Update()
        {
            _shader.SetParameter("frequency", _frames[index]);
            index++;
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
