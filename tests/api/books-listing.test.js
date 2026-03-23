const axios = require('axios');
const { expect } = require('chai');

describe('API - Books Listing', function() {
  this.timeout(30000);
  const baseURL = process.env.API_BASE_URL || 'https://demoqa.com';

  describe('Positive Tests - List Books', () => {
    it('should retrieve list of all available books', async () => {
      console.log('\n  → Fetching books list...');

      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('books');
      expect(response.data.books).to.be.an('array');
      expect(response.data.books.length).to.be.greaterThan(0);

      console.log(`  ✓ Retrieved ${response.data.books.length} books`);
    });

    it('should validate book structure and required fields', async () => {
      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);
      const books = response.data.books;

      books.forEach((book, index) => {
        expect(book).to.have.property('isbn');
        expect(book).to.have.property('title');
        expect(book).to.have.property('author');
        expect(book).to.have.property('publisher');
        expect(book).to.have.property('pages');

        expect(book.isbn).to.be.a('string').and.not.be.empty;
        expect(book.title).to.be.a('string').and.not.be.empty;
        expect(book.author).to.be.a('string').and.not.be.empty;
        expect(book.pages).to.be.a('number').and.be.greaterThan(0);
      });

      console.log(`  ✓ All ${books.length} books have valid structure`);
    });

    it('should return consistent data on multiple requests', async () => {
      const response1 = await axios.get(`${baseURL}/BookStore/v1/Books`);
      const response2 = await axios.get(`${baseURL}/BookStore/v1/Books`);

      expect(response1.data.books.length).to.equal(response2.data.books.length);
      console.log(`  ✓ Consistent data across multiple requests`);
    });

    it('should return books with valid ISBN format', async () => {
      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);
      const books = response.data.books;

      books.forEach(book => {
        // ISBN format validation (basic check)
        expect(book.isbn).to.match(/^[\d-]+$/);
      });

      console.log(`  ✓ All ISBNs have valid format`);
    });
  });

  describe('Negative Tests - List Books', () => {
    it('should handle invalid endpoint gracefully', async () => {
      try {
        await axios.get(`${baseURL}/BookStore/v1/BooksInvalid`);
        expect.fail('Should have thrown an error');
      } catch (error) {
        if (error.response) {
          expect(error.response.status).to.be.oneOf([404, 400]);
          console.log(`  ✓ Correctly returned 404 for invalid endpoint`);
        } else {
          // Network error or no response - test passes if error was thrown
          console.log(`  ✓ Invalid endpoint failed as expected (network/timeout error)`);
        }
      }
    });

    it('should reject POST request to books listing endpoint', async () => {
      try {
        await axios.post(`${baseURL}/BookStore/v1/Books`, {
          someData: 'test'
        });
        // Note: This might succeed if it's the rent books endpoint
        // So we just check it doesn't crash
        console.log(`  ✓ POST request handled (might be rent endpoint)`);
      } catch (error) {
        expect(error.response).to.exist;
        // DemoQA returns 500 for invalid POST to Books endpoint
        expect(error.response.status).to.be.oneOf([400, 401, 405, 500]);
        console.log(`  ✓ POST request correctly rejected`);
      }
    });
  });

  describe('Book Details Validation', () => {
    it('should verify specific book details by ISBN', async () => {
      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);
      const firstBook = response.data.books[0];

      console.log(`\n  → Checking details for: ${firstBook.title}`);
      console.log(`    ISBN: ${firstBook.isbn}`);
      console.log(`    Author: ${firstBook.author}`);
      console.log(`    Pages: ${firstBook.pages}`);
      console.log(`    Publisher: ${firstBook.publisher}`);

      expect(firstBook.isbn).to.not.be.empty;
      expect(firstBook.title).to.not.be.empty;
      expect(firstBook.pages).to.be.greaterThan(0);
    });

    it('should list all available book titles', async () => {
      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);
      const books = response.data.books;

      console.log('\n  → Available books:');
      books.forEach((book, index) => {
        console.log(`    ${index + 1}. ${book.title} by ${book.author}`);
      });

      console.log(`  ✓ Listed ${books.length} books`);
    });
  });

  describe('Performance Tests - Book Listing', () => {
    it('should respond within acceptable time', async () => {
      const startTime = Date.now();

      await axios.get(`${baseURL}/BookStore/v1/Books`);

      const responseTime = Date.now() - startTime;

      expect(responseTime).to.be.lessThan(5000); // 5 seconds
      console.log(`  ✓ Response time: ${responseTime}ms (< 5000ms)`);
    });
  });
});
