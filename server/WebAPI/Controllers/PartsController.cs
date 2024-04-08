using DAL;
using DAL.DbModels;
using Microsoft.AspNetCore.Mvc;
using DAL.DtoModels;

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
        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByCategory([FromQuery] int categoryId, [FromQuery] int userId)
        {
            return new BL.PartBL().GetPartsByCategory(categoryId, userId);
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("getPartByName")]
        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName([FromQuery] string name, [FromQuery] int categoryId, [FromQuery] int userId)
        {
            return new BL.PartBL().GetPartsByName(name, categoryId, userId);
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("getUserParts")]
        public IEnumerable<DAL.DbModels.PartForDevice> GetUSerParts([FromQuery] int userId)
        {
            return new BL.PartBL().GetUserParts(userId);
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("search")]
        public IEnumerable<DAL.DtoModels.PartDTO> FreeSearch([FromQuery] string searchStr)
        {
            return new BL.PartBL().FreeSearch(searchStr);
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

        public bool Post(IFormFile partImage)
        {
            return new BL.PartBL().SaveFile(partImage);
        }

        [HttpGet]
        [Route("getImages")]

        public PartImage[] GetImages()
        {
            return new BL.PartBL().GetPartImages();
        }

        // PUT api/<PartsController>/5
        [HttpPut]
        [Route("update")]
        public void update(PartDTO value)
        {
            new BL.PartBL().UpdatePart(value);
        }

        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            new BL.PartBL().remove(id);
        }


        [HttpPut("ChangeAvailability")]
        public void ChangeAvailaibility(int id)
        {
            new BL.PartBL().ChangePartAvailability(id);
        }
    }
}
