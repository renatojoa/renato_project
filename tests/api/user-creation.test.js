const axios = require('axios');
const { expect } = require('chai');

describe('API - User Creation', function() {
  this.timeout(30000);
  const baseURL = process.env.API_BASE_URL || 'https://demoqa.com';

  function generateUsername() {
    return `user_${Date.now()}_${Math.floor(Math.random() * 1000)}`;
  }

  function generatePassword() {
    return `Test@${Date.now()}`;
  }

  describe('Positive Tests - User Creation', () => {
    it('should create a new user with valid credentials', async () => {
      const userName = generateUsername();
      const password = generatePassword();

      console.log(`\n  → Creating user: ${userName}`);

      const response = await axios.post(`${baseURL}/Account/v1/User`, {
        userName: userName,
        password: password
      });

      expect(response.status).to.equal(201);
      expect(response.data).to.have.property('userID');
      expect(response.data).to.have.property('username', userName);
      expect(response.data.userID).to.not.be.empty;

      console.log(`  ✓ User created successfully with ID: ${response.data.userID}`);
    });

    it('should create multiple users without conflict', async () => {
      const users = [];

      for (let i = 0; i < 3; i++) {
        const response = await axios.post(`${baseURL}/Account/v1/User`, {
          userName: generateUsername(),
          password: generatePassword()
        });

        expect(response.status).to.equal(201);
        users.push(response.data);
      }

      console.log(`  ✓ Created ${users.length} users successfully`);
      expect(users.length).to.equal(3);
    });
  });

  describe('Negative Tests - User Creation', () => {
    it('should fail to create user without username', async () => {
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          password: generatePassword()
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected request without username`);
      }
    });

    it('should fail to create user without password', async () => {
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          userName: generateUsername()
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected request without password`);
      }
    });

    it('should fail to create user with weak password', async () => {
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          userName: generateUsername(),
          password: '123'  // Weak password
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected weak password`);
      }
    });

    it('should fail to create user with empty username', async () => {
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          userName: '',
          password: generatePassword()
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected empty username`);
      }
    });

    it('should fail to create duplicate user', async () => {
      const userName = generateUsername();
      const password = generatePassword();

      // Create first user
      await axios.post(`${baseURL}/Account/v1/User`, {
        userName: userName,
        password: password
      });

      // Try to create duplicate
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          userName: userName,
          password: password
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 406]);
        console.log(`  ✓ Correctly rejected duplicate username`);
      }
    });

    it('should fail to create user with invalid body', async () => {
      try {
        await axios.post(`${baseURL}/Account/v1/User`, {
          invalidField: 'test'
        });
        expect.fail('Should have thrown an error');
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected invalid request body`);
      }
    });
  });

  describe('Edge Cases - User Creation', () => {
    it('should handle very long username', async () => {
      const longUsername = 'user_' + 'a'.repeat(100);

      try {
        const response = await axios.post(`${baseURL}/Account/v1/User`, {
          userName: longUsername,
          password: generatePassword()
        });

        if (response.status === 201) {
          console.log(`  ✓ Accepted long username (${longUsername.length} chars)`);
        }
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected very long username`);
      }
    });

    it('should handle special characters in username', async () => {
      const specialUsername = `user_${Date.now()}_test!@#`;

      try {
        const response = await axios.post(`${baseURL}/Account/v1/User`, {
          userName: specialUsername,
          password: generatePassword()
        });

        if (response.status === 201) {
          console.log(`  ✓ Accepted username with special characters`);
        }
      } catch (error) {
        expect(error.response.status).to.be.oneOf([400, 422]);
        console.log(`  ✓ Correctly rejected special characters in username`);
      }
    });
  });
});
