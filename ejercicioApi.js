const characters = "https://rickandmortyapi.com/api/character";
const locations = "https://rickandmortyapi.com/api/location";
const episodes = "https://rickandmortyapi.com/api/episode";
let clickEpisodes = 0;
let endpointSiguiente = "";
let endpointAnterior = "";
async function cargarApi() {
    const response = await fetch('https://rickandmortyapi.com/api/character', {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json'
        }
    });
    clickEpisodes= 0;
    const data = await response.json();
    endpointSiguiente = data.info.next
    endpointAnterior = data.info.prev
    console.log({ endpointSiguiente, endpointAnterior })

    console.log(`[DEBBUG] F-CARGAR API/data: `, data);
    const retroceso = document.getElementById("retroceso");
    retroceso.style.display= "flex";
    const next = document.getElementById("next");
    next.style.display= "flex";
    const paginator = document.getElementById("paginator");
    paginator.innerText = "pagina: 1"
    paginator.style.display= "block";
    const containerNames = document.getElementById('containerNames');
    changesContainer(containerNames, data)
}

async function retroceder() {
    if (!endpointAnterior) {
        return;
    }
    console.log("[DEBBUG] endpointAnterior: ", endpointAnterior); //null
    const response1 = await fetch(endpointAnterior);
    const data1 = await response1.json();
    const paginator = document.getElementById("paginator")
    endpointSiguiente = data1.info.next
    endpointAnterior = data1.info.prev
    const containerNames = document.getElementById('containerNames');
    if (data1.info.next[data1.info.next.length - 2] == '=') {
        paginator.innerText = "pagina: " + (Number(data1.info.next[data1.info.next.length - 1]) - 1)
    } else {
        paginator.innerText = "pagina: " + (Number(data1.info.next[data1.info.next.length - 2] + data1.info.next[data1.info.next.length - 1]) - 1)
    }
    changesContainer(containerNames, data1);
}

async function avanzar() {
    if (!endpointSiguiente) return
    const response2 = await fetch(endpointSiguiente);
    const data2 = await response2.json();
    const paginator = document.getElementById("paginator")
    const containerNames = document.getElementById('containerNames');
    endpointAnterior = data2.info.prev
    endpointSiguiente = data2.info.next
    if (data2.info.prev[data2.info.prev.length - 2] == '=') {
        paginator.innerText = "pagina: " + (Number(data2.info.prev[data2.info.prev.length - 1]) + 1)
    } else {
        paginator.innerText = "pagina: " + (Number(data2.info.prev[data2.info.prev.length - 2] + data2.info.prev[data2.info.prev.length - 1]) + 1)
    }
    changesContainer(containerNames, data2);
}

function changesContainer(containerNames, data2) {
  deleteContentContainerNames(containerNames)

    data2.results.forEach((element) => {
        const p = document.createElement('p');
        p.classList.add("pc")
        p.style.cursor= "pointer";
        p.addEventListener("click", () => infoCharacter(element, containerNames))
        p.innerText = `${element.id} - ${element.name}`;
        containerNames.appendChild(p);
    });
}
function infoCharacter (element, container) {
    deleteContentContainerNames(container)
    const retroceso = document.getElementById("retroceso");
    retroceso.style.display= "none";
     const next = document.getElementById("next");
    next.style.display= "none";
    const paginator = document.getElementById("paginator");
    paginator.style.display= "none";
    console.log({element})
    createCard(container, element)
}

function createCard (container, element) {
    const hTitle = document.createElement("h1")
    hTitle.innerText = "Descripcion de personaje"
    const div = document.createElement("div")
    div.classList.add("card");
        const img = document.createElement("img");
        img.addEventListener("click", () => mostrarDetallePersonajeEpisodio(element, container))
    img.src= element.image
    img.classList.add("img-card")
    const p = document.createElement("p")
    p.innerText = element.name
    const p2 = document.createElement("p2")
    p2.innerText = element.gender
    const p3 = document.createElement("p3")
    p3.innerText = element.species
    const p4 = document.createElement("p4")
    p4.innerText = element.status
    p.classList.add("p-c")
    div.appendChild(img)
    div.appendChild(p)
    div.appendChild(p2)
    div.appendChild(p3)
    div.appendChild(p4)
    container.appendChild(hTitle)
    container.appendChild(div)
}

function deleteContentContainerNames (container) {
    while (container.firstChild) {
        container.removeChild(container.firstChild)
    }
}

async function mostrarDetallePersonajeEpisodio (element, container) {
    if (element.episode[clickEpisodes] == undefined) return;
    console.log("DEBBUG URL: ", element.episode[clickEpisodes])
    const response3 = await fetch(element.episode[clickEpisodes]);
      console.log("RES: ", response3);
    const data3 = await response3.json();
    console.log("DATA3: ", data3)
    console.log(JSON.stringify(data3, null, 2))
    clickEpisodes++;
    const p = document.createElement("p")
    p.innerText = `la fecha del episodio es ${data3.air_date} y el nombre del episodio es ${data3.name}`
   container.appendChild(p);

}

function BuscardorPersonajes () {
    const button = document.getElementById("searchPersonaje")
    button.addEventListener("click", BuscardorPersonajes)
    const input = document.getElementById("inputCharacter").value
    input.addEventListener("input", BuscardorPersonajes)
    console.log("buscando personaje: ", input)
}