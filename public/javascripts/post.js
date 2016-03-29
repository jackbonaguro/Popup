var postData = {};

$(document).ready(function() {
	populateTable();
});

function populateTable() {
	var postTableContent = '';
	$.getJSON('/json/p/' + post_id, function(data) {
		userListData = data;

		postTableContent += '<tr>';
		postTableContent += '<td><a href="/u/' + data.username
				+ '" rel="' + data.username
			+ '">' + data.username + '</a></td>';
		postTableContent += '<td><img src="/images/' + data.imgsrc
			+ '" class="preview"/></td>';
		postTableContent += '<td>' + data.datecreated + '</td>';
		postTableContent += '</tr>';

		$('#postTable tbody').html(postTableContent);
	});
};