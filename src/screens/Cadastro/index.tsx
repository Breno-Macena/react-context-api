import { useState } from "react";
import {
  Section,
  Container,
  Title,
  Description,
  Illustration,
  SectionWrapper,
} from "./style.js";
import ilustracao from "../../assets/images/ilustracao-cadastro.png";
import { Form, useNavigate } from "react-router";
import Botao from "../../componentes/Botao/index.js";
import CampoTexto from "../../componentes/CampoTexto/index.js";
import Fieldset from "../../componentes/Fieldset/index.js";
import Label from "../../componentes/Label/index.js";
import { IUsuario } from "../../types/index.js";
import { useAppContext } from "../../context/AppContext.js";

const Cadastro = () => {
  const [form, setForm] = useState<Omit<IUsuario, "id" | "orcamentoDiario">>({
    nome: "",
    renda: 0,
  })

  const aoDigitarCampoTexto = (campo: "nome" | "renda", valor: string) => {
    setForm((prevState) => ({
      ...prevState,
      [campo]: campo === "renda" ? parseFloat(valor) : valor,
    }))
  }

  const navigate = useNavigate()

  const { criaUsuario } = useAppContext()

  const aoSubmeterFormulario = async (evento: React.FormEvent) => {
    evento.preventDefault()

    if (criaUsuario) {
      criaUsuario(form)
    }

    navigate("/home")
  }

  return (
    <Section>
      <SectionWrapper>
        <Container>
          <Title>Configuração financeira</Title>
          <Description>
            Boas-vindas à plataforma que protege seu bolso! Antes de começar,
            precisamos de algumas informações sobre sua rotina financeira. Vamos
            lá?
          </Description>
          <Form>
            <Fieldset>
              <Label htmlFor="nome">Nome</Label>
              <CampoTexto
                type="text"
                name="nome"
                value={form.nome}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => aoDigitarCampoTexto("nome", e.target.value)}
              />
            </Fieldset>
            <Fieldset>
              <Label htmlFor="renda">Renda mensal total</Label>
              <CampoTexto
                type="text"
                name="renda"
                value={form.renda}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => aoDigitarCampoTexto("renda", e.target.value)}
              />
            </Fieldset>
          </Form>
          <Botao $variante="primario" onClick={aoSubmeterFormulario}>
            Ir para o app
          </Botao>
        </Container>
        <Illustration
          src={ilustracao}
          alt="ilustração da tela de cadastro. Um avatar mexendo em alguns gráficos"
        />
      </SectionWrapper>
    </Section>
  )
}

export default Cadastro
