//variaveis
let modalKey = 0;

//variavel para controlar a quantidade inicial de pizzas na modal
let quantPizzas = 1;

//carrinho
let car = [];


//funções auxiliares
const seleciona = (elemento) => document.querySelector(elemento);
const selecionaTodos = (elemento) => document.querySelectorAll(elemento);

const formatoReal = (valor) => {
    return valor.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL'});
}

const formatoMonetario = (valor) => {
    if (valor) {
        return valor.toFixed(2);
    }
}

const abrirModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0;
    seleciona('.pizzaWindowArea').style.display = 'flex';
    setTimeout(() => seleciona('.pizzaWindowArea').style.opacity = 1, 150)
}

const fecharModal = () => {
    seleciona('.pizzaWindowArea').style.opacity = 0;
    setTimeout(() => seleciona('.pizzaWindowArea').style.display = 'none', 500)
}

const botoesFechar = () => {
    selecionaTodos('.pizzaInfo--cancelButton, .pizzaInfo--cancelMobileButton').forEach((item) => item.addEventListener('click', fecharModal))
}

const preencheDadosPizzas = (pizzaItem, item, index) => {
    pizzaItem.setAttribute('data-key', index)
    pizzaItem.querySelector('.pizza-item--img img').src = item.img
    pizzaItem.querySelector('.pizza-item--price').innerHTML = formatoReal(item.price[2])
    pizzaItem.querySelector('.pizza-item--name').innerHTML = item.name
    pizzaItem.querySelector('.pizza-item--desc').innerHTML = item.description
}

const preencheDadosModal = (item) => {
    seleciona('.pizzaBig img').src = item.img;
    seleciona('.pizzaInfo h1').innerHTML = item.description;
    seleciona('.pizzaInfo--desc').innerHTML = item.name;
    seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(item.price[2]);
}

const pegarKey = (e) => {
    //closest retorna e elemento mais proximo que tem a class que passamos
    //do .pizza-item ele vai pegar o valor do atributo data-key
    let key = e.target.closest('.pizza-item').getAttribute('data-key')
    console.log(`Pizza Clicada ${key}`)
    console.log(pizzaJson[key])

    quantPizzas = 1

    modalKey = key

    return key
}

const preencherTamanhos = (key) => {
    //tirar a selecao de tamanho atual e selecionar o tamanho grande
    seleciona('.pizzaInfo--size.selected').classList.remove('selected');

    //selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        //selecionar o tamnho grande
        (sizeIndex == 2) ? size.classList.add('selected') : '';
        size.querySelector('span').innerHTML = pizzaJson[key].sizes[sizeIndex]
    })
}

const escolherTamanhoPreco = (key) => {
    //Ações nos botoes de tamanho
    //selecionar todos os tamanhos
    selecionaTodos('.pizzaInfo--size').forEach((size, sizeIndex) => {
        size.addEventListener('click', (e) => {
            //clicou em um item, tirar selecao dos outros e marca o que vc clicou
            //tirar a selecao de tamanho atual e selecionar o tamanho grande
            seleciona('.pizzaInfo--size.selected').classList.remove('selected');

            //marcar o que vc clicou, ao inves de usar o e.target use size, pois ele é nosso item dentro do loop
            size.classList.add('selected');

            //mudar o preco de acordo com o tamanho
            seleciona('.pizzaInfo--actualPrice').innerHTML = formatoReal(pizzaJson[key].price[sizeIndex])
        })
    })
}

const mudarQuantidade = () => {
    //Ações nos botoes + e - da janela modal
    seleciona('.pizzaInfo--qtmais').addEventListener('click', () => {
        quantPizzas++;
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;
    })

    seleciona('.pizzaInfo--qtmenos').addEventListener('click', () => {
        if (quantPizzas > 1) {
            quantPizzas--;
            seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;
        }
    })
}

pizzaJson.map((item, index) => {
    //função cloneNode faz uma copia de um elemento HTMLm parametro TRUE faz a copia de todos os elementos do pai
    let pizzaItem = document.querySelector('.models .pizza-item').cloneNode(true)

    seleciona('.pizza-area').append(pizzaItem)

    //preencher os dados de cada pizza:
    preencheDadosPizzas(pizzaItem, item, index);

    //pizza clicada
    pizzaItem.querySelector('.pizza-item a').addEventListener('click', (e) => {
        e.preventDefault()

        let chave = pegarKey(e);

        //abrir janela modal
        abrirModal();
    
        //preenchimento dos dados
        preencheDadosModal(item);

        //pegar tamanho selecionado
        preencherTamanhos(chave);

        //definir quantidades inicial como 1
        seleciona('.pizzaInfo--qt').innerHTML = quantPizzas;

        //selecionar o tamanho e preco com o clique no botao
        escolherTamanhoPreco(chave);

    })

    //fechar modal tanto para desktop quanto para mobile
    botoesFechar();
})


mudarQuantidade();