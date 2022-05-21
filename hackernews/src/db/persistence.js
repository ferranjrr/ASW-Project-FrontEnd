const axios = require("axios").default;

let PersistenceCtrl;
(function () {
	let instance;
	PersistenceCtrl = function () {
		if (instance) return instance;
		instance = this;

		// initialize any properties of the singleton
		this.DB_URI = "https://aswprojectdjango.herokuapp.com/api";
	};
})();

PersistenceCtrl.prototype.postRequest = async function (endpoint, params) {
	let res = {};
	await axios({
		method: "post",
		url: this.DB_URI + endpoint,
		data: {
			params,
		},
		headers: {
			"x-api-key": "3dc9e4d05afb7904e557ccfc80148ae3ff18ea56",
		},
	})
		.then((response) => {
			res = response.data;
		})
		.catch((err) => {
			res = err;
		});
	return res;
};

PersistenceCtrl.prototype.getRequest = async function (endpoint, query) {
	let res = {};
	await axios({
		method: "get",
		url: this.DB_URI + endpoint + "/" + query,
		/*headers: {
			"x-api-key":
				"7j7C1I1vy46tpgwUybXt4y4tMlIVXKUSSQiHo73K1X3f3pZpoKHg7BzJK5sxEddkRmR3hID7vwcm",
		},
        */
	})
		.then((response) => {
			res = response.data;
		})
		.catch((err) => {
			res = err;
		});
	console.log(res);

	return res;
};

PersistenceCtrl.prototype.putRequest = async function (endpoint, params) {
	let res = {};
	await axios({
		method: "put",
		url: this.DB_URI + endpoint,
		data: {
			params,
		},
		headers: {
			"x-api-key": "3dc9e4d05afb7904e557ccfc80148ae3ff18ea56",
		},
	})
		.then((response) => {
			res = response.data;
		})
		.catch((err) => {
			res = err;
		});
	return res;
};

module.exports = PersistenceCtrl;
