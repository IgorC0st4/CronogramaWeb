$(function(){
	var operacao = "A"; //"A"=Adição; "E"=Edição

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

		$("#materias_cadastradas").append('<li class="collection-item" value = " ' + 
			(tbMaterias.length-1) + '"><div>' + nome + '<a href="#!" class="secondary-content"><i class="material-icons">delete</i></a></div></li>');
		return true;
	}

	function Listar(){
		for(var i in tbMaterias){
			var mat = JSON.parse(tbMaterias[i]);

			$("#materias_cadastradas").append('<li class="collection-item" value="'+i+'"><div >' 
				+ mat.Nome + 
				'<a href="#!" class="secondary-content"><i class="material-icons" >delete</i></a></div></li>');
		}
	}

	function Excluir(){
		tbMaterias.splice(indice_selecionado, 1);
		localStorage.setItem("tbMaterias", JSON.stringify(tbMaterias));
		alert("Matéria excluída.");
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

/*	$("#tblListar").on("matck", ".btnEditar", function(){
		operacao = "E";
		indice_selecionado = parseInt($(this).attr("alt"));
		var mat = JSON.parse(tbMaterias[indice_selecionado]);
		$("#txtCodigo").val(mat.Codigo);
		$("#txtNome").val(mat.Nome);
		$("#txtTelefone").val(mat.Telefone);
		$("#txtEmail").val(mat.Email);
		$("#txtCodigo").attr("readonly","readonly");
		$("#txtNome").focus();
	});

	
	*/
	$("#materias_cadastradas").on("click", ".collection-item", function(){
		indice_selecionado = parseInt($(this).attr("value"));
		Excluir();
	});
});