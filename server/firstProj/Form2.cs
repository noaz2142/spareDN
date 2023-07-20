using BL;
using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.Data;
using System.Drawing;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Windows.Forms;

namespace FirstProj
{
    public partial class Form2 : Form
    {
        DataTable currentData;
        public Form2()
        {
            InitializeComponent();
        }



        private void Form2_Load(object sender, EventArgs e)
        {
            try
            {
                currentData = (DataTable)new PartBL().GetParts();
                dataGridView1.DataSource = currentData;
            }
            catch (Exception)
            {
                MessageBox.Show("ארעה שגיאה בשליפת הנתונים");
            }
        }
    }
}
