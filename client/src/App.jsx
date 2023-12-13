import React from 'react'
import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';

import { Home, CreatePost, PrivacyPolicy } from './pages';

import { logo } from './assets';

const App = () => {
  return (
    <BrowserRouter>
      <header className="w-full flex 
        justify-between items-center 
        bg-white sm:px-8 px-4 py-4 
        border-b border-b-[#e6ebf4]">
          <Link to="/">
            <strong className='font-medium text-xl'>{"{Aymio}"}</strong> <span>Le Lab </span><br/> 
          <span className='text-lime-600'>Comming soon, the coworking designed by Rebecca</span>
          </Link>
          <Link to="/create-post" className='font-inter font-medium bg-[#6469ff] text-white px-4 py-2 rounded-md'>
            Create
          </Link>
      </header>
      <main className="sm:p-8 px-4 py-8 w-full bg-[#f9fafe] min-h-[calc(100vh-73px)]">
        <Routes>
          <Route path="/" element={<Home/>}/>
          <Route path="/create-post" element={<CreatePost/>}/>
          <Route path="/politique-de-confidentialite" element={<PrivacyPolicy/>}/>
        </Routes>
      </main>
      <footer className="bg-gray-100 text-gray-600 text-center text-xs py-3">
        <Link to="/politique-de-confidentialite" className="hover:text-gray-800">
          Politique de Confidentialité
        </Link>
      </footer>
    </BrowserRouter>
  )
}

export default App