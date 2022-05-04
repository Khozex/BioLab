import { EncryptPassword } from './EncryptPassword';
jest.mock('bcrypt');

import * as bcrypt from 'bcrypt';
const mockedBcrypt = bcrypt as jest.Mocked<typeof bcrypt>;

describe('Utils - EncryptPassword', () => {
  describe('Encrypt', () => {
    it('should encrypt password', async () => {
      mockedBcrypt.genSalt = jest.fn().mockResolvedValue('$#@!');
      mockedBcrypt.hash = jest.fn().mockResolvedValue('1234567890qwertyuiop');

      const password = '12345';
      const result = await EncryptPassword.encryptPassword(password);

      expect(result).toEqual('1234567890qwertyuiop');
      expect(bcrypt.genSalt).toHaveBeenNthCalledWith(1, 10);
      expect(bcrypt.hash).toHaveBeenNthCalledWith(1, '12345', '$#@!');
    });
  });

  describe('Compare', () => {
    it('should compare password and hash and return true', async () => {
      mockedBcrypt.compare = jest.fn().mockResolvedValue(true);
      const password = '12345';
      const hash = '1234567890qwertyuiop';
      const result = await EncryptPassword.comparePassword(password, hash);
      expect(result).toBeTruthy();
      expect(bcrypt.compare).toHaveBeenNthCalledWith(1, password, hash);
    });

    it('should compare password and hash and return false for not match', async () => {
      mockedBcrypt.compare = jest.fn().mockResolvedValue(false);

      const password = '123456';
      const hash = '1234567890qwertyuiop';
      const result = await EncryptPassword.comparePassword(password, hash);
      expect(result).toBeFalsy();
      expect(bcrypt.compare).toHaveBeenNthCalledWith(1, password, hash);
    });
  });
});