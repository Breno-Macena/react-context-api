export interface IUsuario {
  id: string
  nome: string
  renda: number
  orcamentoDiario: number
}

export interface ITransacao {
  id: string
  usuarioId: string
  nome: string
  valor: number
  tipo: "receita" | "despesa"
  data: string
  categoria: string
}