App = (function() {

  var $file = document.getElementById('file')
  var $fileNameBox = document.getElementById('file-name-box')
  var $graphContainer = document.getElementById('graph')

  function handleFileChange() {
    if($file.files.length > 0) {
      firstFile = $file.files[0]
      $fileNameBox.innerHTML = firstFile.name
      Parser.fromFile(firstFile, function (parsedData) {
        Graph.draw($graphContainer, parsedData) 
      })
    }
  }

  function bindEvents() {
    $file.onchange = handleFileChange
  }

  function start() {
    bindEvents()
  }

  return { 
    start
  }
})()