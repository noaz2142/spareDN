namespace firstProj
{
    partial class Form1
    {
        /// <summary>
        ///  Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        ///  Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        ///  Required method for Designer support - do not modify
        ///  the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.ComponentModel.ComponentResourceManager resources = new System.ComponentModel.ComponentResourceManager(typeof(Form1));
            this.button1 = new System.Windows.Forms.Button();
            this.partName = new System.Windows.Forms.TextBox();
            this.status = new System.Windows.Forms.TextBox();
            this.price = new System.Windows.Forms.TextBox();
            this.date = new System.Windows.Forms.DateTimePicker();
            this.userId = new System.Windows.Forms.TextBox();
            this.label1 = new System.Windows.Forms.Label();
            this.SuspendLayout();
            // 
            // button1
            // 
            this.button1.Location = new System.Drawing.Point(181, 70);
            this.button1.Name = "button1";
            this.button1.Size = new System.Drawing.Size(177, 78);
            this.button1.TabIndex = 0;
            this.button1.Text = "addspare";
            this.button1.UseVisualStyleBackColor = true;
            this.button1.Click += new System.EventHandler(this.button1_Click);
            // 
            // partName
            // 
            this.partName.Location = new System.Drawing.Point(194, 209);
            this.partName.Name = "partName";
            this.partName.Size = new System.Drawing.Size(152, 23);
            this.partName.TabIndex = 1;
            this.partName.Text = "enter name of part";
            this.partName.TextChanged += new System.EventHandler(this.partName_TextChanged);
            // 
            // status
            // 
            this.status.Location = new System.Drawing.Point(194, 248);
            this.status.Name = "status";
            this.status.Size = new System.Drawing.Size(152, 23);
            this.status.TabIndex = 2;
            this.status.Text = resources.GetString("status.Text");
            // 
            // price
            // 
            this.price.Location = new System.Drawing.Point(194, 374);
            this.price.Name = "price";
            this.price.Size = new System.Drawing.Size(152, 23);
            this.price.TabIndex = 4;
            this.price.Text = "enter price";
            this.price.TextChanged += new System.EventHandler(this.price_TextChanged);
            // 
            // date
            // 
            this.date.Location = new System.Drawing.Point(194, 332);
            this.date.Name = "date";
            this.date.Size = new System.Drawing.Size(200, 23);
            this.date.TabIndex = 5;
            // 
            // userId
            // 
            this.userId.Location = new System.Drawing.Point(194, 288);
            this.userId.Name = "userId";
            this.userId.Size = new System.Drawing.Size(152, 23);
            this.userId.TabIndex = 6;
            this.userId.Text = "userId";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(382, 209);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(38, 15);
            this.label1.TabIndex = 7;
            this.label1.Text = "label1";
            this.label1.Click += new System.EventHandler(this.label1_Click);
            // 
            // Form1
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(7F, 15F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.ClientSize = new System.Drawing.Size(800, 450);
            this.Controls.Add(this.label1);
            this.Controls.Add(this.userId);
            this.Controls.Add(this.date);
            this.Controls.Add(this.price);
            this.Controls.Add(this.status);
            this.Controls.Add(this.partName);
            this.Controls.Add(this.button1);
            this.Name = "Form1";
            this.Text = "Form1";
            this.Load += new System.EventHandler(this.Form1_Load);
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private Button button1;
        private TextBox partName;
        private TextBox status;
        private TextBox price;
        private DateTimePicker date;
        private TextBox userId;
        private Label label1;
    }
}