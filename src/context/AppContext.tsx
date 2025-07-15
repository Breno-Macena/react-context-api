/* eslint-disable react-refresh/only-export-components */
import React, { createContext, useContext, useEffect, useState } from 'react'
import { ITransacao, IUsuario } from '../types'
import { obterUsuarios, criarUsuario, obterTransacoes, criarTransacao } from '../api'

interface AppContextType {
  usuario?: IUsuario | null
  criaUsuario?: (usuario: Omit<IUsuario, 'id' | 'orcamentoDiario'>) => Promise<void>
  transacoes?: ITransacao[]
  criaTransacao?: (transacao: Omit<ITransacao, 'id'>) => Promise<void>
}

const AppContext = createContext<AppContextType | undefined>(undefined)

interface AppContextProps {
  children: React.ReactNode
}

const AppProvider = ({ children }: AppContextProps) => {
  const [usuario, setUsuario] = useState<IUsuario | null>(null)
  const [transacoes, setTransacoes] = useState<ITransacao[]>([])

  const carregaDadosUsuario = async () => {
    try {
      const usuarios = await obterUsuarios()
      const transacoes = await obterTransacoes()
      if (usuarios.length > 0) {
        setUsuario(usuarios[0])
        setTransacoes(transacoes)
      }
    } catch (error) {
      console.error('Erro ao carregar dados do usuário:', error)
    }
  }

  useEffect(() => {
    carregaDadosUsuario()
  }, [])

  const criaUsuario = async (usuario: Omit<IUsuario, 'id' | 'orcamentoDiario'>) => {
    try {
      const novoUsuario = await criarUsuario(usuario)
      setUsuario(novoUsuario)
    } catch (error) {
      console.error('Erro ao criar usuário:', error)
    }
  }

  const criaTransacao = async (transacao: Omit<ITransacao, 'id'>) => {
    try {
      const novaTransacao = await criarTransacao(transacao)
      setTransacoes((prevState) => [...prevState, novaTransacao])
    } catch (error) {
      console.error('Erro ao criar transação:', error)
    }
  }

  return (
    <AppContext.Provider value={{ usuario, criaUsuario, transacoes, criaTransacao }}>
      {children}
    </AppContext.Provider>
  )
}

export default AppProvider

export const useAppContext = () => {
  const context = useContext(AppContext)

  if (!context) {
    throw new Error('useAppContext deve ser usado dentro de um Provider')
  }

  return context
}
