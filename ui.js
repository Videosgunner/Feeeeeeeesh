function initializeButtons() {
  if (document.getElementById("contentButtons").hasChildNodes() == false) {
  var namefield = document.createElement("input");
  namefield.id = "namefield";
  document.getElementById("contentButtons").appendChild(namefield);
  }
}
