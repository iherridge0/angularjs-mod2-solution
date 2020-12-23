(function () {
'use strict';

angular.module('ShoppingListCheckOff', [])
.controller('ToBuyController', ToBuyController)
.controller('AlreadyBoughtController', AlreadyBoughtController)
.service('ShoppingListCheckOffService', ShoppingListCheckOffService);

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuyList = this;

  toBuyList.items = ShoppingListCheckOffService.toBuy;

  toBuyList.itemName = "";
  toBuyList.itemQuantity = "";

  toBuyList.errorMessage = "";

  toBuyList.message = "Everything is bought!";



  toBuyList.addItem = function () {
    try {
      if(toBuyList.itemName !== "" && toBuyList.itemQuantity !== "") {
        ShoppingListCheckOffService.addItem(toBuyList.itemName, toBuyList.itemQuantity);
        toBuyList.errorMessage = "";
      } else{
        throw new Error("Name and Quantity should not be empty");
      }
    } catch (error) {
      toBuyList.errorMessage = error.message;
    }
  };

  toBuyList.removeItem = function (itemIndex) {
    ShoppingListCheckOffService.removeItem(itemIndex);
  };
}

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var boughtList = this;

  boughtList.items = ShoppingListCheckOffService.bought;
  console.log(boughtList.items);

  boughtList.errorMessage = "Nothing bought yet";

  boughtList.isEmpty = function() {
    if(boughtList.items.length === 0) {
      return true;
    } else {
      return false;
    }
  };
}

function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  service.toBuy = [
    new Item("Mushrooms", "250g"),
    new Item("Tamatoes", "500g"),
    new Item("Milk", "2l"),
    new Item("White Bread", "2"),
    new Item("Chorizo", "200g")
  ];
  service.bought = [];

  service.addItem = function (itemName, quantity) {
    var item = new Item(itemName, quantity);
    service.toBuy.push(item);
  };

  service.removeItem = function (itemIndex) {
    var item = service.toBuy[itemIndex];
    service.toBuy.splice(itemIndex, 1);
    service.bought.push(item);

  };

  service.getToBuyList = function () {
      return service.toBuy;
  };

  service.getBoughtList = function () {
      return service.bought;
  };

}

function Item(name, quantity){
  var item = this;
  item.name = name;
  item.quantity = quantity;

  item.toString = function() {
    return " Item [name=" + item.name + ", quantity=" + item.quantity + "]";
  }
}

})();
