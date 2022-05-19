import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

import "../css/news.css";

function User() {
	const [params, setParams] = useState(null);
	const location = useLocation();

	useEffect(() => {
		//fetchUser
		const queryParams = new URLSearchParams(location.search);
		const singleValue = queryParams.get("id");
		if (!singleValue) return;
		setParams(singleValue);
	}, []);

	return (
		<body>
			<h1>user {params}</h1>
		</body>
	);
}

export default User;
