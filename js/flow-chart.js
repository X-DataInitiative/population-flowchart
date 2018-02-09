FlowChart = (function() {
  
  function start(jsonFile) {
    parseFile(jsonFile, startCytoscape)
  }
  
  function parseFile(file, callback) {
    reader = new FileReader()
    reader.onload = function(e) {
      callback && callback(JSON.parse(e.target.result))
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

  function startCytoscape(rawData) {
    
    var nodeLabel = function(sep) { return function(el) {
      var name = el.data('id').split('_').join(' ')
      var fmt = Util.nFormatter(2)
      var count_left = el.data('count_left') 
      var count_right = el.data('count_right')
      console.log(el.data('count_left'))
      var diff = count_left - count_right
      return name.toUpperCase() + '\n' +
        (count_left ? fmt(count_left) : '') + (count_right ? (sep + fmt(count_right)) : '') +
        (diff > 0 ? ('\n' + 'diff: ' + fmt(diff)) : '')
    }}

    var elements = processData(rawData)

    window.cy = cytoscape({
      container: document.getElementById('cy'),
      boxSelectionEnabled: false,
      autounselectify: true,
      layout: {
        name: 'dagre',
        rankDir: 'lr',
        ranker: 'longest-path'
      },
      style: [
        {
          selector: 'node',
          style: {
            'content': nodeLabel(' ~> '),
            'shape': 'rectangle',
            'width': 320,
            'height': '5em',
            'text-opacity': 0.5,
            'text-valign': 'center',
            'text-halign': 'center',
            'font-weight': 'bold',
            'background-color': '#555',
            'color': 'white',
            'text-wrap': 'wrap'
          }
        },
        {
          selector: 'edge',
          style: {
            'curve-style': 'bezier',
            'width': 4,
            'target-arrow-shape': 'triangle',
            'line-color': '#bbb',
            'target-arrow-color': '#bbb'
          }
        }
      ],
      elements: elements
    })
  }
  
  return {
    start
  }
})();
