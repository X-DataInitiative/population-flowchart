App = (function() {

  var $jsonFile
  var $jsonField
  var $okButton
  var $fileNameBox
  var $graphContainer

  function start() {
    window.onload = function() {
      initElements()
      bindEvents()
    }
  }

  function initElements() {
    $jsonFile = document.getElementById('json-file')
    $jsonField = document.getElementById('json-field')
    $okButton = document.getElementById('ok-button')
    $fileNameBox = document.getElementById('file-name-box')
    $graphContainer = document.getElementById('graph')
  }

  function bindEvents() {
    $jsonFile.onchange = handleFileChange
    $okButton.onclick = handleButtonClick
  }

  function handleFileChange() {
    if($jsonFile.files.length > 0) {
      var firstFile = $jsonFile.files[0]
      $fileNameBox.innerHTML = firstFile.name
      Parser.fromFile(firstFile, function (parsedData) {
        Graph.draw($graphContainer, parsedData) 
      })
    }
  }

  function handleButtonClick() {
    var jsonText = $jsonField.value
    if (jsonText.length > 0) {
      var parsedData = Parser.fromText(jsonText)
      Graph.draw($graphContainer, parsedData)
    }
  }

  return {
    start
  }
})()