App = (function() {

  var $file = document.getElementById("file");
  var $fileName = document.getElementById('filename')

  function handleFileChange() {
    if($file.files.length > 0) {
      firstFile = $file.files[0]
      $fileName.innerHTML = firstFile.name;
      Parser.parse(firstFile, function (parsedData) {
        if (Chart.isDrawn) {
          console.log('destroying')
          Chart.destroy()
        }
        Chart.draw(parsedData) 
      })
    }
  }

  function start() {
    $file.onchange = handleFileChange
  }

  return { 
    start
  }
})()