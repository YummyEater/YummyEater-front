import React from 'react'
import { AppContent, AppHeader1 } from '../components/index'

const DefaultLayout = () => {
  return (
    <div>
      <div className="wrapper d-flex flex-column min-vh-100 bg-light">
        <AppHeader1 />
        <div className="body flex-grow-1 flex justify-center ">
          <AppContent />
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout
