export function getFirstLetterOfEmail(
  email: string | undefined,
): string | null {
  if (!email) {
    return null;
  }

  const emailPattern = /\S+@\S+\.\S+/;
  if (emailPattern.test(email)) {
    return email[0];
  } else {
    console.log("Invalid email address.");
    return null;
  }
}
