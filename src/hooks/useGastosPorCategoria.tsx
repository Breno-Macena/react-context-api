import { useMemo } from "react"
import { useAppContext } from "../context/AppContext"

const useGastosPorCategoria = () => {
  const { transacoes } = useAppContext()

  const gastosPorCategoria = useMemo(() => {
    return transacoes
      ?.filter(transacao => transacao.tipo === 'despesa')
      ?.reduce<Record<string, number>>((total, transacao) => {
        const categoria = transacao.categoria
        const valor = transacao.valor

        if (!total[categoria]) {
          total[categoria] = 0
        }

        total[categoria] += valor

        return total
      }, {})
  }, [transacoes])

  return gastosPorCategoria
}

export default useGastosPorCategoria
