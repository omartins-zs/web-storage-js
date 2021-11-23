let lista = [];

let novoItem = document.querySelector('#novoItem');
let btnNovoItem = document.querySelector('#btnNovoItem');
let items = document.querySelector('#items');


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