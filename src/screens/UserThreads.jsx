import React, { useState, useEffect } from "react";
import { Link, useSearchParams, useLocation } from "react-router-dom";
import axios from "axios";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function UserThreads() {
	const location = useLocation();
	const [data, setData] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setLoading] = useState(true);
	const [tree, setTree] = useState([]);
	const yesterday = new Date(
		Date.now() -
			1 * 864e5 -
			new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4
	)
		.toISOString()
		.split("T")[0];

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

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const username = queryParams.get("user");
		if (!username) return;
		if (isLoading) {
			axios
				.get(
					"https://aswprojectdjango.herokuapp.com/api/" + username + "/comments"
				)
				.then((response) => {
					setData(response.data);
					setTree(createTree(response.data));
				})
				.then(() => {
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

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
											<a href="../">{comment.age}</a>
										</span>
										<span id="unv_30983269"></span>
										<span className="onstory">
											{" "}
											| on: <a href="../">{comment.title}</a>{" "}
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
					width="80%"
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
										<span className="pagetop">
											<b className="hnname">
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
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								className="itemlist"
							>
								{tree.map((comment) => {
									return <Comment key={comment.id} comment={comment} />;
								})}
							</table>
						</td>
					</tr>
				</table>
			</center>
		</body>
	);
}

export default UserThreads;
