import React, { createContext } from 'react'
export const authDataContext = createContext()

function AuthContext({children}) {

  const serverUrl = "http://localhost:8000"

    let value = {
      serverUrl
    }

    // To Cetralised the Backend, so we use the AuthDataContext 
  return (
    <div>
        <authDataContext.Provider value={value}>
        {children}
        </authDataContext.Provider>
    </div>
  )
}

export default AuthContext
