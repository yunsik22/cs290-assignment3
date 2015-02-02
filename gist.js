var data;

window.onload = function() {	
	getData();
}

function getLanguages2() {
	var output = document.getElementById('output');
	while (output.hasChildNodes()) {
		output.removeChild(output.childNodes[0]);
	}
	var dl = document.createElement('dl');
	var dt;
	
	if (document.getElementById('python').checked) {
		dt = document.createElement('dt');
		dt.innerHTML = 'Python';
		dl.appendChild(dt);
	}
	if (document.getElementById('json').checked) {
		dt = document.createElement('dt');
		dt.innerHTML = 'JSON';
		dl.appendChild(dt);
	}
	if (document.getElementById('javascript').checked) {
		dt = document.createElement('dt');
		dt.innerHTML = 'JavaScript';
		dl.appendChild(dt);
	}
	if (document.getElementById('sql').checked) {
		dt = document.createElement('dt');
		dt.innerHTML = 'SQL';
		dl.appendChild(dt);
	}
	output.appendChild(dl);
}


function getLanguages() {
	var langs = [];
	if (document.getElementById('python').checked) {
		langs.push('python');
	}
	if (document.getElementById('json').checked) {
		langs.push('json');
	}
	if (document.getElementById('javascript').checked) {
		langs.push('javascript');
	}
	if (document.getElementById('sql').checked) {
		langs.push('sql');
	}
	return langs;
}


function getData() {
	var req = new XMLHttpRequest();
	
	if (!req)
		throw 'Unable to crate HttpRequest.';
	
	var url = 'https://api.github.com/gists';
	
	req.onreadystatechange = function() {
		if (this.readyState === 4) {
			data = JSON.parse(this.responseText);
			console.log(data);
		}
	};
	
	req.open('GET', url);
	req.send();
}

function arrayContain(arr, val) {
	var total = arr.length;
	for (var i = 0; i < total; i++) {
		if (arr[i] === val) {
			return true;
		}
	}
	return false;
}

function searchGist() {
	var langs = [];
	langs = getLanguages();
	if (langs.length === 0) {
		langs.push('python');
		langs.push('json');
		langs.push('javascript');
		langs.push('sql');
	}
	
	var output = document.getElementById('output');
	while (output.hasChildNodes()) {
		output.removeChild(output.childNodes[0]);
	}
	
	var num_page = document.getElementsByName('num_page_disp')[0].value;
	if (num_page < 0 || num_page > 30) {
		num_page = 30;
	}
	
	var dl = document.createElement('dl');
	
	var total = data.length;
	var cnt = 0;
	
	for (var i = 0; i < total; i++) {
		var desc = data[i].description;
		var url = data[i].html_url;
		
		var lang_obj_key;
		for (var key in data[i].files ) {
			lang_obj_key = key; // get the first key and exit
			break;
		}
		var lang_obj = data[i].files[lang_obj_key];
		var lang = lang_obj['language'];
		
		if (desc !== null && desc !== '' && url !== null && url !== '' && lang !== null && lang !== '' && arrayContain(langs, lang.toLowerCase())) {
			var desc_link = desc.link(url);
			var dt = document.createElement('dt');
			dt.innerHTML = 'Description: ' + desc_link + ' (' + lang + ')';
			dl.appendChild(dt);
			cnt++;
			
			if (cnt == num_page) {
				break;
			}
		}
	}
	
	output.appendChild(dl);
}











