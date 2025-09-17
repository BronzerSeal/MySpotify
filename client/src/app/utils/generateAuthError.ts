export default function generateAuthError(message: string) {
  switch (message) {
    case "INVALID_PASSWORD":
      return "Email or password entered incorrectly";
    case "EMAIL_EXISTS":
      return "A user with this email already exists";
    default:
      return "Too many login attempts. Try again later";
  }
}
