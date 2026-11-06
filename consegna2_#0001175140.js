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

// 0) CREAZIONE DB
use fiere;

// PULIZIA DB
db.Espositori.drop();
db.Fiere.drop();
db.Edizioni.drop();

// CREAZIONE COLLEZIONI
db.createCollection("Espositori");
db.createCollection("Fiere");
db.createCollection("Edizioni");

// PULIZIA COLLEZIONI
db.Espositori.deleteMany({});
db.Fiere.deleteMany({});
db.Edizioni.deleteMany({});

// POPOLAMENTO DB
db.Espositori.insertMany([
    { codice: "E001", nome_azienda: "TechNova Srl", sede: "Bologna", tipologia: "Startup", recapiti: ["info@technova.it", "0514455667"]},
    { codice: "E002", nome_azienda: "Ceramiche Rinaldi", sede: "Sassuolo", tipologia: "SME"},
    { codice: "E003", nome_azienda: "GreenFood spa", sede: "Parma", tipologia: "Enterprise", recapiti: ["ordini@greenfood.it"]},
    { codice: "E004", nome_azienda: "PixelArt Studio", sede: "Milano", tipologia: "Startup", recapiti: ["pixelart@gmail.com", "3471234567"]},
    { codice: "E005", nome_azienda: "Officine Ferro", sede: "Brescia", recapiti: ["030221133"]},
    { codice: "E006", nome_azienda: "SportLab", sede: "Milano", tipologia: "SME", recapiti: ["info@sportlab.it", "commerciale@sportlab.it", "029988776"]},
    { codice: "E007", nome_azienda: "Data Wave", sede: "Torino", tipologia: "Enterprise"},
    { codice: "E008", nome_azienda: "Pasta Bianchi", tipologia: "SME"}
]);

db.Fiere.insertMany([
    { nome: "Info2000", ambito: "Tecnologia", ente_promotore: "Consorzio Info", padiglioni: ["A", "B", "C"]},
    { nome: "ArteBo", ambito: "Arte", ente_promotore: "Bologna Eventi", padiglioni: ["A", "B"]},
    { nome: "MarmoMat", ambito: "Materiali", ente_promotore: "Verona Expo", padiglioni: ["A", "B", "C", "D"]},
    { nome: "BioFood", ambito: "Alimentare", ente_promotore: "Bologna Eventi"},
    { nome: "SportExpo", ambito: "Sport", padiglioni: ["A"]},
    { nome: "TechDays", ambito: "Tecnologia", ente_promotore: "Consorzio Info", padiglioni: ["A", "B", "C"]},
    { nome: "RoboWorld", ambito: "Tecnologia", ente_promotore: "Milano Congressi", padiglioni: ["A", "B"]}
]);

db.Edizioni.insertMany([
    { codice: "ED01", fiera: "Info2000", anno: 2023, citta: "Bologna", regione: "Emilia-Romagna", sup_totale: 1200, stato: "Conclusa" },
    { codice: "ED02", fiera: "Info2000", anno: 2024, citta: "Milano", regione: "Lombardia", sup_totale: 1500, stato: "Conclusa" },
    { codice: "ED03", fiera: "Info2000", anno: 2025, citta: "Torino", regione: "Piemonte", stato: "Annullata" },
    { codice: "ED04", fiera: "ArteBo", anno: 2024, citta: "Bologna", regione: "Emilia-Romagna", sup_totale: 800, stato: "Conclusa" },
    { codice: "ED05", fiera: "MarmoMat", anno: 2024, citta: "Verona", regione: "Veneto", sup_totale: 3000, stato: "Conclusa" },
    { codice: "ED06", fiera: "BioFood", anno: 2025, citta: "Bologna", sup_totale: 950 },
    { codice: "ED07", fiera: "SportExpo", anno: 2025, citta: "Rimini", regione: "Emilia-Romagna", stato: "Annullata" },
    { codice: "ED08", fiera: "TechDays", anno: 2025, citta: "Milano", regione: "Lombardia", sup_totale: 2000, stato: "Conclusa" },
    { codice: "ED09", fiera: "RoboWorld", anno: 2026, citta: "Torino", regione: "Piemonte", stato: "Programmata" },
    { codice: "ED10", fiera: "Info2000", anno: 2026, citta: "Bologna", regione: "Emilia-Romagna", stato: "Programmata" },
    { codice: "ED11", fiera: "MarmoMat", anno: 2025, citta: "Roma", regione: "Lazio", sup_totale: 700, stato: "Conclusa" }
]);



// 1) Scrivere la query che conta il numero totale di fiere presenti nel sistema.
const NUM1 = db.Fiere.countDocuments();
print("[PUNTO 1] Numero di fiere presenti: " + NUM1);



// 2) Scrivere la query che conta il numero di fiere di ambito “Tecnologia” e con ente promotore “Consorzio Info”.
const NUM2 = db.Fiere.countDocuments({ ambito: "Tecnologia", ente_promotore: "Consorzio Info" });
print("[PUNTO 2] Numero di fiere di ambito Tecnologia promosse da Consorzio Info: " + NUM2);



// 3) Scrivere la query che conta il numero di fiere che dispongono di almeno 3 padiglioni.
const NUM3 = 0;
db.Fiere.find().forEach(fiera => {
    if (fiera.padiglioni && fiera.padiglioni.length >= 3)
        NUM3++;
});
print("[PUNTO 3] Numero di fiere con almeno 3 padiglioni: " + NUM3);



// 4) Scrivere la query che conta il numero di edizioni svolte nella città di Bologna OPPURE relative alla fiera “Info2000”.
const NUM4 = db.Edizioni.countDocuments({ $or: [{ citta: "Bologna" }, { fiera: "Info2000" }]});
print("[PUNTO 4] Numero di edizioni svolte a Bologna oppure della fiera Info2000: " + NUM4);



// 5) Eliminare tutte le edizioni con stato “Annullata”. Quindi, contare quante edizioni sono rimaste.
db.Edizioni.deleteMany({ stato: "Annullata" });
const NUM5 = db.Edizioni.countDocuments();
print("[PUNTO 5] Numero di edizioni presenti dopo filtraggio: " + NUM5);



/* 6) Aggiornare  il  documento  relativo  all’espositore  con  codice  pari  a  “E002”.  Aggiungere  i 
      seguenti recapiti (email: info@ceramicherinaldi.it, telefono: 0536123456). Output. Stampare a 
    video il documento JSON modificato [usare la funzione printjson]. */

// Utilizzo $push invece di $set perchè devo aggiungere dei recapiti non aggiornarli/modificarli.
// Nel caso in cui avessi usato $set e l'array recapiti era già popolato, questo comando avrebbe sovrascritto il contenuto.
db.Espositori.updateOne({ codice: "E002" }, { $push: { recapiti: ["info@ceramicherinaldi.it", "0536123456"]}});
const espositore = db.Espositori.find({ codice: "E002" });
printjson(espositore);



/* 7) Si  vuole  tenere  traccia  delle  partecipazioni  degli  espositori  alle  edizioni  delle  fiere.  Per  ogni 
      partecipazione sono noti l’edizione, i metri quadri dello stand e, se presente, il voto (da 1 a 10) 
      assegnato dalla giuria. Le partecipazioni da inserire sono presenti in Tabella 4 (vedi pagina 5). 
      Come per l’esercizio 0, occorre: (i) trasformare i dati in input in documenti JSON; (ii) inserire i 
      dati nelle opportune collezioni, creandone di nuove oppure usando quelle già presenti nel database. */
db.Partecipazioni.drop();
db.createCollection("Partecipazioni");

// Converto tutti i metri quadri per avere la stessa unità di misura come per Edizioni
db.Partecipazioni.insertMany([
    { espositore: "E001", edizione: "ED01", sup: 12, voto: 8 },
    { espositore: "E001", edizione: "ED02", sup: 16, voto: 9 },
    { espositore: "E001", edizione: "ED04", sup: 10, voto: 6 },
    { espositore: "E001", edizione: "ED08", sup: 9, voto: 7 },

    { espositore: "E002", edizione: "ED05", sup: 40, voto: 6 },

    { espositore: "E003", edizione: "ED06", sup: 30, voto: 9 },
    { espositore: "E003", edizione: "ED04", sup: 9, voto: 5 },

    { espositore: "E004", edizione: "ED04", sup: 9, voto: 10 },
    { espositore: "E004", edizione: "ED02", sup: 9, voto: 6 },

    { espositore: "E005", edizione: "ED05", sup: 60, voto: 7 },
    { espositore: "E005", edizione: "ED09", sup: 20 },

    { espositore: "E006", edizione: "ED07", sup: 25 },
    { espositore: "E006", edizione: "ED08", sup: 12, voto: 8 },

    { espositore: "E007", edizione: "ED02", sup: 50, voto: 7 },
    { espositore: "E007", edizione: "ED08", sup: 40, voto: 9 },
    { espositore: "E007", edizione: "ED11", sup: 30, voto: 4 },

    { espositore: "E008", edizione: "ED06", sup: 15, voto: 8 }
]);



// 8) Scrivere la query che restituisce il numero di partecipazioni dell’espositore “E001” a edizioni svolte nella città di Milano.
const cursor = db.Partecipazioni.aggregate([
    { $lookup: {
                from: "Edizioni",
                localField: "edizione",
                foreignField: "codice",
                as: "dati_partecipazioni"
    }},
    { $match: { espositore: "E001", "dati_partecipazioni.citta": "Milano" }}
]);

let NUM8 = 0;
while (cursor.hasNext()) {  //Ciclo il cursore ed effettuo l'incremento
    cursor.next();
    NUM8++;
}

/* Oppure più compresso, converto il cursore in un array e utilizzo la keyword length per contare gli elementi
const NUM8 = cursor.toArray().length; */

print("[PUNTO 8] Numero di partecipazioni dell'espositore E001 a edizioni svolte a Milano: " + NUM8);



/* 9) Scrivere la query che calcola, per ogni fiera, la media dei voti ottenuti dagli espositori in tutte le 
      sue edizioni (le partecipazioni senza voto non vanno considerate). */

// Osservazione_1: SportExpo e RoboWorld si ripetono 1 sola volta in Partecipazioni, in più non possiedono voto. Non appariranno nella stampa.
// Osservazione_2: Nel fare la query esce un risultato di 4 non c'è la fiera GameFest.
const NUM9 = db.Partecipazioni.aggregate([
    { $match: { voto: { $exists: true}}},  //Escludo le partecipazioni senza voto
    { $lookup: {  //Recupero i dati dell'edizione per sapere a quale fiera appartiene ("Edizioni.fiera")
        from: "Edizioni",
        localField: "edizione",
        foreignField: "codice",
        as: "dati_edizione"
    }},
    { $unwind: "$dati_edizione" },
    { $group: {  //Raggruppo per fiera e calcolo la media
        _id: "$dati_edizione.fiera",
        media: { $avg: "$voto" }
    }}
]);

//Ciclo i risultati per stampare le stringhe
NUM9.forEach(res => {
    print("[PUNTO 9] Fiera: " + res._id + ", Media voti: " + res.media");
});



/* 10) Scrivere la query che calcola, per ogni città in cui si è svolta almeno un’edizione, la superficie
       complessiva (in m2) occupata dagli stand degli espositori, sommando i metri quadri di tutte le
       partecipazioni alle edizioni ospitate da quella città (considerare solo le edizioni presenti nel
       database dopo il punto 5). Ordinare il risultato per superficie decrescente. 
       
        Output: Stampare a video, per ciascuna città, il seguente messaggio:
        [PUNTO 10] Città: X, Superficie stand: Z m2
        dove X è il nome della città, Z la superficie complessiva in m2.
       */

const NUM10 = db.Partecipazioni.aggregate([
    { $lookup:{  //Recupero i dati dell'edizione
        from: "Edizioni",
        localField: "edizione",
        foreignField: "codice",
        as: "dati_edizione"
    }},
    { $unwind: "$dati_edizione"},
    { $group: {  //Raggruppo per città e calcolo la somma delle superfici
        _id: "$dati_edizione.citta",
        sumSup: { $sum: "$sup"}
    }},
    { $sort: { sumSup: -1}}
]);


//Ciclo i risultati per stampare le stringhe
NUM10.forEach(res => {
    print("[PUNTO 10] Città: " + res._id + ", Superficie stand: " + res.sumSup + " m2");
});