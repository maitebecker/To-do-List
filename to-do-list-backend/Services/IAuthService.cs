public interface IAuthService
{
    Task<User?> RegisterAsync(UserDto dto);
    Task<TokenResponseDto?> LoginAsync(UserDto dto);
    Task<TokenResponseDto?> RefreshTokensAsync(RefreshTokenRequestDto request);
}
