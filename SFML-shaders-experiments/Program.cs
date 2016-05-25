using SFML.Graphics;
using SFML.System;
using SFML.Window;

namespace SFML_shaders_experiments
{
    class Program
    {
  
        static void Main(string[] args)
        {
            Game game = new Experiment2_MusicVisualization(RenderTo.Window);
            game.Run();
  
        }
    }
}
