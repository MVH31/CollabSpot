const natural = require("natural");
const tokenizer = new natural.WordTokenizer();
const { JaroWinklerDistance } = natural;

// Comprehensive list of stopwords to exclude from similarity calculation
const stopWords = [
  "i",
  "me",
  "my",
  "myself",
  "we",
  "our",
  "ours",
  "ourselves",
  "you",
  "your",
  "yours",
  "yourself",
  "yourselves",
  "he",
  "him",
  "his",
  "himself",
  "she",
  "her",
  "hers",
  "herself",
  "it",
  "its",
  "itself",
  "they",
  "them",
  "their",
  "theirs",
  "themselves",
  "what",
  "which",
  "who",
  "whom",
  "this",
  "that",
  "these",
  "those",
  "am",
  "is",
  "are",
  "was",
  "were",
  "be",
  "been",
  "being",
  "have",
  "has",
  "had",
  "having",
  "do",
  "does",
  "did",
  "doing",
  "a",
  "an",
  "the",
  "and",
  "but",
  "if",
  "or",
  "because",
  "as",
  "until",
  "while",
  "of",
  "at",
  "by",
  "for",
  "with",
  "about",
  "against",
  "between",
  "into",
  "through",
  "during",
  "before",
  "after",
  "above",
  "below",
  "to",
  "from",
  "up",
  "down",
  "in",
  "out",
  "on",
  "off",
  "over",
  "under",
  "again",
  "further",
  "then",
  "once",
  "here",
  "there",
  "when",
  "where",
  "why",
  "how",
  "all",
  "any",
  "both",
  "each",
  "few",
  "more",
  "most",
  "other",
  "some",
  "such",
  "no",
  "nor",
  "not",
  "only",
  "own",
  "same",
  "so",
  "than",
  "too",
  "very",
  "s",
  "t",
  "can",
  "will",
  "just",
  "don",
  "should",
  "now",
  "d",
  "ll",
  "m",
  "o",
  "re",
  "ve",
  "y",
  "ain",
  "aren",
  "couldn",
  "didn",
  "doesn",
  "hadn",
  "hasn",
  "haven",
  "isn",
  "ma",
  "mightn",
  "mustn",
  "needn",
  "shan",
  "shouldn",
  "wasn",
  "weren",
  "won",
  "wouldn",
];

/**
 * Calculate similarity between two texts
 * @param {string} uploadedTitle - Title of the uploaded file
 * @param {string} uploadedContent - Content of the uploaded file
 * @param {string} projectTitle - Title of the existing project
 * @param {string} projectAbstract - Abstract of the existing project
 * @param {string} projectContent - Content of the existing project
 * @returns {Object} Similarity scores
 */
exports.computeSimilarity = (
  uploadedTitle,
  uploadedContent,
  projectTitle,
  projectAbstract,
  projectContent
) => {
  // Calculate title similarity
  const titleSimilarity = calculateTextSimilarity(uploadedTitle, projectTitle);

  // Calculate abstract similarity
  const abstractSimilarity = calculateTextSimilarity(
    uploadedContent.substring(0, 1000),
    projectAbstract
  );

  // Calculate content similarity
  const contentSimilarity = calculateContentSimilarity(
    uploadedContent,
    projectContent
  );

  // Calculate overall similarity with weighted average
  // Title is 20%, abstract is 30%, content is 50%
  const overallSimilarity =
    titleSimilarity * 0.2 + abstractSimilarity * 0.3 + contentSimilarity * 0.5;

  return {
    titleSimilarity,
    abstractSimilarity,
    contentSimilarity,
    overallSimilarity,
  };
};

/**
 * Calculate similarity between two short text segments
 * @param {string} text1 - First text
 * @param {string} text2 - Second text
 * @returns {number} Similarity score (0-1)
 */
function calculateTextSimilarity(text1, text2) {
  if (!text1 || !text2) {
    return 0;
  }

  // Normalize texts
  text1 = text1.toLowerCase().trim();
  text2 = text2.toLowerCase().trim();

  // For very short text, use Jaro-Winkler distance
  if (text1.length < 20 || text2.length < 20) {
    return JaroWinklerDistance(text1, text2);
  }

  // Calculate Jaccard similarity for longer text
  const tokens1 = tokenizer.tokenize(text1) || [];
  const tokens2 = tokenizer.tokenize(text2) || [];

  // Remove stop words using the comprehensive list
  const filteredTokens1 = tokens1.filter((token) => !stopWords.includes(token));
  const filteredTokens2 = tokens2.filter((token) => !stopWords.includes(token));

  // Create sets for Jaccard similarity
  const set1 = new Set(filteredTokens1);
  const set2 = new Set(filteredTokens2);

  // Calculate intersection
  const intersection = new Set([...set1].filter((x) => set2.has(x)));

  // Calculate union
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) {
    return 0;
  }

  return intersection.size / union.size;
}

/**
 * Calculate similarity between larger content blocks
 * @param {string} content1 - First content
 * @param {string} content2 - Second content
 * @returns {number} Similarity score (0-1)
 */
function calculateContentSimilarity(content1, content2) {
  if (!content1 || !content2) {
    return 0;
  }

  // Normalize content
  content1 = content1.toLowerCase().trim();
  content2 = content2.toLowerCase().trim();

  // Tokenize and filter stop words
  const tokens1 = tokenizer.tokenize(content1) || [];
  const tokens2 = tokenizer.tokenize(content2) || [];

  // Filter using the comprehensive stopwords list
  const filteredTokens1 = tokens1.filter(
    (token) => !stopWords.includes(token) && token.length > 2
  );
  const filteredTokens2 = tokens2.filter(
    (token) => !stopWords.includes(token) && token.length > 2
  );

  // Create frequency maps
  const freqMap1 = createFrequencyMap(filteredTokens1);
  const freqMap2 = createFrequencyMap(filteredTokens2);

  // Get top terms (maximum 100 terms)
  const topTerms1 = getTopTerms(freqMap1, 100);
  const topTerms2 = getTopTerms(freqMap2, 100);

  // Calculate Jaccard similarity on top terms
  const set1 = new Set(topTerms1);
  const set2 = new Set(topTerms2);

  const intersection = new Set([...set1].filter((x) => set2.has(x)));
  const union = new Set([...set1, ...set2]);

  if (union.size === 0) {
    return 0;
  }

  return intersection.size / union.size;
}

/**
 * Create a frequency map of tokens
 * @param {Array<string>} tokens - Array of tokens
 * @returns {Map} Map of tokens to their frequencies
 */
function createFrequencyMap(tokens) {
  const freqMap = new Map();

  for (const token of tokens) {
    const count = freqMap.get(token) || 0;
    freqMap.set(token, count + 1);
  }

  return freqMap;
}

/**
 * Get the top N most frequent terms from a frequency map
 * @param {Map} freqMap - Map of tokens to their frequencies
 * @param {number} n - Number of top terms to return
 * @returns {Array<string>} Array of top terms
 */
function getTopTerms(freqMap, n) {
  const entries = Array.from(freqMap.entries());

  // Sort by frequency (descending)
  entries.sort((a, b) => b[1] - a[1]);

  // Return top N terms
  return entries.slice(0, n).map((entry) => entry[0]);
}
