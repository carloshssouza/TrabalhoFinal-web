# TrabalhoFinal-web
Trabalho final da disciplina COM222 - Desenvolvimento Web

![Transferidor UDP](imagens/udp.png)

## :closed_book: Informações do trabalho

  ### Sistema para Controle de Vendas de Imóveis
    * Disciplina: Desenvolvimento Web
    * Professor: Laercio Baldochi Júnior
    * Universidade: Unifei - Universidade Federal de Itajubá

## :construction_worker: Desenvolvido Por
```
Carlos Henrique Silva, curso de Sistemas de informação
-> Matrícula: 2019015979

Fauzi Consoli Esper, curso de Sistemas de informação
-> Matrícula: 27497

Flávio Mohallen, curso de Sistemas de informação
-> Matrícula: 35036

João Lucas Ribeiro, curso de Sistemas de informação
-> Matrícula: 2019005856

Robson de Arruda Silva, curso de Sistemas de informação
-> Matrícula: 2019013624
```
## :information_source: Como foi implementado ?
    Neste trabalho, foi implementado um sistema para gestão de vendas de imóveis a ser utilizado por uma
    imobiliária. A empresa que solicitou o sistema trabalha com a venda de imóveis rurais e urbanos. Os 
    imóveis comercializados são dos seguintes tipos: casa, apartamento, sala comercial, lote, chácara, sítio
    e fazenda. Este sistema é capaz de cadastrar os imóveis à venda, com os seguintes atributos: código, tipo, descrição, nome
    do vendedor (proprietário), preço solicitado, imagem e data de cadastro (campo livre para digitação).

4 - Gif da aplicação (Pode pular por enquanto)

5- Tecnologias utilizadas
   MEAN stack
   M - Mongo
   E - Express
   A - Angular
   N - Node

  Linguagem: Typescript

6 - Passo a passo para executar o projeto
   
Como clonar o repositório?

Basta abrir o git bash ou o terminal e executar o comando: `git clone https://github.com/carloshssouza/TrabalhoFinal-web`

Abrir um terminal ou git bash a partir da pasta gerada do git clone

- Instalação dos pacotes
	Front: 
		- Navegue para o diretório client, utilizando o comando: cd client
		- Execute o comando: npm install

	backend:
		- Retorne um diretório, utilizando o comando: cd ..
		- Navegue para o diretório server, utilizando o comando: cd server
		- Execute o comando: npm install
		- Mantenha o terminal aberto
	Pronto, os pacotes foram instalados

Agora, para configurar a pasta de dados do mongodb:
	No diretório server, crie um diretório chamado: data
	Procure, no seu computador, o diretório bin do mongodb (Se o mongodb foi instalado de maneria padrão
							   geralmente fica em C:\Program Files\MongoDB\Server\4.4\bin)
	e abra um terminal a partir desse diretório.

	Pegue o endereço do diretório 'data' criado anteriormente no diretório server
	Agora no terminal que foi aberto na pasta bin do mongodb, execute o seguinte comando:

  `mongod --dbpatch endereco-diretorio-data`


Para iniciar o backend:
	- No terminal navegue para o diretório server
	- Execute o comando: npm start
	- Será inicializado o backend da aplicação

Para iniciar o frontend:
	- No terminal navegue para o diretório client
	- Execute o comando: npm start
	- Será inicializado o frontend da aplicação (pode demorar alguns segundos/minutos, devido a compilação do Angular), logo após vá no navegador e entre no endereço indicado no terminal pelo Angular (por padrão é http://localhost:4200/) 

Caso desejar iniciar os dois de uma vez:
	- Navegue para o diretório do server e execute o comando: npm run dev
	- Será iniciando o backend e o frontend automaticamente, o frontend da aplicação pode demorar alguns segundos/minutos, devido a compilação do Angular, logo após vá no navegador e entre no endereço indicado no terminal pelo Angular (por padrão é http://localhost:4200/) 
