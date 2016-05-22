using System;
using System.Diagnostics;
using SFML.Graphics;
using SFML.System;
using SFML.Window;

namespace SFML_shaders_experiments
{
    abstract class Game 
    {
        public RenderWindow window;
        protected Color clearColor;

        public Vector2u Size;

        Stopwatch _stopwatch = new Stopwatch();


        public int FrameRateLimit = 60;

        public RenderTo RenderTo;

        protected Game(uint width, uint height, string title, Color clearColor, RenderTo renderTo)
        {
            Size = new Vector2u(width,height);
            this.window = new RenderWindow(new VideoMode(width, height), title, Styles.Resize);
            this.clearColor = clearColor;
            RenderTo = renderTo;
            window.SetActive(true);
            window.Position=new Vector2i(window.Position.X,0);
            window.SetFramerateLimit((uint)FrameRateLimit);
            // Set up events
            window.Closed += OnClosed;

            RenderTexture = new RenderTexture(window.Size.X, window.Size.Y);
        }

        public abstract void Initialize();

        public abstract void Update();

        public abstract void Render();


        public RenderTexture RenderTexture;

        private int _index;

        public void Run()
        {
            Initialize();

            _stopwatch.Start();

            while (window.IsOpen)
            {
                window.DispatchEvents();
                Update();

                if (RenderTo == RenderTo.Window)
                {
                    window.Clear(clearColor);
                    Render();
                    window.Display();
                }
                else
                {
                    RenderTexture.Clear(Color.Blue);
                    Render();
                    RenderTexture.Texture.CopyToImage().SaveToFile($"data\\img{_index}.png");
                    RenderTexture.Display();
                }

                _index++;


                FPS = 1/(float)_stopwatch.ElapsedMilliseconds*1000;

                Console.WriteLine($"FPS {FPS:#.#}   count = {_index}");

                _stopwatch.Restart();
            }
        }


        public float FPS;


        private void OnClosed(object sender, EventArgs e)
        {
            window.Close();
        }

    }


    enum RenderTo
    {
        Window, Image
    }
}


