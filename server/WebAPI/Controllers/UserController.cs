using BL;
using DAL.DbModels;
using Microsoft.AspNetCore.Mvc;

namespace WebAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        // GET: api/<PartsController>
        //[HttpGet]
        //public IEnumerable<DAL.DbModels.> Get()
        //{
        //    return new BL.PartBL().GetParts();
        //}
        //// GET api/<PartsController>/5
        //[HttpGet("{id}")]
        //public PartForDevice Get(int id)
        //{
        //    BL.PartBL part = new BL.PartBL();
        //    return part.GetParts().FirstOrDefault(i => i.PartForDeviceId == id);
        //}

        //// POST api/<PartsController>
        //[HttpPost]
        //public void Post([FromBody] DAL.DbModels.PartForDevice value)
        //{
        //    new BL.PartBL().AddPart(value);
        //}

        //// PUT api/<PartsController>/5
        //[HttpPut]
        //public void update(PartForDevice value)
        //{
        //    new BL.PartBL().UpdatePart(value);
        //}

        // DELETE api/<PartsController>/5
        //[HttpDelete("{id}")]
        //public void Delete(int id)
        //{
        //    new BL.PartBL().remove(id);
        //}

        //[HttpGet()]
        //[Route("login/{userName}/{password}")]
        //public User Login(string userName, string password)
        //{
        //    return UserBL.IsExistUserForLogin(userName, password);
        //}
        [HttpPost()]
        [Route("sign-up")]
        public StatusCodeResult SignUp([FromBody] DAL.DbModels.User newUser)
        {
            bool status = new BL.UserBL().SaveNewUser(newUser);
            if (status)
            {
                return StatusCode(200);
            }
            else { return StatusCode(500); }
        }

        [HttpPost()]
        [Route("update-user")]
        public bool UpdateUser([FromBody] DAL.DbModels.User existingUser)
        {
            return new BL.UserBL().UpdateExistingUser(existingUser);
        }

    }
}

