import { Routes, Route } from "react-router-dom";
import News from "./screens/NewsScreen";
import User from "./screens/UserScreen";
import Submission from "./screens/SubmissionScreen";
import SubmitForm from "./screens/SubmitScreen";
import UpvotedSubmissions from "./screens/UpvotedSubmissionsScreen";
import UpvotedComments from "./screens/UpvotedCommentsScreen";
import UserSubmissions from "./screens/UserSubmissionsScreen";
import Ask from "./screens/AskScreen";
import Past from "./screens/PastScreen";
import UserThreads from "./screens/UserThreads";
import ReplyForm from "./screens/ReplyScreen";
import Newest from "./screens/NewestScreen";

function App() {
	return (
		<div className="App">
			<Routes>
				<Route path="/" element={<News />} />
				<Route path="/news" element={<News />} />
				<Route path="/user" element={<User />} />
				<Route path="/submission" element={<Submission />}/>
				<Route path="/submit" element={<SubmitForm />} />
				<Route path="/upvotedSubmissions" element={<UpvotedSubmissions />} />
				<Route path="/upvotedComments" element={<UpvotedComments />} />
				<Route path="/user/submissions" element={<UserSubmissions />} />
				<Route path="/ask" element={<Ask />} />
				<Route path="/past" element={<Past />} />
				<Route path="/threads" element={<UserThreads />} />
				<Route path="/reply" element={<ReplyForm />} />
				<Route path="/newest" element={<Newest />} />
			</Routes>
		</div>
	);
}

export default App;
