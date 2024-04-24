// crear selectores 

const selecMoneda = document.querySelector('#moneda');
const selecCriptomoneda = document.querySelector('#criptomonedas');
const formulario = document.querySelector('#formulario');
const resultado = document.querySelector('#resultado');

// pensar en que estructura usar para guardar
const objCripto ={
    moneda:'',
    criptomonedas:''

}


document.addEventListener('DOMContentLoaded', ()=>{
    consultarCriptomonedas()
    selecMoneda.addEventListener('change',guardarValor)
    selecCriptomoneda.addEventListener('change',guardarValor)

    formulario.addEventListener('submit', submitFormulario)
})

function consultarCriptomonedas(){
    // consultar  API para obtener el listado
    const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';
  
    fetch(url)
    .then(respuesta=>{
        //console.log(respuesta)
         return respuesta.json()})
    .then(datos=>llenarCriptomoneda(datos.Data))

    .catch(error=>console.log(error))


}



function llenarCriptomoneda(cripto){


   cripto.forEach(i => {
    const {FullName,Name} = i.CoinInfo;
      //console.log(FullName,Name)

        const option = document.createElement('option')
        option.value = Name
        option.textContent = FullName

        selecCriptomoneda.appendChild(option)

    });

}

function guardarValor(e){
objCripto[e.target.name] = e.target.value
console.log(objCripto)
}

function submitFormulario(e){
    e.preventDefault()

    const {moneda,criptomoneda} = objCripto

    if (moneda === '' ||criptomoneda==='' ){
        //invalida
        console.log('los campos estan vacios')

    }else{
        //valida
        console.log('los campos estan llenos')
        //llamar al API para realizar la cotizacion
        consultarAPI()
    }


}

function consultarAPI(){
    const {moneda,criptomoneda} = objCripto
    const url = `https://min-api.cryptocompare.com/data/pricemultifull?fsyms=${criptomoneda}&tsyms=${moneda}`
    agregarSpinner();
    fetch(url)
    .then(respuesta=>respuesta.json())
    .then(datos=>mostrarCotizacion(datos.DISPLAY[criptomoneda][moneda]))
    .catch(error=>console.log(error))
}

function mostrarCotizacion(arreglo){

    limpiarHTML();
    const {PRICE,LASTUPDATE,HIGHDAY,LOWDAY} = arreglo
   
    const precio = document.createElement('p')
    precio.innerHTML = `El precio es: ${PRICE}`

    const ultimaAct = document.createElement('p')
    ultimaAct.innerHTML = `Ultima actualizacion: ${LASTUPDATE}`

    const precioAlto = document.createElement('p')
    precioAlto.innerHTML = `Precio mas alto: ${HIGHDAY}`

    const precioBajo = document.createElement('p')
    precioBajo.innerHTML = `Precio mas bajo: ${LOWDAY}`

    resultado.appendChild(precio)
    resultado.appendChild(ultimaAct)
    resultado.appendChild(precioAlto)
    resultado.appendChild(precioBajo)

}

function limpiarHTML(){
 while(resultado.firstChild){
    resultado.removeChild(resultado.firstChild)
 }
}

function agregarSpinner(){
    const spinner = document.createElement('div');
    spinner.classList.add('spinner');

    spinner.innerHTML = `
    <div class="bounce1"></div>
    <div class="bounce2"></div>
    <div class="bounce3"></div>
    `

    //mostrar el spinner en el html

    resultado.appendChild(spinner)
}