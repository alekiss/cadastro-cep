const cep = document.querySelector("#cep")
const cepError = document.querySelector('#cepError')
const rua = document.querySelector("#street")
const complemento = document.querySelector("#complement")
const bairro = document.querySelector("#neighborhood")
const cidade = document.querySelector("#city")
const estado = document.querySelector("#state")

const fetchCep = () => {
    let url = `https://viacep.com.br/ws/${cep.value}/json/`
    fetch(url)
        .then(res => res.json())
        .then(dataCep => {
            console.log(cep, dataCep)
            if(dataCep.erro){
                cleanAddressFields()
            }
            else {
                console.log(dataCep)
                rua.innerText = dataCep.logradouro
                complemento.innerText = dataCep.complemento
                bairro.innerText = dataCep.bairro
                cidade.innerText = dataCep.localidade
                estado.innerText = dataCep.uf
            }
        })
}

cep.addEventListener('keyup', () => {
    let cepData = cep.value
  
    if (/\d{8}|\d{5}-?\d{3}/.test(cepData)) {
      fetchCep()
    } else {
      showCepError()
    }
  })

function cleanCepError() {
    cep.classList.remove('input-cep-error')
    cepError.classList.add('hidden')
}
  
function showCepError() {
    cep.classList.add('input-cep-error')
    cepError.classList.remove('hidden')
    cleanAddressFields()
}

function cleanAddressFields() {
    rua.innerText = ''
    complemento.innerText = ''
    bairro.innerText = ''
    cidade.innerText = ''
    estado.innerText = ''
  }