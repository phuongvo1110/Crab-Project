using Crab_API.Models;
using Crab_API.Services;
using Microsoft.AspNetCore.Mvc;

namespace Crab_API.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CallCenterAgentController : ControllerBase
    {
        private readonly CallCenterAgentService _callCenterAgentService;
        public CallCenterAgentController(CallCenterAgentService callCenterAgentService)
        {
            _callCenterAgentService = callCenterAgentService;
        }
        [HttpGet]
        public async Task<List<CallCenterAgent>> Get() =>
            await _callCenterAgentService.GetAsync();
        [HttpGet("{id:length(24)}")]
        public async Task<ActionResult<CallCenterAgent>> Get(string id)
        {
            var callCenterAgent = await _callCenterAgentService.GetAsync(id);
            if (callCenterAgent == null)
            {
                return NotFound();
            }
            return callCenterAgent;
        }
        [HttpPost]
        public async Task<IActionResult> Post(CallCenterAgent newCallCenterAgent)
        {
            await _callCenterAgentService.CreateASync(newCallCenterAgent);
            return CreatedAtAction(nameof(Get), new { id = newCallCenterAgent.Id }, newCallCenterAgent);
        }
        [HttpPut("{id:length(24)}")]
        public async Task<IActionResult> Update(string id, CallCenterAgent updatedCallCenterAgent)
        {
            var callCenterAgent = await _callCenterAgentService.GetAsync(id);
            if (callCenterAgent == null)
            {
                return NotFound();
            }
            updatedCallCenterAgent.Id = callCenterAgent.Id;
            await _callCenterAgentService.UpdateAsync(id, updatedCallCenterAgent);
            return NoContent();
        }
        [HttpDelete("{id:length(24)}")]
        public async Task<IActionResult> Delete(string id)
        {
            var callCenterAgent = await _callCenterAgentService.GetAsync(id);

            if (callCenterAgent is null)
            {
                return NotFound();
            }

            await _callCenterAgentService.RemoveAsync(id);

            return NoContent();
        }

    }
}
