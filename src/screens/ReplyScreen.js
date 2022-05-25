import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useSearchParams, useLocation } from "react-router-dom";

import "../css/news.css";
import axios from "axios";

function ReplyForm () {
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams();

  useEffect(() => {
	    const queryParams = new URLSearchParams(location.search);
		const id = queryParams.get("id");
		if (!id) navigate('/');
		register('id', {value: id});
		const submission_id = queryParams.get("submission_id");
		if (!submission_id) navigate('/');
		register('submission_id', {value: submission_id});
	}, []);

  const handleSubmission = (data) => {
    console.log(data);
    axios
        .post("https://aswprojectdjango.herokuapp.com/api/comment/" + data.id + "/reply?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56"
                + "&text=" + data.reply
        )
        .then(function(response) {
            console.log(response);
            navigate('/submission/' + data.submission_id);
        })
        .catch(function(err) {
            console.log(err.response);
        });
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
        <textarea type="text" name="reply" {...register('reply', { required: true })} />
      </div>
      <button>Reply</button>
    </form>
  );
};
export default ReplyForm;