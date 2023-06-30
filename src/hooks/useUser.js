import React from 'react';
import UserContextModel from '../models/UserContextModel';

export function useUser() {
  const isUserInLocalStorage = () => JSON.parse(localStorage.getItem('user'));
  const isAccessTokenInLocalStorage = () => {
    const token = JSON.parse(localStorage.getItem('access-token'));
    return token['access-token'];
  };

  const loadUserContext = () => {
    const storageUser = isUserInLocalStorage();
    if (storageUser) {
      const currentUser = new UserContextModel(
        storageUser,
        isAccessTokenInLocalStorage()
      );
      return currentUser;
    }
    return null;
  };

  return { loadUserContext, isUserInLocalStorage };
}
