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

export function timeAgo(inputDate: Date | string): string {
  let date;
  if (inputDate instanceof Date) {
    date = inputDate;
  } else {
    // Attempt to convert string to Date object
    date = new Date(inputDate);
    if (isNaN(date.getTime())) {
      // Invalid date handling
      return "Invalid date";
    }
  }

  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);

  let interval = seconds / 31536000; // Years
  if (interval > 1) {
    return `${Math.floor(interval)} years ago`;
  }
  interval = seconds / 2592000; // Months
  if (interval > 1) {
    return `${Math.floor(interval)} months ago`;
  }
  interval = seconds / 86400; // Days
  if (interval > 1) {
    return `${Math.floor(interval)} days ago`;
  }
  interval = seconds / 3600; // Hours
  if (interval > 1) {
    return `${Math.floor(interval)} hours ago`;
  }
  interval = seconds / 60; // Minutes
  if (interval > 1) {
    return `${Math.floor(interval)} minutes ago`;
  }

  if (seconds < 5) {
    return "just now";
  }

  return `${Math.floor(seconds)} seconds ago`;
}
