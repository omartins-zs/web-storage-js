let lista = [];

let novoItem = document.querySelector('#novoItem');
let btnNovoItem = document.querySelector('#btnNovoItem');
let items = document.querySelector('#items');

recuperarLista();

// Podendo mudar o localStorage -> sessionStorage

btnNovoItem.addEventListener('click', () => {
    inserirItem({ nome: novoItem.value, id: gerarId() });
    novoItem.value = '';
});

function recuperarLista() {
    let listaItems = localStorage.getItem('listaDeCompras');
    if (listaItems) {
        let items = JSON.parse(listaItems);
        for (const item of items) {
            inserirItem(item, false);
        }
    }
}

function gerarId() {
    return Math.floor(Math.random() * 8000);
}

function inserirItem(item, novoItem = true) {
    lista.push(item);
    items.appendChild(criarItemLista(item));
    if (novoItem) {
        localStorage.setItem('listaDeCompras', JSON.stringify(lista));
    }
}

function criarItemLista(item) {
    let li = document.createElement('li');
    let btnHtml = '<button onClick="deletarItem(' + item.id + ')">Deletar</button>';
    li.innerHTML = item.nome + '&nbsp;&nbsp;' + btnHtml;
    li.style.marginBottom = '15px';
    li.id = item.id;
    return li;
}

function deletarItem(id) {

    let indice = lista.findIndex(i => i.id == id);
    if (indice < 0) {
        alert('O ID não foi encontrado');
        return;
    }

    lista.splice(indice, 1);
    localStorage.setItem('listaDeCompras', JSON.stringify(lista));

    document.getElementById('' + id + '').remove();
}
