const nome = document.getElementById('nome');
const cpf = document.getElementById('cpf');
 const clientes =  []
const dados4 = document.getElementById('lista-cliente');

const nome3 = document.getElementById('nome3')

const produtoa = document.getElementById('produtoa')
const quantidadea = document.getElementById('quantidadea')
const compras =  []
const dadosa = document.getElementById('lista-compra')

const nomep = document.getElementById('nomep');
const preco = document.getElementById('preco');
const quantidade = document.getElementById('quantidade');
const produtos =  []
const dados2 = document.getElementById('lista-estoque')

const dados5 = document.getElementById('listar')
const dados6 = document.getElementById('sla')
const dados7 = document.getElementById('sla2')
const dados8 = document.getElementById('sla3')

const cpf_cliente = document.getElementById('cpf_cliente');
const nome_produto = document.getElementById('nome_produto');
const vendas =  []
const quantidade_produto = document.getElementById("quantidade_produto")
const dados = document.getElementById('lista-venda');

const cpf3 = document.getElementById('cpf3');
const dados3 = document.getElementById('lista-cliente2');


async function buscar_cliente() {
    const busca = await fetch('https://lucas-aula6-js-1.onrender.com/cliente')
    const dados = await busca.json()
    clientes.length = 0
    clientes.push(...dados)
    console.log(clientes)
    if (dados4)
        listarc();
}
buscar_cliente();

async function buscar_produto() {
    const busca = await fetch('https://lucas-aula6-js-1.onrender.com/produto')
    const dados = await busca.json()
    produtos.length = 0
    produtos.push(...dados)
    if (dados2)
        listare();
}
buscar_produto()

async function buscar_venda() {
    const busca = await fetch('https://lucas-aula6-js-1.onrender.com/venda')
    const dados = await busca.json()
    vendas.length = 0
    vendas.push(...dados)
    if (dados)
        listarv();
}
buscar_venda()

async function buscar_compra() {
    const busca = await fetch('https://lucas-aula6-js-1.onrender.com/compra')
    const dados = await busca.json()
    compras.length = 0
    compras.push(...dados)
    if (dadosa)
        listarco();
}
buscar_compra()

async function cadastrarc() {
    if (nome.value.trim() && cpf.value.trim()) {
        if (/^[A-Za-z\sÀ-ý]+$/.test(nome.value)) {
            if (/^\d{11}$/.test(cpf.value)) {
                let achou = false;
                for (let i of clientes) {
                    if (i.cpf == cpf.value) {
                        achou = true;
                        alert(`Este cliente já está cadastrado!`)
                    }
                }
                if (!achou) {
                    const cliente = {
                        nome: nome.value,
                        cpf: cpf.value
                    }
                    // clientes.push(cliente)
                    await fetch('https://lucas-aula6-js-1.onrender.com/cliente/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(cliente)
                    })
                    // localStorage.setItem("clientes", JSON.stringify(clientes))
                    alert(cliente.nome + " esta cadastrado(a).")
                    listarc();
                }
            } else {
                alert(`O CPF deve conter somente 11 digítos e somente números!`)
            }
        } else {
            alert(`O nome só pode conter letras, espaços e acentos!`)
        }
    } else {
        alert(`Nome e CPF não podem ser vazios!`)
    }
}

async function cadastrarp() {
    if (nomep.value.trim() && preco.value.trim() && quantidade.value.trim()) {
        if (/^\d+$/.test(quantidade.value) && !quantidade.value.includes("e") && !quantidade.value.includes("E")) {
            if (!preco.value.includes("e") && !preco.value.includes("E") && preco.value > -1) {
                let achou = false;
                for (let i of produtos) {
                    if (i.nomep == nomep.value.trim()) {
                        achou = true;
                        alert(`Este produto já está cadastrado!`)
                    }
                }
                if (!achou) {
                    const produto = {
                        nomep: nomep.value,
                        preco: preco.value,
                        quantidade: quantidade.value
                    }
                    await fetch('https://lucas-aula6-js-1.onrender.com/produto/', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify(produto)
                    })
                    alert(produto.nomep + " esta cadastrado(a).")
                    listare();
                }
            } else {
                alert("O preço deve conter somente números e ser positivo!")
            }
        } else {
            alert(`A quantidade deve conter somente números e ser positiva!`)
        }
    } else {
        alert(`Nome, preco e quantidade não podem ser vazios!`)
    }
}

async function cadastrarv() {
    let i = -1;
    let cliente = false;
    await buscar_cliente();
    const c = await clientes.find(item => item.cpf.trim() === cpf_cliente.value.trim())

    if (!c) {
        alert("Este cliente não está cadastrado!");
        return;
    }

    let sla = false;
    let slaa = -1;
    for (let p of produtos) {
        i++;
        if (p.nomep.toUpperCase() === nome_produto.value.trim().toUpperCase()) {
            sla = true;
            slaa = i;
            break;
        }
    }

    if (!sla) {
        alert("Este produto não está cadastrado!");
        return;
    }

    if (Number(quantidade_produto.value) <= 0) {
        alert("Deve se vender pelo menos um produto!");
        return;
    }

    if (produtos[slaa].quantidade < Number(quantidade_produto.value)) {
        alert("Este produto não tem estoque!");
        return;
    }

    produtos[slaa].quantidade = Number(produtos[slaa].quantidade) - Number(quantidade_produto.value);

    const venda = {
        cpf_cliente: cpf_cliente.value,
        nome_produto: nome_produto.value,
        quantidade_produto: quantidade_produto.value
    };

    // vendas.push(venda);
    await fetch('https://lucas-aula6-js-1.onrender.com/venda/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(venda)
    })
    await vender_produto();
    // localStorage.setItem("vendas", JSON.stringify(vendas));
    // localStorage.setItem("produtos", JSON.stringify(produtos));
    alert("A venda do produto " + venda.nome_produto + " foi cadastrada.");
    listarv();
}


async function cadastrarco() {
    let i = -1;
    let sla = false;
    let slaa = -1;
    for (let p of produtos) {
        i++;
        if (p.nomep.toUpperCase() == produtoa.value.trim().toUpperCase()) {
            sla = true;
            slaa = i;
            break;
        }
    } if (sla) {
        if (Number(quantidadea.value) > 0) {
            produtos[slaa].quantidade = Number(produtos[slaa].quantidade) + Number(quantidadea.value);
            const compra = {
                produtoa: produtoa.value,
                quantidadea: quantidadea.value
            }
            console.log(produtoa.value)
            compras.push(compra)
            await fetch('https://lucas-aula6-js-1.onrender.com/compra/', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(compra)
            })
            await add_produto();
            // localStorage.setItem("compras", JSON.stringify(compras))
            // localStorage.setItem("produtos", JSON.stringify(produtos))
            alert("A compra do produto " + compra.produtoa + " foi cadastrada.")
            listarco();
            return;
        } else {
            alert(`Deve ser adicionado pelo menos um produto!`)
            return;
        }
    } else {
        alert(`Este produto não está cadastrado!`)
    }
}



async function buscar() {
    let sla = null;
    for (let c of clientes) {
        if (c.cpf === cpf3.value) {
            sla = c;
            break;
        }
    }
    if (sla) {
        dados3.innerHTML += `<p>${sla.nome}</p>`;
        await buscar_cliente();
    } else {
        alert("Cliente não encontrado!");
    }
}

async function excluir() {
    let sla = false;
    let i = -1;
    for (let c of clientes) {
        i++;
        if (c.cpf === cpf3.value) {
            sla = true;
            break;
        }
    }
    if (sla) {
        await deletar_cliente();
        clientes.splice(i, 1);
        // localStorage.setItem("clientes", JSON.stringify(clientes))
        alert("Cliente excluído com sucesso!")
        dados3.innerHTML = "";
        cpf3.value = "";
        return;
    } else {
        alert("Cliente não encontrado!");
    }
}

async function editar() {
    let sla = null;
    let i = -1;
    for (let c of clientes) {
        i++;
        if (c.cpf === cpf3.value) {
            sla = c;
            break;
        }
    }
    if (sla) {
        if (nome3.value.trim()) {
            if (/^[A-Za-z\sÀ-ý]+$/.test(nome3.value)) {
                clientes[i].nome = nome3.value;
                // localStorage.setItem("clientes", JSON.stringify(clientes))
                await editar_cliente();
                alert("Operação bem-sucedida!");
            } else {
                alert(`O nome só pode conter letras, espaços e acentos!`)
            }
        } else {
            alert("O novo nome não pode ser vazio!");
        }
    } else {
        alert("Cliente não encontrado!");
    }
}

function listarv() {
    dados.innerHTML = "Cadastrados:"
    for (let venda of vendas) {
        dados.innerHTML += `<p>CPF: ${venda.cpf_cliente} | Nome do produto: ${venda.nome_produto} | Quantidade vendida: ${venda.quantidade_produto}</p>`
    }
}

function listarco() {
    dadosa.innerHTML = "Cadastrados:"
    for (let compra of compras) {
        dadosa.innerHTML += `<p>Nome do produto: ${compra.produtoa} | Quantidade comprada: ${compra.quantidadea}</p>`
    }
}

function listare() {
    dados2.innerHTML = "Cadastrados:"
    for (let produto of produtos) {
        dados2.innerHTML += `<p>Nome: ${produto.nomep} | Preço: ${produto.preco} | Quantidade: ${produto.quantidade}</p>`
    }
}

function listarc() {
    dados4.innerHTML = "Cadastrados:"
    for (let cliente of clientes) {
        dados4.innerHTML += `<p>Nome: ${cliente.nome} | CPF: ${cliente.cpf} </p>`
    }
}

function listart() {
    dados5.innerHTML = "Clientes:";
    for (let cliente of clientes) {
        dados5.innerHTML += `<p>Nome: ${cliente.nome} | CPF: ${cliente.cpf} </p>`;
    }

    dados6.innerHTML = "Vendas:";
    for (let venda of vendas) {
        dados6.innerHTML += `<p>CPF: ${venda.cpf_cliente} | Nome do produto: ${venda.nome_produto} | Quantidade vendida: ${venda.quantidade_produto}</p>`;
    }

    dados7.innerHTML = "Estoque:";
    for (let produto of produtos) {
        dados7.innerHTML += `<p>Nome: ${produto.nomep} | Preço: ${produto.preco} | Quantidade: ${produto.quantidade}</p>`;
    }
    dados8.innerHTML = "Compras:";
    for (let compra of compras) {
        dados8.innerHTML += `<p>Nome do produto: ${compra.produtoa} | Quantidade comprada: ${compra.quantidadea}</p>`
    }
}

function limpar() {
    dados5.innerHTML = "";
    dados6.innerHTML = "";
    dados7.innerHTML = "";
    dados8.innerHTML = "";
}

function listar() {
    if (dados4) {
        listarc();
    }
    if (dados) {
        listarv();
    }
    if (dados2) {
        listare();
    }
    if (dados5) {
        listart();
    }
    if (dadosa) {
        listarco();
    }
}
listar();


async function editar_cliente() {
    const c = await clientes.find(item => item.cpf === cpf3.value)
    if (c) {
        let cliente_atualizado = {
            nome: nome3.value ?? c.nome,
            cpf: cpf3.value ?? c.cpf
        }
        let resposta = await fetch(`https://lucas-aula6-js-1.onrender.com/cliente/${c.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(cliente_atualizado)
        })
        await buscar_cliente();
    }
}
async function deletar_cliente() {
    buscar_cliente()
    const c = await clientes.find(item => item.cpf === cpf3.value)
    if (c) {
        let resposta = await fetch(`https://lucas-aula6-js-1.onrender.com/cliente/${c.id}`, {
            method: 'DELETE'
        })
        await buscar_cliente();
    }
}

async function add_produto() {
    const c = await produtos.find(item => item.nomep === produtoa.value)
    if (c) {
        let produto_atualizado = {
            nomep: c.nomep,
            preco: c.preco,
            quantidade: c.quantidade
        }
        let resposta = await fetch(`https://lucas-aula6-js-1.onrender.com/produto/${c.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto_atualizado)
        })
        await buscar_produto();
    }
}

async function vender_produto() {
    const c = await produtos.find(item => item.nomep === nome_produto.value)
    if (c) {
        let produto_atualizado = {
            nomep: c.nomep,
            preco: c.preco,
            quantidade: c.quantidade
        }
        let resposta = await fetch(`https://lucas-aula6-js-1.onrender.com/produto/${c.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(produto_atualizado)
        })
       await buscar_produto();
    }
}