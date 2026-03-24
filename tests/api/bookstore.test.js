const axios = require('axios');
const { expect } = require('chai');

describe('BookStore API - Complete Flow @exercicio1', function() {
  this.timeout(60000);

  const baseURL = process.env.API_BASE_URL || 'https://demoqa.com';
  let userData = {
    userName: null,
    password: null,
    userId: null,
    token: null,
    books: []
  };

  /**
   * Generate unique username
   */
  function generateUsername() {
    return `testuser_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  /**
   * Generate strong password
   */
  function generatePassword() {
    return `Test@${Date.now()}`;
  }

  describe('1. Create User Account', () => {
    it('should create a new user successfully', async () => {
      userData.userName = generateUsername();
      userData.password = generatePassword();

      console.log(`\n  → Creating user: ${userData.userName}`);

      const response = await axios.post(`${baseURL}/Account/v1/User`, {
        userName: userData.userName,
        password: userData.password
      });

      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('userID');
      expect(response.data).to.have.property('username', userData.userName);

      userData.userId = response.data.userID;
      console.log(`  ✓ User created with ID: ${userData.userId}`);
    });
  });

  describe('2. Generate Access Token', () => {
    it('should generate a valid access token', async () => {
      console.log(`\n  → Generating token for user: ${userData.userName}`);

      const response = await axios.post(`${baseURL}/Account/v1/GenerateToken`, {
        userName: userData.userName,
        password: userData.password
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('token');
      expect(response.data).to.have.property('status', 'Success');
      expect(response.data.token).to.not.be.empty;

      userData.token = response.data.token;
      console.log(`  ✓ Token generated successfully`);
    });
  });

  describe('3. Verify User Authorization', () => {
    it('should confirm user is authorized', async () => {
      console.log(`\n  → Checking authorization for: ${userData.userName}`);

      const response = await axios.post(`${baseURL}/Account/v1/Authorized`, {
        userName: userData.userName,
        password: userData.password
      });

      expect(response.status).to.equal(200);
      expect(response.data).to.be.true;

      console.log(`  ✓ User is authorized`);
    });
  });

  describe('4. List Available Books', () => {
    it('should retrieve list of available books', async () => {
      console.log(`\n  → Fetching available books...`);

      const response = await axios.get(`${baseURL}/BookStore/v1/Books`);

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('books');
      expect(response.data.books).to.be.an('array');
      expect(response.data.books.length).to.be.greaterThan(0);

      // Store books for next test
      userData.books = response.data.books;

      console.log(`  ✓ Retrieved ${userData.books.length} books`);
    });
  });

  describe('5. Rent Two Books', () => {
    it('should successfully rent two books', async () => {
      // Select first two books
      const booksToRent = [
        { isbn: userData.books[0].isbn },
        { isbn: userData.books[1].isbn }
      ];

      console.log(`\n  → Renting 2 books:`);
      console.log(`    - ${userData.books[0].title}`);
      console.log(`    - ${userData.books[1].title}`);

      const response = await axios.post(
        `${baseURL}/BookStore/v1/Books`,
        {
          userId: userData.userId,
          collectionOfIsbns: booksToRent
        },
        {
          headers: {
            'Authorization': `Bearer ${userData.token}`,
            'Content-Type': 'application/json'
          }
        }
      );

      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('books');
      expect(response.data.books).to.be.an('array');
      expect(response.data.books.length).to.equal(2);

      console.log(`  ✓ Successfully rented 2 books`);
    });
  });

  describe('6. Verify User Details with Rented Books', () => {
    it('should show user details with the rented books', async () => {
      console.log(`\n  → Fetching user details...`);

      const response = await axios.get(
        `${baseURL}/Account/v1/User/${userData.userId}`,
        {
          headers: {
            'Authorization': `Bearer ${userData.token}`
          }
        }
      );

      expect(response.status).to.equal(200);
      expect(response.data).to.have.property('userId', userData.userId);
      expect(response.data).to.have.property('username', userData.userName);
      expect(response.data).to.have.property('books');
      expect(response.data.books).to.be.an('array');
      expect(response.data.books.length).to.equal(2);

      // Verify book ISBNs match
      const rentedIsbns = [userData.books[0].isbn, userData.books[1].isbn];
      const userBookIsbns = response.data.books.map(book => book.isbn);

      rentedIsbns.forEach(isbn => {
        expect(userBookIsbns).to.include(isbn);
      });

      console.log(`  ✓ User has ${response.data.books.length} rented books:`);
      response.data.books.forEach(book => {
        console.log(`    - ${book.title}`);
      });
    });
  });

  after(() => {
    console.log('\n  ========================================');
    console.log('  📊 API Test Summary:');
    console.log(`  User: ${userData.userName}`);
    console.log(`  Books Rented: 2`);
    console.log('  ========================================\n');
  });
});
