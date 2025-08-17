## 📝 *Requerimientos Funcionales - Vista de Personajes*

### 🔹 1. *Visualización de Personaje al Hacer Clic*

* Cuando el usuario haga clic sobre un personaje:

  * Se debe *mostrar la imagen* del personaje (como ya se hace actualmente).
  * Se debe mostrar *información adicional* del personaje utilizando los datos contenidos en el objeto element.

    * El estilo de esta información queda a criterio del desarrollador, puede incluir nombre, especie, estado, etc.
  * Se deben *ocultar los botones de navegación*:

    * Botón *"Anterior"*.
    * Botón *"Siguiente"*.
  * Se debe *mantener visible* el botón *"Cargar primeros personajes"*.

### 🔹 2. *Regresar a la Lista de Personajes*

* Al hacer clic en el botón *"Cargar primeros personajes"*:

  * Se debe *mostrar nuevamente la lista* de personajes.
  * Se debe *ocultar el título* (ver punto 3).
  * Se debe *limpiar o remover* la vista del personaje que se había seleccionado(Ya esta funcionando esta parte, solo faltaría eliminar el titulo dl punto 3).

### 🔹 3. *Título Dinámico*

* Agregar un *título principal* al inicio de la página con el texto: *“Personajes”*.

  * Este título se debe mostrar *únicamente cuando se está viendo la tarjeta de un personaje* (detalle individual).
  * El título *no debe mostrarse* cuando se muestra la *lista* de personajes.

### 🔹 4. *Mostrar Información desde la URL de Elemento*

* Cuando el usuario haga clic sobre la *imagen del personaje mostrado*, se debe realizar lo siguiente:

  * Consumir la URL que está en element.episodde (endpoint individual del personaje).
  * Mostrar *información adicional* de ese endpoint *debajo de la imagen* (sin cambiar de vista ni eliminar lo anterior).

    * Puede ser un JSON simple parseado o mostrar algunos campos clave como nombre del episodio, etc.

---

### 🛠 Notas Técnicas / Recomendaciones

* Usa fetch o async/await para obtener los datos de element.url.
* Considera crear una función mostrarDetallePersonajeEpisodio(element) para organizar el código.
* Usa clases CSS para mostrar/ocultar elementos como el título o los botones según el estado actual de la interfaz.


---

🛠 Instrucciones de Tarea – Rick and Morty App

Este documento describe las tareas que debes implementar en la aplicación que consume la API de Rick and Morty.

📌 Contexto actual

La app ya carga los primeros personajes desde un endpoint de Rick and Morty (20 por página).

Se cuenta con botones Anterior y Siguiente que permiten navegar entre páginas de resultados.

Cada personaje tiene un evento click que muestra una tarjeta con su imagen e información.

Actualmente, al hacer click en la imagen de la tarjeta se obtiene información del primer episodio en el que aparece el personaje (nombre y fecha de emisión).



---

🚀 Tarea principal – Navegación por episodios con clicks en la imagen

Objetivo: Cambiar la lógica existente para que la imagen de un personaje permita renderizar secuencialmente todos los episodios en los que aparece.

📋 Requerimientos

1. Cuando se haga click en la imagen:

Primer click: Mostrar información del primer episodio (nombre y fecha).

Segundo click: Mostrar información del segundo episodio.

Tercer click: Mostrar información del tercer episodio.

Y así sucesivamente.



2. Si el personaje tiene N episodios:

Solo se podrán realizar N clicks para mostrar episodios.

Si se hace click más veces después del último episodio, ya no se mostrará nada nuevo, opcional mostrar un alerta de que ya no hay más episodios.



3. Esta funcionalidad reemplaza la actual (donde siempre se mostraba solo el primer episodio).




---

🛠 Tarea secundaria – Agregar buscador en el HTML

Objetivo: Crear la base de un buscador para filtrar personajes.

📋 Requerimientos

1. Agregar en el HTML:

Un input de texto.

Un botón que diga "Buscar".



2. Funcionalidad:

Al escribir en el input y presionar Enter, debe ejecutarse una función llamada por ejemplo buscadorPersonajes().

Al dar click en el botón Buscar, debe ejecutarse la misma función.



3. En esta fase:

No se hará la llamada al endpoint todavía.

La función debe imprimir en consola el texto ingresado en el input.



4. Implementar un evento que escuche las teclas en el input:

Solo debe disparar la función si la tecla presionada es Enter.



5. Si el usuario prefiere no presionar Enter, el botón debe funcionar como alternativa.




---

🗂 Resumen de implementación

Cambios en la tarjeta de personaje:

Guardar lista de episodios del personaje.

Llevar un índice de episodio actual.

Incrementar el índice en cada click en la imagen.

Si el índice supera la cantidad de episodios, no mostrar más.
---

📅 Próximo paso

En la siguiente clase se implementará la lógica para consumir el endpoint de búsqueda de personajes usando el texto ingresado en el buscador.
