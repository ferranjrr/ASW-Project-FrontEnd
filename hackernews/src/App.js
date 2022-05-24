import { Routes, Route } from "react-router-dom";
import News from "./screens/NewsScreen";
import User from "./screens/UserScreen";
import SubmitForm from "./screens/SubmitScreen";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<News />} />
				<Route path="/news" element={<News />} />
				<Route path="/user" element={<User />} />
				<Route path="/submit" element={<SubmitForm />} />
			</Routes>
		</div>
	);
}

export default App;
