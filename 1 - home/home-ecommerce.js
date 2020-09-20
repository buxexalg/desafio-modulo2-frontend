    fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?language=pt-BR')
    .then((filmes) => filmes.json())
    .then((filmesJSON)=> {

    pegaTopFilmes(filmesJSON.results);
    pegaFilmes(filmesJSON.results);

    filmesJSON.results.map((item) => filmesTodosGeneros.push(item));

    return fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=28&language=pt-BR')
    }).then((filmesAcao) => filmesAcao.json())
    .then((acaoJSON) => {
        acaoJSON.results.map((item) => filmes.push(item));
        
        return fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=10749&language=pt-BR');
    }).then((filmesRomance) => filmesRomance.json())
    .then((romanceJSON) => {
        romanceJSON.results.map((item) => filmes.push(item));
        
        return fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=878&language=pt-BR');
    }).then((filmesSciFi) => filmesSciFi.json())
    .then((scifiJSON) => {
        scifiJSON.results.map((item) => filmes.push(item));

        return fetch('https://tmdb-proxy-workers.vhfmag.workers.dev/3/discover/movie?with_genres=27&language=pt-BR');
    }).then((filmesTerror) => filmesTerror.json())
    .then((terrorJSON) => {
        terrorJSON.results.map((item) => filmes.push(item));
        
        filmes.sort((idA, idB) => (idA.id > idB.id) ? -1 : 1);

        const filmesSemRepeticao = [];

        for (i = 0; i < (filmes.length) - 1; i++) {
            if(filmes[i].id !== filmes[i+1].id) filmesSemRepeticao.push(filmes[i]);
        }

        filmesSemRepeticao.sort((popularidadeA, popularidadeB) => (popularidadeA.popularity > popularidadeB.popularity) ? -1 : 1);

        return filmesSemRepeticao;
    }).then ((filmesSemRepeticao) => {
        botaoIniciarCountdown();

        botaoTodos.addEventListener("click", () => {
            botaoTodos.classList.add("ativo");
            botaoAcao.classList.remove("ativo");
            botaoRomance.classList.remove("ativo");
            botaoSciFi.classList.remove("ativo");
            botaoTerror.classList.remove("ativo");
            selecionaPorGenero(filmesSemRepeticao);
            adicionaEventos();
        })
    
        botaoAcao.addEventListener("click", () => {
            botaoTodos.classList.remove("ativo");
            if (botaoAcao.classList.contains("ativo")){
                botaoAcao.classList.remove("ativo")

                if (botaoAcao.classList.contains("ativo") === false 
                && botaoRomance.classList.contains("ativo") === false 
                && botaoSciFi.classList.contains("ativo") === false
                && botaoTerror.classList.contains("ativo") === false) botaoTodos.classList.add("ativo");
            } else {
                botaoAcao.classList.add("ativo");
            } 
            selecionaPorGenero(filmesSemRepeticao);
            adicionaEventos();
        }) 
    
        botaoRomance.addEventListener("click", () => {
            botaoTodos.classList.remove("ativo");
            if (botaoRomance.classList.contains("ativo")){
                botaoRomance.classList.remove("ativo")

                if (botaoAcao.classList.contains("ativo") === false 
                && botaoRomance.classList.contains("ativo") === false 
                && botaoSciFi.classList.contains("ativo") === false
                && botaoTerror.classList.contains("ativo") === false) botaoTodos.classList.add("ativo");
            } else {
                botaoRomance.classList.add("ativo");
            } 
            selecionaPorGenero(filmesSemRepeticao);
            adicionaEventos();
        })
    
        botaoSciFi.addEventListener("click", () => {
            botaoTodos.classList.remove("ativo");
            if (botaoSciFi.classList.contains("ativo")){
                botaoSciFi.classList.remove("ativo")

                if (botaoAcao.classList.contains("ativo") === false 
                && botaoRomance.classList.contains("ativo") === false 
                && botaoSciFi.classList.contains("ativo") === false
                && botaoTerror.classList.contains("ativo") === false) botaoTodos.classList.add("ativo");
            } else {
                botaoSciFi.classList.add("ativo");
            } 
            selecionaPorGenero(filmesSemRepeticao);
            adicionaEventos();
        })
    
        botaoTerror.addEventListener("click", () => {
            botaoTodos.classList.remove("ativo");
            if (botaoTerror.classList.contains("ativo")){
                botaoTerror.classList.remove("ativo")

                if (botaoAcao.classList.contains("ativo") === false 
                && botaoRomance.classList.contains("ativo") === false 
                && botaoSciFi.classList.contains("ativo") === false
                && botaoTerror.classList.contains("ativo") === false) botaoTodos.classList.add("ativo");
            } else {
                botaoTerror.classList.add("ativo");
            } 
            selecionaPorGenero(filmesSemRepeticao);
            adicionaEventos();
        })
    
        headerCupom.addEventListener("click", () => {
            headerCupom.setAttribute("hidden","");
            inputCupom.value = 'HTMLNAOELINGUAGEM';
        })
    
        const iconeFav = document.querySelectorAll(".texto > img");
    
        iconeFav.forEach((icone) => {
            icone.addEventListener("click", (event) => {
                icone.src = "../imagens/favorito-true.png"
            })
        })

        adicionaEventos();
        
    })

const filmes = [];
const filmesTodosGeneros = [];

const todosBotoes = document.querySelectorAll(".botoes button");
const botaoTodos = document.querySelector("#botaoTodos");
const botaoAcao = document.querySelector("#botaoAcao");
const botaoRomance = document.querySelector("#botaoRomance");
const botaoSciFi = document.querySelector("#botaoSciFi");
const botaoTerror = document.querySelector("#botaoTerror");

const headerCupom = document.querySelector(".header-filmes");

const listaTopFilmes = document.querySelector(".lista-card-filmes > ul");
const listaTodosFilmes = document.querySelector(".lista-card-todos-filmes > ul");

const sacola = document.querySelector(".sacola")
const inputCupom = document.querySelector(".cupom-sacola form input")
const sacolaVazia = document.querySelector(".sacola-vazia");
const filmesSacola = document.querySelector(".filmes-sacola")
const listaFilmesSacola = filmesSacola.querySelector("ul");

const tempo = document.querySelector("#tempo");
const tempoDividido = document.querySelector("#tempo").innerText.split(":");

const criaElementos = (listaJSON) => {
    const listaExport = [];
    for (const itemLista of listaJSON) {
        const item = document.createElement("li");

        const card = document.createElement("div");
        const texto = document.createElement("div");
        const informacoes = document.createElement("div");
        const nota = document.createElement("div");

        const poster = document.createElement("img");
        const estrela = document.createElement("img");
        const favorito = document.createElement("img");

        const botaoComprar = document.createElement("button")

        const nome = document.createElement("span");
        const notaTexto = document.createElement("span");
        const sacola = document.createElement("span");
        const preco = document.createElement("span");


        card.classList.add("card");
        texto.classList.add("texto");
        nota.classList.add("nota");
        informacoes.classList.add("informacoes")

        poster.setAttribute("src", itemLista.poster_path);
        estrela.setAttribute("src", "../imagens/estrela.svg");
        favorito.setAttribute("src", "../imagens/favorito.png");
        nome.innerText = itemLista.title;
        notaTexto.innerText = itemLista.vote_average;
        preco.innerText = `R$ ${(itemLista.price*5.24).toFixed(2)}`
        sacola.innerText = "Sacola"

        botaoComprar.append(sacola);
        botaoComprar.append(preco);

        nota.append(estrela);
        nota.append(notaTexto);

        informacoes.append(nome);
        informacoes.append(nota);

        texto.append(favorito);
        texto.append(informacoes);
        texto.append(botaoComprar);

        card.append(poster);
        card.append(texto);

        item.append(card);

        listaExport.push(item);
    }
    return listaExport;
}

const botaoIniciarCountdown = () => {
    const id = setInterval(() => {
        tempo.innerText = `00:${tempoDividido[1]}:${tempoDividido[2]}`

        if(tempoDividido[1] == 00 && tempoDividido[2] == 00) {
            headerCupom.setAttribute("hidden","");
            clearInterval(id);
        } 
        if (tempoDividido[2] == 00) {
            tempoDividido[2] = 60;
            tempoDividido[1] -= 1;
        }
        
        tempoDividido[2]--;
    }, 1000);
}

const limpaFilmes = () => {
    const todosFilmes = document.querySelector('.lista-card-todos-filmes ul');

        while (todosFilmes.hasChildNodes()) {  
            todosFilmes.removeChild(todosFilmes.firstChild);
        }
}

const pegaFilmes = (filmesJSON) => {
    const listaFilmes = criaElementos(filmesJSON);
    
    listaFilmes.forEach((item, i) => {
        if (i >= 5 && i < 20) {
            listaTodosFilmes.append(item);
        }
    })
}

const pegaTopFilmes = (filmesJSON) => {
    const topFilmes = criaElementos(filmesJSON);

    topFilmes.forEach((item, i) => {
        if (i < 5) listaTopFilmes.append(item);
    })
}

const selecionaPorGenero = (listaFilmes) => {

    const listaExibidos = [];

    todosBotoes.forEach((item) => {
        if (item.classList.contains("ativo")) {
            if (item.id == 'botaoTodos') {
                limpaFilmes();
                pegaFilmes(filmesTodosGeneros);
            } else {
                if (item.id == 'botaoAcao') {
                    listaFilmes.forEach((filme) => {
                        if (filme.genre_ids.includes(28)) listaExibidos.push(filme);
                    })
                    limpaFilmes();
                    pegaFilmes(listaExibidos);
                }

                if (item.id == 'botaoRomance') {
                    listaFilmes.forEach((filme) => {
                        if (filme.genre_ids.includes(10749)) listaExibidos.push(filme);
                    })
                    limpaFilmes();
                    pegaFilmes(listaExibidos);
                }

                if (item.id == 'botaoSciFi') {
                    listaFilmes.forEach((filme) => {
                        if (filme.genre_ids.includes(878)) listaExibidos.push(filme);
                    })
                    limpaFilmes();
                    pegaFilmes(listaExibidos);
                }

                if (item.id == 'botaoTerror') {
                    listaFilmes.forEach((filme) => {
                        if (filme.genre_ids.includes(27)) listaExibidos.push(filme);
                    })
                    limpaFilmes();
                    pegaFilmes(listaExibidos);
                }
            }
        }
    })

}

const adicionaEventos = () => {
    document.querySelectorAll(".texto button").forEach((item) => {
        item.addEventListener("click", () => adicionaFilme(item))
    })
}

const adicionaFilme = (item) => {
    if (document.querySelector(".filmes-sacola ul").childElementCount === 0) adicionaBotaoCompra();
    const precoFilme = item.innerText.split("R$")[1].trim();
    const nomeFilme = item.closest("div").querySelector("span").innerText;
    const posterFilme = item.offsetParent.offsetParent.querySelector("img").src

    sacolaVazia.setAttribute("hidden","");
    filmesSacola.removeAttribute("hidden");

    const nomeSacola = document.querySelectorAll(".itens-sacola li span:nth-child(1)");

    for (let i = 0; i < nomeSacola.length ; i++) {
        if (nomeFilme === nomeSacola[i].innerText) {
            nomeSacola[i].parentElement.parentElement.parentElement.querySelector(".comandos-sacola span").innerText++;
            valorSacola();
            return true;
        }
    }

    listaFilmesSacola.innerHTML += `
    <li>
        <div class="item-carrinho">
            <div class="dados-filme">
                <img src=${posterFilme}>
                <div class="informacoes-filme-sacola">
                    <span>${nomeFilme}</span>
                    <span>R$ ${precoFilme}</span>
                </div>
            </div>
            <div class="comandos-sacola">
                <img src="../imagens/adicionar.png">
                <span>1</span>
                <img src="../imagens/deletar.png">
            </div>
        </div>
    </li>`

    valorSacola();

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

    valorSacola();
}

const adicionaBotaoCompra = () => {
    const botao = document.createElement("div");
    botao.classList.add("botao-confirma")
    botao.innerHTML = `
    <button>
        Confirme seus dados
        <span></span>
    </button>`

    sacola.append(botao);

    const botaoConfirma = document.querySelector(".botao-confirma button");
    botaoConfirma.addEventListener("click", () => confirmarDados());
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

const confirmarDados = () => {

    const a = document.querySelectorAll(".itens-sacola li");
    const listaSacola = []
    a.forEach((item) => {
        const sacolaFinalizada = {
            poster : item.querySelector(".dados-filme img").src,
            nome : item.querySelector(".informacoes-filme-sacola span:first-child").innerText,
            preco : item.querySelector(".informacoes-filme-sacola span:last-child").innerText,
            quantidade : item.querySelector(".comandos-sacola span").innerText,
            cupom : (inputCupom.value === 'HTMLNAOELINGUAGEM') ? true : false
        }

        listaSacola.push(sacolaFinalizada);
    })

    const sacolaString = JSON.stringify(listaSacola);

    localStorage.setItem('sacola', sacolaString);

    location.href = '../2 - pagamento/pagamento-ecommerce.html';
}