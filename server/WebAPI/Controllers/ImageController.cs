using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Threading.Tasks;

namespace ServerAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    [EnableCors]
    public class ImagesController : ControllerBase
    {
        [HttpGet("{name}")]
        public ActionResult Get(String name)
        {
            var files = Directory.GetFiles(AppDomain.CurrentDomain.BaseDirectory.Substring(0,
                    AppDomain.CurrentDomain.BaseDirectory.LastIndexOf("Server") - 1) + "\\Data\\src\\images");
            foreach (var file in files)
            {
                if (file.Contains(name))
                {
                    return File(System.IO.File.ReadAllBytes(file), "image/jpeg");
                }
            }
            return null;
        }
    }
}