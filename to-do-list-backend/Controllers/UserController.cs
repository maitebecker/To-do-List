using System.Security.Claims;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

[Route("user")]
[Authorize]
public class UserController : ControllerBase
{
    [HttpGet("me")]
     public IActionResult GetUserInfo()
     {
          var userClaims = User.Identity as ClaimsIdentity;

           if (userClaims == null)
                return Unauthorized();

            var name = userClaims.FindFirst(ClaimTypes.Name)?.Value;
            var id = userClaims.FindFirst(ClaimTypes.NameIdentifier)?.Value;
            var email = userClaims.FindFirst(ClaimTypes.Email)?.Value;

            return Ok(new
            {
                id = id,
                name = name,
                email = email
            });
     }
}