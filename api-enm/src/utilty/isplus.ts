import UserModel from './../models/User'; // Make sure to replace this with the actual path to your UserModel

/**
 * checks if the user with the given ID is a plus user
 * @param {string} userId - the ID of the user to check
 * @returns {Promise<boolean>} - true if the user is plus, false otherwise.
 */
export async function checkUserPlusStatus(userId) {
  try {
    // Find the user by ID
    const user = await UserModel.findById(userId);
    // If user is found and the plus field is true, return true, else false
    return user ? user.plus : false;
  } catch (error) {
    console.error('Error checking user premium status:', error);
    return false;
  }
}
