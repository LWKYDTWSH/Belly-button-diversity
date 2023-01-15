// Belly Button Biodiversity 

//Build the Metadata aka the main
//use forEach for the keys and values
//H6 tag is where metadata is found
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata= data.metadata;
    var resultsarray= metadata.filter(sampleobject => 
      sampleobject.id == sample);
    var result= resultsarray[0]
    var panel = d3.select("#sample-metadata");
    panel.html("");
    Object.entries(result).forEach(([key, value]) => {
      panel.append("h6").text(`${key}: ${value}`);
    });
  });
}

function buildCharts(sample) {

// Create callable variable to begin build bubble and bar chart.
//To get samples we pull data.samples from the main and we will need to apply a filter
//for sample object to be sample IDs
d3.json("samples.json").then((data) => {
  var samples= data.samples;
  var resultsarray= samples.filter(sampleobject => 
      sampleobject.id == sample);
  var result= resultsarray[0]

  var ids = result.otu_ids;
  var labels = result.otu_labels;
  var values = result.sample_values;



//Section for bubble chart
//Added symbol feature to help the top baterias stand out
  var LayoutBubble = {
    margin: { t: 0 },
    xaxis: { title: "OTU ID" },
    yaxis: { title: "Sample Size" },
    hovermode: "closest",
    };

    var DataBubble = [ 
    {
      x: ids,
      y: values,
      text: labels,
      mode: "markers",
      marker: {
        symbol: ['circle', 'square', 'diamond', 'cross'],
        color: ids,
        size: values,
        }
    }
  ];

  Plotly.newPlot("bubble", DataBubble, LayoutBubble);


//Begin the bar chart
//use .slice to return a portion of the array and reverse

  var barLayout = {
      title: "Top 10 Bacteria Cultures Found",
      margin: { t: 30, l: 150 },
    };

  var bar_data =[
    {
      y:ids.slice(0, 10).map(otuID => `OTU ${otuID}`).reverse(),
      x:values.slice(0,10).reverse(),
      text:labels.slice(0,10).reverse(),
      type:"bar",
      orientation:"h",
      marker: {color: 'green'}

    }
  ];

  Plotly.newPlot("bar", bar_data, barLayout);
});
}
 

function init() {
// Select within the drop down menu by using the #selDataset
var selector = d3.select("#selDataset");

// Find the sample name to populate
d3.json("samples.json").then((data) => {
  var sampleNames = data.names;
  sampleNames.forEach((sample) => {
    selector
      .append("option")
      .text(sample)
      .property("value", sample);
  });

  // Only pull the first sample for reference when beginning
  const firstSample = sampleNames[0];
  buildCharts(firstSample);
  buildMetadata(firstSample);
});
}

function optionChanged(newSample) {
// Get new sample info each time clicked
buildCharts(newSample);
buildMetadata(newSample);
}



// Initialize the dashboard
init();