const express = require('express')
const app = express()
const args = require('minimist')(process.argv.slice(2))


const port = args.port || 5000




function coinFlip() {
  return(Math.floor(Math.random() * 2) == 0) ? 'heads' : 'tails';
}

function coinFlips(flips) {
  let array = [];
  for (var i = 0; i < flips; i++){
    let flip = coinFlip();
    array[i] = flip;
  }
  return array;
}

function countFlips(array) {
  let h_count = 0;
  let t_count = 0;
  for (var i = 0; i < array.length; i++) {
    if (array[i] == 'heads') {
      h_count ++;
    } else if (array[i] == 'tails') {
      t_count ++;
    }
  }
  if (h_count == 0) {
    return {"tails": t_count};
  }
  else if (t_count == 0) {
    return {"heads": h_count};
  }
  return {"heads": h_count, "tails": t_count};
}

function flipACoin(call) {
  let c_flip = coinFlip();
  let final_result = "";
  if (c_flip = call){
    final_result = "win";
  }else if(c_flip != call){
    final_result = "lose";
  }
  return {"call": call, "flip": c_flip, "result": final_result};
}

const server = app.listen(port, () => {
  console.log('App is running on port %PORT%'.replace('%PORT', port))
})

app.get('/app/', (req, res) => { 
  res.statusCode = 200;
  res.statusMessage = 'OK';
  res.writeHead(res.statusCode, { 'Content-Type': 'text/plain' });
  res.end(res.statusCode + ' ' + res.statusMessage);
});

app.get('/app/flips/:number', (req, res) => {
    var final_array = coinFlips(req.params.number);
    var counter = countFlips(final_array) 
    res.status(200).json({ 'raw' : final_array, 'summary' : counter})
});


app.get('/app/flip/', (req, res) => {
  var flip = coinFlip();  
  res.status(200).json({ "flip" : flip });
});

app.get('/app/flip/call/heads', (req, res) => {
    res.status(200).json(flipACoin("heads"))
  });
  
app.get('/app/flip/call/tails', (req, res) => {
    res.status(200).json(flipACoin("tails"))
  });
  
  
app.use(function (req, res) {
    res.status(404).send('404 NOT FOUND')
    res.type("text/plain")
    });  