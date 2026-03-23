const axios = require('axios');
const { expect } = require('chai');

describe('API - Book Rental Operations', function() {
  this.timeout(30000);
  const baseURL = process.env.API_BASE_URL || 'https://demoqa.com';

  let testUser = {
    userName: null,
    password: null,
    userId: null,
    token: null
  };

  let availableBooks = [];

  beforeEach(async () => {
    // Create fresh user for each test
    testUser.userName = `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
    testUser.password = `Test@${Date.now()}`;

    const userResponse = await axios.post(`${baseURL}/Account/v1/User`, {
      userName: testUser.userName,
      password: testUser.password
    });
    testUser.userId = userResponse.data.userID;

    const tokenResponse = await axios.post(`${baseURL}/Account/v1/GenerateToken`, {
      userName: testUser.userName,
      password: testUser.password
    });
    testUser.token = tokenResponse.data.token;

    // Get available books
    const booksResponse = await axios.get(`${baseURL}/BookStore/v1/Books`);
    availableBooks = booksResponse.data.books;

    console.log(`\n  → Setup: User ${testUser.userName} created`);
  });

  describe('Positive Tests - Book Rental', () => {
    it('should rent a single book successfully', async () => {
      const bookToRent = { isbn: availableBooks[0].isbn };

      console.log(`  → Renting: ${availableBooks[0].title}`);

      const response = await axios.post(
        `${baseURL}/BookStore/v1/Books`,
        {
          userId: testUser.userId,
          collectionOfIsbns: [bookToRent]
        },
        {
          headers: {
            'Authorization': `Bearer ${testUser.token}`
          }
        }
      );

      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('books');
      expect(response.data.books).to.be.an('array');
      expect(response.data.books.length).to.equal(1);

      console.log(`  ✓ Successfully rented 1 book`);
    });

    it('should rent multiple books successfully', async () => {
      const booksToRent = [
        { isbn: availableBooks[0].isbn },
        { isbn: availableBooks[1].isbn },
        { isbn: availableBooks[2].isbn }
      ];

      const response = await axios.post(
        `${baseURL}/BookStore/v1/Books`,
        {
          userId: testUser.userId,
          collectionOfIsbns: booksToRent
        },
        {
          headers: {
            'Authorization': `Bearer ${testUser.token}`
          }
        }
      );

      expect(response.status).to.equal(201);
      expect(response.data.books.length).to.equal(3);

      console.log(`  ✓ Successfully rented 3 books`);
    });

    it('should verify rented books appear in user details', async () => {
      const bookToRent = { isbn: availableBooks[0].isbn };

      await axios.post(
        `${baseURL}/BookStore/v1/Books`,
        {
          userId: testUser.userId,
          collectionOfIsbns: [bookToRent]
        },
        {
          headers: {
            'Authorization': `Bearer ${testUser.token}`
          }
        }
      );

      const userDetails = await axios.get(
        `${baseURL}/Account/v1/User/${testUser.userId}`,
        {
          headers: {
            'Authorization': `Bearer ${testUser.token}`
          }
        }
      );

      expect(userDetails.data.books).to.be.an('array');
      expect(userDetails.data.books.length).to.be.greaterThan(0);
      expect(userDetails.data.books[0].isbn).to.equal(bookToRent.isbn);

      console.log(`  ✓ Rented book appears in user details`);
    });
  });

  describe('Negative Tests - Book Rental with Zero Books', () => {
    it('should fail to rent with empty books array', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: []
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected empty books array`);
      }
    });

    it('should fail to rent without books parameter', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response).to.exist;
        // DemoQA returns 500 for missing books parameter
        expect(error.response.status).to.be.oneOf([400, 422, 500]);
        console.log(`  ✓ Correctly rejected request without books`);
      }
    });
  });

  describe('Negative Tests - Invalid Book Data', () => {
    it('should fail to rent with invalid ISBN', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: [{ isbn: 'INVALID-ISBN-12345' }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 404]);
        console.log(`  ✓ Correctly rejected invalid ISBN`);
      }
    });

    it('should fail to rent with non-existent ISBN', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: [{ isbn: '9999999999999' }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 404]);
        console.log(`  ✓ Correctly rejected non-existent ISBN`);
      }
    });

    it('should fail to rent with empty ISBN', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: [{ isbn: '' }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected empty ISBN`);
      }
    });

    it('should fail to rent with malformed book object', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: [{ wrongField: 'test' }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected malformed book object`);
      }
    });
  });

  describe('Negative Tests - Invalid User', () => {
    it('should fail to rent books with invalid userId', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: 'invalid-user-id',
            collectionOfIsbns: [{ isbn: availableBooks[0].isbn }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 401]);
        console.log(`  ✓ Correctly rejected invalid userId`);
      }
    });

    it('should fail to rent books without userId', async () => {
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            collectionOfIsbns: [{ isbn: availableBooks[0].isbn }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response).to.exist;
        // DemoQA returns 500 for missing userId
        expect(error.response.status).to.be.oneOf([400, 401, 422, 500]);
        console.log(`  ✓ Correctly rejected request without userId`);
      }
    });

    it('should fail to rent books for another user', async () => {
      const anotherUserId = '00000000-0000-0000-0000-000000000000';

      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: anotherUserId,
            collectionOfIsbns: [{ isbn: availableBooks[0].isbn }]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 401, 404]);
        console.log(`  ✓ Correctly rejected renting for another user`);
      }
    });
  });

  describe('Edge Cases - Book Rental', () => {
    it('should handle duplicate ISBNs in request', async () => {
      const duplicateBooks = [
        { isbn: availableBooks[0].isbn },
        { isbn: availableBooks[0].isbn }
      ];

      try {
        const response = await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: duplicateBooks
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );

        // Might accept or reject duplicates
        if (response.status === 201) {
          console.log(`  ✓ Accepted duplicate ISBNs`);
        }
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected duplicate ISBNs`);
      }
    });

    it('should handle renting already rented book', async () => {
      const bookToRent = { isbn: availableBooks[0].isbn };

      // Rent first time
      await axios.post(
        `${baseURL}/BookStore/v1/Books`,
        {
          userId: testUser.userId,
          collectionOfIsbns: [bookToRent]
        },
        {
          headers: {
            'Authorization': `Bearer ${testUser.token}`
          }
        }
      );

      // Try to rent again
      try {
        await axios.post(
          `${baseURL}/BookStore/v1/Books`,
          {
            userId: testUser.userId,
            collectionOfIsbns: [bookToRent]
          },
          {
            headers: {
              'Authorization': `Bearer ${testUser.token}`
            }
          }
        );
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 409]);
        console.log(`  ✓ Correctly rejected renting already rented book`);
      }
    });
  });
});
