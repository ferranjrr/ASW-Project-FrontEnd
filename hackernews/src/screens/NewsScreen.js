import React, { useState, useEffect } from "react";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function News() {
	const [data, setData] = useState([]);
	const [searchParams, setSearchParams] = useSearchParams();
	const [isLoading, setLoading] = useState(true);
    const yesterday = new Date(Date.now() - 1 * 864e5 - new Date(Date.now() - 1 * 864e5).getTimezoneOffset() * 6e4).toISOString().split('T')[0]

	useEffect(() => {
		if (isLoading) {
			axios
				.get("https://aswprojectdjango.herokuapp.com/api/" + "news")
				.then((response) => {
					setData(response.data);
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

	const renderItem = (value, index) => {
		return (
			<div>
				<td align="right" valign="top" className="title">
					<span className="rank">{index + 1}. </span>
				</td>
				<td valign="top" className="votelinks">
					<a id="up_{{ submission.id }}" href="../">
						<div className="votearrow" title="upvote"></div>
					</a>
				</td>
				{value.type === "url" ? (
					<td className="title">
						<a href="../" className="titlelink">
							{value.title}{" "}
						</a>
						<span className="sitebit comhead">
							(
							<a href="../">
								<span className="sitestr">{value.url}</span>
							</a>
							)
						</span>
					</td>
				) : (
					<td className="title">
						<a href="../" className="titlelink">
							{value.title}{" "}
						</a>
					</td>
				)}
				<tr>
					<td colspan="2"></td>
					<td className="subtext">
						<span className="score" id="score_{{ submission.id }}">
							{value.count} points{" "}
						</span>{" "}
						by{" "}
						<Link
							to={{
								pathname: "/user",
								search: "?id=" + value.authorUsername,
							}}
						>
							{value.authorUsername}
						</Link>
						<span className="age" title="2022-03-23T23:36:00">
							{" "}
							<a href="item/{{ submission.id }}">{value.age} </a>
						</span>
						|{" "}
						<a id="un_{{ submission.id }}" className="clicky" href="../">
							unvote
						</a>{" "}
						| <a href="../">hide</a> |{" "}
						<a href="../"> {value.comments} comments</a>
					</td>
				</tr>
				<tr className="spacer" style={{ height: 20 }}></tr>
			</div>
		);
	};

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
							<table
								border="0"
								cellpadding="0"
								cellspacing="0"
								className="itemlist"
							>
								{data.map((value, index) => renderItem(value, index))}
							</table>
						</td>
					</tr>
				</table>
			</center>
		</body>
	);
}

export default News;
