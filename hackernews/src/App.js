import { Routes, Route } from "react-router-dom";
import News from "./screens/News";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<News />} />
				<Route path="/news" element={<News />} />
			</Routes>
		</div>
	);
}

export default App;
