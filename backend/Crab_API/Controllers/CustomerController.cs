using Crab_API.Models;
using Crab_API.Request;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CustomerController : ControllerBase
    {
        private readonly CustomerService _customerService;
        public CustomerController(CustomerService customerService)
        {
            _customerService = customerService;
        }
        [HttpGet]
        public async Task<List<Customer>> Get() =>
            await _customerService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<Customer>> Get(string id)
        {
            var customer = await _customerService.GetAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
        [HttpPost("GetCustomerByEmail")]
        public async Task<ActionResult<Customer>> GetByEmail(EmailRequest emailRequest)
        {
            var customer = await _customerService.GetByEmail(emailRequest.Email);
            if (customer == null)
            {
                return NotFound();
            }
            return customer;
        }
        [HttpPost]
        public async Task<IActionResult> Post(Customer newCustomer)
        {
            var customer = await _customerService.GetByEmail(newCustomer.Email);
            if (customer == null)
            {
                await _customerService.CreateASync(newCustomer);
                return CreatedAtAction(nameof(Get), new { id = newCustomer.Id }, newCustomer);
            }
            return StatusCode(500, "This email has already been existed");
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, Customer updatedCustomer)
        {
            var customer = await _customerService.GetAsync(id);
            if (customer == null)
            {
                return NotFound();
            }
            updatedCustomer.Id = customer.Id;
            await _customerService.UpdateAsync(id, updatedCustomer);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var customer = await _customerService.GetAsync(id);

            if (customer is null)
            {
                return NotFound();
            }

            await _customerService.RemoveAsync(id);

            return NoContent();
        }

    }
}
