<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Run and deploy your AI Studio app

This contains everything you need to run your app locally.

View your app in AI Studio: https://ai.studio/apps/d93f9d92-c682-4075-bc4c-0b91d5ce25b5

## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
_____________________________________________________________________________________________

# README.md para o Projeto

```markdown
# 📊 Dashboard de Governança, Riscos e Compliance em TI

![Versão](https://img.shields.io/badge/versão-1.0.0-blue)
![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![Licença](https://img.shields.io/badge/licença-MIT-green)

## 📋 Sobre o Projeto

Dashboard interativo desenvolvido no **Google Looker Studio** para gestão integrada de **Riscos, Compliance e Tomada de Decisão em TI**, aplicado a um cenário real de transformação digital em uma empresa de médio porte do setor de serviços.

O projeto foi desenvolvido como trabalho acadêmico para a disciplina de **Risk Management and IT Compliance**, integrando frameworks e normas como ISO 31000, ISO/IEC 27001, COBIT e LGPD.

### 🎯 Objetivos

- Identificar e analisar riscos de TI sob perspectivas técnica, organizacional e legal
- Garantir conformidade com normas e regulamentações
- Apoiar a tomada de decisão segura e responsável
- Propor diretrizes práticas para governança de TI
- Consolidar informações em um único painel executivo e operacional

## 🏗️ Estrutura do Dashboard

O dashboard é composto por **23 abas** organizadas em 5 camadas:

```
┌─────────────────────────────────────────────────────────────┐
│                    DASHBOARD EXECUTIVO                       │
├─────────────────────────────────────────────────────────────┤
│  CAMADA 1: VISÃO ESTRATÉGICA                                 │
│  ├── Visão Geral                                             │
│  ├── KPIs e Resultados                                       │
│  └── Gestão de Riscos (ISO 31000)                            │
├─────────────────────────────────────────────────────────────┤
│  CAMADA 2: GOVERNANÇA                                        │
│  ├── Conformidade e ISO                                      │
│  ├── Controles ISO 27001                                     │
│  ├── Governança COBIT                                        │
│  └── LGPD e Privacidade                                      │
├─────────────────────────────────────────────────────────────┤
│  CAMADA 3: OPERACIONAL                                       │
│  ├── Análise 5W2H                                            │
│  ├── Ishikawa                                                │
│  ├── SWOT                                                    │
│  ├── PDCA                                                    │
│  ├── Kanban                                                  │
│  └── Roadmap/Gantt                                           │
├─────────────────────────────────────────────────────────────┤
│  CAMADA 4: DECISÃO E CONTROLE                                │
│  ├── Matriz de Decisão                                       │
│  ├── Plano de Continuidade                                   │
│  ├── Qualidade e NC's                                        │
│  ├── Tecnologias                                             │
│  ├── Organograma                                             │
│  └── Custos e Investimentos                                  │
├─────────────────────────────────────────────────────────────┤
│  CAMADA 5: CULTURA E STAKEHOLDERS                            │
│  ├── Ética e ESG                                             │
│  ├── Cultura e Capacitação                                   │
│  ├── Stakeholders e Comunicação                              │
│  ├── Auditoria e Monitoramento                               │
│  └── Chat IA Governança                                      │
└─────────────────────────────────────────────────────────────┘
```

## 🛠️ Tecnologias Utilizadas

| Ferramenta | Aplicação |
|------------|-----------|
| **Google Looker Studio** | Plataforma principal do dashboard |
| **Google Sheets** | Base de dados e integração |
| **Frameworks** | ISO 31000, ISO 27001, COBIT |
| **Metodologias** | 5W2H, Ishikawa, SWOT, PDCA, Kanban, RACI |
| **Legislação** | LGPD (Lei 13.709/2018) |

## 📊 Funcionalidades por Aba

### Abas Existentes Adaptadas

| Aba | Descrição |
|-----|-----------|
| **Visão Geral** | Contexto da organização, objetivos estratégicos e problemas identificados |
| **Análise 5W2H** | Planos de ação detalhados para riscos prioritários |
| **Ishikawa** | Análise de causas raiz dos problemas de TI |
| **SWOT** | Diagnóstico estratégico de forças, fraquezas, oportunidades e ameaças |
| **PDCA** | Ciclo de melhoria contínua para gestão de riscos |
| **Kanban** | Acompanhamento visual das ações de compliance |
| **Roadmap/Gantt** | Cronograma de implementação com marcos e responsáveis |
| **KPIs e Resultados** | Indicadores de desempenho e tendências |
| **Qualidade e NC's** | Registro e acompanhamento de não conformidades |
| **Ética e ESG** | Iniciativas ambientais, sociais e de governança |
| **Tecnologias** | Inventário de sistemas críticos e vulnerabilidades |
| **Organograma** | Estrutura organizacional e matriz RACI |
| **Chat IA Governança** | Simulação de diálogos para apoio à decisão |

### Novas Abas Criadas

| Aba | Descrição | Base Normativa |
|-----|-----------|----------------|
| **Análise de Riscos de TI** | Matriz de riscos, probabilidade x impacto, plano de tratamento | ISO 31000 |
| **Controles ISO 27001** | Mapeamento de controles do Anexo A, status e evidências | ISO/IEC 27001 |
| **Governança COBIT** | Alinhamento com processos COBIT e níveis de capacidade | COBIT 2019 |
| **LGPD e Privacidade** | Mapeamento de dados, direitos dos titulares, incidentes | LGPD |
| **Plano de Continuidade** | BIA, RTO/RPO, estratégias e testes | ISO 22301 / ISO 27001 |
| **Matriz de Decisão** | Árvore de decisão, níveis de autorização, scorecard | COBIT |
| **Cultura e Capacitação** | Programa de treinamentos, calendário e avaliações | ISO 27001 A.7 |
| **Auditoria e Monitoramento** | Plano de auditoria, monitoramento contínuo, painel de incidentes | ISO 19011 |
| **Custos e Investimentos** | Orçamento, ROI de projetos, custo da não conformidade | COBIT |
| **Stakeholders e Comunicação** | Mapa de stakeholders, plano de comunicação, feedback | ISO 31000 |

## 📈 Principais Indicadores (KPIs)

| KPI | Fórmula | Meta |
|-----|---------|------|
| Disponibilidade de sistemas | (Tempo total - Indisponível) / Tempo total | ≥ 99,5% |
| MTBF (Tempo entre falhas) | Soma tempos operacionais / Nº falhas | ≥ 30 dias |
| MTTR (Tempo de reparo) | Soma tempos reparo / Nº falhas | ≤ 1 hora |
| Incidentes de segurança | Número absoluto mensal | ≤ 5 |
| Acessos revisados | Acessos revisados / Total de acessos | 100% |
| Treinamentos realizados | Funcionários treinados / Total | 100% |
| Não conformidades | Número absoluto | ≤ 3 |

## 🔍 Exemplo de Aplicação

### Problema: Indisponibilidade do ERP

**Diagnóstico no Dashboard:**
- **Ishikawa:** Causas identificadas → falta de redundância, backup sem teste
- **Riscos:** Classificado como crítico (R001) na matriz ISO 31000
- **KPIs:** Disponibilidade em 98,5% (abaixo da meta de 99,5%)

**Decisão na Matriz de Decisão:**
- Critério: Custo da indisponibilidade (R$ 150.000/mês) > Investimento (R$ 250.000)
- Decisão: ✅ Aprovar redundância de infraestrutura
- Responsável: Comitê Executivo
- Prazo: 120 dias

**Acompanhamento:**
- **Kanban:** Tarefa em "Em Andamento"
- **Gantt:** Previsto para conclusão em Ago/2024
- **Custos:** Orçamento alocado de R$ 250.000

## 🚀 Como Utilizar

### Pré-requisitos
- Conta Google (para acesso ao Looker Studio)
- Permissão de edição no dashboard (solicitar ao administrador)

### Acesso ao Dashboard
1. Acesse [Google Looker Studio](https://lookerstudio.google.com/)
2. Faça login com sua conta Google
3. Solicite acesso ao projeto através do link: [Link do Dashboard](https://lookerstudio.google.com/reporting/seu-link-aqui)

### Atualização de Dados
Os dados são alimentados através de planilhas Google Sheets integradas:

| Planilha | Fonte | Atualização |
|----------|-------|-------------|
| Riscos | Google Sheets | Semanal |
| Incidentes | Service Desk | Diária |
| KPIs | Banco de dados | Automática |
| Treinamentos | RH | Mensal |

## 📚 Fundamentação Teórica

### Normas e Frameworks Aplicados

| Norma | Aplicação |
|-------|-----------|
| **ISO 31000** | Gestão de riscos (identificação, análise, avaliação, tratamento) |
| **ISO/IEC 27001** | Controles de segurança da informação (Anexo A) |
| **COBIT 2019** | Governança de TI e alinhamento estratégico |
| **LGPD** | Proteção de dados pessoais e privacidade |
| **ISO 22301** | Continuidade de negócios |

### Metodologias

- **5W2H:** Detalhamento de planos de ação
- **Ishikawa:** Análise de causas raiz
- **SWOT:** Análise estratégica
- **PDCA:** Melhoria contínua
- **Kanban:** Gestão visual de tarefas
- **RACI:** Definição de papéis e responsabilidades

## 🗺️ Roadmap de Implementação

| Fase | Atividades | Período | Status |
|------|------------|---------|--------|
| **Fase 1** | Diagnóstico, inventário, mapeamento de riscos | Mês 1-2 | ✅ Concluído |
| **Fase 2** | Políticas, IAM, plano de continuidade | Mês 3-5 | 🔄 Em andamento |
| **Fase 3** | Monitoramento, auditoria, certificação | Mês 6-8 | ⏳ Pendente |
| **Fase 4** | Melhoria contínua, expansão | Mês 9-12 | ⏳ Pendente |

## 👥 Equipe e Responsabilidades

| Papel | Responsável | Principais Atividades |
|-------|-------------|----------------------|
| Diretor de TI | Carlos Mendes | Decisões estratégicas, aprovações |
| Gerente de Infraestrutura | Pedro Lima | Continuidade, backups, infraestrutura |
| Gerente de Sistemas | Ana Souza | Aplicações, desenvolvimento |
| Gerente de Segurança | Carla Reis | Controles ISO 27001, gestão de riscos |
| DPO (Encarregado) | Mariana Santos | LGPD, privacidade |
| Analista de Compliance | João Oliveira | Auditoria, conformidade |

## 📝 Licença

Este projeto está licenciado sob a licença MIT - veja o arquivo [LICENSE](LICENSE) para detalhes.

## 🤝 Contribuições

Contribuições são bem-vindas! Para contribuir:

1. Faça um fork do projeto
2. Crie uma branch para sua feature (`git checkout -b feature/NovaFeature`)
3. Commit suas mudanças (`git commit -m 'Adiciona NovaFeature'`)
4. Push para a branch (`git push origin feature/NovaFeature`)
5. Abra um Pull Request

## 📞 Contato

- **Autor:** [Seu Nome]
- **E-mail:** [seu.email@exemplo.com]
- **LinkedIn:** [Perfil no LinkedIn]
- **Instituição:** [Nome da Faculdade/Universidade]

## 🙏 Agradecimentos

- Professores e orientadores da disciplina
- Equipe de TI da organização parceira
- Comunidade de frameworks e normas técnicas

---

**Desenvolvido com ❤️ para gestão de riscos e compliance em TI**

*Última atualização: Março de 2024*
```

## Como criar e enviar para o GitHub

### Passo a passo no terminal:

```bash
# 1. Crie o diretório do projeto (se ainda não existir)
mkdir dashboard-riscos-compliance-ti
cd dashboard-riscos-compliance-ti

# 2. Crie o arquivo README.md
cat > README.md << 'EOF'
[COLE AQUI O CONTEÚDO COMPLETO DO README ACIMA]
EOF

# 3. Inicialize o repositório Git
git init

# 4. Adicione o arquivo README
git add README.md

# 5. Faça o primeiro commit
git commit -m "Initial commit: Adiciona README do Dashboard de Riscos e Compliance em TI"

# 6. Conecte ao repositório remoto (crie primeiro no GitHub)
git remote add origin https://github.com/seu-usuario/dashboard-riscos-compliance-ti.git

# 7. Envie para o GitHub
git branch -M main
git push -u origin main
```

### Arquivos adicionais recomendados para o repositório:

```bash
# Criar .gitignore
cat > .gitignore << 'EOF'
# Arquivos temporários
*.tmp
*.log
.DS_Store
Thumbs.db

# Arquivos de configuração local
.env
config.local.json

# Backups
*.bak
*.backup

# Planilhas com dados sensíveis (se houver)
*sensitive*.xlsx
*confidential*.csv
EOF

# Criar LICENSE (MIT)
cat > LICENSE << 'EOF'
MIT License

Copyright (c) 2024 [Seu Nome]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files...
EOF

# Adicionar e commitar
git add .gitignore LICENSE
git commit -m "Add .gitignore and LICENSE"
git push
```

### Link rápido para criar repositório no GitHub:
1. Acesse: https://github.com/new
2. Nome: `dashboard-riscos-compliance-ti`
3. Descrição: "Dashboard integrado para gestão de riscos, compliance e tomada de decisão em TI - ISO 31000, ISO 27001, COBIT e LGPD"
4. Público ou Privado (conforme preferência)
5. Não inicializar com README (já temos)
6. Criar repositório

O README está pronto para ser visualizado no GitHub com toda a formatação Markdown!
