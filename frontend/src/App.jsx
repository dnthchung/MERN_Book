import { useState } from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home.jsx";
import CreateBook from "./pages/CreateBooks.jsx";
import ShowBook from "./pages/ShowBook.jsx";
import EditBook from "./pages/EditBook.jsx";
import DeleteBook from "./pages/DeleteBook.jsx";

const App = () => {
  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/books/create" element={<CreateBook />} />
        <Route path="/books/details/:id" element={<ShowBook />} />
        <Route path="/books/edit/:id" element={<EditBook />} />
        <Route path="/books/delete/:id" element={<DeleteBook />} />
      </Routes>
      <h1>hi</h1>
    </>
  );
};

export default App;
