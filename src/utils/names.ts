export const names: string[] = [
  "Mohamed Salah",
  "Neymar",
  "Joshua Kimmich",
  "Virgil van Dijk",
  "Kylian Mbappe",
  "Erling Haaland",
  "Cristiano Ronaldo",
  "Kevin De Bruyne",
  "Lionel Messi",
  "Robert Lewandowski",
];

export const randomNames = () =>
  names[Math.floor(Math.random() * names.length)];
