import bcrypt from 'bcryptjs';

/**
 * Hashea una contraseña.
 * 
 * @param {string} password - La contraseña a hashear.
 * 
 * @returns {Promise<string>} La contraseña hasheada.
 */

export const hashPassword = async (password: string): Promise<string> => {
  return await bcrypt.hash(password, 12);
};