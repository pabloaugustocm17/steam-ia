Para criar sua máquina virtual utilize o comando abaixo:

```
  #Comando para criar um ambiente virtual
  python3 -m venv .venv
```

## Instalando as dependências
Basta rodar os seguintes comandos na raiz do diretório:

- Ativar a maquina virtual:
```
  .venv\scripts\activate
  
```

- Salvar as dependências:
```
  pip3 freeze > requirements.txt
  
```

- Baixar as denpedências:
```
  pip3 install -r requirements.txt
```

## Rodando a aplicação>

```
  fastapi dev main.py
```