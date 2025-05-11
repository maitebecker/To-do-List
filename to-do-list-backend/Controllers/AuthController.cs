using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using System.Threading.Tasks;

[ApiController]
[Route("auth")]
public class AuthController(IAuthService authService) : ControllerBase
{
    public static User user = new();


    [HttpPost("register")]
    public async Task<ActionResult<User>> Register(UserDto dto)
    {
        var user = await authService.RegisterAsync(dto);
        if (user is null)
        {
            return BadRequest("Usuário já existe");
        }

        return Ok(user);
    }

    [HttpPost("login")]
    public async Task<ActionResult<TokenResponseDto>> Login(UserDto dto)
    {
        var result = await authService.LoginAsync(dto);

        if (result is null)
        {
            return BadRequest("Usuário ou senha inválidos");
        }

        return Ok(result);
    }

    [HttpPost("refresh-token")]
    public async Task<ActionResult<TokenResponseDto>> RefreshToken(RefreshTokenRequestDto request)
    {
        var result = await authService.RefreshTokensAsync(request);

        if (result is null || result.AccessToken is null || request.RefreshToken is null)
        {
            return Unauthorized("Refresh Token inválido");
        }

        return Ok(result);
    }
}
