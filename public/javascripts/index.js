var recentPostData = [];

$(document).ready(function() {
	populateTable();
});

function populateTable() {
	var tableContent = '';
	$.getJSON('/json/recent', function(data) {
		recentPostData = data;
		$.each(data, function() {
			tableContent += '<tr>';
			tableContent += '<td><a href="/u/' + this.username
				+ '" rel="' + this.username
				+ '">' + this.username + '</a></td>';
			tableContent += '<td><a href="/p/' + this.id
				+ '"><img src="/images/' + this.imgsrc
				+ '" class="preview"/></a></td>';
			tableContent += '<td>' + this.datecreated + '</td>';
			tableContent += '</tr>';
		});
		$('#postTable tbody').html(tableContent);
	});
};