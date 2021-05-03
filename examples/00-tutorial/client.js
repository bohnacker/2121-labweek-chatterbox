// let definiert eine Variable
// eine variable ist ein Name für bspw. ein Objekt, zB wird hier für das gesammte, zusammengewurstelte URL-Konstrukt der Variablen-Name url vergeben
// mit diesem Namen können variablen dann weiter unten im Code immer wieder angesprochen werden
// zB erstellen wir hier erst die Variable "Channel". Weiter unten verwenden wir sie dann - eiinfach indem wir "channel" hinschreiben.
let channel = "tutorial";



// Funktionen aufrufen


// Beim "click" auf den #send-button (definiert im index.html) wird die Funktion "sendButtonHandler" einmalig ausgeführt
// diese findet sich weiter unten im Code wieder
// dabei ist es wichtig, dass der Aufruf über der definition der Funktion steht, da der Code von oben nach unten ausgeführt wird
// bei umgekehrter reihenfolge würde das Programm die Funktion nicht mehr "finden", weil er an der entsprechenden Stelle schon vorbei ist
$("#send-button").click(sendButtonHandler);
$("#request-button").click(requestButtonHandler);



// Nachrichten senden



// Definition der Funktion
// der komplette eingerückte Teil bis dort, wo die { - Klammer wieder zu geht gehört zur Funktion
function sendButtonHandler(){

  // #textarea wäre nur das Textfeld - durch das anhängen von .val() wird das value, der wert/inhalt des Textfeldes in die Variable gespeichert, also das getippte
  let text = $("#textarea").val();
  // definition der variablen (erklärung siehe ganz oben)
  let url = baseURL + channel + "?" + $.param({ text: text, user: "vanessa" });


  // diese Zeile zeigt "loggt" in der Console des Browsers die gesendete URL
  console.log(url);

  // Senden der neuen URL
  $.post(url);

  // setzt nach dem senden die Textarea wieder auf einen leeren String
  // leert das Textfeld
  $("#textarea").val("");

  // fokusiert die area wieder, sodass man direkt wieder tippen kann
  $("#textarea").focus();

}



// Nachrichten empfangen 



function requestButtonHandler() {

  // get fragt Infos vom Server an - bekommt also infos, 
  // in unserem Fall hier werden Nachrichten (messages) mit der Funktion "function(messages)" abgefragt
  // in der Var messages stehen alle Messages gespeichert, die irgendwann mal (in unserem channel) gesendet wurden 
  $.get(baseURL + channel, function (messages) {
    
    // die abbgefragten Nachrichten werden dann in der Console "geloggt"
    console.log(messages);
  

    // For Schleife

    // Wir definieren einen Wert i
    // dieser ist zu Beginn noch 0 (i=0)
    // der Wert kann maximal so groß werden, wie "messages.length" - also die Anzahl der gesendeten Nachrihten bei uns
    // nach jeder "Runde" die durch diese Schleife gedreht wurde wird i um 1 erhöht (i++)
    // -> in der ersten Runde wird also die erste Nachricht angezeigt. in der zweiten kommt dann die zweite dazu, ... bis wir alle sehen
    // das ganze geht aber so schnell, dass sie für uns alle "gleichzeitig" auf dem Bildschirm sichtbar werden
    for(let i = 0; i < messages.length; i++){

      // hier kommt der Teil, der i Mal ausgeführt wird (hier Nachrichten anzeigen)

      // messages[i]
      // die i-te Nachricht aus dem Array, in dem alle Nachrichten gespeichert sind wird angezeigt
      // oben (console.log(messages)) wird in EINER Meldung der komplette array gezeigt. 
      // Durch die for-Schleife wird für jede Nachricht eine eigene "Meldung" generiert.

      // durch das Anhängen von .text wird von allen im Array gespeicherten Objekten nur der Text-Teil abgefragt und angezeigt 
      // Werte wie User, zeitpunkt, ... werden ignoriert
      console.log(messages[i].text);

    }

  });
}



// HTML Elemente erzeugen
// Nachrichten auf der Website anzeigen


