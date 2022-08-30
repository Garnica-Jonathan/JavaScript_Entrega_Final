const tproducto = document.getElementById("productos")
const compras = document.getElementById("compras")
const vaciar = document.getElementById("vaciar")
const total = document.getElementById("total")
const finalizar = document.getElementById("finalizar")

let comprasGuardadas = []

if(localStorage.getItem("comprasGuardadas")){
    comprasGuardadas = JSON.parse(localStorage.getItem("comprasGuardadas"))

}else{
    localStorage.setItem("comprasGuardadas", JSON.stringify(comprasGuardadas)) 
}

fetch(`json/productos.json`)
.then(response => response.json())
.then(productos => {
    productos.forEach((productos, indice) => {
        tproducto.innerHTML += `
        <div class="col-lg-2 col-sm-6 col-md-4 col-12">
            <div class="card mx-4" id="productos${indice}"style="width: 18rem;">
                <img src="./imagen/${productos.imagen}" class=" catalogo_Imagen card-img-top" alt="...">
                <div class="card-body">
                    <h5 class="card-title">${productos.nombre}</h5>
                    <p class="card-text">$${productos.precio}</p>
                    <button class=" bt btn btn-primary">compra</button>
                    
                </div>
            </div> 
        </div>
        `   
    })
    productos.forEach((productos, indice) => {
        let local = document.getElementById(`productos${indice}`).lastElementChild.lastElementChild
        local.addEventListener("click", () => {
            document.getElementById(`productos${indice}`)
            comprasGuardadas.push(productos)
            localStorage.setItem("comprasGuardadas", JSON.stringify(comprasGuardadas))
            carritoActualizado()//Al comprar un producto se actualiza el carrito

        })
        carritoActualizado()
    })
})
//se agrega al carrito luego de la compra
const carritoActualizado = () => {
    let arrayStorage = JSON.parse(localStorage.getItem("comprasGuardadas"))
    compras.innerHTML = ""
    arrayStorage.forEach((compra, indice) => {
        compras.innerHTML += `
        <tr class="elementos"id="compra${indice}">
            <th scope="row">${indice + 1}</th>
            <td>${compra.nombre}</td>
            <td>${compra.precio}</td>
            <td>${compra.cantidad}</td>
            <td><img class="compra_imagen" src="./imagen/${compra.imagen} "></td>
            <td><button class="btn btn-dark">eliminar</button></td>
        </tr>
        `
    })
    arrayStorage.forEach((borrar, indice) => {
        let eliminar = document.getElementById(`compra${indice}`).lastElementChild
        eliminar.addEventListener("click", () => {
            document.getElementById(`compra${indice}`).remove()
            comprasGuardadas.splice(indice, 1)
            localStorage.setItem("comprasGuardadas", JSON.stringify(comprasGuardadas))
            precioTotal()//Se actualiza los precios cuando se elimina el producto
        })
        
    })
    precioTotal()//Se actualiza los precios cuando se agrega el producto
}

//Se calcula el precio
const precioTotal = () => {
    total.innerText = comprasGuardadas.reduce((acc, compra) => acc + compra.precio, 0)
}
//Boton para vaciar el carrito
vaciar.addEventListener('click', vaciarCarrito);

//se vacia el localStorage
function vaciarCarrito() {
    // Limpiamos los productos guardados
    comprasGuardadas = [];
    // Borra LocalStorage
    localStorage.clear();
    // Renderizamos los cambios
    nuevaActualizacionDeCarrito()
    precioTotal()

}

//se finaliza la compra
finalizar.addEventListener("click", () =>{
    Swal.fire({
        title: 'finalizar compra?',
        showCancelButton: true,
        confirmButtonText: 'Finalizar compra',

      }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire('Compra Finalizada', '', 'success')
          vaciarCarrito()
        }
      })
})
//Creo un nuevo contenedor vacio al finalizar o vaciar la compra
const nuevaActualizacionDeCarrito = () =>{
    compras.innerHTML = ""
    comprasGuardadas.forEach((compra, indice) => {
        compras.innerHTML += `
        <tr class="elementos"id="compra${indice}">
            <th scope="row">${indice + 1}</th>
            <td>${compra.nombre}</td>
            <td>${compra.precio}</td>
            <td>${compra.cantidad}</td>
            <td><img class="compra_imagen" src="./imagen/${compra.imagen} "></td>
            <td><button class="btn btn-dark">eliminar</button></td>
        </tr>
        `
    })
}



















/*const Manga = [
    {
        nombre: `The Breakers`,
        genero: `accion`,
        tipo: `manhwa`,
       imagen: `http://d2r9epyceweg5n.cloudfront.net/stores/057/977/products/a04a42df-df62-11b5-58ca-50eb6c2ad67c1-c63880f5ee6cc1937516471370348018-640-0.jpg`

    },
    {
    
        nombre: `Swimming Lessons for a Mermaid`,
        genero: `comedia`,
        tipo: `manhwa`,
        imagen: `https://tumangas.net/assets_m/series/covers/6296237955c2d.jpg`

    },
    {
        nombre: `Dejare de ser Emperatriz`,
        genero: `Romance`,
        tipo: `manhwa`,
        imagen: `https://otakuteca.com/images/books/cover/5fc03ece5ce3f.jpg`
    },
    
]
let shop = []

if(localStorage.getItem("shop")){
    shop = JSON.parse(localStorage.getItem("shop"))
}else{
    localStorage.setItem("shop", JSON.stringify(shop))
}

const compra = document.getElementById("compras")
const carrito = document.getElementById("carrito")
const com = document.getElementById("com")


carrito.addEventListener("click", () => {
    let arrayStorage = JSON.parse(localStorage.getItem("shop"))
    Swal.fire({
        title: 'cart',
        showCancelButton: true,
        confirmButtonText: 'Finalizar compra',
        footer: "<div>hola</div>"

      }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        /*if (result.isConfirmed) {
          Swal.fire('Compra Finalizada', '', 'success')
        }
        
      })
      

      
      com.innerHTML = ""
          arrayStorage.forEach((manga, indice) => {
            com.innerHTML += `
          <div class="card mx-4" id="manga${indice}" style="width: 18rem;">
          <div>
              <img src="${manga.imagen}" class=" cataImagen " alt="...">
              <div class="card-body">
                  <h5 class="card-title">${manga.nombre}</h5>
                  <p class="card-text">${manga.genero}</p>
                  <button class="btn btn-primary"><i class="fa-solid fa-cart-flatbed"></i></button>
              </div>
          </div>
          </div>
          `
      })

})

Manga.forEach((manga, indice) => {
    compra.innerHTML += `
    <div class="card mx-4" id="manga${indice}" style="width: 18rem;">
        <div>
            <img src="${manga.imagen}" class=" cataImagen " alt="...">
            <div class="card-body">
                <h5 class="card-title">${manga.nombre}</h5>
                <p class="card-text">${manga.genero}</p>
                <button class="btn btn-primary"><i class="fa-solid fa-cart-flatbed"></i></button>
            </div>
        </div>
    </div>
    `
})

Manga.forEach((manga, indice) => {
    let buttonBlue = document.getElementById(`manga${indice}`).lastElementChild.lastElementChild
    buttonBlue.addEventListener("click", () =>{
        document.getElementById(`manga${indice}`)
        shop.push(manga)
        localStorage.setItem("shop", JSON.stringify(shop))

    })
});




Manga.forEach((manga, indice) => {
    document.getElementById(`manga${indice}`).lastElementChild.lastElementChild.addEventListener("click", () => {
        Toastify({
            text: "This is a toast",
            duration: 3000,
            destination: "https://github.com/apvarun/toastify-js",
            newWindow: true,
            close: true,
            gravity: "bottom", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
              background: "linear-gradient(to right, #00b09b, #96c93d)",
            },
            onClick: function(){} // Callback after click
          }).showToast();
    })
})


for(let catalogoDeCompras of Manga){
    compra.innerHTML += `
    <div class="card mx-4" style="width: 18rem;">
        <img src="${catalogoDeCompras.imagen}" class=" cataImagen " alt="...">
        <div class="card-body">
            <h5 class="card-title">${catalogoDeCompras.nombre}</h5>
            <p class="card-text">${catalogoDeCompras.genero}</p>
            <button class="btn btn-primary">comprar</button>
        </div>
    </div>
    
    `
}*/


















