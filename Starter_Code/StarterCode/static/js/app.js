//Begin by creating a global variable to make
//it easier to access and call data

var data = {};

d3.json("./samples.json").then(function (call_data) {
  console.log(call_data);
  data = call_data; 
  
    //Save all created functions here for global variable

        loadDrop();
        getDemo("940");
        });

function loadDrop() {
  for (let i = 0; i < data.names.length; i++){
    let name = data.names[i];
    d3.select("#selDataset").append("option").text(name);
  }
}

//Show when the drop down is clicked in Demo info
function optionChanged(val) {
    getDemo(val);
}

    //Generate the sample-metadata to show in the panel-body
    //of the demographic info table
    function getDemo(val) {

        
    }


