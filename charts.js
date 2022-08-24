d3.json("samples.json").then(data) => {
  console.log(data);
}

// function init() {
//   // Grab a reference to the dropdown select element
//   var selector = d3.select("#selDataset");

//   // Use the list of sample names to populate the select options
//   d3.json("samples.json").then((data) => {
//     console.log(data);
//     var sampleNames = data.names;
//     sampleNames.forEach((sample) => {
//       selector
//         .append("option")
//         .text(sample)
//         .property("value", sample);
//     });

//     // Use the first sample from the list to build the initial plots
//     var firstSample = sampleNames[0];
//     buildCharts(firstSample);
//     buildMetadata(firstSample);
//   });
// }

// // Initialize the dashboard
// init();

function optionChanged(newSample) {
  // Fetch new data each time a new sample is selected
  console.log(newSample);
  buildMetadata(newSample);
  buildCharts(newSample);
}

// Demographics Panel 
function buildMetadata(sample) {
  d3.json("samples.json").then((data) => {
    var metadata = data.metadata;
    // Filter the data for the object with the desired sample number
    var resultArray = metadata.filter(sampleObj => sampleObj.id == sample);
    var result = resultArray[0];
    // Use d3 to select the panel with id of `#sample-metadata`
    var PANEL = d3.select("#sample-metadata");

    // Use `.html("") to clear any existing metadata
    PANEL.html("");
    // Use `Object.entries` to add each key and value pair to the panel
    // Hint: Inside the loop, you will need to use d3 to append new
    // tags for each key-value in the metadata.
    PANEL.append("h6").text("ID: " + result.id);
    PANEL.append("h6").text("ETHNICITY: " + result.ethnicity);
    PANEL.append("h6").text("GENDER: " + result.gender);
    PANEL.append("h6").text("AGE: " + result.age);
    PANEL.append("h6").text("LOCATION: " + result.location);
    PANEL.append("h6").text("BB-TYPE: " + result.bbtype);
    PANEL.append("h6").text("WFREQ: " + result.wfreq);
    
    // Object.entries(result).forEach(([key, value]) => {
    //   PANEL.append("h6").text(`${key.toUpperCase()}: ${value}`);
    });
  });
}

// 1. Create the buildCharts function.
function buildCharts(sample) {
  // 2. Use d3.json to load and retrieve the samples.json file 
  d3.json("samples.json").then((data) => {
    // 3. Create a variable that holds the samples array. 
    var samplesArray = data.samples;
        
    // 4. Create a variable that filters the samples for the object with the desired sample number.
    var sampleObj = samplesArray.filter(sampleObj => sampleObj.id === sample)
    
    //  5. Create a variable that holds the first sample in the array.
    var firstSample = data.samples[0];
        
    // 6. Create variables that hold the otu_ids, otu_labels, and sample_values.
    var otuIds = data.samples[0].otu_ids;
    var otuLabels = data.samples[0].otu_labels;
    var sampleValues = data.samples[0].sample_values;

    // 7. Create the yticks for the bar chart.
    // Hint: Get the the top 10 otu_ids and map them in descending order  
    //  so the otu_ids with the most bacteria are last. 

    // Chain the slice() method with the map() and reverse() functions 
    // to retrieve the top 10 otu_ids sorted in descending order.
    var sortedSamples = samplesArray.sort((a,b) => a.otu_ids - b.otu-ids).reverse();

    var yticks = sortedSamples.slice(0,10).map(data.samples.otu_ids => parseInt(samplesArray.otu_ids));
  
    // 8. Create the trace for the bar chart. 
    var barData = [
      {
        labels: [yticks],
        values: [sampleValues],
        type: 'bar',
        orientation: 'h'
    };
  ];

    // 9. Create the layout for the bar chart. 
    var barLayout = {
     title: "Top Ten Bacteria Cultures Found"
     xaxis: {title: "Sample Values"},
     yaxis: {title: "OTU IDs"}
    };
    
    // 10. Use Plotly to plot the data with the layout. 
    Plotly.newPlot("bar", barData, barLayout);
  });
};