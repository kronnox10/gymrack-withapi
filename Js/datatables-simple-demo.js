window.addEventListener('DOMContentLoaded', event => {
    // Simple-DataTables
    // https://github.com/fiduswriter/Simple-DataTables/wiki

    const datatablesSimple = document.getElementById('tablacontacs');
    if (datatablesSimple) {
        new simpleDatatables.DataTable(datatablesSimple);
    }
});


  document.addEventListener('DOMContentLoaded', function () {
    new simpleDatatables.DataTable('#tablacontacs', {
      perPage: 5, // Establecer el número de entradas por página
      searchable: false, // Para deshabilitar la búsqueda, ya que mencionaste que no quieres que se muestren todas las entradas en la tabla.
    });
  });

