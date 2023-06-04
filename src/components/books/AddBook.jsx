import React, {useEffect} from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addBook } from "../../store/api/BookSlice";

const AddBook = () => {

  const dispatch = useDispatch();

  const navigate = useNavigate();

  const initialValues = {
    title: "",
    author: "",
    price: "",
    image: "",
  };

  const validationSchema = Yup.object({
    title: Yup.string().required("Title is required"),
    price: Yup.number().required("Price is required"),
    image: Yup.string().required("Image is required"),
  });

  const handleSubmit = (values) => {

    dispatch(addBook({
      title: values.title,
      author: values.author,
      price: values.price,
        image: values.image,
    })).then(() => {

             navigate("/");
        
    });
  };

  return (
    <div className="min-h-screen flex flex-row items-center justify-center bg-gray-200">
      <div className="mx-auto rounded-lg bg-white p-10 shadow md:w-3/4 lg:w-1/2">
        <h4 className="mb-10 text-2xl font-bold">Add Book</h4>
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          <Form>
            <div className="mb-5">
              <Field
                type="text"
                id="title"
                name="title"
                placeholder="Title"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="title"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="author"
                name="author"
                placeholder="Author"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="author"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="number"
                id="price"
                name="price"
                placeholder="Price"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="price"
                component="div"
                className="text-red-500"
              />
            </div>
            <div className="mb-5">
              <Field
                type="text"
                id="image"
                name="image"
                placeholder="Image"
                className="w-full rounded border border-gray-300 p-3 shadow"
              />
              <ErrorMessage
                name="image"
                component="div"
                className="text-red-500"
              />
            </div>
            <button
              type="submit"
              className="mt-4 rounded-3xl bg-red-400 px-12 py-3 text-white hover:bg-red-500"
            >
              Add Book
            </button>
          </Form>
        </Formik>
      </div>
    </div>
  );
};

export default AddBook;