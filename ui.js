function initializeButtons() {
  if (document.getElementById("contentButtons").hasChildNodes() == false) {
  var namefield = document.createElement("input");
  namefield.id = "namefield";
  var namelabel = document.createElement("label");
  namelabel.for = "namefield";
  namelabel.innerHTML = "Name Fish:"
  document.getElementById("contentButtons").appendChild(namelabel);
  document.getElementById("contentButtons").appendChild(namefield);
  }
}
