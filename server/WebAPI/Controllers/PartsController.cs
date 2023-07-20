using DAL;
using DAL.DbModels;
using Microsoft.AspNetCore.Mvc;

//For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PartsController : ControllerBase
    {
        // GET: api/<PartsController>
        [HttpGet]
        public IEnumerable<DAL.DbModels.PartForDevice > Get()
        {
            return new BL.PartBL().GetParts();
        }

        // GET: api/<PartsController>
        [HttpGet]
        [Route("getPartByName")]
        public IEnumerable<DAL.DbModels.PartForDevice> GetPartsByName([FromQuery] string name)
        {
            return new BL.PartBL().GetPartsByName(name);
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
        public void Post([FromBody] DAL.DbModels.PartForDevice  value)
        {
              new BL.PartBL().AddPart(value);
        }

        // PUT api/<PartsController>/5
        [HttpPut]
        public void update(  PartForDevice value)
        {
            new BL.PartBL().UpdatePart( value);
        }

        // DELETE api/<PartsController>/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
            new BL.PartBL().remove(id);
        }
    }
}
