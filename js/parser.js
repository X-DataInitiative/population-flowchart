Parser = (function() {

  function parse(file, callback) {
    reader = new FileReader()
    reader.onload = function(e) {
      var parsedData = processData(JSON.parse(e.target.result))
      callback(parsedData)
    }
    reader.readAsText(file)
  }

  function processData(rawData) {
    var operations = rawData.operations
    var sourcesNode = { data: {
      id: 'source',
    }}
    var nodes = operations.map(function(op){
      return { data: {
        id: op.name,
        count_left: op.patients_before,
        count_right: op.patients_after
      }}
    }).concat([sourcesNode])

    var edges = []
    for (var i = 0; i < operations.length; i++) {
      var op = operations[i]
      op.parents.forEach(function(input){
        edges.push({
          data: {
            source: input,
            target: op.name
          }
        })
      })
    }

    return {
      nodes: nodes,
      edges: edges
    }
  }
  
  return {
    parse
  }
})()