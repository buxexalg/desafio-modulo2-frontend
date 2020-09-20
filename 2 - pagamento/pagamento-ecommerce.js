const sacolaItens = localStorage.getItem('sacola');

const sacolaParse = JSON.parse(sacolaItens);

const sacolaVazia = document.querySelector(".sacola-vazia");
const filmesSacola = document.querySelector(".filmes-sacola")
const listaFilmesSacola = filmesSacola.querySelector("ul");
const inputCupom = document.querySelector(".cupom-sacola form input")
const sacola = document.querySelector(".sacola")

const adicionaFilme = (itensParse) => {
    
    if (itensParse[0].cupom === true) inputCupom.value = 'HTMLNAOELINGUAGEM';

    itensParse.forEach((item) => {
        const nomeFilme = item.nome;
        const posterFilme = item.poster;
        const precoFilme = item.preco;
        const quantidadeFilme = item.quantidade;

        listaFilmesSacola.innerHTML += `
        <li>
            <div class="item-carrinho">
                <div class="dados-filme">
                    <img src=${posterFilme}>
                    <div class="informacoes-filme-sacola">
                        <span>${nomeFilme}</span>
                        <span>${precoFilme}</span>
                    </div>
                </div>
                <div class="comandos-sacola">
                    <img src="../imagens/adicionar.png">
                    <span>${quantidadeFilme}</span>
                    <img src="../imagens/deletar.png">
                </div>
            </div>
        </li>`
    })

    adicionaBotaoCompra();

    sacolaVazia.setAttribute("hidden","");
    filmesSacola.removeAttribute("hidden");

    valorSacola();

    checaInputs();

    document.querySelectorAll(".comandos-sacola img:first-child").forEach((item) => {
        item.addEventListener("click", () => addQuantidade(item));
    })

    document.querySelectorAll(".comandos-sacola img:last-child").forEach((item) => {
        item.addEventListener("click", () => removeQuantidade(item));
    })
}

const addQuantidade = (item) => {
    if (item.nextElementSibling.innerText == 1) {
        item.nextElementSibling.innerText++;
        (item.parentElement).querySelector("img:last-child").src = "../imagens/menos.png";
    } else {
        item.nextElementSibling.innerText++;
    }
    //verifica botao
    valorSacola();
}

const removeQuantidade = (item) => {
    if (item.previousElementSibling.innerText == 2) {
        item.previousElementSibling.innerText--
        item.src = "../imagens/deletar.png";
    } else if (item.previousElementSibling.innerText == 1) {
        item.parentElement.parentElement.parentElement.remove();
    } else {
        item.previousElementSibling.innerText--
    }
    if (document.querySelector(".filmes-sacola ul").childElementCount === 0) {
        sacolaVazia.removeAttribute("hidden")
        document.querySelector(".botao-confirma").remove();
    }
    //verifica botao
    valorSacola();
}


const valorSacola = () => {

    let valor = 0;

    const valores = document.querySelectorAll('.informacoes-filme-sacola span:last-child');
    const quantidade = document.querySelectorAll(".comandos-sacola span");

    valores.forEach((item, i) => {
        valor += (item.innerText.split(' ')[1]*quantidade[i].innerText);
    })

    if (inputCupom.value === 'HTMLNAOELINGUAGEM') valor = valor/2;


    document.querySelector(".botao-confirma span").innerText = `R$ ${valor.toFixed(2)}`;
}

const adicionaBotaoCompra = () => {
    const botao = document.createElement("div");
    botao.classList.add("botao-confirma")
    botao.innerHTML = `
    <button disabled>
        Comprar agora
        <span></span>
    </button>`

    sacola.append(botao);
    const botaoConfirma = document.querySelector(".botao-confirma button");
    botaoConfirma.addEventListener("click", () => confirmarDados(botaoConfirma));
}

const confirmarDados = (botaoConfirma) => {

    if (document.querySelector(".botao-confirma button").hasAttribute("disabled")) alert("Preencha todos os dados corretamente antes de confirmar a compra!")

        location.href = '../3 - obrigado/obrigado-ecommerce.html';
    }

const checaInputs = () => {
    const inputs = document.querySelectorAll(".formularios input");
    

    inputs.forEach((item) => {
        item.addEventListener("keyup", () => {
            let check = 0;
            inputs.forEach((item) => {
                if (item.value !== '') check++;
                if (check === 12) document.querySelector(".botao-confirma button").removeAttribute('disabled')
            })
        })
    })
}


adicionaFilme(sacolaParse);