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

const adicionarNoCarrinho = () => {
    seleciona('.pizzaInfo--addButton').addEventListener('click', () => {
        console.log('Adicionar no Carrinho');

        //pegar dados da janela modal atual
        //qual pizza? pegue o modalKey para usar pizzaJson[modalKey]
        console.log(`Pizza ${modalKey}`);

        let size = seleciona('.pizzaInfo--size.selected').getAttribute('data-key')
        console.log(`Tamanho ${size}`);
        //quantidade
        console.log(`Quant. ${quantPizzas}`);
        //preco
        let price = seleciona('.pizzaInfo--actualPrice').innerHTML.replace('R$&nbsp;', '')

        //crie um identificador que junte id e tamanho
        //concatene as duas informações separadas por um simbolo, voce escolhe
        let identificador = pizzaJson[modalKey].id+'t'+size

        //antes de adicionar verifique se ja tem aquele codigo e tamanho
        //para adicionarmos a quantidade

        let key = car.findIndex( (item) => item.identificador == identificador )
        console.log(key);

        if (key > -1) {
            //se encontrar aumente a quantidade
            car[key].qt += quantPizzas;
        } else {
            //adiciona objeto pizza no carrinho
            let pizza = {
                identificador,
                id: pizzaJson[modalKey].id,
                size,
                qt: quantPizzas,
                price: parseFloat(price)
            }
            car.push(pizza);
            console.log(pizza);
            console.log(`Sub total R$ ${(pizza.qt * pizza.price).toFixed(2)}`);
        }

        fecharModal();
        abrirCarrinho();
        atualizarCarrinho();

    })
}

const abrirCarrinho = () => {
    console.log(`Qtd de itens no carrinho ${car.length}`);
    if (car.length > 0) {
        //mostra carrinho
        seleciona('aside').classList.add('show');
        seleciona('header').style.display = 'flex'; //mostrar barra superior
    }

    //exibir aside do carrinho no modo mobile
    seleciona('.menu-openner').addEventListener('click', () => {
        if (car.length > 0) {
        seleciona('aside').classList.add('show');
        seleciona('aside').style.left = '0';

        }
    })
}

const fecharCarrinho = () => {
    //fechar o carrinho com o botão X no modo mobile
    seleciona('.menu-closer').addEventListener('click', () => {
        seleciona('aside').style.left = '100vw';//usando 100vw ele ficara fora da tela
        seleciona('header').style.display = 'flex';
    })
}

const atualizarCarrinho = () => {
    //exibir numero de itens no carrinho
    seleciona('.menu-openner span').innerHTML = car.length;

    //mostrar ou nao o carrinho
    if (car.length > 0) {

        //mostrar o carrinho
        seleciona('aside').classList.add('show');

        //zerar menu .car para não fazer iserções duplicadas
        seleciona('.cart').innerHTML = '';

        //crie as variaveis antes do for

        let subTotal = 0;
        let desconto = 0;
        let total = 0;

        //para preencher os itens do carrinho, calcular subtotal
        for (let i in car) {
            //use find para pegar o item por id
            let pizzaItem = pizzaJson.find((item) => item.id == car[i].id)
            console.log(pizzaItem);

            //em cada item pegar o subtotal
            subTotal += car[i].price * car[i].qt;

            //fazer o clone, exibir na telas e depois preencher as informações
            let carItem = seleciona('.models .cart--item').cloneNode(true);
            seleciona('.cart').append(carItem);

            let pizzasSizeName = car[i].size;

            let pizzaName = `${pizzaItem.name} (${pizzasSizeName})`;

            //preencher as informações

            carItem.querySelector('img').src = pizzaItem.img;
            carItem.querySelector('.cart--item-none').innerHTML = pizzaName
            carItem.querySelector('.cart--item--qt').innerHTML = car[i].qt;

            //seleciona botoes + e -
            carItem.querySelector('.cart--item-qtmais').addEventListener('click', () => {
                console.log('Clicou no botão mais.');
                //adiciona apenas a quantidade que esta neste contexto
                car[i].qt++;
                //atualizar quantidade
                atualizarCarrinho();
            })

            carItem.querySelector('.cart--item-qtmenos').addEventListener('click', () => {
                console.log('Clicou no botão menos.');
                //adiciona apenas a quantidade que esta neste contexto
                if (car[i].qt > 1) { 
                    //subtrair apenas a quantidade  que esta neste contexto
                    car[i].qt--;
                } else {
                    //remover se for zero
                    car.splice(i, 1);
                }
                
                (car.length < 1) ? seleciona('header').style.display = 'flex' : '';

                //atualizar quantidade
                atualizarCarrinho();
            })

            seleciona('.cart').append(carItem);
            
        }//fim do for

        //fora do for
        //calcule desconto 10% e total
        //desconto = subtotal *0,1
        desconto = subTotal * 0;
        total = subTotal - desconto;

        //exibir na tela os resultados
        //selecionar o ultimo span do elemento
        seleciona('.subtotal span:last-child').innerHTML = formatoReal(subTotal);
        seleciona('.desconto span:last-child').innerHTML = formatoReal(desconto);
        seleciona('.total span:last-child').innerHTML = formatoReal(total);
    } else {
        //ocultar o carrinho
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
    }
}

const finalizarCompra = () => {
    seleciona('.cart--finalizar').addEventListener('click', () => {
        console.log('Finalizar compra');
        seleciona('aside').classList.remove('show');
        seleciona('aside').style.left = '100vw';
        seleciona('header').style.display= 'flex';   
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

adicionarNoCarrinho();
atualizarCarrinho();
fecharCarrinho();
finalizarCompra();