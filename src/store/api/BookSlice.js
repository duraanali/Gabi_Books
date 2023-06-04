import {createSlice, createAsyncThunk} from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
    books: [],
    status: "idle",
    error: null
};

export const fetchBooks = createAsyncThunk("book/fetchBooks", async () => {
    const response = await axios.get("http://localhost:8000/books");
    return response.data;
});

export const addBook = createAsyncThunk("book/addBook", async (newBook) => {
    const response = await axios.post("http://localhost:8000/books", newBook);
    return response.data;
});

export const editBook = createAsyncThunk("book/editBook", async ({bookId, updatedBook}) => {
    const response = await axios.put(`http://localhost:8000/books/${bookId}`, updatedBook);
    return response.data;
});

export const deleteBook = createAsyncThunk("book/deleteBook", async (bookId) => {
    await axios.delete(`http://localhost:8000/books/${bookId}`);
    return bookId;
});

export const bookSlice = createSlice({
    name: "book",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchBooks.pending, (state) => {
            state.status = "loading";
            state.error = null;
        }).addCase(fetchBooks.fulfilled, (state, action) => {
            state.status = "succeeded";
            state.books = action.payload;
        }).addCase(fetchBooks.rejected, (state, action) => {
            state.status = "failed";
            state.error = action.error.message;
        }).addCase(addBook.fulfilled, (state, action) => {
            state.books.push(action.payload);
        }).addCase(editBook.fulfilled, (state, action) => {
            const {bookId, updatedBook} = action.payload;
            const existingBook = state.books.find((book) => book.id === bookId);
            if (existingBook) {
                existingBook.title = updatedBook.title;
                existingBook.author = updatedBook.author;
                existingBook.price = updatedBook.price;
                existingBook.image = updatedBook.image;
            }
        }).addCase(deleteBook.fulfilled, (state, action) => {
            const bookId = action.payload;
            state.books = state.books.filter((book) => book.id !== bookId);
        });
        
    }
});

export default bookSlice.reducer;
