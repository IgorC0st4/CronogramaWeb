$(function(){
	var tbMaterias;
	var tbCronograma;
	try{
	tbMaterias = localStorage.getItem("tbMaterias");// Recupera os dados armazenados
	tbCronograma = localStorage.getItem("tbCronograma");// Recupera os dados armazenados
}catch(err){
	alert("Não foi possível acessar o localStorage. Por favor desabilite a opção 'Bloquear cookies de terceiros e site data' para que a aplicação funcione corretamente.");
}

tbMaterias = JSON.parse(tbMaterias);
tbCronograma = JSON.parse(tbCronograma);

if(tbCronograma == null){
	tbCronograma = {
		nDias : 0,
		nMaterias : 0,
		dias : []
	};
}

Listar();


function Listar(){
	var i, j;


	var strAppendHead = "<tr>";
	for (i = 0; i < tbCronograma.nDias; i++) {
		strAppendHead = strAppendHead + "<th>Dia " + (i+1) + "</th>";
	}
	strAppendHead = strAppendHead + "</tr>";
	$("#tbl_cronograma_head").append(strAppendHead);


	var strAppendBody = "";
	for (i = 0; i < tbCronograma.nMaterias; i++) {
		strAppendBody = strAppendBody + "<tr>" ;
		for(j = 0; j < tbCronograma.nDias; j++){
			strAppendBody = strAppendBody + "<td>";
			strAppendBody = strAppendBody + tbCronograma.dias[j][i];
			strAppendBody = strAppendBody +"</td>";
		}
		strAppendBody = strAppendBody + "</tr>";
	}
	$("#tbl_cronograma_body").append(strAppendBody);

	return;
}


function GerarCronograma(){
	var numDias = parseInt($("#num_dias").val());
	var numMaterias = parseInt($("#num_materias").val());

	tbCronograma.nDias = numDias;
	tbCronograma.nMaterias = numMaterias;


	var arrDias = [];
	var i, j;
	for (i = 0; i <numDias; i++) {
		var dia = [];
		for (j = 0; j < numMaterias; j++) {
			if (tbMaterias.length < numMaterias) {
				var mat = JSON.parse(tbMaterias[getRandom(tbMaterias.length)]);
				dia.push(mat.Nome);
			}else{
				var mat = JSON.parse(tbMaterias[getRandom(tbMaterias.length)]);
				if (dia.includes(mat.Nome)) 
					j--;
				else{
					dia.push(mat.Nome);
				}
			}
		}
		arrDias.push(dia);
	}
	tbCronograma.dias = arrDias;
	localStorage.setItem("tbCronograma", JSON.stringify(tbCronograma));

	location.reload();
}

function SalvarCronograma(){
	var numDias = parseInt($("#num_dias").val());
	var numMaterias = parseInt($("#num_materias").val());

	tbCronograma.nDias = numDias;
	tbCronograma.nMaterias = numMaterias;


	var arrDias = [];
	var i, j;
	for (i = 0; i <numDias; i++) {
		var dia = [];
		for (j = 0; j < numMaterias; j++) {
			dia.push("");
		}
		arrDias.push(dia);
	}
	tbCronograma.dias = arrDias;
	localStorage.setItem("tbCronograma", JSON.stringify(tbCronograma));

	location.reload();
}

function getRandom(max) {
	return Math.floor(Math.random() * max)
}

$("#fab_gerar").on('click', function() {
	if ($("#num_dias").val()==="" || $("#num_dias").val()==="") {
		if (confirm("Número de dias ou de matérias igual a zero! Apagar cronograma?"))
			GerarCronograma();
	}else{
		GerarCronograma();
	}
});

$("#fab_salvar").on('click', function() {
	if ($("#num_dias").val()==="" || $("#num_dias").val()==="") {
		if (confirm("Número de dias ou de matérias igual a zero! Apagar cronograma?"))
			SalvarCronograma();
	}else{
		SalvarCronograma();
	}
});

});