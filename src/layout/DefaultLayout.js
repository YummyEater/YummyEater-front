import React from 'react'
import { AppContent, AppHeader1, AppFooter } from '../components/index'

const DefaultLayout = () => {
  return (
    <div className="bg-white flex flex-col min-h-screen" >
      <AppHeader1 />
      <div className="body flex grow justify-center">
        <AppContent />
      </div>
      <AppFooter />
    </div>
  )
}

export default DefaultLayout