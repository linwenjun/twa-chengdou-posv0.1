function transferCartItems(inputs) {
  var result = [];
  inputs.forEach(function(input) {
    var existItem = result.find(function(item) {
      return item.barcode === input.barcode;
    });

    if(!existItem) {
      existItem = Object.assign({
        count: 0,
      }, input);
      result.push(existItem);
    }

    existItem.count++;
  })
  return result;
}

function calculateSubtotal(items) {
  return items.map(function(item) {
    return Object.assign({
      subTotal: item.count * item.price,
      formattedPrice: item.price.toFixed(2),
      formattedSubtotal: (item.count * item.price).toFixed(2)
    }, item);
  })
}

function calculateTotal(items) {
  var resultObj = items.reduce(function(a, b) {
    return {
      subTotal: a.subTotal + b.subTotal
    };
  });

  return resultObj.subTotal;
}

function printCartItems(items, total) {
  var receiptString = '***<没钱赚商店>购物清单***\n';
  items.forEach(function(item) {
    receiptString += `名称：${item.name}，数量：${item.count}${item.unit}，单价：${item.formattedPrice}(元)，小计：${item.formattedSubtotal}(元)\n`;
  });
  receiptString += "----------------------\n";
  receiptString += `总计：${total.toFixed(2)}(元)\n`;
  receiptString += "**********************";

  console.log(receiptString);
}

function printInventory(inputs) {
  var mergedItems = transferCartItems(inputs);
  var cartItems = calculateSubtotal(mergedItems);
  var total = calculateTotal(cartItems);
  printCartItems(cartItems, total);
}
