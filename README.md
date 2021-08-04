# TrabalhoFinal-web
Trabalho final da disciplina COM222 - Desenvolvimento Web

1 - Nome do trabalho
    Nome da materia, professor e universidade
    Nome dos integrantes do grupo
    Breve Descrição do trabalho

2 - Gif da aplicaçao (Pode pular por enquanto)

3- Tecnologias utilizadas
   MEAN stack
   M - mongo
   E - express
   A - angular
   N - node

  Linguagem: Typescript

4 - Passo a passo para executar o projeto
   
Clonar o repositorio: abrir git bash ou o terminal e executar o comando: git clone https://github.com/carloshssouza/TrabalhoFinal-web

Abrir um terminal ou git bash a partir da pasta gerada do git clone

- Instalação dos pacotes
	Front: 
		- navegue para o diretório client, utilizando o comando: cd client
		- execute o comando: npm install

	backend:
		- retorne um diretório, utilizando o comando: cd ..
		- navegue para o diretório server, utilizando o comando: cd server
		- execute o comando: npm install
		- mantenha o terminal aberto
	Pronto, os pacotes foram instalados

Agora, configurar a pasta de dados do mongodb:
	No diretório server, crie um diretório chamado: data
	Procure no seu computador, o diretório bin do mongodb (Se o mongodb foi instalado de maneria padrão
							   geralmente fica em C:\Program Files\MongoDB\Server\4.4\bin)
	e abra um terminal a partir desse diretório

	Pegue o endereço do diretório 'data' criado anteriormente no diretório server
	Agora no terminal que foi aberto na pasta bin do mongodb, execute o seguinte comando:
	mongod --dbpatch endereco-diretorio-data


Para iniciar o backend:
	- no terminal navegue para o diretório server
	- execute o comando: npm start
	- será inicializado o backend da aplicação

Para iniciar o frontend:
	- no terminal navegue para o diretório client
	- execute o comando: npm start
	- será inicializado o frontend da aplicação (pode demorar alguns segundos/minutos, devido a compilação do Angular), logo após vá no navegador e entre no endereço indicado no terminal pelo Angular (por padrão é http://localhost:4200/) 

Caso desejar iniciar os dois de uma vez:
	- navegue para o diretório do server e execute o comando: npm run dev
	- será iniciando o backend e o frontend automaticamente, o frontend da aplicação pode demorar alguns segundos/minutos, devido a compilação do Angular, logo após vá no navegador e entre no endereço indicado no terminal pelo Angular (por padrão é http://localhost:4200/) 
