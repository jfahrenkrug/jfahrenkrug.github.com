export interface RecommendationData {
  quote: string;
  name: string;
  url: string;
  company?: string;
}

export const recommendations: RecommendationData[] = [
  {
    quote: "Johannes met and exceeded our expectations. Johannes is simply a very creative, professional and talented developer.",
    name: "Viktor Petersson",
    url: "https://www.linkedin.com/in/vpetersson/",
    company: "client"
  },
  {
    quote: "In brief, in working with Johannes I had the rare opportunity to work along side a brilliant and professional individual [...].",
    name: "Richard Perez",
    url: "https://www.linkedin.com/in/riperez/",
    company: "client"
  },
  {
    quote: "Johannes is a very professional guy who quickly comes up with results that exceeded my expectation.",
    name: "Nikolaus Pohle",
    url: "https://www.linkedin.com/in/npohle/",
    company: "client"
  },
  {
    quote: "It's disappointingly rare to find engineering talent of the kind Johannes possesses.",
    name: "John Fox",
    url: "https://www.linkedin.com/in/johnfox4",
    company: "client"
  },
  {
    quote: "Johannes is that perfect mix of an author with a deep technical understanding, who also has the ability to express complex ideas in a simple way for readers.",
    name: "Troy Mott",
    url: "https://www.linkedin.com/in/troymott/"
  },
  {
    quote: "Johannes is one of the most meticulous IT consultants who I have come across. [...] His knowledge and visibility in the IT industry is large and he has always been a professional with high integrity.",
    name: "Patrick Boden",
    url: "https://www.linkedin.com/in/patrickboden/",
    company: "client"
  },

];
