import React from 'react';
import AddBook from './components/books/AddBook';
import Home from './components/Home';

import { Route, Link, Routes } from 'react-router-dom';
import EditBook from './components/books/EditBook';

function App() {

  return (
    <div className="bg-slate-600">

    <header className="bg-white py-10">
      <nav className="h-full">
        <div className="container mx-auto flex justify-between items-center">
            <h3 className="text-2xl font-bold">Gabi Books</h3>
            <ul className="hidden md:flex space-x-6">
              <li><Link to="/" className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Home</Link></li>
              <li><Link to="/books/add_book" className="bg-red-400 px-4 py-2 rounded-3xl hover:bg-red-500 text-white">Add Book</Link></li>
            </ul>
        </div>
      </nav>
    </header>
    
    <Routes>
       <Route path="/books/edit_book/:id" element={<EditBook />} />
       <Route path="/books/add_book" element={<AddBook />} />
      <Route path="/" element={<Home />} />
    </Routes>
  </div>
  );
}

export default App;