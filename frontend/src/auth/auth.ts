export const fakeAuth = {
  login(email: string, password: string): boolean {
    return email === "admin@teste.com" && password === "123456";
  },
  isAuthenticated(): boolean {
    return localStorage.getItem("user") === "logged";
  },
  logout(): void {
    localStorage.removeItem("user");
  },
};