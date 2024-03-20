//Test
//auth.test.js  ---------------------------------------------------------------------------------//

describe('Authentication', () => {
    it('logs in a user with valid credentials', async () => {
      const user = await loginUser('johnd', 'm38rmF$');
      expect(user).toHaveProperty('token');
    });
  
    it('fails to log in a user with invalid credentials', async () => {
      await expect(loginUser('johnd', 'm38rmF$')).rejects.toThrow();
    });
  });
  