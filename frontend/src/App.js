import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./components/Login";
import Users from "./pages/Users";
import Posts from "./pages/Posts";
import AddUser from "./pages/AddUser";
import EditUser from "./pages/EditUser";
import AddPost from "./pages/AddPost";
import EditPost from "./pages/EditPost";

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login/>}/>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/users" element={<Users/>}/>
          <Route path="/users/add" element={<AddUser/>}/>
          <Route path="/users/edit/:id" element={<EditUser/>}/>
          <Route path="/posts" element={<Posts/>}/>
          <Route path="/posts/add" element={<AddPost/>}/>
          <Route path="/posts/edit/:id" element={<EditPost/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
