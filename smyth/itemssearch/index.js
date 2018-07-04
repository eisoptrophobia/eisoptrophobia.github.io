Item = function(name,desc,rarity,cost){
  this.name = name;
  this.desc = desc;
  this.rarity = rarity;
  this.cost = cost;
};

var raad = new Object();

raad["Fire&Sword"] =  new Item("Flaming Sword","It's a sword thats on fire!","Rarerer","10 gp");
raad["Metal&Stick"] = new Item("Sword","It's a sword.","Common","1 cp");
raad["Captain&Rad&Tuna"] = new Item("Captain Rad Tuna","Captain Rad Tuna.","Legendary","Priceless");
