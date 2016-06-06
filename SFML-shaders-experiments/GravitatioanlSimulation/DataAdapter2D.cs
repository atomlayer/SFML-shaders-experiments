using System;
using System.Drawing;
using System.Drawing.Imaging;
using System.Linq;
using GravitatioanlSimulation.Models;
using GravitatioanlSimulation.Models._2D;
using SFML.Graphics;
using SFML.System;

namespace SFML_shaders_experiments.GravitatioanlSimulation
{
    class DataAdapter2D
    {
        private Model2D _model2D;

        private int[] _normalized_m;


        public DataAdapter2D(IModel2DGenerator model2DGenerator, Vector2f areaSize)
        {
            _model2D = model2DGenerator.Generate();
            AreaSize = areaSize;

            float max_m = _model2D.m.Max();
            float min_m = _model2D.m.Min();

            _normalized_m = _model2D.m.Select(n => (int)(GetPersentage(n, min_m, max_m)*255)).ToArray();
        }

        public Vector2f AreaSize;


        byte[] ImageToByte(System.Drawing.Image img)
        {
            ImageConverter converter = new ImageConverter();
            return (byte[])converter.ConvertTo(img, typeof(byte[]));
        }

        private void GetMinMaxPosition(out float min, out float max)
        {
            min = _model2D.r[0].X;
            max = _model2D.r[0].X;

            for (int i = 0; i < _model2D.m.Length; i++)
            {
                if (_model2D.r[i].X > AreaSize.X || _model2D.r[i].Y > AreaSize.Y)
                    continue;
                if (_model2D.r[i].X <= min)
                    min = _model2D.r[i].X;
                if (_model2D.r[i].Y <= min)
                    min = _model2D.r[i].Y;
                if (_model2D.r[i].X > max)
                    max = _model2D.r[i].X;
                if (_model2D.r[i].Y > max)
                    max = _model2D.r[i].Y;
            }
        }

        float GetPersentage(float x, float min, float max)
        {
            return (x - min)/(max - min);
        }

        public Texture GetTexture()
        {
            float min_xy, max_xy;
            GetMinMaxPosition(out min_xy, out max_xy);


            int sizeOfImage = _model2D.r.Length%2==0 ? (int)Math.Sqrt(_model2D.r.Length) : (int)Math.Sqrt(_model2D.r.Length + 1);

            Bitmap bitmap = new Bitmap(sizeOfImage, sizeOfImage, PixelFormat.Format32bppArgb);

            int index = 0;

            int width = sizeOfImage;
            int height = _model2D.r.Length/sizeOfImage;

            for (int i = 0; i <width ; i++)
            {
                for (int j = 0; j < height; j++)
                {
                    float x_persentage = GetPersentage(_model2D.r[index].X, min_xy, max_xy);
                    float y_persentage = GetPersentage(_model2D.r[index].Y, min_xy, max_xy);

                    System.Drawing.Color color;
                    if (x_persentage >1 || y_persentage >1 || x_persentage < 0 || y_persentage < 0)
                         color= System.Drawing.Color.FromArgb(0, 0, 0, 0);
                    else
                        color = System.Drawing.Color.FromArgb(_normalized_m[index], 
                            (int)(x_persentage*255), (int)(y_persentage * 255), 0);

                    bitmap.SetPixel(i,j,color);

                    index++;
                }
            }

            return new Texture(ImageToByte(bitmap));
        }

        public void NextStep()
        {
            _model2D.NextStep();
        }
    }
}
