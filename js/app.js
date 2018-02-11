App = (function() {

  var $file = document.getElementById("file");
  var $fileName = document.getElementById('filename')
  var $graphContainer = document.getElementById('graph')

  function handleFileChange() {
    if($file.files.length > 0) {
      firstFile = $file.files[0]
      $fileName.innerHTML = firstFile.name;
      Parser.fromFile(firstFile, function (parsedData) {
        if (Graph.isDrawn) {
          Graph.destroy()
        }
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