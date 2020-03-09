$(function(){
	$("#fab_salvar").on('click', function() {
		var doc = new jsPDF('p', 'pt');
		var elem = document.getElementById("tbl_cronograma");
		var res = doc.autoTableHtmlToJson(elem);
		//doc.autoTable(res.columns, res.data);
		console.log(res.columns);
		doc.autoTable({
			body: res.data,
			theme: 'plain',
		})
		doc.autoTable({ html: '#tbl_cronograma'})
		doc.save("table.pdf");
	});
	
});