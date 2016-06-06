using System.Drawing;
using OpenTK;


namespace GravitatioanlSimulation.Models._2D
{
    class Model2D
    {
        public Vector2[] r;
        public Vector2[] v;

        public Vector2[] r_temp;
        public Vector2[] v_temp;

        public float[] m;
        public Color[] color;

        public float G = (float)6.67e-10;
        public float dt = 0.1f;

        public int dimension;

        public Model2D(Vector2[] r, Vector2[] v, float[] m, Color[] color)
        {
            this.r = r;
            this.v = v;
            this.m = m;
            this.color = color;
            dimension = r.Length;
            r_temp = new Vector2[dimension];
            v_temp = new Vector2[dimension];
        }


        public void NextStep()
        {
            for (int i = 0; i < dimension; i++)
            {
                Vector2 sum = new Vector2();
                for (int j = 0; j < dimension; j++)
                {
                    if (i != j)
                    {
                        Vector2 rij = r[j] - r[i];
                        sum += (m[j] / rij.Length) * rij;
                    }
                }
                v_temp[i] = v[i] + G * dt * sum;
                r_temp[i] = r[i] + v[i] * dt;
            }

            for (int i = 0; i < dimension; i++)
            {
                v[i] = v_temp[i];
                r[i] = r_temp[i];
            }
        }
    }
}
