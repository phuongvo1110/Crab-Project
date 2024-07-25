using Crab_API.DTOs;
using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly JwtConfig _jwtConfig;
        private readonly UserService _userService;
        private readonly CustomerService _customerService;
        private readonly DriverService _driverService;
        private readonly CallCenterAgentService _callCenterAgentService;
        private readonly AdminService _adminService;    
        public UserController(UserService userService, CustomerService customerService, DriverService driverService, CallCenterAgentService callCenterAgentService, AdminService adminService)
        {
            _userService = userService;
            _customerService = customerService;
            _callCenterAgentService = callCenterAgentService;
            _driverService = driverService;
            _adminService = adminService;
        }
        [HttpGet]
        public async Task<List<User>> Get() =>
            await _userService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<User>> Get(string id)
        {
            var User = await _userService.GetAsync(id);
            if (User == null)
            {
                return NotFound();
            }
            return User;
        }
        [HttpPost]
        public async Task<IActionResult> Post(User newUser)
        {
            await _userService.CreateASync(newUser);
            return CreatedAtAction(nameof(Get), new { id = newUser.Id }, newUser);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, User updatedAdmin)
        {
            var user = await _userService.GetAsync(id);
            if (user == null)
            {
                return NotFound();
            }
            updatedAdmin.Id = user.Id;
            await _userService.UpdateAsync(id, updatedAdmin);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var user = await _userService.GetAsync(id);

            if (user is null)
            {
                return NotFound();
            }

            await _userService.RemoveAsync(id);

            return NoContent();
        }
        [HttpPost("signup")]
        public async Task<IActionResult> SignUp(User newUser)
        {
            var checkUser = await _userService.GetByEmail(newUser.Email);
            if (checkUser != null)
            {
                return StatusCode(500, "This email has already been existed");
            }
            var user = await _userService.CreateASync(newUser);
            switch (user.RolePermission)
            {
                case Models.User.Role.CustomerRole:
                    Customer newCustomer = new Customer { 
                        Name = newUser.Name,
                        Email = user.Email,
                        RolePermission = user.RolePermission,
                        PhoneNumber = user.PhoneNumber,
                        PasswordHash = user.PasswordHash,
                        Password = user.Password
                    };
                    await _customerService.CreateASync(newCustomer);
                    break;
                case Models.User.Role.DriverRole:
                    Driver newDriver = new Driver
                    {
                        Name = newUser.Name,
                        Email = user.Email,
                        RolePermission = user.RolePermission,
                        PhoneNumber = user.PhoneNumber,
                        PasswordHash = user.PasswordHash,
                        Password = user.Password
                    };
                    await _driverService.CreateASync(newDriver);
                    break;
                case Models.User.Role.AdminRole:
                    Admin newAdmin = new Admin
                    {
                        Name = newUser.Name,
                        Email = user.Email,
                        RolePermission = user.RolePermission,
                        PhoneNumber = user.PhoneNumber,
                        PasswordHash = user.PasswordHash,
                        Password = user.Password
                    };
                    await _adminService.CreateASync(newAdmin);
                    break;
                case Models.User.Role.CallCenterAgentRole:
                    CallCenterAgent newAgent = new CallCenterAgent
                    {
                        Name = newUser.Name,
                        Email = user.Email,
                        RolePermission = user.RolePermission,
                        PhoneNumber = user.PhoneNumber,
                        PasswordHash = user.PasswordHash,
                        Password = user.Password
                    };
                    await _callCenterAgentService.CreateASync(newAgent);
                    break;

            }
            return CreatedAtAction(nameof(Get), new {id = newUser.Id}, newUser);
        }
        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] UserLoginDto userDto)
        {
            var user = await _userService.Authenticate(userDto.Email, userDto.Password);
            if (user == null)
            {
                return BadRequest(new { message = "Email or password is incorrect" });
            }
            var token = GenerateJwtToken(user);
            return Ok(new { user.Id, user.Name, user.Email, user.RolePermission, user.PhoneNumber, Token = token });
        }
        private string GenerateJwtToken(User user)
        {
            var tokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("XW8ucd7Z49zu35abbRc+PrVatqqJRVtW6RN0GmsmVCI=");
            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = new ClaimsIdentity(new Claim[]
                {
                    new Claim(ClaimTypes.Name, user.Id.ToString()),
                    new Claim(ClaimTypes.Email, user.Email.ToString()),
                    new Claim(ClaimTypes.Name, user.Name.ToString())
                }),
                Expires = DateTime.UtcNow.AddDays(7),
                SigningCredentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256Signature)
            };
            var token = tokenHandler.CreateToken(tokenDescriptor);
            return tokenHandler.WriteToken(token);
        }
    }
}
