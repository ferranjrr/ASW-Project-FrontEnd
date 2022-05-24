import React from "react";
import { useForm } from "react-hook-form";

import "../css/news.css";
import logo from "../assets/gif/y18.gif";
import axios from "axios";

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
    axios
        .post("https://aswprojectdjango.herokuapp.com/api/submit?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56"
                + "&title=" + data.title + "&url=" + data.url + "&text=" + data.text
        )
        .then(function(response) {
            console.log(response);
        })
        .catch(function(err) {
            console.log(err.response);
        });
    reset();
  }

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors },
    clearErrors,
    reset
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