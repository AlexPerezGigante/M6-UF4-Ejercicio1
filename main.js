fetch('https://jsonplaceholder.typicode.com/users')
.then(resp => resp.json())
.then(respjson => {
    console.log(respjson)
    for(i=0; i<5 ; i++){
        const tbody = document.querySelector('#tablaUsuarios')
        const tr = document.createElement('tr')
        const nombreSeparado = respjson[i].name.split(' ')
        const nombre = nombreSeparado[0]
        const apellido = nombreSeparado[1]
        const html = `
        <th class="listaUsuario" data-usuarioid=${respjson[i].id} scope="row">${respjson[i].id}</th>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${nombre}</td>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${apellido}</td>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${respjson[i].email}</td>
        `
        tr.innerHTML = html
        tbody.appendChild(tr)

    }
})

document.querySelector('body').addEventListener('click', (e)=>{
   if(e.target.classList.contains('listaUsuario')){
    const idUsuario = e.target.dataset.usuarioid
    fetch('https://jsonplaceholder.typicode.com/users/'+idUsuario)
    .then(resp => resp.json())
    .then(respjson => {
    console.log(respjson)
    for(i=0; i<5 ; i++){
        const ficha = document.querySelector('#fichaUsuario')
        const nombreSeparado = respjson[i].name.split(' ')
        const nombre = nombreSeparado[0]
        const apellido = nombreSeparado[1]
        const html = `
        <th class="listaUsuario" data-usuarioid=${respjson[i].id} scope="row">${respjson[i].id}</th>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${nombre}</td>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${apellido}</td>
        <td class="listaUsuario" data-usuarioid=${respjson[i].id} >${respjson[i].email}</td>
        `
        tr.innerHTML = html
        tbody.appendChild(tr)

    }
})
   }
})
