var arrayinfoproducto=[];

var arrayComentarios = [];

var arrayAutos = [];



function mostrarImagenes(array){

    let htmlContentToAppend = "";

    for(let i = 0; i < array.length; i++){
        let imagenes = array[i];
if(i===0){
        htmlContentToAppend += `
        <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
        <div class="carousel-inner">
          <div class="carousel-item active">
            <img src="`+imagenes+`" class="d-block w-0" alt="">
          </div>`
        }
else{
    htmlContentToAppend += ` <div class="carousel-item">
    <img src="`+imagenes+`" class="d-block w-0" alt="">
  </div>`
}
        }
        htmlContentToAppend += ` </div>
        <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
          <span class="carousel-control-prev-icon" aria-hidden="true"></span>
          <span class="sr-only">Previous</span>
        </a>
        <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
          <span class="carousel-control-next-icon" aria-hidden="true"></span>
          <span class="sr-only">Next</span>
        </a>
        <div>
      </div>`
        document.getElementById("productoImagenes").innerHTML = htmlContentToAppend;
   
}







function showComments() {
    let htmlContentToAppend = "";
    for (comentarios of arrayComentarios) {
        let score = comentarios.score;
        let estrellas = "";
        for (let i = 1; i <= 5; i++) {
            if (i <= score) {
                estrellas += `<i class="fas fa-star"></i>`;
            } else {
                estrellas += `<i class="far fa-star"></i>`;
            }
        }
        let fecha = comentarios.dateTime;
     
        htmlContentToAppend += `
      <div class="list-group-item list-group-item-action">
      <div class="row">
      <div class="col-6">
      <span class="starRating">${estrellas} </span><br>
      <span class="userComment">${comentarios.user}</span>      
      </div>
      <div class="col-2">
      </div>
      <div class="col-4" style="padding-right: 10px; text-align:right;">
      <small style="font-weight: bold;">${fecha}</small><br>
      
      </div>
      </div><br>
      <div class="row">
      <p style="margin: 10px;">${comentarios.description}</p>
      </div>
      </div>`
    }
    document.getElementById('contenedorcomentarios').innerHTML = htmlContentToAppend;
}

function compartirCalificacion() {

   
    let fecha = new Date(); 
    let usuario = JSON.parse(localStorage.getItem("usuario"))
    let descripcionCalificacion = document.getElementById('valoracion').value;
    let puntaje = document.getElementById('calificacion').innerHTML;
    let usuarioNombre = usuario.nombre;
    let nuevaCalificacion = {};
    
    if (descripcionCalificacion.trim() === "") {
        document.getElementById("completar").innerHTML= "Deve ingresar un comentario";
      

    } else if (puntaje === "") {

        puntaje = 0;
      
        nuevaCalificacion.description = descripcionCalificacion;
        nuevaCalificacion.score = parseInt(puntaje);
        nuevaCalificacion.user = usuarioNombre;
        nuevaCalificacion.dateTime = (fecha.getFullYear())+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate())+" "+(fecha.getHours())+":"+(fecha.getMinutes())+":"+(fecha.getSeconds())
        arrayComentarios.push(nuevaCalificacion);
        document.getElementById('completar').innerHTML = "";
        document.getElementById('valoracion').innerHTML = "";
    } else  {

        nuevaCalificacion.dateTime = (fecha.getFullYear())+"-"+(fecha.getMonth()+1)+"-"+(fecha.getDate())+" "+(fecha.getHours())+":"+(fecha.getMinutes())+":"+(fecha.getSeconds())
        nuevaCalificacion.description = descripcionCalificacion;
        nuevaCalificacion.score = parseInt(puntaje);
        nuevaCalificacion.user = usuarioNombre;

        arrayComentarios.push(nuevaCalificacion);
        document.getElementById('completar').innerHTML = "";
        document.getElementById('valoracion').value = "";
        
    
    }



}
function promedioCalificacion(array){
let = calificacionSumado= 0;
for (comentarios of arrayComentarios) {
    calificacionSumado+=comentarios.score;

}
let promedioComentarios=(calificacionSumado/arrayComentarios.length).toFixed(1);
document.getElementById("promedio").innerHTML+="El promedio de calificación es "+"<i class=fas fa-star>★</i>"+promedioComentarios+","+"de "+ arrayComentarios.length+" calificaciones";
;

}


document.addEventListener("DOMContentLoaded", function(e){
    getJSONData(PRODUCT_INFO_URL).then(function(resultObj){
       
       let usuario = JSON.parse(localStorage.getItem("usuario"));
  document.getElementById("valorar").innerHTML+=" "+usuario.nombre;
  
       
        if (resultObj.status === "ok"){
            
            arrayinfoproducto=resultObj.data;
            
            let nombreProductoHTML  = document.getElementById("productsName");
            let descripcionProductoHTML = document.getElementById("productsDescription");
            let precioProductoHTML = document.getElementById("productCost");
            let CantVProductoHTML = document.getElementById("productSoldCount");
            let categoriaProductoHTML = document.getElementById("productCategoria");
            
            nombreProductoHTML.innerHTML = arrayinfoproducto.name;
            descripcionProductoHTML.innerHTML = arrayinfoproducto.description;
            precioProductoHTML.innerHTML = arrayinfoproducto.cost + arrayinfoproducto.currency;
            CantVProductoHTML.innerHTML = arrayinfoproducto.soldCount;
            categoriaProductoHTML.innerHTML = arrayinfoproducto.category;
            
            mostrarImagenes(arrayinfoproducto.images);
        }
  
//
        getJSONData(PRODUCTS_URL).then(function(resultObj) {
       
           
            if (resultObj.status === 'ok') {
            arrayAutos = resultObj.data;
            
            showProductsList()
        }
       
        function showProductsList(){
            let x = arrayinfoproducto.relatedProducts
            let htmlContentToAppend = "";
            for(let i=0; i<x.length;i++){
                let vehiculos=x[i]
        
                    htmlContentToAppend += `<a href="product-info.html" class="list-group-item list-group-item-action">
                    
                    <div class="row" id="coso">
                        <div class="col-3">
                            <img src="` + arrayAutos[vehiculos].imgSrc + `" alt="` + arrayAutos[vehiculos].desc + `" class="img-thumbnail">
                        </div>
                        <div class="col">
                            <div class="d-flex w-100 justify-content-between">
                                <h4 class="mb-1">`+ arrayAutos[vehiculos].name +`-`+arrayAutos[vehiculos].cost + arrayAutos[vehiculos].currency+`</h4>
                                <small class="text-muted">` + arrayAutos[vehiculos].soldCount + ` artículos</small>
                            </div>
                            <div class="d-flex w-100 justify-content-between">
                                <p class="mb-1">`+ arrayAutos[vehiculos].description +`</p>
                            </div>
                        </div>
                    </div>
                </div>
        
                </a>
                `
               
                }
        
                document.getElementById("proRelacionados").innerHTML = htmlContentToAppend;
                
            } 
        })

       

  


//

        getJSONData(PRODUCT_INFO_COMMENTS_URL).then(function(resultObj) {
            if (resultObj.status === 'ok') {
                arrayComentarios = resultObj.data;
               

                showComments();
                promedioCalificacion(arrayComentarios)
             
            }

            document.getElementById('valorar').addEventListener('click', function() {
        
                compartirCalificacion()
                showComments();
                document.getElementById("promedio").innerHTML="";
                promedioCalificacion()
              
                     })
       
     
              
            document.getElementById("estrellasalto").addEventListener("click",()=>{
                let comentarios_ordenados_estrellas_ascendente = arrayComentarios.sort((em1,em2)=>{
                return em1.score - em2.score
                            
                })
                showComments(comentarios_ordenados_estrellas_ascendente);
                    }
        
                    );





            document.getElementById("estrellasbajo").addEventListener("click",()=>{
                let comentarios_ordenados_estrellas_descendente = arrayComentarios.sort((em1,em2)=>{
                return em2.score - em1.score
                                    
                })
                showComments(comentarios_ordenados_estrellas_descendente);
                   }
                
                    );
                 
    })
    
})

})

