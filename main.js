

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
        <th scope="row">${respjson[i].id}</th>
        <td>${nombre}</td>
        <td>${apellido}</td>
        <td>${respjson[i].email}</td>
        `
        tr.innerHTML = html
        tbody.appendChild(tr)

    }
})