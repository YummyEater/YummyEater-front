import React from 'react'
import { AppContent, AppHeader1 } from '../components/index'

const DefaultLayout = () => {
  return (
    <div className="bg-white">
      <AppHeader1 />
      <div className="body flex grow justify-center">
        <AppContent />
      </div>
    </div>
  )
}

export default DefaultLayout
