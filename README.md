# Reação em Cadeia - Card Game Químico



**Reação em Cadeia** é um jogo de cartas de estratégia para dois jogadores, onde química, blefe e gerenciamento de risco se encontram. Crie moléculas, passe compostos instáveis para seu oponente e force reações explosivas para vencer!

Este repositório contém um protótipo funcional completo do jogo, desenvolvido em um único arquivo HTML com JavaScript puro.

## Como Jogar

O protótipo é muito simples de jogar: https://victorjulianir.github.io/Reacao-em-Cadeia/

---

## O Jogo - Regras Detalhadas

### Objetivo

O objetivo é simples: reduzir os **Pontos de Estabilidade** do seu oponente de **100** a **0**.

### Setup Inicial

A preparação do jogo já é uma parte da estratégia:

1.  Cada jogador começa com um deck de 30 cartas, contendo uma mistura de átomos e íons.
2.  No início da partida, cada jogador embaralha seu deck e o divide em 3 pilhas de 10 cartas.
3.  Seu oponente então escolhe uma das suas 3 pilhas e a adiciona ao deck dele. Você faz o mesmo com as pilhas dele.
4.  O resultado é que cada jogador começa com um deck de 30 cartas, onde 20 são do seu deck original (que você conhece) e 10 são do deck do oponente (um mistério).
5.  Cada jogador compra 5 cartas para formar a mão inicial.

### Fluxo de um Turno

No seu turno, você deve:

1.  **Comprar uma carta** do seu deck.
2.  **Realizar uma ação** com uma carta da sua mão. As ações possíveis são:
    *   **Iniciar uma nova reação:** Se o campo estiver vazio, você pode jogar uma carta de Elemento para criar um **Composto Instável**. Esta primeira jogada é segura; a "batata quente" é imediatamente passada para o seu oponente, que deverá lidar com ela no turno dele.
    *   **Continuar uma reação:** Se já existe um Composto Instável no campo (passado pelo seu oponente), você é **obrigado** a jogar uma carta de Elemento da sua mão, adicionando-a ao composto.

### A Mecânica Central: O Composto Instável

O "Composto Instável" é a "batata quente" do jogo.

*   Sua principal propriedade é a **Carga Total**, que é a soma dos **Pontos de Ligação** (a carga) de todas as cartas que o compõem.
*   A cada turno, o composto passa de um jogador para o outro, e sua carga e massa (dano potencial) aumentam.

### Fim de uma Reação

Uma reação pode terminar de 3 maneiras, definindo quem sofre o dano:

#### 1. Molécula Estável (Carga = 0)
É a sua principal forma de atacar.
*   **Condição:** Ao jogar uma carta, a **Carga Total** do Composto Instável se torna exatamente **0**.
*   **Resultado:** Você formou uma molécula estável! Seu oponente (o último jogador a tocar no composto antes de você) sofre o dano.
*   **Cálculo do Dano:** O dano é a soma do **Número Atômico (Z)** de **todas** as cartas que formaram a molécula.

> **Exemplo:** O campo tem um Sódio (Na⁺, Carga +1). Você joga um Cloro (Cl⁻, Carga -1). A carga total vira 0. Seu oponente sofre **28 de dano** (Z(Na)=11 + Z(Cl)=17).

#### 2. Explosão por Falta de Jogada
Acontece quando você é encurralado.
*   **Condição:** É a sua vez de jogar em um Composto Instável, mas você não tem nenhuma carta de Elemento na mão para adicionar a ele.
*   **Resultado:** O composto explode **em você**.
*   **Cálculo do Dano:** O dano é a soma do Número Atômico (Z) de todas as cartas no composto.

#### 3. Explosão por Hiper-Instabilidade (Carga > |6|)
Acontece quando a ganância ou o desespero falam mais alto.
*   **Condição:** Ao jogar uma carta, a **Carga Total** do composto ultrapassa +6 ou se torna menor que -6 (ex: +7, -8, etc.). Um campo de carga tão extremo é insustentável.
*   **Resultado:** O composto explode imediatamente **em você**, o jogador que fez a jogada que causou a instabilidade.
*   **Cálculo do Dano:** O dano é a soma do Número Atômico (Z) de todas as cartas no composto.

---

## Lista de Cartas do Protótipo

### Cátions (Cargas Positivas)

| Nome       | Símbolo | Pontos de Ligação (Carga) | Número Atômico (Z) |
| :--------- | :------ | :------------------------ | :----------------- |
| Hidrogênio | H       | +1                        | 1                  |
| Sódio      | Na⁺     | +1                        | 11                 |
| Potássio   | K⁺      | +1                        | 19                 |
| Magnésio   | Mg²     | +2                        | 12                 |
| Cálcio     | Ca²     | +2                        | 20                 |
| Alumínio   | Al³     | +3                        | 13                 |
| Ferro II   | Fe²     | +2                        | 26                 |

### Ânions (Cargas Negativas)

| Nome       | Símbolo | Pontos de Ligação (Carga) | Número Atômico (Z) |
| :--------- | :------ | :------------------------ | :----------------- |
| Flúor      | F⁻      | -1                        | 9                  |
| Cloro      | Cl⁻     | -1                        | 17                 |
| Oxigênio   | O²      | -2                        | 8                  |
| Enxofre    | S²      | -2                        | 16                 |
| Nitrogênio | N³      | -3                        | 7                  |

### Cartas Especiais e Coringas

| Nome    | Símbolo | Pontos de Ligação (Carga) | Número Atômico (Z) | Notas                                                         |
| :------ | :------ | :------------------------ | :----------------- | :------------------------------------------------------------ |
| Carbono | C       | +4 ou -4                  | 6                  | **Flexível:** O jogador escolhe a carga ao jogar.             |
| Próton  | p⁺      | +1                        | 0                  | **Coringa:** Altera a carga sem adicionar dano de Z.          |
| Elétron | e⁻      | -1                        | 0                  | **Coringa:** Altera a carga sem adicionar dano de Z.          |
| Nêutron | n⁰      | 0                         | 1                  | **Coringa:** Aumenta o dano potencial (Z) sem alterar a carga. |

## Tecnologias Utilizadas

*   **HTML5**
*   **CSS3**
*   **JavaScript (Vanilla)**

Este projeto foi intencionalmente mantido em um único arquivo para ser um protótipo autocontido e fácil de compartilhar e testar.
