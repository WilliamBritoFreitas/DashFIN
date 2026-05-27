const total_Entrada = document.getElementById("total_Entrada");
const total_Saida = document.getElementById("total_Saida");
const saldo_Final = document.getElementById("saldo_Final");

const lista_movimentacao = [];

const data_mov = document.getElementById("data_mov");
const descri = document.getElementById("descricao");
const tp_entrada = document.getElementById("tipo_entrada");
const valor = document.getElementById("valor");

const bt_entrada = document.getElementById("bt_entrada");

const dt_atual = Calc_data_atual();
data_mov.value = dt_atual;

const tipo_movimentacao = (sinal) => (sinal === "+" ? "Entrada" : "Saída");

let formatador = new Intl.NumberFormat("pt-BR", {
  style: "decimal",
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

function Calc_data_atual() {
  const data_temp = new Date();
  const ano = data_temp.getFullYear;
  const mes = String(data_temp.getMonth() + 1).padStart(2, "0");
  const dia = String(data_temp.getDay).padStart(2, "0");
  const dt_atual = `${ano}-${mes}-${dia}`;
  return dt_atual;
}

function Data_Linha(data) {
  const data_saida = (() => {
    const dia = data.slice(8, 10);
    const mes = data.slice(5, 7);
    const ano = data.slice(2, 4);
    return `${dia}/${mes}/${ano}`;
  })();

  return data_saida;
}

function btn_acrescentar() {
  console.log("botão");
  const linha_mov = [data_mov.value, descri.value, tp_entrada.value, valor.value];
  lista_movimentacao.unshift(linha_mov);
  monta_tabela();
}

function monta_tabela() {
  let tabela_tmp = document.getElementById("corpo_tabela");
  let soma_entrada = 0;
  let soma_saida = 0;

  tabela_tmp.innerHTML = "";
  let ind = 0;

  lista_movimentacao.forEach(function (linha) {
    ind += 1;
    let html_linha = `<tr><td>${String(ind).padStart(2, "0")}</td>`;
    // linha.forEach(function (celula) {
    let data_cel = Data_Linha(linha[0]);
    let descri_cel = linha[1];
    let tipo_cel = tipo_movimentacao(linha[2]);
    let valor_cel = formatador.format(linha[3]);

    html_linha += `<td>${data_cel}</td><td>${descri_cel}</td><td>${tipo_cel}</td><td>${valor_cel}</td>`;

    // });
    html_linha += "</tr>";
    if (linha[2] === "+") {
      soma_entrada += Number(linha[3]);
    } else {
      soma_saida += Number(linha[3]);
    }

    tabela_tmp.innerHTML += html_linha;
  });

  total_Entrada.innerText = formatador.format(soma_entrada);
  total_Saida.innerText = soma_saida;
  saldo_Final.innerText = soma_entrada - soma_saida;
}

bt_entrada.addEventListener("click", btn_acrescentar);

// falta
