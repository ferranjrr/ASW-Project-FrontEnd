import { Routes, Route } from "react-router-dom";
import News from "./screens/NewsScreen";
import User from "./screens/UserScreen";
import SubmitForm from "./screens/SubmitScreen";
import UpvotedSubmissions from "./screens/UpvotedSubmissionsScreen";
import UserSubmissions from "./screens/UserSubmissionsScreen";
import Ask from "./screens/AskScreen";
import Past from "./screens/PastScreen";
import UserComments from "./screens/UserCommentsScreen";
import ReplyForm from "./screens/ReplyScreen";
import Newest from "./screens/NewestScreen";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<News />} />
				<Route path="/news" element={<News />} />
				<Route path="/user" element={<User />} />
				<Route path="/submit" element={<SubmitForm />} />
				<Route path="/upvotedSubmissions" element={<UpvotedSubmissions />} />
				<Route path="/user/submissions" element={<UserSubmissions />} />
				<Route path="/ask" element={<Ask />} />
				<Route path="/past" element={<Past />} />
				<Route path="/user/comments" element={<UserComments />} />
				<Route path="/reply" element={<ReplyForm />} />
				<Route path="/newest" element={<Newest />} />
			</Routes>
		</div>
	);
}

export default App;