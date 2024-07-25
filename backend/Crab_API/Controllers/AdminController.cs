using Crab_API.Models;
using Crab_API.Request;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AdminController : ControllerBase
    {
        private readonly AdminService _adminService;
        public AdminController(AdminService adminService)
        {
            _adminService = adminService;
        }
        [HttpGet]
        public async Task<List<Admin>> Get() =>
            await _adminService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Admin>> Get(string id)
        {
            var Admin = await _adminService.GetAsync(id);
            if (Admin == null)
            {
                return NotFound();
            }
            return Admin;
        }
        [HttpPost("GetAdminByEmail")]
        public async Task<ActionResult<Admin>> GetByEmail(EmailRequest emailRequest)
        {
            var admin = await _adminService.GetByEmail(emailRequest.Email);
            if (admin == null)
            {
                return NotFound();
            }
            return admin;
        }
        [HttpPost]
        public async Task<IActionResult> Post(Admin newAdmin)
        {
            await _adminService.CreateASync(newAdmin);
            return CreatedAtAction(nameof(Get), new { id = newAdmin.Id }, newAdmin);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Admin updatedAdmin)
        {
            var admin = await _adminService.GetAsync(id);
            if (admin == null)
            {
                return NotFound();
            }
            updatedAdmin.Id = admin.Id;
            await _adminService.UpdateAsync(id, updatedAdmin);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var admin = await _adminService.GetAsync(id);

            if (admin is null)
            {
                return NotFound();
            }

            await _adminService.RemoveAsync(id);

            return NoContent();
        }

    }
}
