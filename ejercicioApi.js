const characters = "https://rickandmortyapi.com/api/character";
const locations = "https://rickandmortyapi.com/api/location";
const episodes = "https://rickandmortyapi.com/api/episode";

let indiceActual = 0;
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
    if (data.info.next) {
        indiceActual = Number(data.info.next[data.info.next.length - 1]) - 1
        console.log(`endpoint consumido: `, data.info.next)
        console.log(`dataC: `, indiceActual)

    } else if (data.info.prev) {
        indiceActual = Number(data.info.prev[data.info.prev.length - 1]) + 1
        console.log(`dataD: `, indiceActual)
    }
    const paginator = document.getElementById("paginator")
    console.log({ paginator, paginatoriT: paginator.innerText })
    paginator.innerText = "pagina: " + indiceActual
    const containerNames = document.getElementById('containerNames');
    data.results.forEach((element, index) => {
        const p = document.createElement('p');
        p.innerText = `${index + 1} - ${element.name}`;
        containerNames.appendChild(p);
    });
}


async function retroceder() {
    const response1 = await fetch(endpointAnterior);
    const data1 = await response1.json();
    const paginator = document.getElementById("paginator")
    console.log({ paginator, paginatoriT: paginator.innerText })
    indiceActual = 0;
    endpointSiguiente = data1.info.next
    endpointAnterior = data1.info.prev
    if (data1.info.next) {
        indiceActual = Number(data1.info.next[data1.info.next.length - 1]) - 1
        console.log(`endpoint consumido: `, data1.info.next)
        console.log(`dataC: `, indiceActual)

    } else if (data1.info.prev) {
        indiceActual = Number(data1.info.prev[data1.info.prev.length - 1]) + 1
        console.log(`dataD: `, indiceActual)
    }
    paginator.innerText = "pagina: " + indiceActual
    const containerNames = document.getElementById('containerNames');
    data1.info.prev.forEach((element, index) => {
        //index = index + 1
        console.log({
            name: element.name,
            index,
            NAME: data1.info.prev[index]?.name
        });
        const p = document.createElement('p');
        p.innerText = `${index + 1} - ${element.name}`;
        containerNames.appendChild(p);
    });
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
}
