//funções auxiliares

const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0;
    seleciona('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => {
        seleciona('.pizzaWindowArea').style.opacity = 1;
    }, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => {
    seleciona('.pizzaWindowArea').style.display = 'none';
    }, 500)
}

const botoesFechar = () => {
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => {
        item.addEventListener('click', fecharModal)
    })
}

const preencheDadosPizzas = (pizzaItem, item) => {
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = `R$ ${item.price.toFixed(2)}`
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img;
    seleciona('.pizzaInfo h1').innerHTML = item.description;
    seleciona('.pizzaInfo--desc').innerHTML = item.name;
    seleciona('.pizzaInfo--actualPrice').innerHTML = `R$ ${item.price.toFixed(2)}`;
}

pizzaJson.map((item, index) => {
    //função cloneNode faz uma copia de um elemento HTMLm parametro TRUE faz a copia de todos os elementos do pai
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)
    seleciona('.pizza-area').append(pizzaItem)

    //preencher os dados de cada pizza:
    preencheDadosPizzas(pizzaItem, item);

    //pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault()

        //abrir janela modal
        abrirModal();
    
        //preenchimento dos dados
        preencheDadosModal(item);
    })

    //fechar modal tanto para desktop quanto para mobile
    botoesFechar();
})