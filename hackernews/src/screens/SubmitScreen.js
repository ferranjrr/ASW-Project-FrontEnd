import React from "react";
import { useForm } from "react-hook-form";

import "../css/news.css";
import logo from "../assets/gif/y18.gif";

function SubmitForm () {
  const handleSubmission = (data) => {
    if (!data.url && !data.text) {
      setError("neitherURLorText", {
        type: "manual",
        message: "You must fill out either URL or text"
      });
      return;
    }
    console.log(data);
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors
  } = useForm();

  return (
    <form onSubmit={handleSubmit(handleSubmission)}>
      <div>
        <label>Title</label>
        <input name="title" {...register('title', { required: true })} />
      </div>
      <div>
        <label>URL</label>
        <input type="url" name="url" {...register('url')} />
      </div>
      <div>
        <label>Text</label>
        <input type="text" name="text" {...register('text')} />
      </div>
      {errors.neitherURLorText && (
          <p style={{ color: "red" }}>{errors.neitherURLorText.message}</p>
        )}
      <button onClick={() => clearErrors("neitherURLorText")}>Submit</button>
    </form>
  );
};
export default SubmitForm;