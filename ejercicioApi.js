const characters = "https://rickandmortyapi.com/api/character";
const locations = "https://rickandmortyapi.com/api/location";
const episodes = "https://rickandmortyapi.com/api/episode";

let endpointSiguiente = "";
let endpointAnterior = "";
async function cargarApi() {
    const response = await fetch('https://rickandmortyapi.com/api/character', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const data = await response.json();
    endpointSiguiente = data.info.next
    endpointAnterior = data.info.prev
    console.log({ endpointSiguiente, endpointAnterior })

    console.log(`[DEBBUG] F-CARGAR API/data: `, data);
    paginator.innerText = "pagina: " + 1;
    const containerNames = document.getElementById('containerNames');
   changesContainer(containerNames, data)
    /* data.results.forEach((element, index) => {
        const p = document.createElement('p');
        p.innerText = `${index + 1} - ${element.name}`;
        containerNames.appendChild(p);
    });*/
}


async function retroceder() {
    if (!endpointAnterior) {
        return;
    }
    const response1 = await fetch(endpointAnterior);
    console.log("[DEBBUG] endpointAnterior: ", endpointAnterior); //null
    const data1 = await response1.json();
    console.log({DATA: data1})
    //TODO: resolver el error del paginador, refactorizar, corregir la variable indiceActual (ya no utilizarla)
    const paginator = document.getElementById("paginator")
    console.log({ paginator, paginatoriT: paginator.innerText })
    endpointSiguiente = data1.info.next
    endpointAnterior = data1.info.prev
    if (data1.info.next) {
        Number(data1.info.next[data1.info.next.length - 1]) - 1
        console.log(`endpoint consumido: `, data1.info.next)
        console.log(`dataC: `,  (Number(data1.info.next[data1.info.next.length - 1]) - 1) )

    } else if (data1.info.prev) {
        Number(data1.info.prev[data1.info.prev.length - 1]) + 1
        console.log(`dataD: `,  (Number(data1.info.next[data1.info.next.length - 1]) - 1))
    }
    paginator.innerText = "pagina: " +  (Number(data1.info.next[data1.info.next.length - 1]) - 1)
    const containerNames = document.getElementById('containerNames');
    changesContainer(containerNames, data1)
    console.log("[debugg] f-retroceder: ", endpointAnterior)
}
/*
Ya tenemos el consumo de la api
-consumir el endpoint de la varable endpointSiguiente
-cambiar el valor de pagina
-cambiar la lista por la lista actualizada
-actualizar el endpointSiguiente y el endpointAnterior
*/
async function avanzar() {
    if (!endpointSiguiente) return
    const response2 = await fetch(endpointSiguiente);
    const data2 = await response2.json();
    const paginator = document.getElementById("paginator")
    const containerNames = document.getElementById('containerNames');

    if (data2.info.next) {
        endpointSiguiente = data2.info.next
        endpointAnterior = data2.info.prev
        if (data2.info.next[data2.info.next.length - 2] == '=') {
            paginator.innerText = "pagina: " + (Number(data2.info.next[data2.info.next.length - 1]) - 1)
        } else {
            paginator.innerText = "pagina: " + (Number(data2.info.next[data2.info.next.length - 2] + data2.info.next[data2.info.next.length - 1]) - 1)
        }
        changesContainer(containerNames, data2);
    } else {
        endpointSiguiente = null;
        changesContainer(containerNames, data2);
    }
}

 function changesContainer(containerNames, data2) {
        while (containerNames.firstChild) {
            containerNames.removeChild(containerNames.firstChild);
        }

        data2.results.forEach((element) => {
            const p = document.createElement('p');
            p.innerText = `${element.id} - ${element.name}`;
            containerNames.appendChild(p);
        });
    }

     function uploadImages(containerNames, data2) {
        while (containerNames.firstChild) {
            containerNames.removeChild(containerNames.firstChild);
        }

        data2.results.image.forEach((element) => {
            const imagen = document.createElement('img');
            imagen.src= data2.results.image
            containerNames.appendChild(imagen);
        });
    }
