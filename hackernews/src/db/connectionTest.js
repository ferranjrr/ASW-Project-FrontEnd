const PersistenceCtrl = require("./persistence");

persistCtrl = new PersistenceCtrl();

async function getUser() {
	return await persistCtrl.getRequest("/submission", "1");
	//return await persistCtrl.getRequest("", "rguixaro");
}

let response = getUser();
console.log(response);
