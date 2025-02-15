import React from "react";
import { Route, Router, Routes } from "react-router-dom";
import EditBook from "./pages/EditBook";
import CreateBooks from "./pages/CreateBooks";
import DeleteBook from "./pages/DeleteBook";
import Home from "./pages/Home";
import ShowBook from "./pages/ShowBook";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/books/create" element={<CreateBooks />} />
      <Route path="/books/details/:id" element={<ShowBook />} />
      <Route path="/books/delete/:id" element={<DeleteBook />} />
      <Route path="/books/edit/:id" element={<EditBook />} />
    </Routes>
  );
};

export default App;
