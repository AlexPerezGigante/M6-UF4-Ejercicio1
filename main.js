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
    // console.log(respjson)
        const ficha = document.querySelector('#fichaUsuario')
        
        const html = `
        <h5 class="card-title">${respjson.name}</h5>
        <h6 class="card-subtitle mb-2 text-muted">Datos</h6>
        <p><strong>Username: </strong> ${respjson.username}</p>
        <p><strong>Email: </strong> ${respjson.email}</p>
        <p><strong>Phone: </strong> ${respjson.phone}</p>
        <p><strong>Address: </strong> ${respjson.address.street} ${respjson.address.suite}, ${respjson.address.zipcode}, ${respjson.address.city}</p>
        <p><strong>Company: </strong> ${respjson.company.name}, ${respjson.company.bs}</p>
        <a href="${respjson.website}" class="card-link">${respjson.website}</a>
        `
        document.querySelector('#fichaUsuario').innerHTML = html
})
fetch('https://jsonplaceholder.typicode.com/posts')
    .then(resp => resp.json())
    .then(respjson => {
        let array = respjson.filter((res) => res.userId==idUsuario)
        array=array.reverse()
        console.log(array)
       
        let html = ''
        const ol = document.querySelector('.list-group-numbered')
        
            let comments = ''
            fetch('https://jsonplaceholder.typicode.com/comments')
            .then(resp => resp.json())
            .then(commentsjson => {
                for(i=0; i<5 ; i++){
                comments = commentsjson.filter((comment) => comment.postId==array[i].id).length
                html += `
                <li data-postid=${array[i].id} class="list-group-item d-flex justify-content-between align-items-start post">
                    <div data-postid=${array[i].id} class="ms-2 me-auto post">
                        <div data-postid=${array[i].id} class="fw-bold post">${array[i].title}</div>
                            ${array[i].body}
                            </div>
                        <span data-postid=${array[i].id} class=" post badge bg-primary rounded-pill">${comments}</span>
                </li>
                 `
                }
                comentarios(array[i].id)
                ol.innerHTML = html
            }) 
    })
   }
   if(e.target.classList.contains('post')){
    const id = e.target.dataset.postid
    comentarios(id)
   }
})

async function comentarios(postId){
    try{
        const res = await fetch('https://jsonplaceholder.typicode.com/comments')
        const resJ= await res.json()
        const array = resJ.filter((res) => res.postId==postId)

        let html = '<h3>Comentarios del post</h3>'
        for (let index = 0; index < array.length; index++) {
            html+=`
            <div class="card mt-2">
                <div class="card-body">
                    <h5 class="card-title">${array[index].name}</h5>
                    <h6 class="card-subtitle mb-2 text-muted">${array[index].email}</h6>
                    <p class="card-text">${array[index].body}</p> 
                </div>
            </div>
          `
    
        }
        document.querySelector('.comentariosPost').innerHTML = html
        
    }
    catch{
        console.log(error)
    }
}
