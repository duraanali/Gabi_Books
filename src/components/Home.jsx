import React, {useEffect} from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { deleteBook, fetchBooks } from "../store/api/BookSlice";

function Home() {

  const books = useSelector((state) => state.book.books);

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);


  const handleBookDelete = (bookId) => {
    dispatch(deleteBook(bookId));
  };

  return (
    <div>
    <section className="flex bg-gradient-to-r from-red-100 to-orange-100 h-80">
      <div className="container mx-auto flex justify-center items-center flex-col">
        <h1 className="text-black text-4xl md:text-5xl font-bold text-center w-1/2">
          Buy and Sell Gabi Books
        </h1>
      </div>
      </section>
      <div className="flex flex-row flex-wrap justify-center p-10 items-center bg-gray-200">
    {books.map((product) =>
        <div className="bg-white shadow-md hover:scale-105 hover:shadow-xl duration-500 m-5" key={product.id}>
        <Link to={`/books/edit_book/${product.id}`}>
            <img src={product.image} alt="Product image" className="h-80 w-72 object-cover" />
        </Link>
        <div className="px-4 py-3 w-72">
            <p className="text-lg font-bold text-black truncate block capitalize">{product.title}</p>
            <span className="text-gray-400 mr-3 text-xs">{product.author}</span>
            <div className="flex items-center">
            <p className="text-lg font-semibold text-black cursor-auto my-3">${product.price}</p>
            <div className="ml-auto flex flex-row space-x-5">
            <button onClick={() => handleBookDelete(product.id)}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 1024 1024">
                <path d="M864 256H736v-80c0-35.3-28.7-64-64-64H352c-35.3 0-64 28.7-64 64v80H160c-17.7 0-32 14.3-32 32v32c0 4.4 3.6 8 8 8h60.4l24.7 523c1.6 34.1 29.8 61 63.9 61h454c34.2 0 62.3-26.8 63.9-61l24.7-523H888c4.4 0 8-3.6 8-8v-32c0-17.7-14.3-32-32-32zm-200 0H360v-72h304v72z" />

   
                </svg>
                </button>
                <Link to={`/books/edit_book/${product.id}`}>
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="currentColor" className="bi bi-bag-plus" viewBox="0 0 24 24">
                <path d="M7 17.013l4.413-.015 9.632-9.54c.378-.378.586-.88.586-1.414s-.208-1.036-.586-1.414l-1.586-1.586c-.756-.756-2.075-.752-2.825-.003L7 12.583v4.43zM18.045 4.458l1.589 1.583-1.597 1.582-1.586-1.585 1.594-1.58zM9 13.417l6.03-5.973 1.586 1.586-6.029 5.971L9 15.006v-1.589z" />
      <path d="M5 21h14c1.103 0 2-.897 2-2v-8.668l-2 2V19H8.158c-.026 0-.053.01-.079.01-.033 0-.066-.009-.1-.01H5V5h6.847l2-2H5c-1.103 0-2 .897-2 2v14c0 1.103.897 2 2 2z" />
   
                </svg>
                </Link>
            </div>
            </div>
        </div>
        </div>
    )}
    </div>
   </div>
  );
}

export default Home;
