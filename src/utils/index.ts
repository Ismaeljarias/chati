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

export async function generateRandomAnimePhrases() {
  return Array.from({ length: 100 }, (_, index) => {
    return {
      id: `9133cc8e-9595-42bc-babb-fc2eeb7d825${index}`,
      content: `Phrase ${index + 1} from random anime.`,
      clerkUserId: "1",
      sessionId: "1",
      createdAt: new Date(),
      isBot: true,
    };
  });
}
