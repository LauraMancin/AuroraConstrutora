const imoveis = [
    { id: 1, nome: "Casa Jardim Europa", tipo: "Casa", cidade: "Piracicaba - SP", status: "finalizada",
      quartos: 3, garagem: 2, banheiros: 3, metragem: 168, foto: "casa1",
      descricao: "Casa térrea de acabamento superior, com cozinha integrada à sala e quintal amplo.",
      diferenciais: ["Cozinha integrada", "Quintal amplo", "Piso porcelanato", "Energia solar"] },
    { id: 2, nome: "Aurora Park - Casa 12", tipo: "Casa em condomínio", cidade: "Piracicaba - SP", status: "finalizada",
      quartos: 2, garagem: 1, banheiros: 2, metragem: 112, foto: "casa2",
      descricao: "Casa compacta em condomínio fechado, com portaria 24h e área de lazer.",
      diferenciais: ["Portaria 24h", "Área de lazer", "Playground", "Ruas arborizadas"] },
    { id: 3, nome: "Vila Nascente - Casa 04", tipo: "Casa em condomínio", cidade: "Americana - SP", status: "finalizada",
      quartos: 3, garagem: 2, banheiros: 3, metragem: 150, foto: "casa3",
      descricao: "Casa de dois pavimentos, com suíte master e varanda.",
      diferenciais: ["Suíte master", "Varanda", "Piscina no condomínio", "Segurança 24h"] },
    { id: 4, nome: "Residencial Bela Vista", tipo: "Casa", cidade: "Piracicaba - SP", status: "andamento",
      metragem: 140, progresso: 45, entrega: "8 meses", foto: "obra1",
      descricao: "Casas em construção em bairro residencial. Ainda dá para personalizar os acabamentos.",
      diferenciais: ["Acabamentos personalizáveis", "Bairro residencial", "Próximo a escolas"] },
    { id: 5, nome: "Aurora Park II", tipo: "Casa em condomínio", cidade: "Piracicaba - SP", status: "andamento",
      metragem: 125, progresso: 20, entrega: "14 meses", foto: "obra2",
      descricao: "Segunda fase do Aurora Park, com novas casas e mais área de lazer.",
      diferenciais: ["Nova área de lazer", "Portaria 24h", "Projeto contemporâneo"] },
    { id: 6, nome: "Casas do Lago", tipo: "Casa em condomínio", cidade: "Rio Claro - SP", status: "andamento",
      metragem: 135, progresso: 60, entrega: "10 meses", foto: "obra3",
      descricao: "Condomínio com vista para o lago, lotes amplos e arquitetura contemporânea.",
      diferenciais: ["Vista para o lago", "Lotes amplos", "Segurança 24h"] }
];

const rotulo = { finalizada: "Finalizada", andamento: "Em andamento" };


// LISTA DOS IMÓVEIS
const lista = document.getElementById("listaImoveis");

function mostrarImoveis(filtro) {
    let html = "";

    for (const i of imoveis) {
        if (filtro !== "todos" && i.status !== filtro) continue;

        let detalhes = "";
        if (i.status === "finalizada") {
            detalhes = `<li>${i.quartos} quartos</li><li>${i.garagem} vaga(s)</li>`;
        } else {
            detalhes = `<li>Entrega em ${i.entrega}</li>`;
        }

        html += `
            <article class="cardImovel">
                <div class="fotoImovel">
                    <images src="images/${i.foto}.jpg" alt="${i.nome}" loading="lazy">
                    <span class="status ${i.status}">${rotulo[i.status]}</span>
                </div>
                <div class="infoImovel">
                    <h3>${i.nome}</h3>
                    <p class="local">${i.tipo} · ${i.cidade}</p>
                    <ul class="specs">${detalhes}</ul>
                    <a class="botaoSaibaMais" href="imovel.html?id=${i.id}">Saiba mais</a>
                </div>
            </article>`;
    }

    lista.innerHTML = html;
}

if (lista) {
    mostrarImoveis("todos");

    const botoes = document.querySelectorAll(".filtro");
    for (const botao of botoes) {
        botao.onclick = function () {
            for (const b of botoes) b.classList.remove("ativo");
            botao.classList.add("ativo");
            mostrarImoveis(botao.dataset.filtro);
        };
    }
}


// FORMULÁRIO
const form = document.getElementById("formContato");

if (form) {
    form.onsubmit = function (evento) {
        evento.preventDefault(); 
        document.getElementById("confirmacao").textContent = "Recebemos seu contato. Retornaremos em breve.";
        form.reset();
    };
}


// PÁGINA DO IMÓVEL
const detalhe = document.getElementById("detalhe");


function trocarFoto(caminho) {
    document.getElementById("fotoPrincipal").src = caminho;
}

if (detalhe) {
    const id = new URLSearchParams(location.search).get("id");
    let i = imoveis[0];
    for (const item of imoveis) {
        if (item.id == id) i = item;
    }
    document.title = i.nome + " | Aurora Construtora";

    //fotos do imóvel
    const fotos = [`images/${i.foto}.jpg`, `images/${i.foto}-2.jpg`, `images/${i.foto}-3.jpg`];
    let miniaturas = "";
    for (const f of fotos) {
        miniaturas += `<button class="mini" onclick="trocarFoto('${f}')" aria-label="Ver foto"><images src="${f}" alt=""></button>`;
    }


    let ficha = `<li><strong>${i.metragem} m²</strong>Área construída</li>`;
    let obra = "";
    if (i.status === "finalizada") {
        ficha += `<li><strong>${i.quartos}</strong>Quartos</li>
                  <li><strong>${i.banheiros}</strong>Banheiros</li>
                  <li><strong>${i.garagem}</strong>Vaga(s) de garagem</li>`;
    } else {
        ficha += `<li><strong>${i.entrega}</strong>Previsão de entrega</li>`;
        obra = `<div class="obra">
                    <p>Obra ${i.progresso}% concluída</p>
                    <div class="progresso"><div style="width:${i.progresso}%"></div></div>
                </div>`;
    }

    let diferenciais = "";
    for (const d of i.diferenciais) diferenciais += `<li>${d}</li>`;

    const mensagem = encodeURIComponent("Olá! Tenho interesse no imóvel " + i.nome + ".");

    detalhe.innerHTML = `
        <a class="voltar" href="index.html#containerportifolio">Voltar aos projetos</a>
        <div class="detalheGrid">
            <div class="galeria">
                <images class="fotoPrincipal" id="fotoPrincipal" src="${fotos[0]}" alt="${i.nome}">
                <div class="miniaturas">${miniaturas}</div>
            </div>
            <div class="detalheInfo">
                <span class="status ${i.status}">${rotulo[i.status]}</span>
                <h1>${i.nome}</h1>
                <p class="local">${i.tipo} · ${i.cidade}</p>
                <p class="descricao">${i.descricao}</p>
                ${obra}
                <ul class="ficha">${ficha}</ul>
                <ul class="diferenciais">${diferenciais}</ul>
                <div class="locacaoBotoes">
                    <a class="botaoProjetos" href="https://wa.me/5519900000000?text=${mensagem}" target="_blank" rel="noopener">Tenho interesse</a>
                    <a class="botaoFale" href="index.html#containerContato">Enviar formulário</a>
                </div>
            </div>
        </div>`;
}


const menu = document.querySelector(".menuBg");
window.onscroll = function () {
    menu.classList.toggle("rolou", window.scrollY > 40);
};