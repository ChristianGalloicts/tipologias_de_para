# Alteração de tipologias pelo protocolo

Primeiramente para realizar essa alteração é necessário que o time de produto disponibilize uma tabela contendo os protocolos com as respectivas tipologias (DE:PARA) e o id do cliente (Caso isso não seja disponibilizado é necessário realizar uma consulta).

FYI - todos os samples utilizam o ID do cliente = 19, Wayne Enterprise, em integração

Caso não tenha o ID do cliente.

``` SQL
    /* retorna id e nome do cliente */
    SELECT id,name FROM public.client WHERE ID = 19
```

Exemplo:

| PROTOCOLO     | DE              | Para                         |
| ------------- | --------------- | ---------------------------- |
| 4318276       | Assédio moral   | Conduta inapropriada
| 5001340       | Agressão física | Descomprimento de protocolos


``` SQL
    /* PEGA TODOS PROTOCOLOS DE UM DETERMINADO CLIENTE */
    SELECT i.code FROM casemanagement.incident i WHERE i.client_id = 19
```

Para agilizar o processo, abrir o chamado para extrair as seguintes informações de produção.

* Substituir o parametro client_id da clausula where pelo id do cliente.
* Substituir o parametro code da clausula where pelo número de protocolos.

Para montar essa consulta de forma automatizada e em lote, abra o arquivo *protocolo_consulta_lote.js* e modifique a variável (arr_protocols) colocando os devidos protocolos.

``` SQL
/* ID DA TIPOLOGIA ATUAL / DESCRICAO DE ACORDO COM O PROTOCOLO */
    SELECT i.code "PROTOCOLO",ict.id "ID TIPOLOGIA",ictd.description "DESCRICAO TIPOLOGIA"
    FROM casemanagement.incident i
        LEFT JOIN casemanagement.incidentcategorytype ict on ict.id = i.categorytype_id
        LEFT JOIN public.incident_category_type_description ictd on ictd.incident_category_type_id = ict.id
    WHERE ictd."language" = 'pt_BR'
            AND i.client_id = 19
            AND i.code in (4751048,4692998,4484361);
```

Após isso abrir o chamado para extrair todas tipologias disponíveis para determinado cliente.

* Substituir o parametro client_id da clausula where pelo id do cliente.

``` SQL
/* TIPOLOGIAS DISPONIVEIS PARA O CLIENTE | ID da tipologia e descrição */
SELECT cat_type.id, ictd.description  FROM casemanagement.incidentcategorytype cat_type
   INNER JOIN public.incident_category_type_description ictd on cat_type.id = ictd.incident_category_type_id
WHERE cat_type.client_id = 19 AND ictd."language" = 'pt_BR'
```

Para montar o update de forma automatizada e em lote, abra o arquivo *update_tipologias_lote.js* e modifique as variáveis (**transformObj e tipologyObj**).

A variável **tipologyObj** será um dicionário das tipologias existentes, deve seguir { id: nome_da_tipologia }
A variável **transformObj** será um dicionário dos protocolos com seus novos valores { id_protocolo: valor_novo }


# Alteração tipologia / localidade relator

Primeiramente para realizar essa alteração é necessário que o time de produto disponibilize uma tabela contendo os protocolos a serem consultados.

Para montar essa consulta de forma automatizada e em lote, abra o arquivo *protocolo_consulta_lote_relator.js* e modifique a variável (arr_protocols) colocando os devidos códigos de protocólos e valores de protocolos hexadecimais.