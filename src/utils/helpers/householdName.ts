export function householdName(email: string) {
  const base = email.split("@")[0];

  const consonants = "bcdfghjklmnpqrstvwxyz";
  const vowels = "aeiou";

  const rand = (chars: string) => chars[Math.floor(Math.random() * chars.length)];

  const code = rand(consonants) + rand(vowels) + rand(consonants) + rand(vowels) + rand(consonants);

  return `${base}-home-${code}`;
}
