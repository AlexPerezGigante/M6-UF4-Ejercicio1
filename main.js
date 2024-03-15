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
        const arrayNum = ['One', 'Two', 'Three', 'Four', 'Five']
        for(i=0; i<5 ; i++){
            const divAccordion = document.querySelector('#accordionExample')
            const div = document.createElement('div')
            div.classList.add('accordion-item')
            
            
            const html = `
            <h2 class="accordion-header" id="heading${arrayNum[i]}">
                <button class="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse${arrayNum[i]}" aria-expanded="true" aria-controls="collapse${arrayNum[i]}">
                  PostId: ${array[i].id}
                </button>
              </h2>
              <div id="collapse${arrayNum[i]}" class="accordion-collapse collapse show" aria-labelledby="heading${arrayNum[i]}" data-bs-parent="#accordionExample">
                <div class="accordion-body">
  
                  <strong>This is the first item's accordion body.</strong> It is shown by default, until the collapse plugin adds the appropriate classes that we use to style each element. These classes control the overall appearance, as well as the showing and hiding via CSS transitions. You can modify any of this with custom CSS or overriding our default variables. It's also worth noting that just about any HTML can go within the <code>.accordion-body</code>, though the transition does limit overflow.
                </div>
              </div>
            `
            div.innerHTML = html
            divAccordion.appendChild(div)
    
        }
    })

   }
})
