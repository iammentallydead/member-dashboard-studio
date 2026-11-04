export type Book = { id: string; title: string; author: string; page: number; pages: number; due?: string; words: number; quotes: number };

export const books: Book[] = [
  { id: "1", title: "Muna Madan", author: "Laxmi Prasad Devkota", page: 64, pages: 96, due: "12 Nov", words: 18, quotes: 6 },
  { id: "2", title: "Pride and Prejudice", author: "Jane Austen", page: 142, pages: 432, due: "30 Nov", words: 41, quotes: 12 },
  { id: "3", title: "Thinking, Fast and Slow", author: "Daniel Kahneman", page: 211, pages: 499, words: 23, quotes: 19 },
  { id: "4", title: "Seto Dharti", author: "Amar Neupane", page: 380, pages: 380, words: 9, quotes: 4 },
  { id: "5", title: "Things Fall Apart", author: "Chinua Achebe", page: 20, pages: 209, due: "15 Dec", words: 5, quotes: 2 },
];

export type Card = { word: string; ipa: string; meaning: string; example: string; book: string; page: number };

export const reviewCards: Card[] = [
  { word: "Obstinate", ipa: "/ˈɒbstɪnət/", meaning: "Stubbornly refusing to change one's opinion.", example: "She was obstinate in her refusal to dance with him.", book: "Pride and Prejudice", page: 118 },
  { word: "Heuristic", ipa: "/hjʊəˈrɪstɪk/", meaning: "A mental shortcut that allows quick judgement.", example: "The availability heuristic distorts our sense of risk.", book: "Thinking, Fast and Slow", page: 129 },
  { word: "Impertinent", ipa: "/ɪmˈpɜːtɪnənt/", meaning: "Not showing proper respect; rude.", example: "Such an impertinent question deserved no answer.", book: "Pride and Prejudice", page: 140 },
  { word: "Proverbial", ipa: "/prəˈvɜːbiəl/", meaning: "Referred to in a proverb; well known.", example: "Proverbs are the palm-oil with which words are eaten.", book: "Things Fall Apart", page: 7 },
];

export const quotes = [
  { text: "Nothing is so alarming as the familiar made strange.", book: "Thinking, Fast and Slow", page: 203 },
  { text: "I could easily forgive his pride, if he had not mortified mine.", book: "Pride and Prejudice", page: 21 },
];

export const week = [
  { d: "M", n: 14 }, { d: "T", n: 22 }, { d: "W", n: 9 }, { d: "T", n: 31 }, { d: "F", n: 18 }, { d: "S", n: 40 }, { d: "S", n: 12 },
];
