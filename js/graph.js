Graph = (function() {

  var cytoscapeOptions = {
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
          'color': '#f7f7f7',
          'background-color': '#363636',
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'font-family': 'sans-serif'
        }
      },
      {
        selector: 'edge',
        style: {
          'curve-style': 'bezier',
          'width': 4,
          'target-arrow-shape': 'triangle',
          'line-color': '#aaa',
          'target-arrow-color': '#aaa'
        }
      }
    ]
  }

  function nodeLabel(sep) { return function(el) {
    var name = el.data('id').split('_').join(' ')
    var fmt = Util.nFormatter(2)
    var count_left = el.data('count_left') 
    var count_right = el.data('count_right')
    var diff = count_left - count_right
    return name.toUpperCase() + '\n' + '\n' +
      (count_left ? fmt(count_left) : '') + (count_right ? (sep + fmt(count_right)) : '') +
      (diff > 0 ? (' (- ' + fmt(diff)) + ')' : '')
  }}

  function draw($container, elements) {
    cytoscapeOptions.container = $container
    cytoscapeOptions.elements = elements
    window.cy = cytoscape(cytoscapeOptions)
  }

  return { 
    draw
  }
})()
