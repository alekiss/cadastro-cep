const cep = document.querySelector("#cep");
const cepError = document.querySelector("#cepError");
const rua = document.querySelector("#street");
const bairro = document.querySelector("#neighborhood");
const cidade = document.querySelector("#city");
const estado = document.querySelector("#state");
const content = document.querySelector(".content-container")

const fetchCep = () => {
  let url = `https://viacep.com.br/ws/${cep.value}/json/`;
  fetch(url)
    .then((res) => res.json())
    .then((dataCep) => {
      if (dataCep.erro) {
        cleanAddressFields();
      } else {
        content.style.display = 'flex';
        rua.innerText = dataCep.logradouro;
        bairro.innerText = " , " + dataCep.bairro;
        cidade.innerText = " , " + dataCep.localidade + "-";
        estado.innerText = dataCep.uf;

        cleanCepError();
      }
    });
};

cep.addEventListener("keyup", () => {
  let cepData = cep.value;

  if (/\d{8}|\d{5}-?\d{3}/.test(cepData)) {
    fetchCep();
  } else {
    showCepError();
  }
});

function cleanCepError() {
  cep.classList.remove("input-cep-error");
  cepError.classList.add("hidden");
}

function showCepError() {
  cep.classList.add("input-cep-error");
  cepError.classList.remove("hidden");
  cleanAddressFields();
}

function cleanAddressFields() {
  content.style.display = 'none';
}
