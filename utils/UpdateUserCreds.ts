import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { db } from '../firebase';

const updateUser = async (userId, updatedUserData) => {
  const docRef = doc(db, 'users', userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    await updateDoc(docRef, updatedUserData);
    return true;
  } else {
    console.error('User not found.');
    return false;
  }
};

const updateUserProfile = async (userId, updatedProfileData) => {
  const updatedUserData = {
    firstName: updatedProfileData.firstName,
    lastName: updatedProfileData.lastName,
    dateOfBirth: updatedProfileData.dateOfBirth,
    phoneNumber: updatedProfileData.phoneNumber,
    profilePicture: updatedProfileData.profilePicture,
    aboutDescription: updatedProfileData.aboutDescription,
    postalCode: updatedProfileData.postalCode,
    city: updatedProfileData.city,
  };

  return updateUser(userId, updatedUserData);
};

const updateUserRole = async (userId, updatedRole) => {
  const updatedUserData = {
    role: updatedRole,
  };

  return updateUser(userId, updatedUserData);
};

export { updateUser, updateUserProfile, updateUserRole };
