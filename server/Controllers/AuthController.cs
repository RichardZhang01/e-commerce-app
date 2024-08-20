using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Identity.Data;

[ApiController]
[Route("api/[controller]")]
public class AuthController : ControllerBase
{
    [HttpPost("login")]
    public IActionResult Login(LoginRequest loginRequest)
    {
        return Ok(new { Token = "GeneratedJWTToken" });
    }
}
