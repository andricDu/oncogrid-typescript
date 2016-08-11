///<reference path="oncogrid.ts" />
"use strict"

var donors = [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}, {id: 'D5'}];
var genes = [{id: 'G1'}, {id: 'G2'}, {id: 'G3'}, {id: 'G4'}];
var obs = [{id: 'M1', xId: 'D1', yId:'G1'}, {id: 'M2', xId: 'D3', yId:'G4'}];

var margin = {
  top: 50,
  right: 50,
  bottom: 50,
  left: 50
};

var grid = new OncoGrid(donors, genes, obs, {
  margin: margin
});
grid.init();
grid.render();