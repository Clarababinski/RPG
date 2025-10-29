// ==========================================================
// 1. Variáveis de Estado (Modelo de Dados)
// ==========================================================
let personagem = {
    hpAtual: 100,
    hpMaximo: 100,
    sanidadeAtual: 50,
    sanidadeMaximo: 50,

    // NOVO: Array para guardar todos os atributos
    atributos: [
        { nome: "Força", valor: 10, mod: 0 },
        { nome: "Destreza", valor: 12, mod: 1 },
        { nome: "Constituição", valor: 14, mod: 2 },
        { nome: "Inteligência", valor: 8, mod: -1 },
        { nome: "Carisma", valor: 16, mod: 3 },
    ]
};

// ==========================================================
// 2. Funções de Lógica
// ==========================================================

// Função para calcular o modificador (ex: D&D 5e: (valor - 10) / 2, arredondado para baixo)
function calcularModificador(valorBase) {
    // Math.floor garante que o número seja arredondado para baixo
    return Math.floor((valorBase - 10) / 2);
}

// Função chamada quando o jogador edita o valor de um atributo
function mudarValorAtributo(novoValor, index) {
    // 1. Converte o valor do input para um número inteiro
    let valor = parseInt(novoValor);

    // 2. Garante que o valor seja um número válido
    if (isNaN(valor) || valor < 1) {
        valor = 1; // Define um valor mínimo (ex: 1) se for inválido
    }

    // 3. Atualiza o modelo de dados
    personagem.atributos[index].valor = valor;
    
   // Função chamada quando o jogador edita o valor de um atributo
function mudarValorAtributo(novoValor, index) {
    // 1. Converte o valor do input para um número inteiro
    let valor = parseInt(novoValor);

    // 2. Garante que o valor seja um número válido
    if (isNaN(valor) || valor < 1) {
        valor = 1; // Define um valor mínimo (ex: 1) se for inválido
    }

    // 3. Atualiza o modelo de dados
    personagem.atributos[index].valor = valor;
    
    // 4. Recalcula o modificador
    const novoMod = calcularModificador(valor);
    personagem.atributos[index].mod = novoMod;

    // 5. Atualiza APENAS o modificador na tela para o usuário ver
    // CORREÇÃO AQUI: ADICIONAMOS AS ASPAS DE CRASE (`)
    const modElemento = document.getElementById(mod-${index}); 
    modElemento.textContent = ${novoMod >= 0 ? '+' : ''}${novoMod};
    
    // 6. Atualiza o valor no input caso o usuário tenha digitado um valor inválido (ex: 0)
    // CORREÇÃO AQUI: ADICIONAMOS AS ASPAS DE CRASE (`)
    document.getElementById(base-${index}).value = valor;
}

    atualizarInterfaceHP();
}

// 4. Função de Aumentar HP (Receber Cura)
function aumentarHP(cura) {
    personagem.hpAtual += cura;

    if (personagem.hpAtual > personagem.hpMaximo) {
        personagem.hpAtual = personagem.hpMaximo;
    }

    atualizarInterfaceHP();
}

// ==========================================================
// 3. Funções de Atualização da Interface (Desenho)
// ==========================================================

// Função para Atualizar a Interface do HP
function atualizarInterfaceHP() {
    const valorAtualElemento = document.getElementById('valor-atual');
    const valorMaximoElemento = document.getElementById('valor-maximo');
    
    valorAtualElemento.textContent = personagem.hpAtual;
    valorMaximoElemento.textContent = personagem.hpMaximo;
}


// Função para Atualizar a Interface de ATRIBUTOS
function atualizarInterfaceAtributos() {
    const fichaContainer = document.getElementById('ficha-container');
    
    // NOVO: Criamos ou encontramos a seção específica para atributos
    let atributosSection = document.getElementById('atributos-section');

    if (!atributosSection) {
        // Se a seção não existe, criamos ela
        atributosSection = document.createElement('section');
        atributosSection.id = 'atributos-section';
        fichaContainer.appendChild(atributosSection);
    } else {
        // Se a seção já existe, limpamos seu conteúdo para redesenhar
        atributosSection.innerHTML = '';
    }

    // Cria e insere um título dentro da seção de Atributos
    const tituloAtributos = document.createElement('h2');
    tituloAtributos.textContent = "Atributos Principais";
    tituloAtributos.className = "secao-titulo";
    atributosSection.appendChild(tituloAtributos);


    // Loop para criar o HTML para cada atributo no nosso objeto
    personagem.atributos.forEach((atributo, index) => { 
        
        // 1. Cria o elemento principal do atributo (a caixinha)
        const divAtributo = document.createElement('section');
        divAtributo.className = 'atributo-ficha';
        
        // 2. Define o conteúdo HTML interno
        divAtributo.innerHTML = `
            <span class="atributo-nome">${atributo.nome}</span>
            <div class="atributo-valores">
                <label for="base-${index}">Base:</label>
                <input 
                    type="number" 
                    id="base-${index}" 
                    class="valor-base-input" 
                    value="${atributo.valor}"
                    min="1"
                    onchange="mudarValorAtributo(this.value, ${index})" 
                />
                <div class="modificador">Mod: <span id="mod-${index}">
                    ${atributo.mod >= 0 ? '+' : ''}${atributo.mod}
                </span></div>
            </div>
        `;
        
        // 3. Adiciona o novo elemento à seção de atributos, não ao container principal
        atributosSection.appendChild(divAtributo);
    });
}

// ==========================================================
// 4. Chamadas Iniciais
// ==========================================================
atualizarInterfaceHP();
atualizarInterfaceAtributos();