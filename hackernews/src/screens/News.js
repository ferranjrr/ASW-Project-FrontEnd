import React, { useState, useEffect } from "react";

//import axios from "axios";
import logo from "../assets/gif/y18.gif";
import "../css/news.css";

function News() {
	const [data, setData] = useState(null);

	useEffect(() => {
		//fetchSubmissions();
	});

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
											<a href="../">new</a> |<a href="../">threads</a> |
											<a href="../">past</a> |<a href="../">ask</a> |
											<a href="../">submit</a>
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
								<td align="right" valign="top" className="title">
									<span className="rank">x. </span>
								</td>
								<td valign="top" className="votelinks">
									<a id="up_{{ submission.id }}" href="../">
										<div className="votearrow" title="upvote"></div>
									</a>
								</td>
								<td className="title">
									<a href="../" className="titlelink">
										títol
									</a>
									<span className="sitebit comhead">
										(
										<a href="../">
											<span className="sitestr">domini</span>
										</a>
										)
									</span>
									<a href="../" className="titlelink">
										"títol"
									</a>
								</td>
								<tr>
									<td colspan="2"></td>
									<td className="subtext">
										<span className="score" id="score_{{ submission.id }}">
											2 points{" "}
										</span>{" "}
										by
										<a href="../">username</a>
										<span className="age" title="2022-03-23T23:36:00">
											<a href="item/{{ submission.id }}">14 hours</a>
										</span>
										|
										<a
											id="un_{{ submission.id }}"
											className="clicky"
											href="../"
										>
											unvote
										</a>{" "}
										|<a href="../">hide</a>|<a href="../">14 comments</a>
									</td>
								</tr>
								<tr className="spacer" style={{ height: 5 }}></tr>
							</table>
						</td>
					</tr>
				</table>
			</center>
		</body>
	);
}

export default News;
