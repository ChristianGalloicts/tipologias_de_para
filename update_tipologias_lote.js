/* 

@ID_PROTOCOLO - enviado pela PO
@PARA - enviado pela PO

transformObj = {
    ID_PROTOCOLO : PARA
}
*/

const transformObj = { 
    4484361:'Tipo 3',
    4692998:'Discriminação',
    4751048:'Tipo 2',
    123456: 'NÂO EXISTE NAS TIPOLOGIAS EXISTENTES'
};


/*
Resultado da consulta: 

SELECT cat_type.id, ictd.description  FROM casemanagement.incidentcategorytype cat_type
			INNER JOIN public.incident_category_type_description ictd on cat_type.id = ictd.incident_category_type_id
WHERE cat_type.client_id = 19 AND ictd."language" = 'pt_BR'
*/

/* 
tipologyObj = {
    ID : DESCRICAO_TIPOLOGIA
}
*/

const tipologyObj = {
    69:'Tipo 2',
    256:'Tipo 3',
    68:'naruto2',
    335:'Discriminação',
}


function getTypologyCategoryID(searchVal) {
    let searchData = '';

    Object.entries(tipologyObj).map(([key, value]) => {       
        if(String(searchVal).toUpperCase().trim() === String(value).toUpperCase().trim()) {
            searchData = key;
        }        
    });

    return searchData;
}

let sqlStatment = '';

/*
SAMPLE SQL

    SELECT i.code, i.categorytype_id FROM casemanagement.incident i WHERE i.code = 494382;

    BEGIN;                
    UPDATE casemanagement.incident i
        SET categorytype_id = 975369
    WHERE i.code = 494382;
    COMMIT;

    SELECT i.code, i.categorytype_id FROM casemanagement.incident i WHERE i.code = 494382;
*/

Object.entries(transformObj).map(([key,value]) => {
    let categoryId = getTypologyCategoryID(value);

    if(categoryId === '') {
        console.log(` ---------- CUIDADO ! TIPOLOGIA INEXISTENTE ---------- \n 
            { Protocolo: ${key} , PARA: ${value} } \n
            SOLICITAR PARA O PO ENTRAR EM CONTATO COM O CLIENTE PARA CRIAÇÃO DO TIPOLOGIA
        `);
        return
    }
    
    sqlStatment += `\n SELECT i.code, i.categorytype_id FROM casemanagement.incident i WHERE i.code = ${key};`;
    sqlStatment += `\n BEGIN;`;
    sqlStatment += `\n UPDATE casemanagement.incident i SET categorytype_id = ${categoryId} WHERE i.code = ${key};`;
    sqlStatment += '\n COMMIT;';
    sqlStatment += `\n SELECT i.code, i.categorytype_id FROM casemanagement.incident i WHERE i.code = ${key}; \n`;
})    
    
console.log(sqlStatment);
