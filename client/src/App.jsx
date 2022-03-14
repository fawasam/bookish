import {BrowserRouter ,Route,Routes } from 'react-router-dom'

//imports 
import Header from './components/Header';
// import Footer from './components/Footer';
import Home from './pages/home/Home';
import Books from './pages/books/Books';
import Contact from './pages/contact/Contact';
import Login from './pages/login/Login';
import Signup from './pages/signup/Signup';
import AddBook from './pages/addBook/AddBook';
import Book from './pages/books/Book';
import Mybooks from './pages/myBooks/Mybooks';
import SavedBooks from './pages/savedBooks/SavedBooks';
import UserList from './pages/user/UserList';
import UserEdit from './pages/user/UserEdit';
import BookList from "./pages/BookList"
import Profile from './pages/Profile';
import BookEdit from './pages/BookEdit';
import Notfound from './components/Notfound';

function App() {
  return (
     <BrowserRouter>
        <Header />
        <div className="main">
        <Routes>
            <Route exact path="/" element={<Home/>} />
            <Route exact path="/profile" element={<Profile/>} />
            <Route exact path="/books" element={<Books/>} />
            <Route exact path="/contact" element={<Contact/>} />
            <Route exact path="/login" element={<Login/>} />
            <Route exact path="/signup" element={<Signup/>} /> 
            <Route exact path="/addbook" element={<AddBook/>} /> 
            <Route exact path="/books/:id" element={<Book/>} /> 
            <Route exact path="/book/:id/edit" element={<BookEdit/>} /> 
            <Route exact path="/mybooks/:id" element={<Mybooks/>} /> 
            <Route exact path="/savedbooks/:id" element={<SavedBooks/>} /> 
            <Route exact path="/admin/userList" element={<UserList/>} /> 
            <Route exact path="/admin/bookList" element={<BookList/>} /> 
            <Route exact path="/admin/user/:id/edit" element={<UserEdit/>} /> 
            <Route  element={<Notfound/>} /> 
          </Routes>   
        </div>
        {/* <Footer/> */}
      </BrowserRouter>
  );
}

export default App;
