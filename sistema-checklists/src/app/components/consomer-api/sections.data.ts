export interface Ticket {
  descricao?: string | Record<string, string>;
  articulacao_solucionar?: string;
  url_ticket?: string;
}

export interface Section {
  Comentarios?: string[];
  Funcionalidades?: string[];
  Subsecoes?: Record<string, Section>;
  Tickets?: (string | Ticket)[];
  url?: string;
}



export const sections: Readonly<Record<string, Section>> = {
  "Abastecimento": {
    "Comentarios": [
      "O log aponta dois avisos de aninhamento inválido no componente AcademyTabComponent, onde elementos <div> e <fieldset> estão sendo usados como descendentes de <p>, o que viola as regras de validação de HTML do React. É necessário revisar a estrutura do componente AcademyTabComponent e CoursesTab para corrigir o aninhamento, possivelmente substituindo <p> por um elemento mais apropriado, como <div>.    Os elementos <div> e <fieldset> não estão mais aninhados dentro de <p> no componente AcademyTabComponent.    Os avisos \"Warning: alidateDOMNesting(...): %s cannot appear as a descendant of <%s>...\" não aparecem mais no console.    A renderização visual do componente não é afetada negativamente.Referência no Log: \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <div> p ...\" e \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <fieldset> p ...\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Na tela de registro pode-se adicionar um filtro para não listar tantos carros",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/fleet/fuel-supply"
  },
  "aulas": {
    "Comentarios": [],
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/academy/lessons"
  },
  "Barcos": {
    "Comentarios": [
      "O log apresenta várias mensagens de erro \"Error: Failed to fetch\" originadas em https://stagging.dotelematics.com/assets/index-a6e8f336.js:2508:79964. Esses erros indicam falhas em requisições de rede, possivelmente devido a configurações incorretas de API, problemas de CORS, ou endpoints indisponíveis. É necessário investigar os endpoints chamados, verificar a configuração do servidor de staging e garantir que as requisições sejam bem-sucedidas.    Todas as requisições de rede identificadas são bem-sucedidas (status 200 ou outro status apropriado).    Os erros \"Error: Failed to fetch\" não aparecem mais no console.    A funcionalidade dependente das requisições de rede não é comprometida.Referência no Log: \"Error: Failed to fetch\n at https://stagging.dotelematics.com/assets/index-a6e8f336.js:2508:79964\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Campo de ano ???",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/marine/ships"
  },
  "Cerca_administracao": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      ""
    ],
    "url": "https://stagging.dotelematics.com/geo-fence/manage?page=1&limit=10"
  },
  "Cerca_relatorio": {
    "Comentarios": [
      "O log indica que as propriedades endAdornment e startAdornment não são reconhecidas pelo React em elementos de entrada (input) no componente AcademyTabComponent. Essas propriedades devem ser usadas em componentes específicos do Material-UI, como InputAdornment, e não diretamente em elementos DOM. É necessário revisar o uso dessas propriedades e movê-las para o componente correto ou removê-las, se não forem intencionais.    As propriedades endAdornment e startAdornment são usadas corretamente em componentes do Material-UI ou removidas de elementos DOM.    Os avisos \"Warning: React does not recognize the endAdornment prop on a DOM element...\" e \"Warning: React does not recognize the startAdornment prop on a DOM element...\" não aparecem mais no console.    A funcionalidade dos campos de entrada não é afetada.Referência no Log: \"Warning: React does not recognize the endAdornment prop...\" e \"Warning: React does not recognize the startAdornment prop...\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Colunas deve ter pelo menos 1 selecionada",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/geo-fence/report"
  },
  "Cerca_Virtual": {
    "Comentarios": [],
    "Funcionalidades": [
      "Buscar_endereço",
      "Adicionar",
      "Salvar",
      "Limpar",
      "Adicionar_novos_pontos",
      "Deletar_pontos_ou_cerca",
      "Refresh",
      "Criar_cerca_por_posicionamento",
      "Pesquisar",
      "Alterar_configurações",
      "Detalhes",
      "Editar",
      "Excluir",
      "Visualizar"
    ],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": {
          "filtro": "Parece que o filtro (input Buscar) não está funcionando corretamente, pois não filtra os resultados esperados",
          "listagem_inicial": "Na tela de relatório de cerca virtual, ao clicar para ir para a cerca virtual, se ela não estiver na pagina inicial da listagem de cercas, a cerca não aparece ate a pagina que ela esta ser selecionada. A cerca deve ser carregada sempre que a pagina for carregada com o id selecionado.",
          "listagem_inicial_jornadas": "o mesmo está acontecendo ao redirecionar para a a tela de jornadas avançadas"
        },
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/geo-fence/manage?page=1&limit=10"
  },
  "Comandos": {

    "Comentarios": [],
    "Funcionalidades": [],

    "Subsecoes": {
      "Agendar_Comandos": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Historico": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      }
    },
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/commands"
  },
  "Comandos_agendados": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Janela modal de Steps que deve ser aprimorada",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/commands/schedule-commands?page=1&limit=100"
  },
  "Cursos": {
    "Comentarios": [
      "O log aponta dois avisos de aninhamento inválido no componente AcademyTabComponent, onde elementos <div> e <fieldset> estão sendo usados como descendentes de <p>, o que viola as regras de validação de HTML do React. É necessário revisar a estrutura do componente AcademyTabComponent e CoursesTab para corrigir o aninhamento, possivelmente substituindo <p> por um elemento mais apropriado, como <div>.    Os elementos <div> e <fieldset> não estão mais aninhados dentro de <p> no componente AcademyTabComponent.    Os avisos \"Warning: alidateDOMNesting(...): %s cannot appear as a descendant of <%s>...\" não aparecem mais no console.    A renderização visual do componente não é afetada negativamente.Referência no Log: \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <div> p ...\" e \"Warning: validateDOMNesting(...): %s cannot appear as a descendant of <%s>.%s <fieldset> p ...\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/academy/courses"
  },
  "Empresas": {
    "Comentarios": [      
        "Arthur falou de: 1) mudanca de empresa, 2) comportamento dos relacionamentos apos edicao e exclusao",      
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/company"
  },
  "Eventos_finalizados": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Filtro por cores de banderias podem ser combinação de cores",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/monitoring/done?page=1&limit=100&done=true"
  },
  "Eventos_Monitoramento": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      "O log exibe vários avisos relacionados ao uso simultâneo das propriedades checked e defaultChecked em elementos de entrada do tipo checkbox (x.: Styled(input) checkbox). Isso viola as práticas recomendadas do React, que exige que um componente de entrada seja exclusivamente ontrolado (usando checked) ou não controlado (usando defaultChecked). É necessário revisar os componentes mencionados, como SwitchShowFilters, e decidir entre usar um componente controlado ou não controlado, removendo a propriedade conflitante.    Os componentes de checkbox identificados (SwitchShowFilters, etc.) utilizam apenas checked ou defaultChecked, conforme a necessidade do caso de uso.    O aviso \"Warning: %s contains an input of type %s with both checked and defaultChecked props\" não aparece mais no console.    A funcionalidade dos checkboxes não é comprometida após a correção.Referência no Log: Mensagens como \"Warning: %s contains an input of type %s with both checked and defaultChecked props...\"."
    ],
    "url": "https://stagging.dotelematics.com/monitoring/events?page=1&limit=100"
  },
  "Frotas": {
    "Comentarios": [],

    "Funcionalidades": [],



    "Subsecoes": {
      "Frotas": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Identificadores": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Motoristas": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Rastreadores": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Simcards": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      },
      "Veiculos": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [],
        "url": ""
      }
    },
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/fleet/fleets",

  },
  "Histórico": {
    "Comentarios": [],

    "Funcionalidades": [
      "Barra_de_pesquisa",
      "Caixa_de_seleção",
      "Barra_lateral",
      "Baixar_itens_selecionados",
      "Botão_de_visualizar_regra",
      "Botão_de_baixar_todos",
      "Itens_por_página"
    ],


    "Tickets": []
  },
  "Historico_de_comandos": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Botão filtrar pode seguir a lógica de sombras dos outros botões",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/commands/history-commands"
  },
  "Historico_Regras": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Parece que está copiando o template de Histórico de Notificacoes",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/ruler-history?page=1&limit=100"
  },
  "Horarios_permitidos": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/access-period?limit=100&page=1"
  },
  "Identificador_Regras": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      "Acessar a página de histórico de regras com o link direto não funciona"
    ],
    "url": "https://stagging.dotelematics.com/ruler/id?page=1&limit=100"
  },
  "Identificadores": {
    "Comentarios": [
      "é possível cadastrar ibuttons com codigos ja existentes"      
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": {
          "codigos_existentes": "é possível cadastrar ibuttons com codigos ja existentes",
          "desvinculo_automatico": "ao mudar empresa do ibutton nao desvincula o motorista",
          "vincular_motoristas_ibutton_livre": "é possivel vincular motoristas com ibuttons que náo estao vinculados"
        },
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/fleet/ibuttons"
  },
  "Link_Publico": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Ver os log, parece que não suporta o GPL ???",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/public-link"
  },
  "Manutencao_relatorio": {
    "Comentarios": [
      "O log reporta uma mensagem de desempenho indicando \"GPU stall due to ReadPixels\" em um contexto WebGL. Isso sugere que a operação ReadPixels está causando travamentos no desempenho da GPU. É necessário revisar o uso de WebGL na aplicação (possivelmente em MapContent ou outros componentes de mapas) e otimizar a chamada a ReadPixels ou considerar alternativas para melhorar o desempenho.   A mensagem \"GPU stall due to ReadPixels\" não aparece mais no console.    O desempenho de renderização de elementos WebGL é melhorado, sem travamentos perceptíveis.    A funcionalidade dos componentes que utilizam WebGL não é afetada.Referência no Log: \"[.WebGL-0x92c005d7f00]GL Driver Message (OpenGL, Performance, GL_CLOSE_PATH_NV, High): GPU stall due to ReadPixels\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Tratar as informações não existentes como um campo visual minimo: card pequeno, etc...",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/maintenance/report"
  },
  "Manutencoes": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Manutenção agendada pode indicar: Data especifica, Em aberto, ou Recorrente",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/maintenance/list?page=1&limit=100"
  },
  "Mapa": {
    "Comentarios": [],
    "Funcionalidades": [],

    "Subsecoes": {

      "Veiculos": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {},
        "Tickets": [
          {
            "descricao": {
              "botao_detalhes": "botão de mostrar mais detalhes do rastreador não deve aparecer caso o veiculo não tenha um rastreador associado",
              "botao_informacoes": "desabilitar botão de ver mais informacoes (?) ",
              "coluna": "coluna de frotas esta faltando",
              "edicao_muitos": "edicao em massa por company nao funciona",
              "mudar_empresa": "ao mudar a company do veiculo deveriamos perguntar se quer mover junto rastreador e simcard, caso nao, rompe as relacoes com as outras entidades, se sim mantem o comportamento de migracao que ja funciona",
              "sidebar": "ao selecionar o sidebar deveriamos fazer um fetch novo para manter a consistencia, e nao utilizar os dados da table"
            },
            "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
          }
        ],
        "url": ""
      }
    },
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/",

  },
  "Menu_Superior": {
    "Comentarios": [],
    "Funcionalidades": [
      "Idiomas",
      "Font_size",
      "Fullscreen_toggle",
      "Notificações",
      "Temas",
      "Sair"
    ],
    "Subsecoes": {},
    "Tickets": [
      "Usar imagem para identificar este menu, dado que pode se confundir com o menu lateral       Com alguns temas , podem se visualizar       dois menus superiores"
    ],
    "url": "https://stagging.dotelematics.com/"
  },
  "metadata": {
  },
  "Monitoramento_Configuracoes": {
    "Comentarios": [
      "O log reporta um aviso de que a propriedade onChangeCallback não é reconhecida pelo React em um elemento DOM (div) no componente HookedVehicleSelect. Propriedades de eventos personalizadas não são suportadas diretamente em elementos DOM. É necessário revisar o componente e corrigir a propriedade para onChange ou movê-la para um componente apropriado.    A propriedade onChangeCallback é corrigida para onChange ou removida, conforme apropriado.    O aviso \"Warning: Unknown event handler property onChangeCallback...\" não aparece mais no console.    A funcionalidade do componente HookedVehicleSelect não é comprometida.Referência no Log: \"Warning: Unknown event handler property onChangeCallback...\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "UNKNOWN, idioma deve estar em português, ou conforme o idioma do usuário",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/monitoring/settings?page=1&limit=100"
  },
  "Monitoramento_Monitoramento": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Ele permite finalizar sem motivo",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/monitoring/monitoring"
  },
  "Motoristas": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": {
          "botao_exluir": "mesmo tendo permissao para excluir não aparece o botao de excluir motorista"
        },
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/fleet/drivers"
  },
  "Panels": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Sombra das abas",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/panels"
  },
  "Perfis": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/profiles?page=1&limit=100"
  },
  "Permisões": {
    "Comentarios": [],
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/permissions?page=1&limit=100"
  },
  "Real_time": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      "O log indica um aviso de que a propriedade backGroundColor não é reconhecida pelo React em um elemento DOM (div). O React sugere usar backgroundColor (em letras minúsculas) como atributo personalizado. É necessário localizar o componente que está passando backGroundColor (possivelmente em FilterContainer ou HookedScheduleCommandStatus) e corrigir para backgroundColor ou remover a propriedade, se não for intencional.    A propriedade backGroundColor é corrigida para backgroundColor ou removida, conforme apropriado.    O aviso \"Warning: React does not recognize the backGroundColor prop on a DOM element...\" não aparece mais no console.     A estilização do componente não é afetada negativamente."
    ],
    "url": "https://stagging.dotelematics.com/realtime"
  },
  "Regras": {
    "Comentarios": [
      
        "Verificar se há mensagens de erro no console ao tentar abrir a página de regras."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Tela de regras:titulo e descricao dos steps precisao ser melhorados",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/ruler?page=1&limit=100"
  },
  "Relatórios": {





    "url": "https://stagging.dotelematics.com/maintenance/report"
  },
  "Relatorios_Analitico_v2": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Digitação de Anos (campo de data) enrola",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/v2/analytic"
  },
  "Relatorios_Analiticos": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Inout de Data não deve mudar tanto quando digitação de Ano/dia/mês",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/analytic"
  },
  "Relatorios_Bloqueio_Desbloqueio": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {
      "Regras": {
        "Comentarios": [],
        "Funcionalidades": [],
        "Subsecoes": {
          "Adicao_da_Regra": {},
          "Botao_Adicionar_Regra": {
          },
          "Modal_da_Regra_Criada": {
          },
          "Notificacoes": {
          },
        },
        "Tickets": [],
        "url": ""
      }
    },
    "Tickets": [
      {
        "descricao": "Input de data não permite alteração por digitação de numeros, apenas por calendário",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/block-command-history"
  },
  "Relatorios_Distancia": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Gerar um pdf com nada de distancia???",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/distance"
  },
  "Relatorios_Eventos": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Input de data não permite alteração por digitação de numeros, apenas por calendário",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/events"
  },
  "Relatorios_Faturamentos": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Data Final limitada, e data Inicial não pode ser maior que a data Final",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/billing"
  },
  "Relatorios_Jornadas": {
    "Comentarios": [
      ""
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Aviso de Algo deu errado!",
        "url_ticket": ""
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/trips"
  },
  "Relatorios_Operadores": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Após pedir um relatório, não é possível voltar (com facilidade) para a tela de relatórios",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/monitoring-operator"
  },
  "Relatorios_Pacotes_Enviados": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      {
        "descricao": "Aviso de Algo deu errado! (r is undefined)",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/reports/tracker-metrics"
  },
  "Sessoes": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/sessions?page=1&limit=100"
  },
  "Tela_de_Login": {
    "Comentarios": [],
    "Funcionalidades": [
      "usuario",
      "Exibir senha",
      "Recuperar senha"
    ],
    "Subsecoes": {},
    "Tickets": [
      "verificar condição de Login para redirecionamento"
    ],
    "url": "https://stagging.dotelematics.com/sign-in"
  },
  "Urls": {
    "Comentarios": [],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [],
    "url": "https://stagging.dotelematics.com/admin/urls"
  },
  "Usuarios": {
    "Comentarios": [
      "O log apresenta múltiplas mensagens de erro indicando \"Failed to load resource: the server responded with a status of 404 ()\". Esses erros sugerem que determinados recursos (como arquivos JavaScript, imagens ou outros assets) não estão sendo encontrados no servidor. É necessário investigar as URLs dos recursos que estão retornando 404, verificar se os arquivos existem no servidor de staging (https://stagging.dotelematics.com/) e corrigir os caminhos ou garantir que os recursos estejam disponíveis. (os erros 404 podem impactar diretamente a funcionalidade da aplicação). Referência no Log: Mensagens como \"Failed to load resource: the server responded with a status of 404 ()\"."
    ],
    "Funcionalidades": [],
    "Subsecoes": {},
    "Tickets": [
      "O React recomenda usar uma string vazia (\"\") para limpar o componente ou undefined para componentes não controlados. É necessário revisar os componentes, como MapFilters e TrackerList, para garantir que a propriedade value seja definida corretamente.    Todos os elementos input identificados têm a propriedade value definida como string vazia ou undefined, conforme apropriado.    O aviso \"Warning: value prop on %s should not be null...\" não aparece mais no console.    A funcionalidade dos campos de entrada não é comprometida."
    ],
    "url": "https://stagging.dotelematics.com/admin/users"
  },
  "veiculos": {
    "Comentarios": [
      "O log indica que a propriedade getOptionHidden não é reconhecida pelo React em um elemento DOM (div) no componente HookedVehicleSelect. Essa propriedade provavelmente está sendo usada incorretamente e deve ser revisada para garantir que seja aplicada a um componente apropriado ou removida.    A propriedade getOptionHidden é corrigida ou removida, conforme apropriado.     O aviso \"Warning: React does not recognize the getOptionHidden prop...\" não aparece mais no console.    A funcionalidade do componente HookedVehicleSelect não é afetada. Referência no Log: \"Warning: React does not recognize the getOptionHidden prop...\"."
    ],
    "Tickets": [
      {
        "descricao": "validação de campos obrigatórios não está funcionando corretamente",
        "articulacao_solucionar": "Conversar com o Sr. Alan e determinar melhor forma de abrir o Ticket",
        "url_ticket": "https://linear.app/dotelematics/issue/DEV-152/revisao-da-plataforma"
      }
    ],
    "url": "https://stagging.dotelematics.com/fleet/vehicles"
  }
};