///<reference path="oncogrid.ts" />
"use strict"

var donors = [{id: 'D1'}, {id: 'D2'}, {id: 'D3'}, {id: 'D4'}, {id: 'D5'}];
var genes = [{id: 'G1'}, {id: 'G2'}, {id: 'G3'}, {id: 'G4'}];
var obs = [{id: 'M1', xId: 'D1', yId:'G1'}];

var grid = new OncoGrid(donors, genes, obs, {});
grid.init()
grid.render();