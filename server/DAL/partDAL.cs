using NLog.Internal;
using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data;
using System.Data.SqlClient;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL
{
    public class partDAL
    {
        string connStrConf = ConfigurationManager.ConnectionStrings["ABCD"].ConnectionString;
        public DataTable GetAllParts(string rn = "")
        {
            using (SqlConnection connection = new SqlConnection(connStrConf))
            {
                SqlCommand command = rn != "" ?
                    new("select * from PartForOther") :
                    new($"select * from PartForOther where PartStatus='{rn}'");

                command.Connection = connection;
                SqlDataAdapter adapter = new SqlDataAdapter();
                adapter.SelectCommand = command;
                DataTable dtParts = new DataTable();
                adapter.Fill(dtParts);

                return dtParts;
            }
        }
    }
}
