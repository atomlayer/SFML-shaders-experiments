using SFML_shaders_experiments.Experiment4_BackBuffer;

namespace SFML_shaders_experiments
{
    class Program
    {
  
        static void Main(string[] args)
        {
            Game game =new Experiment4_BackBuffer_ProgramControl(RenderTo.Window);
            game.Run();
  
        }
    }
}
