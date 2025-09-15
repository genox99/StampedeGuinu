// Estrutura de dados para armazenar as senhas base por rota e filial
const rotas = {
    '419': { // Rota 419
        2445: 20251886,
        3051: 20251302,
        5171: 20251528,
        2640: 20251278,
        3126: 20252484,
        2655: 20251970
    },
    // Exemplo de como adicionar uma nova rota no futuro:
    // '520': {
    //     1111: 20251000,
    //     2222: 20252000
    // }
};

// Função para calcular as senhas
function calcularSenhas(dia, mes, rota) {
    // Usando o objeto Date para calcular a diferença de dias de forma mais segura
    const dataBase = new Date('2025-09-09T00:00:00');
    const dataInformada = new Date(`2025-${String(mes).padStart(2, '0')}-${String(dia).padStart(2, '0')}T00:00:00`);
    
    // Calcula a diferença em milissegundos e converte para dias
    const diffTime = dataInformada - dataBase;
    const diasPassados = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    // Monta a string de resultado para ser exibida na tela
    let resultado = `Senhas para Rota ${rota} - Dia ${String(dia).padStart(2, '0')}/${String(mes).padStart(2, '0')}/2025:\n\n`;
    const senhasBase = rotas[rota];
    for (const filial in senhasBase) {
        const senhaBase = senhasBase[filial];
        const novaSenha = senhaBase + (diasPassados * 3);
        resultado += `Filial ${filial}: ${novaSenha}\n`;
    }
    return resultado;
}

// --- Lógica para interagir com o HTML ---

// Aguarda o carregamento completo do HTML antes de executar o script
document.addEventListener('DOMContentLoaded', () => {
    // Pega os elementos do HTML pelos seus IDs
    const rotaSelect = document.getElementById('rota');
    const diaInput = document.getElementById('dia');
    const mesInput = document.getElementById('mes');
    const gerarBtn = document.getElementById('gerarSenha');
    const resultadoDiv = document.getElementById('resultado');
    const erroP = document.getElementById('erro');

    // Popula o dropdown de rotas dinamicamente
    const nomesDasRotas = Object.keys(rotas);
    nomesDasRotas.forEach(nomeRota => {
        const option = document.createElement('option');
        option.value = nomeRota;
        option.textContent = `Rota ${nomeRota}`;
        rotaSelect.appendChild(option);
    });

    // Adiciona um "escutador de evento" que reage ao clique no botão
    gerarBtn.addEventListener('click', () => {
        // Limpa resultados e mensagens de erro anteriores
        resultadoDiv.textContent = '';
        erroP.textContent = '';

        // Pega os valores dos inputs
        const rotaSelecionada = rotaSelect.value;
        const dia = parseInt(diaInput.value);
        const mes = parseInt(mesInput.value);

        // Validação dos dados de entrada
        if (!rotaSelecionada) {
            erroP.textContent = "Por favor, selecione uma rota.";
            return;
        }
        if (isNaN(dia) || isNaN(mes)) {
            erroP.textContent = "Por favor, preencha o dia e o mês.";
            return;
        }
        if (dia < 1 || dia > 31 || mes < 9 || mes > 12 || (mes === 9 && dia < 9) || (mes === 11 && dia > 30)) {
            erroP.textContent = "Data inválida. Verifique o dia e o mês (de Setembro a Dezembro).";
            return;
        }

        // Se a validação passar, calcula e exibe as senhas
        const senhasFormatadas = calcularSenhas(dia, mes, rotaSelecionada);
        resultadoDiv.textContent = senhasFormatadas;
    });
});