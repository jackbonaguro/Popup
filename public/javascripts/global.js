var userListData = [];

$(document).ready(function() {
	populateTable();
});

function populateTable() {
	var tableContent = '';
	$.getJSON('/post/recent', function(data) {
		userListData = data;
		$.each(data, function() {
			tableContent += '<tr>';
			tableContent += '<td><a href="#" rel="' + this.uname
				+ '">' + this.uname + '</a></td>';
			tableContent += '<td><img src="images/' + this.imgsrc
				+ '" class="preview"/></td>';
			tableContent += '<td>' + this.datecreated + '</td>';
			tableContent += '</tr>';
		});
		$('#recentPosts table tbody').html(tableContent);
	});
};