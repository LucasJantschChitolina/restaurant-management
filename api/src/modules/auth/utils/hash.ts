import crypto from 'crypto';

function generateHash(password: string) {
  const salt = process.env.SALT_KEY;

  if (!salt) {
    console.error('Salt key is not defined');
    return;
  }

  return crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
}

export default generateHash;