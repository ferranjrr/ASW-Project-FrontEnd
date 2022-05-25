import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function Submission() {
    const navigate = useNavigate();
    const location = useLocation();
    const [submission, setSubmission] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setLoading] = useState(true);
    const yesterday = new Date(Date.now() - 1 * 864e5 - new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4).toISOString().split('T')[0]
    
    //let responseJ;

/*
    const response = fetch("https://aswprojectdjango.herokuapp.com/api/submission/2", {method: 'GET'});

    console.log(response);

    const responseJ = response.json();

    return (
        
        <pre>{JSON.stringify(response, null, 2)}</pre>
    );

*/
const id = location.pathname.substring(location.pathname.lastIndexOf("/") + 1);

    useEffect(() => {
        if (!id) return;
		if (isLoading) {
			axios
				.get("https://aswprojectdjango.herokuapp.com/api/submission/" + id)
				.then((response) => {
					setSubmission(response.data);
                    setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);


    if (isLoading) {
		return <td>Loading...</td>;
	}


    const renderItem = (value, index) => {
        return (
             <div>
            <h1>The value {submission.id} is </h1>
		</div> 
        );
    };

    const handleSubmitComment = (data) => {
        if (data.text == "") {
            setError("neitherURLorText", {
                type: "manual",
                message: "The text of the comment can't be empty"
              });
              return;
        }
        console.log(data);
        axios
            .post("https://aswprojectdjango.herokuapp.com/api/" + id  + "comment?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56"
            + "&text=" + data.text
            )
            .then(function(response) {
                console.log(response);
                navigate('/submission/' + id);
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
        <body>
            <center>
                <table id="hnmain"
                    border="0"
                    cellpadding="0"
                    cellspacing="0"
                    width="85%"
                    bgcolor="#f6f6ef">
                    <tr>
                        <td bgcolor="#ff6600">
                            <table
                                border="0"
                                cellpadding="0"
                                cellspacing="0"
                                width="100%"
                                style={{ padding: 2 }}>
                                <tr>
                                    <td style={{ width: 18, paddingRight: 4 }}>
                                        <a href="../">
                                            <img
                                                src={logo}
                                                alt=""
                                                width="18"
                                                height="18"
                                                style={{ border: "1px solid white" }}
                                            />
                                        </a>
                                    </td>
                                    <td style={{ height: 10 }}>
                                    <span className="pagetop">
											<b className="hnname">
												<a href="../">Hacker News</a>
											</b>
											<a href="../newest">new</a> | <a href="../">threads</a> |{" "}
											<a href={"../past?date="+yesterday}>past</a> | <a href="../ask">ask</a> |{" "}
											<a href="../submit">submit</a>
										</span>
									</td>
									<td style={{ textAlign: "right", paddingRight: 4 }}>
										<span className="pagetop">
											<a href="../">login</a>
										</span>
									</td>
								</tr>
                            </table>
                        </td>
                    </tr>
                    <tr id="pagespace" title="" style={{ height: 10 }}></tr>
                    <tr>
                        <td>
                            {submission ?
                            <table class="fatitem" border="0">
                                <tbody>
                                <tr class="athing" id="31026659">
                                    <td class="title" valign="top" align="right">
                                        <span class="rank"></span>
                                    </td>
                                    <td class="votelinks" valign="top">
                                        <center>
                                            <a id="up_31026659" class="clicky" href="vote?id=31026659&amp;how=up&amp;goto=item%3Fid%3D31026659">
                                                <div class="votearrow" title="upvote"></div>
                                            </a>
                                        </center>
                                    </td>
                                    {"url" == submission.type ?
                                    <td class="title">
                                        <a href="{{ submission.url }}"
                                        class="titlelink">
                                            { submission.title }
                                        </a>
                                        <span class="sitebit comhead">
                                            (<a href="{{ submission.url }}">
                                            <span class="sitestr">{ submission.url }
                                            </span>
                                            </a>)
                                        </span>
                                    </td>
                                    :
                                    <td class="title">
                                        <a href="{% url 'detailedSubmission' submission.id %}"
                                        class="titlelink">
                                            { submission.title }
                                        </a>
                                    </td>
                                    }
                                </tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td class="subtext">
                                        <span class="score" id="score_30784939">{ submission.upvotes.count } points </span> by 
                                        <a href="{% url 'user' submission.author %}">{ submission.author }</a>
                                        <span class="age">
                                            <a href="{% url 'detailedSubmission' submission.id %}">{ submission.age }</a>
                                        </span>|
                                        <a href="hide?id=30784939&amp;goto=news">hide</a>|
                                        <a href="{% url 'detailedSubmission' submission.id %}">{ submission.comments.count }&nbsp;comments</a>
                                    </td>
                                </tr>
                                <tr style={{ height: 10 }}></tr>
                                <tr>
                                    <td colspan="2"></td>
                                    <td>{submission.text}
                                        <p></p>
                                    </td>
                                </tr>

                                <form onSubmit={handleSubmit(handleSubmitComment)}>
                                 <tr style={{ height: 10 }}></tr>    
                                 <div>
                                <input type="text" name="text" {...register('text', { required: true })} />
                                </div>
                                {errors.neitherURLorText && (
                                 <p style={{ color: "red" }}>{errors.neitherURLorText.message}</p>
                                )}
                                <button onClick={() => clearErrors("neitherURLorText")}>SubmitComment</button>
                                
                                </form>
                               
    
                            
                            </tbody>   
                            </table>
                            :
                            <p>No submissions available.</p>
                            }
                            
                        </td>
                    </tr>
                </table>
            </center>
        </body>        
    );
}
export default Submission;