import bcrypt from 'bcryptjs';

/**
 * Hashes the given password
 * @param password - password to hash
 * @returns a promise that resolves to the hashed password
 */
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

/**
 * Compares the given password with the hashed password
 * @param password - password to compare
 * @param hashedPassword - hashed password to compare
 * @returns a promise that resolves to a boolean indicating whether the passwords match
 */
export const comparePassword = async (password: string, hashedPassword: string): Promise<boolean> => {
  return bcrypt.compare(password, hashedPassword);
};
