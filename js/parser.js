Parser = (function() {

  function fromFile(file, callback) {
    var reader = new FileReader()
    reader.onload = function(e) {
      var parsedData = processData(JSON.parse(e.target.result))
      callback(parsedData)
    }
    reader.readAsText(file)
  }

  function fromText(text) {
    return processData(JSON.parse(text))
  }

  function processData(rawData) {
    var operations = rawData.operations
    var unionNodes = 0
    var sourcesNode = { data: {
      id: 'source',
      count: 5053968
    }}

    var nodes = [sourcesNode]
    var edges = []
    for (var i = 0; i < operations.length; i++) {
      var op = operations[i]

      nodes.push({
        data: {
          id: op.name,
          count: op.patients_after
        }
      })

      if (op.parents.length > 1) {
        nodes.push({
          data: {
            id: unionNodes,
            name: 'union',
            count: op.patients_before
          }
        })

        op.parents.forEach(function(input){
          edges.push({
            data: {
              source: input,
              target: unionNodes
            }
          })
        })

        edges.push({
          data: {
            source: unionNodes,
            target: op.name
          }
        })
        ++unionNodes

      } else if (op.parents.length === 1){
        var parent = op.parents
        edges.push({
          data: {
            source: op.parents[0],
            target: op.name
          }
        })
      }
    }

    return {
      nodes: nodes,
      edges: edges
    }
  }
  
  return {
    fromFile,
    fromText
  }
})()