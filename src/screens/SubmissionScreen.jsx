import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function Submission() {
    const navigate = useNavigate();
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [comment, setComment] = useState(null);
	const [comments, setComments] = useState();
	const [tree, setTree] = useState([]);
	const yesterday = new Date(
		Date.now() -
			1 * 864e5 -
			new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
	)
		.toISOString()
		.split("T")[0];

	const {
        register,
        handleSubmit,
        formState: { errors },
        clearErrors
    } = useForm();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const id = queryParams.get("id");

		if (isLoading) {
			axios
				.get("https://aswprojectdjango.herokuapp.com/api/submission/" + id)
				.then((response) => {
					setData(response.data);
					getComments(id);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const handleSubmitComment = (data2) => {
        console.log(data2);
        axios
            .post("https://aswprojectdjango.herokuapp.com/api/submission/" + data.id  + "/comment?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56"
            + "&text=" + data2.text
            )
            .then(function(response) {
                console.log(response);
                window.location.reload(false);
            })
            .catch(function(err) {
                console.log(err.response);
        });
    }

	function getComments(id) {
		axios
			.get(
				"https://aswprojectdjango.herokuapp.com/api/submission/" +
					id +
					"/comments"
			)
			.then((response) => {
				setComments(response.data);
				setTree(createTree(response.data));
			})
			.then(() => {
				setLoading(false);
			})
			.catch((err) => {
				console.log(err);
			});
	}

	const createTree = (dades) => {
		let tree = [];
		dades.forEach((item) => {
			item["children"] = [];
		});
		for (let i = 0; i < dades.length; i++) {
			if (dades[i].parent_id) {
				let parent = dades
					.filter((elem) => elem.id === dades[i].parent_id)
					.pop();

				parent["children"].push(dades[i]);
			} else {
				tree.push(dades[i]);
			}
		}
		return tree;
	};

	if (error) {
		return <div>Error: {error.message}</div>;
	}

	if (isLoading) {
		return <div className="App"></div>;
	}

	function upvoteSubmission (submission_id) {
	    axios
				.post("https://aswprojectdjango.herokuapp.com/api/submission/" + submission_id + "/upvote?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56")
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
	}

	function upvoteComment (comment_id) {
	    axios
				.post("https://aswprojectdjango.herokuapp.com/api/comment/" + comment_id + "/upvote?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56")
				.then((response) => {
					console.log(response);
				})
				.catch((err) => {
					console.log(err);
				});
	}

	function Comment({ comment }) {
		const nestedComments = (comment.children || []).map((comment) => {
			return <Comment key={comment.id} comment={comment} type="child" />;
		});

		console.log(nestedComments);
		return (
			<tr>
				<td>
					<table>
						<tr>
							<td valign="top" className="votelinks">
                                            <a id="up_{{ submission.id }}" href={"/submission?id="+data.id}>
                                                <button className="votearrow" title="upvote" onClick={ () => upvoteComment(comment.id)}></button>
                                            </a>
                                        </td>
							<td className="default">
								<div style={{ marginTop: 2, marginBottom: -20 }}>
									<span className="comhead">
										<a href="../" class="hnuser">
											{comment.authorUsername}
										</a>{" "}
										<span className="age" title={comment.age}>
											<a href="../">{comment.age}</a>
										</span>
									</span>
								</div>
								<br />
								<div className="comment">
									<p>
										<span className="commtext c00">{comment.text}</span>
									</p>
									<div className="reply">
										<p>
											<font size="1">
												<u>
													<a href={"/reply?id=" + comment.id + "&submission_id=" + comment.submission_id}>reply</a>
												</u>
											</font>
										</p>
									</div>
								</div>
								{nestedComments}
							</td>
						</tr>
					</table>
				</td>
			</tr>
		);
	}

	return (
		<body>
			<center>
				<table
					id="hnmain"
					border="0"
					cellpadding="0"
					cellspacing="0"
					width="85%"
					bgcolor="#f6f6ef"
				>
					<tr>
						<td bgcolor="#ff6600">
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								width="100%"
								style={{ padding: 2 }}
							>
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
										<span class="pagetop">
											<b class="hnname">
												<a href="../">Hacker News</a>
											</b>
											<a href="../newest">new</a> | <a href="../threads?user=pau">threads</a> |{" "}
											<a href={"../past?date=" + yesterday}>past</a> |{" "}
											<a href="../ask">ask</a> | <a href="../submit">submit</a>
										</span>
									</td>
									<td style={{ textAlign: "right", paddingRight: 4 }}>
										<span class="pagetop">
											<span className="pagetop">
												<a href="../">login</a>
											</span>
										</span>
									</td>
								</tr>
							</table>
						</td>
					</tr>
					<tr id="pagespace" title="" style={{ height: 10 }}></tr>
					<tr>
						<td>
							<table class="fatitem" border="0">
								<body>
									<tr class="athing" id="31026659">
										<td class="title" valign="top" align="right">
											<span class="rank"></span>
										</td>
										<td valign="top" className="votelinks">
                                            <a id="up_{{ submission.id }}" href={"/submission?id="+data.id}>
                                                <button className="votearrow" title="upvote" onClick={ () => upvoteSubmission(data.id)}></button>
                                            </a>
                                        </td>
										<td class="title">
											<a href={"/submission?id=" + data.id} className="titlelink"> {data.title} </a>
											<span class="sitebit comhead">
												(
												<a href={ data.url } target="_blank">
													<span class="sitestr">{data.url}</span>
												</a>
												)
											</span>
										</td>
										<td class="title">
											<a
												href="{% url 'detailedSubmission' submission.id %}"
												class="titlelink"
											></a>
										</td>
									</tr>
									<tr>
										<td colspan="2"></td>
										<td class="subtext">
											<span class="score" id="score_30784939">
												{data.upvotes}
												{" points by "}
											</span>
											<a href={"/user?id=" + data.authorUsername}>
												{data.authorUsername}
											</a>{" "}
											<span class="age">
												<a href={"/past?date=" + data.posted_at_date}>
													{data.age}
												</a>
											</span>{" "}
											<a href={"/submission?id=" + data.id}>
												{data.comments} comments
											</a>
										</td>
									</tr>
									<tr style={{ height: 2 }}></tr>
									<tr>
										<td colspan="2"></td>
									</tr>
									<tr style={{ height: 2 }}></tr>
									<tr>
										<td colspan="2"></td>
										<td>
											<form
												onSubmit={handleSubmit(handleSubmitComment)}
											>
												<input
													type="hidden"
													name="submission"
													value="{{submission.id}}"
												></input>
												<input
													type="hidden"
													name="parent"
													value="{{submission.id}}"
												></input>
												<textarea name="text" {...register('text', { required: true })} />
												<button>submitComment</button>
											</form>
										</td>
									</tr>
								</body>
							</table>
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								className="itemlist"
							>
								{comments.length ? (
									tree.map((comment) => {
										return <Comment key={comment.id} comment={comment} />;
									})
								) : (
									<p>No comments available.</p>
								)}
							</table>
						</td>
					</tr>
				</table>
			</center>
		</body>
	);
}

export default Submission;
