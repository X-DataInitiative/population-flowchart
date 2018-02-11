Graph = (function() {

  var isDrawn = false;

  var cytoscapeOptions = {
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
          'color': 'white',
          'background-color': '#555',
          'text-opacity': 0.5,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'font-weight': 'bold'
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
    ]
  }

  function nodeLabel(sep) { return function(el) {
    var name = el.data('id').split('_').join(' ')
    var fmt = Util.nFormatter(2)
    var count_left = el.data('count_left') 
    var count_right = el.data('count_right')
    var diff = count_left - count_right
    return name.toUpperCase() + '\n' +
      (count_left ? fmt(count_left) : '') + (count_right ? (sep + fmt(count_right)) : '') +
      (diff > 0 ? ('\n' + 'diff: ' + fmt(diff)) : '')
  }}


  function draw($el,data) {
    cytoscapeOptions.container = $el
    cytoscapeOptions.elements = data
    window.cy = cytoscape(cytoscapeOptions)
    Graph.isDrawn = true;
  }

  function destroy() {
    window.cy.destroy()
  }
  
  return { 
    isDrawn,
    draw,
    destroy
  }
})();
