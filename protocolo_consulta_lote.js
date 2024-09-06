let arr_protocols = [
    4751048,
    4692998,
    4484361,
    3454035,
    4466219,
    7765190,
    8062041,
    4348147,
    4211574,
    8165341,     
];

let tmp = '';
// client_id dos protocolos
const client_id = 19;

arr_protocols.map(value => {
    tmp += value + ',';        
})

let in_clause = tmp.slice(0,-1);

let SQL = `SELECT i.code "PROTOCOLO",ict.id "ID TIPOLOGIA",ictd.description "DESCRICAO TIPOLOGIA"
            FROM casemanagement.incident i
            LEFT JOIN casemanagement.incidentcategorytype ict on ict.id = i.categorytype_id
            LEFT JOIN public.incident_category_type_description ictd on ictd.incident_category_type_id = ict.id
            WHERE ictd."language" = 'pt_BR'
                    AND i.client_id = `+client_id+`
                    AND i.code in (`+in_clause+`)`

console.log(SQL);
