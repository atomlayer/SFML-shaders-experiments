
using System;
using System.Collections.Generic;
using System.IO;
using System.Media;
using SFML.Graphics;
using SFML.System;
using Un4seen.Bass;

namespace SFML_shaders_experiments
{
    class Experiment2_MusicVisualization : Game
    {
        public Experiment2_MusicVisualization(RenderTo render) 
            : base(1000, 1000, "Shader1 PolarPlot", Color.Blue,render)
        {

        }

        private Texture _texture;
        private RectangleShape _rectangleShape;

        private Shader _shader;

        private RenderStates _rState;

        private List<short> _frames;

        //private SoundPlayer _soundPlayer;

        private int _soundhandler;


        public override void Load()
        {

            string musicFile = @"nightcore-poison.mp3";

            /*FileStream fileStream = new FileStream(musicFile, FileMode.Open);
            WaveData waveData = new WaveData(fileStream);

            int time = waveData.NumberOfFrames / waveData.BytesPerSecond;

            int countOfFrames = (int)(time / (1 / (float)FrameRateLimit));

            _frames = new List<short>(countOfFrames);

            int bias = waveData.NumberOfFrames/countOfFrames;

            for (int i = 0; i < waveData.NumberOfFrames; i+=bias)
            {
                _frames.Add(waveData.Samples[0][i]);
            }*/

   
            Bass.BASS_Init(-1, 44100, BASSInit.BASS_DEVICE_DEFAULT, IntPtr.Zero, System.Guid.Empty);
            _soundhandler = Bass.BASS_StreamCreateFile(musicFile, 0, 0, BASSFlag.BASS_SAMPLE_FLOAT);
            


            /*_soundPlayer = new SoundPlayer();

            _soundPlayer.SoundLocation =musicFile ;
            _soundPlayer.Load();*/

        }

        public override void Initialize()
        {

            Bass.BASS_ChannelPlay(_soundhandler, false);
            _texture = new Texture(window.Size.X,window.Size.Y);

            _rectangleShape = new RectangleShape(new Vector2f(window.Size.X, window.Size.Y));
            _rectangleShape.Texture = _texture;

            _shader = new Shader(@"shaders\VertexShader.vert",
                @"shaders\Experiment2_MusicVisualization\lime2.frag");
            
            _shader.SetParameter("time1", 0);
            _shader.SetParameter("time2", 0);
            _shader.SetParameter("time3", 0);
            _shader.SetParameter("time4", 0);
            _shader.SetParameter("time5", 0);
            _shader.SetParameter("time6", 0);
            _shader.SetParameter("time7", 0);
            _shader.SetParameter("time8", 0);
            _shader.SetParameter("resolution",new Vector2f(window.Size.X,window.Size.Y));

            _rState = new RenderStates(_shader);
            _rState.Texture = _texture;

            //_soundPlayer.Play();
        }

        float  time;

        public override void Update()
        {
            float[] buffer = new float[256];
            Bass.BASS_ChannelGetData(_soundhandler, buffer, (int)BASSData.BASS_DATA_FFT256);

            List<float> litleBuffer=new List<float>();

            int k = 0;
            float sum = 0;
            for (int i = 0; i < 256; i++)
            {
                k++;
                sum += Math.Abs(buffer[i]);
                if (k == 32)
                {
                    litleBuffer.Add(sum);
                    k = 0;
                    sum = 0;
                }
            }
            time+=0.005f;
            _shader.SetParameter("time", litleBuffer[0]);
            _shader.SetParameter("time1", litleBuffer[0]);
            _shader.SetParameter("time2", litleBuffer[1]);
            _shader.SetParameter("time3", litleBuffer[2]);
            _shader.SetParameter("time4", litleBuffer[3]);
            _shader.SetParameter("time5", litleBuffer[4]);
            _shader.SetParameter("time6", litleBuffer[5]);
            _shader.SetParameter("time7", litleBuffer[6]);
            _shader.SetParameter("time8", litleBuffer[7]);
            
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
