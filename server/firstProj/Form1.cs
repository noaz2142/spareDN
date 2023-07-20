namespace firstProj
{
    public partial class Form1 : Form
    {
        public Form1()
        {
            InitializeComponent();
        }

        private void button1_Click(object sender, EventArgs e)
        {



            //DAL..PartBL p=new BL.PartBL() { 
                
            //};
           // { },'{status}',{ userId},'{dateTaken}',{ price})


            BL.PartBL bl=new BL.PartBL();
            DAL.DbModels.PartForDevice part = new();

            part.PartName = partName.Text;
            part.OriginalPrice = int.Parse(price.Text);

            bl.SaveNewPart(part);

            //int partN = int.Parse(partName.Text);
            //int USID = int.Parse(userId.Text);
            //DateTime dat = DateTime.Parse(date.Text);
            //DateTime sta = DateTime.Parse(status.Text);

            //bool b= bl.SaveNewPart ( partN, status.Text,USID, dat, pri);
            //MessageBox.Show(b.ToString());
        }

        private void partName_TextChanged(object sender, EventArgs e)
        {

        }

        private void price_TextChanged(object sender, EventArgs e)
        {

        }

        private void datefortaken_TextChanged(object sender, EventArgs e)
        {

        }

        private void Form1_Load(object sender, EventArgs e)
        {
            //DataGridView 
        }

        private void label1_Click(object sender, EventArgs e)
        {

        }
    }
}