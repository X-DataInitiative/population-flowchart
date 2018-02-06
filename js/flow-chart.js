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
      id: 'sources'
    }}
    var nodes = operations.map(function(op){
      return { data: {
        id: op.name,
        count: op.populationCount || op.outputCount
      }}
    }).concat([sourcesNode])

    var edges = []
    for (var i = 0; i < operations.length; i++) {
      var op = operations[i]
      op.inputs.forEach(function(input){
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
  function nFormatter(num, digits) {
    var si = [
      { value: 1, symbol: "" },
      { value: 1E3, symbol: "k" },
      { value: 1E6, symbol: "M" },
      { value: 1E9, symbol: "G" },
      { value: 1E12, symbol: "T" },
      { value: 1E15, symbol: "P" },
      { value: 1E18, symbol: "E" }
    ];
    var rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var i;
    for (i = si.length - 1; i > 0; i--) {
      if (num >= si[i].value) {
        break;
      }
    }
    return (num / si[i].value).toFixed(digits).replace(rx, "$1") + si[i].symbol;
  }
  function startCytoscape(rawData) {
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
            'content': function(el) {
              return el.data('id') + '\n' + (el.data('count') ? nFormatter(el.data('count'), 2):  '-')
            },
            'shape': 'rectangle',
            'width': 250,
            'height': '3em',
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
