Graph = (function() {

  var cytoscapeOptions = {
    boxSelectionEnabled: false,
    autounselectify: true,
    layout: {
      name: 'dagre',
      padding: 48,
      rankDir: 'lr',
      rankSep: 100,
      ranker: 'longest-path'
    },
    style: [
      {
        selector: 'node',
        style: {
          'content': getNodeLabel,
          'shape': 'rectangle',
          'width': getNodeWidth,
          'height': '5em',
          'color': '#f7f7f7',
          'background-color': getNodeColor,
          'text-valign': 'center',
          'text-halign': 'center',
          'text-wrap': 'wrap',
          'font-family': 'sans-serif'
        }
      },
      {
        selector: 'edge',
        style: {
          'label': getEdgeLabel,
          'curve-style': 'bezier',
          'text-margin-y': '-20px',
          'color': '#888',
          'control-point-distance': '20',
          'control-point-weight': '0.5',
          'width': 4,
          'target-arrow-shape': 'triangle',
          'line-color': '#aaa',
          'target-arrow-color': '#aaa',
          'line-style': getEdgeLineStyle
        }
      }
    ]
  }

  function getNodeLabel(node) { 
    var name = formattedCount = ''
    var count = node.data('count')  
    
    if (node.data('name') === 'union') {
      formattedCount = count ? Util.nFormatter(2)(count) : ''
    } else {
      name = node.data('id').split('_').join(' ')
      formattedCount = count ? Util.nFormatter(2)(count) + ' (patients)' : ''
    }
    return name.toUpperCase() + '\n\n' + formattedCount
  }

  function getNodeWidth(node) {
    return node.data('name') === 'union' ? '5em' : '320px'
  }

  function getNodeColor(node) {
    return node.data('name') === 'union' ? '#565656' : '#363636'
  }

  function getEdgeLineStyle(edge) {
    return edge.target().data('name') === 'union' ? 'dashed' : 'solid'
  }

  function getEdgeLabel(edge) {
    if (edge.target().data('name') !== 'union') {
      var targetCount = edge.target().data('count')
      var sourceCount = edge.source().data('count') || 2*targetCount
      var diff = targetCount - sourceCount
      return diff === 0 ? '0' : '- ' + Util.nFormatter(2)(-diff)
    }
    else return ''
  }

  function draw($container, elements) {
    cytoscapeOptions.container = $container
    cytoscapeOptions.elements = elements
    window.cy = cytoscape(cytoscapeOptions)
  }

  return { 
    draw
  }
})()
