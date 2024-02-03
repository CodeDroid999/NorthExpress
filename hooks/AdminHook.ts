import React from 'react'
import { UserAuth } from '../context/AuthContext' // Adjust the import path based on your file structure

const AdminAccess = (allowedRoles) => {
  const { userRole } = UserAuth()

  const isUserAllowed = () => {
    // Check if the user's role is included in the allowedRoles array
    const isRoleAllowed = allowedRoles.includes(userRole)

    return isRoleAllowed
  }

  return {
    isUserAllowed,
  }
}

export default AdminAccess
