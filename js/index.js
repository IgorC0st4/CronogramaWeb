 $( function() {
 	$( "#materias_sortable" ).sortable({
 		items: "li:not(.ui-state-disabled)"
 	});    
 	$( "#materias_sortable" ).disableSelection();

	$( "td" ).sortable();
 	$( "td" ).disableSelection();
 } );