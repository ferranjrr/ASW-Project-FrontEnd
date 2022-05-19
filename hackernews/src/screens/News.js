import React, { Component } from "react";
import "../css/news.css";

export class News extends Component {
	render() {
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
								<p>h</p>
								<td style="line-height: 12pt; height: 10px">
									<b>
										<a href="../">Hacker News</a>
									</b>
								</td>
							</td>
						</tr>
					</table>
				</center>
			</body>
		);
	}
}

export default News;
