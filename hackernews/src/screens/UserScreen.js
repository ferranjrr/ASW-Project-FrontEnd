import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";

import "../css/news.css";
import logo from "../assets/gif/y18.gif";
import axios from "axios";

function User() {
	const navigate = useNavigate();
	const location = useLocation();
	const [user, setUser] = useState(null);
	const [isLoading, setLoading] = useState(true);
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
		setError,
		formState: { errors },
		clearErrors,
	} = useForm();

	useEffect(() => {
		const queryParams = new URLSearchParams(location.search);
		const singleValue = queryParams.get("id");
		if (!singleValue) return;
		if (isLoading) {
			axios
				.get("https://aswprojectdjango.herokuapp.com/api/" + singleValue)
				.then((response) => {
					setUser(response.data);
					setLoading(false);
				})
				.catch((err) => {
					console.log(err);
				});
		}
	}, []);

	const handleUpdate = (data) => {
		axios
			.put(
				"https://aswprojectdjango.herokuapp.com/api/editProfile?token=3dc9e4d05afb7904e557ccfc80148ae3ff18ea56" +
					"&about=" +
					data.about
			)
			.then(function (response) {
				console.log(response);
				window.location.reload(false);
			})
			.catch(function (err) {
				console.log(err.response);
			});
	};

	if (isLoading) {
		return <div className="App"></div>;
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
											<a href="../newest">new</a> | <a href="../">threads</a> |{" "}
											<a href={"../past?date=" + yesterday}>past</a> |{" "}
											<a href="../ask">ask</a> | <a href="../submit">submit</a>
										</span>
									</td>
									<td style={{ textAlign: "right", paddingRight: 4 }}>
										<span class="pagetop">
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
							{!user.email && (
								<table border="0" cellpadding="0" cellspacing="0">
									<tr>
										<td bgcolor="#ffffaa">
											<table cellpadding="5" width="100%">
												<tr>
													<td>
														Please put a valid address in the email field, or we
														won't be able to send you a new password if you
														forget yours. Your address is only visible to you
														and us. Crawlers and other users can't see it.
													</td>
												</tr>
											</table>
										</td>
									</tr>
								</table>
							)}
							{user.username === "pau" ? (
								<form
									onSubmit={handleSubmit(handleUpdate)}
									class="profileform"
									method="post"
									action="{% url 'user' request.user.username %}"
								>
									<input type="hidden" name="id" value="{{ user.id }}" />
									<input
										type="hidden"
										name="hmac"
										vaSlue="9c904cf55a56feeb4f21639b7dcfb5805e0a8485"
									/>
									<table border="0">
										<tr class="athing">
											<td valign="top">user:</td>
											<td timestamp="1649170369">
												<a href="../" class="hnuser"></a>
												<font color="#3c963c">{user.username}</font>
											</td>
										</tr>
										<tr>
											<td valign="top">created:</td>
											<td>{user.age}</td>
										</tr>
										<tr>
											<td valign="top">karma:</td>
											<td>{user.karma}</td>
										</tr>
										<tr>
											<td valign="top">about:</td>
											<textarea
												cols="60"
												rows="5"
												wrap="virtual"
												name="about"
												{...register("about")}
											>
												{user.about}
											</textarea>
										</tr>
										<tr>
											<td></td>
											<td>
												<font size="2">
													Only admins see your email below. To share publicly,
													add to the 'about' box.
												</font>
											</td>
										</tr>
										<tr>
											<td valign="top">email:</td>
											<td>{user.email}</td>
										</tr>
										<tr>
											<td valign="top">showdead:</td>
											<td>
												<select name="showd">
													<option selected={user.showdead === true}>yes</option>
													<option selected={user.showdead === false}>no</option>
												</select>
											</td>
										</tr>
										<tr>
											<td valign="top">noprocrast:</td>
											<td>
												<select name="nopro">
													<option selected={user.noprocrast === true}>
														yes
													</option>
													<option selected={user.noprocrast === false}>
														no
													</option>
												</select>
											</td>
										</tr>
										<tr>
											<td valign="top">maxvisit:</td>
											<td>
												<input
													type="text"
													name="maxv"
													value={user.maxvisit}
													size="16"
												/>
											</td>
										</tr>
										<tr>
											<td valign="top">minaway:</td>
											<td>
												<input
													type="text"
													name="mina"
													value={user.minaway}
													size="16"
												/>
											</td>
										</tr>
										<tr>
											<td valign="top">delay:</td>
											<td>
												<input
													type="text"
													name="delay"
													value={user.delay}
													size="16"
												/>
											</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<a href="../">
													<u>submissions</u>
												</a>
											</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<a href="../">
													<u>comments</u>
												</a>
											</td>
										</tr>
										<tr>
											<td></td>
											<td>
												<a href="../">
													<u>upvoted submissions</u>
												</a>{" "}
												/
												<a href="../">
													<u>comments</u>
												</a>
												&nbsp;
												<span style={{ fontStyle: "italic" }}>(private)</span>
											</td>
										</tr>
									</table>
									<br />
									<input type="submit" value="update" />
								</form>
							) : (
								<table border="0">
									<tr class="athing">
										<td valign="top">user:</td>
										<td>
											<a href="../" class="hnuser">
												<font color="#3c963c">{user.username}</font>
											</a>
										</td>
									</tr>
									<tr>
										<td valign="top">created:</td>
										<td>
											<a href="../}">{user.created_at_date}</a>
										</td>
									</tr>
									<tr>
										<td valign="top">karma:</td>
										<td>{user.karma}</td>
									</tr>
									<tr>
										<td valign="top">about:</td>
										<td>{user.about}</td>
									</tr>
									<tr>
										<td></td>
										<td>
											<a href="../">
												<u>submissions</u>
											</a>
										</td>
									</tr>
									<tr>
										<td></td>
										<td>
											<a href="../">
												<u>comments</u>
											</a>
										</td>
									</tr>
								</table>
							)}

							<br />
							<br />
						</td>
					</tr>
				</table>
			</center>
		</body>
	);
}

export default User;
