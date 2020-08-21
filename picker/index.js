//fix loop
var cp = require('child_process');
var child = null;
var ask = (obj, cb) => {
	child = cp.fork(__dirname + '/worker.js');
	child.send(obj);
	child.on('message', function(data) {
		cb(data);
		child.kill();
	});
	child.on('exit', function(e) {
		child.kill();
	});
};


module.exports = (obj) => {
	obj.type = 'list';
	let a = obj.name;
	return new Promise((resolve, reject) => {
		let newObj = {
			question: {
				type: 'list',
				name: obj.question,
				message: obj.question,
				choices: obj.choices,
			}
		};
		ask(newObj, (answer) => {
			resolve(answer[Object.keys(answer)[0]]);
		});
	});
};
