// Dummy service to make navbar work
export const newsAPI = {
  searchNews: (query: string) => Promise.resolve({ articles: [] })
};