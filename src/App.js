import { Routes, Route } from "react-router-dom";
import News from "./screens/NewsScreen";
import User from "./screens/UserScreen";
import Submission from "./screens/SubmissionScreen";
import UpvotedSubmissions from "./screens/UpvotedSubmissionsScreen";
import UserSubmissions from "./screens/UserSubmissionsScreen";
import Ask from "./screens/AskScreen";
import Past from "./screens/PastScreen";
import UserThreads from "./screens/UserThreads";
import ReplyForm from "./screens/ReplyScreen";
import Newest from "./screens/NewestScreen";
import SubmitForm from "./screens/SubmitScreen";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<News />} />
				<Route path="/news" element={<News />} />
				<Route path="/newest" element={<Newest />} />
				<Route path="/threads" element={<UserThreads />} />
				<Route path="/past" element={<Past />} />
				<Route path="/ask" element={<Ask />} />
				<Route path="/submit" element={<SubmitForm />} />
				<Route path="/user" element={<User />} />
				<Route path="/upvotedSubmissions" element={<UpvotedSubmissions />} />
				<Route path="/user/submissions" element={<UserSubmissions />} />
				<Route path="/submission" element={<Submission />} />
				<Route path="/reply" element={<ReplyForm />} />
			</Routes>
		</div>
	);
}

export default App;
