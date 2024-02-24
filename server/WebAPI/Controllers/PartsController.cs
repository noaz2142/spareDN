using DAL;
using DAL.DbModels;
using Microsoft.AspNetCore.Mvc;
using DTO;

//For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        // GET: api/<PartsController>
        [HttpGet]
        public IEnumerable<DAL.DbModels.PartForDevice> Get()
        {
            return new BL.PartBL().GetParts();
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("getCategoryList")]
        public IEnumerable<DAL.DbModels.Category> GetCategoryList()
        {
            return new BL.PartBL().GetCategoryList();
        }

        [HttpGet]
        [Route("getPartsByCategory")]
        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory([FromQuery] int categoryId)
        {
            return new BL.PartBL().GetPartsByCategory(categoryId);
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("getPartByName")]
        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName([FromQuery] string name, [FromQuery] int categoryId)
        {
            return new BL.PartBL().GetPartsByName(name, categoryId);
        }

        // GET api/<PartsController>/5
        [HttpGet("{id}")]
        public PartForDevice Get(int id)
        {
            BL.PartBL part = new BL.PartBL();
            return part.GetParts().FirstOrDefault(i => i.PartForDeviceId == id);
        }

        // POST api/<PartsController>
        [HttpPost]
        [Route("add")]

        public void Post([FromBody] DAL.DtoModels.PartDTO value)
        {
            new BL.PartBL().AddPart(value);
        }

        [HttpPost]
        [Route("upload")]

        public void Post(IFormFile partImage)
        {
            new BL.PartBL().SaveFile(partImage);
        }

        [HttpGet]
        [Route("getImages")]

        public PartImage[] GetImages()
        {
           return new BL.PartBL().GetPartImages();
        }

        // PUT api/<PartsController>/5
        [HttpPut]
        public void update(PartForDevice value)
        {
            new BL.PartBL().UpdatePart(value);
        }

        // DELETE api/<PartsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            new BL.PartBL().remove(id);
        }
    }
}
