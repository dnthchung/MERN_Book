// import React from "react";
// import { Routes, Route } from "react-router-dom";
// import Home from "./pages/Home";
// import CreateBook from "./pages/CreateBooks";
// import ShowBook from "./pages/ShowBook";
// import EditBook from "./pages/EditBook";
// import DeleteBook from "./pages/DeleteBook";

// const App = () => {
//   return (
//     <Routes>
//       <Route path="/" element={<Home />} />
//       <Route path="/books/create" element={<CreateBook />} />
//       <Route path="/books/details/:id" element={<ShowBook />} />
//       <Route path="/books/edit/:id" element={<EditBook />} />
//       <Route path="/books/delete/:id" element={<DeleteBook />} />
//     </Routes>
//   );
// };

// export default App;

import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
// import "./App.css";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="bg-red-400 text-white">App</div>
    </>
  );
}

export default App;
