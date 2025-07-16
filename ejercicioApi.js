const characters = "https://rickandmortyapi.com/api/character";
const locations = "https://rickandmortyapi.com/api/location";
const episodes = "https://rickandmortyapi.com/api/episode";

let indiceActual = 0;
let endpointSiguiente = "";
let endpointAnterior = "";
async function cargarApi(){
    // Audio DB API API Example
    const response = await fetch('https://rickandmortyapi.com/api/character', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    
    const data = await response.json();
    endpointSiguiente = data.info.next
    endpointAnterior = data.info.prev
    console.log({endpointSiguiente, endpointAnterior})

    console.log(`[DEBBUG] F-CARGAR API/data: `, data);
    if (data.info.next) {
       indiceActual =Number(data.info.next[data.info.next.length-1]) - 1
        console.log(`endpoint consumido: `, data.info.next)
        console.log(`dataC: `, indiceActual)

    } else if (data.info.prev) {
       indiceActual =Number(data.info.prev[data.info.prev.length-1]) + 1
       console.log(`dataD: `, indiceActual)
    }
    const paginator = document.getElementById("paginator")
    console.log({paginator, paginatoriT: paginator.innerText})
    paginator.innerText = "pagina: " + indiceActual
    const containerNames = document.getElementById('containerNames');
    data.results.forEach((element, index) => {
        //index = index + 1
        console.log({name: element.name,
            index,
            NAME: data.results[index]?.name
        });
        const p = document.createElement('p');
        p.innerText = `${index + 1} - ${element.name}`;
        containerNames.appendChild(p);
    });
    }


   async function retroceder () {
       const response1 = await fetch(endpointAnterior);
       const data1 = await response1.json();
           const paginator = document.getElementById("paginator")
    console.log({paginator, paginatoriT: paginator.innerText})
    paginator.innerText = "pagina: " + indiceActual
    const containerNames = document.getElementById('containerNames');
    data1.info.prev.forEach((element, index) => {
        //index = index + 1
        console.log({name: element.name,
            index,
            NAME: data1.results[index]?.name
        });
        const p = document.createElement('p');
        p.innerText = `${index + 1} - ${element.name}`;
        containerNames.appendChild(p);
    });
        console.log("[debugg] f-retroceder: ", endpointAnterior)
    }

   async function avanzar () {
       const response2 = await fetch(endpointSiguiente);
       const data2 = await response2.json();
           const paginator = document.getElementById("paginator")
    console.log({paginator, paginatoriT: paginator.innerText})
    paginator.innerText = "pagina: " + indiceActual
    const containerNames = document.getElementById('containerNames');
    data2.info.next.forEach((element, index) => {
        //index = index + 1
        console.log({name: element.name,
            index,
            NAME: data2.results[index]?.name
        });
        const p = document.createElement('p');
        p.innerText = `${index + 10} - ${element.name}`;
        containerNames.appendChild(p);
    });
        console.log("[debugg] f-avanzar: ", endpointSiguiente)
    }
    