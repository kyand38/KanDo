import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    if (token) {
      return jwtDecode<JwtPayload>(token)
    } else return null
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
    return token;
  }

  isTokenExpired(token: string): boolean {
    // TODO: return a value that indicates if the token is expired
    try {
      // intersection typing eg.(<JwtPayload & { exp?: number }>) makes it a string & a number type with the number being optional in this case.
      const decoded = jwtDecode<JwtPayload & { exp?: number }>(token)
      if (decoded.exp) {  // Date.now returns time in milliseconds and exp returns time in seconds. hence dividing by 1000
        const currentTime = Date.now() / 1000;
        return decoded.exp < currentTime;
      }
      return false
    } catch (error) {
      return true
    }
  }
  getToken(): string | null {
    // TODO: return the token
    return localStorage.getItem('token')
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    localStorage.setItem('token', idToken)
    // TODO: redirect to the home page
    window.location.href = '/'
  }

  logout() {
    // TODO: remove the token from localStorage
    localStorage.removeItem('token')
    // TODO: redirect to the login page
    window.location.href = '/'
  }
}

export default new AuthService();
