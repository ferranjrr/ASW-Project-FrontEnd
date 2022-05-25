import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function Submission() {
	const [error, setError] = useState(null);
	const [isLoading, setLoading] = useState(true);
	const location = useLocation();
	const [data, setData] = useState(null);
	const [comments, setComments] = useState();
	const [tree, setTree] = useState([]);
	const yesterday = new Date(
		Date.now() -
			1 * 864e5 -
			new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
	)
		.toISOString()
		.split("T")[0];

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
								<center>
									<a id="up_30983757" className="clicky" href="../">
										<div className="votearrow" title="upvote"></div>
									</a>
								</center>
							</td>
							<td className="default">
								<div style={{ marginTop: 2, marginBottom: -20 }}>
									<span className="comhead">
										<Link
											to={{
												pathname: "/user",
												search: "?id=" + comment.authorUsername,
											}}
										>
											{comment.authorUsername}
										</Link>{" "}
										<span className="age" title={comment.age}>
											<span href="../">{comment.age}</span>
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
													<a href="../">reply</a>
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
											<a href="../newest">new</a>
											{" | "}
											<Link
												to={{
													pathname: "/threads",
													search: "?user=" + "pau",
												}}
											>
												threads
											</Link>
											{" | "}
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
										<td class="votelinks" valign="top">
											<center>
												<a
													id="up_31026659"
													class="clicky"
													href="vote?id=31026659&amp;how=up&amp;goto=item%3Fid%3D31026659"
												>
													<div class="votearrow" title="upvote"></div>
												</a>
											</center>
										</td>
										<td class="title">
											<a href="{{ submission.url }}" class="titlelink">
												{data.title}
											</a>{" "}
											{data.type === "url" && (
												<span class="sitebit comhead">
													<a href="{{ submission.url }}">
														<span class="sitestr">({data.url})</span>
													</a>
												</span>
											)}
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
											<a href="{% url 'user' submission.author %}">
												{data.authorUsername}
											</a>{" "}
											<span class="age">
												<sp href="{% url 'detailedSubmission' submission.id %}">
													{data.age}
												</sp>
											</span>{" "}
											{" | "}
											<Link
												to={{
													pathname: "/submission",
													search: "?id=" + data.id,
												}}
											>
												{data.comments} comments
											</Link>
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
												method="post"
												action="{% url 'detailedSubmission' submission.id %}"
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
												<textarea name="text" rows="8" cols="80"></textarea>
												<input type="submit" value="submitComment"></input>
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
