import React from 'react'
import { OptionProvider } from '../context/OptionContext'

function AppProvider({children}) {
  return (
    <OptionProvider>
        {children}
    </OptionProvider>
  )
}

export default AppProvider