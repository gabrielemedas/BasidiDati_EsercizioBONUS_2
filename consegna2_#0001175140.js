//SCELTE DI MODELLAZIONE (max 10 righe)
/*

*/

/* DETTAGLI IMPLEMENTATIVI
OSSERVAZIONI DAL PASSO PRELIMINARE:
    - Creare più recapiti in ESPOSITORI non deve essere un problema perchè la struttura è flessibile per aggiungere "attributi" a differenza di SQL.
    - Stessa cosa per l'elenco dei padiglioni in FIERE, struttura flessibile quindi aggiungiamo quandi padiglioni abbiamo bisogno.
    - Vincolo di integrità referenziale in EDIZIONI: la fiera di riferimento (Edizioni.nome_fiera) corrisponde al nome della fiera (Fiere.nome), va gestito!

OSSERVAZIONI DALLE TABELLE FORNITE:
    - Espositori: il campo dei "recapiti" è un array (email e/o telefono)
    - Fiere: il campo dei "padiglioni" è un array (padiglioni corrispondenti)
    - Edizioni: il campo "fiera" è il vincolo di integrità referenziale con Fiere
*/

// CREAZIONE DB
use fiere;

// CREAZIONE COLLEZIONI
db.createCollection("Espositori");
db.createCollection("Fiere");
db.createCollection("Edizioni");
db.createCollection("Partecipazioni");

// INSERIMENTO
db.Espositori.insertOne({"codice": ..., "nome_azienda": ..., "sede": ..., "tipologia": ..., "recapiti": [...]});
db.Fiere.insertOne({"nome": ..., "ambito": ..., "ente_promotore": ..., "padiglioni": [...]});
db.Edizioni.insertOne({"codice": ..., "nome_fiera": ..., "anno": ..., "citta": ..., "regione": ..., "sup_totale": ..., "stato": ...});
db.Partecipazioni.insertOne({
                            "espositore": ...,
                            "partecipazione": {"edizione": ..., "sup": ..., "voto": ...}});


// 1) Scrivere la query che conta il numero totale di fiere presenti nel sistema.

System.out.println("[PUNTO 1] Numero di fiere presenti:" + #NUM );

// 2) Scrivere la query che conta il numero di fiere di ambito “Tecnologia” e con ente promotore “Consorzio Info”.

System.out.println("[PUNTO 2] Numero di fiere di ambito Tecnologia promosse da Consorzio Info:" + #NUM);

// 3) Scrivere la query che conta il numero di fiere che dispongono di almeno 3 padiglioni.

System.out.println("[PUNTO 3] Numero di fiere con almeno 3 padiglioni:" + #NUM);

// 4) Scrivere la query che conta il numero di edizioni svolte nella città di Bologna OPPURE relative alla fiera “Info2000”.

System.out.println("[PUNTO 4] Numero di edizioni svolte a Bologna oppure della fiera Info2000:" + #NUM);

// 5) Eliminare tutte le edizioni con stato “Annullata”. Quindi, contare quante edizioni sono rimaste.

System.out.println("[PUNTO 5] Numero di edizioni presenti dopo filtraggio:" + #NUM);

/* 6) Aggiornare  il  documento  relativo  all’espositore  con  codice  pari  a  “E002”.  Aggiungere  i 
      seguenti recapiti (email: info@ceramicherinaldi.it, telefono: 0536123456). Output. Stampare a 
    video il documento JSON modificato [usare la funzione printjson]. */


/* 7) Si  vuole  tenere  traccia  delle  partecipazioni  degli  espositori  alle  edizioni  delle  fiere.  Per  ogni 
      partecipazione sono noti l’edizione, i metri quadri dello stand e, se presente, il voto (da 1 a 10) 
      assegnato dalla giuria. Le partecipazioni da inserire sono presenti in Tabella 4 (vedi pagina 5). 
      Come per l’esercizio 0, occorre: (i) trasformare i dati in input in documenti JSON; (ii) inserire i 
      dati nelle opportune collezioni, creandone di nuove oppure usando quelle già presenti nel database. */



// 8) Scrivere la query che restituisce il numero di partecipazioni dell’espositore “E001” a edizioni svolte nella città di Milano.

System.out.println("[PUNTO 8] Numero di partecipazioni dell'espositore E001 a edizioni svolte a Milano:" + #NUM);

/* 9) Scrivere la query che calcola, per ogni fiera, la media dei voti ottenuti dagli espositori in tutte le 
      sue edizioni (le partecipazioni senza voto non vanno considerate). Output: Stampare a video, per 
      ciascuna fiera, il seguente messaggio: */

System.out.println("[PUNTO 9] Fiera:" + X + ", Media voti:" + Z);

// 10) 

System.out.println();
