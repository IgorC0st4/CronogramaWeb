$(function(){
	var indice_selecionado = -1;

	var tbMaterias;
	try{
	tbMaterias	 = localStorage.getItem("tbMaterias");// Recupera os dados armazenados
	}catch(err){
		alert("Não foi possível acessar o localStorage. Por favor desabilite a opção 'Bloquear cookies de terceiros e site data' para que a aplicação funcione corretamente.");
	}
	tbMaterias = JSON.parse(tbMaterias); // Converte string para objeto
	if(tbMaterias == null) // Caso não haja conteúdo, iniciamos um vetor vazio
		tbMaterias = [];


	function Adicionar(){
		var nome = $("#nome_materia").val().trim();
		if (nome == "") {
			alert("O campo está vazio!");
			return;
		}
		var mat = GetMateria("Nome", nome);
		if(mat != null){
			alert("Matéria já cadastrada.");
			return;
		}
		var Materia = JSON.stringify({
			Nome     : nome
		});

		tbMaterias.push(Materia);

		localStorage.setItem("tbMaterias", JSON.stringify(tbMaterias));

		location.reload();
	}

	function Listar(){
		for(var i in tbMaterias){
			var mat = JSON.parse(tbMaterias[i]);

			$("#tbl_materias_body").append('<tr>');
			$("#tbl_materias_body").append('<td value="'+i+'" id="' + mat.Nome +'" ondragstart="drag(event)" draggable="true">' 
				+ mat.Nome + 
				'</td>');
			$("#tbl_materias_body").append('<td value="'+i+'"><a href="#!" class="secondary-content"><i class="material-icons" >delete</i></a></td>');
			$("#tbl_materias_body").append('</tr>');
		}
	}

	function Excluir(){
		tbMaterias.splice(indice_selecionado, 1);
		localStorage.setItem("tbMaterias", JSON.stringify(tbMaterias));
		location.reload();
	}

	Listar();

	$("#fab_add").on('click', function() {
		Adicionar();
	});

	function GetMateria(propriedade, valor){
		var mat = null;
		for (var item in tbMaterias) {
			var i = JSON.parse(tbMaterias[item]);
			if (i[propriedade] == valor)
				mat = i;
		}
		return mat;
	}

	$("#tbl_materias_body").on("click", ".secondary-content", function(){
		indice_selecionado = parseInt($(this).attr("value"));
		Excluir();
	});
});