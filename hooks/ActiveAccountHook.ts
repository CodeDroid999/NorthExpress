import React from 'react'
import { UserAuth } from '../context/AuthContext' // Adjust the import path based on your file structure

const RoleBasedAccess = (allowedRoles, accountStatus) => {
  const { userRole } = UserAuth()

  const isUserAllowed = () => {
    // Check if the user's role is included in the allowedRoles array
    const isRoleAllowed = allowedRoles.includes(userRole)

    // Check if the account status is active
    const isAccountActive = accountStatus === 'Active'

    return isRoleAllowed && isAccountActive
  }

  return {
    isUserAllowed,
  }
}

export default RoleBasedAccess
