App = (function() {

  var $jsonFile = document.getElementById('json-file')
  var $jsonField = document.getElementById('json-field')
  var $okButton = document.getElementById('ok-button')
  var $fileNameBox = document.getElementById('file-name-box')
  var $graphContainer = document.getElementById('graph')

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

  function bindEvents() {
    $jsonFile.onchange = handleFileChange
    $okButton.onclick = handleButtonClick
  }

  function start() {
    bindEvents()
  }

  return {
    start
  }
})()