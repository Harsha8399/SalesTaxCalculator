var productObject = {
  taxFree: {
    Books: ["book"],
    Food: ["chocolates"],
    Medicine: ["Headache pills", "Fever pills"],
  },
  Others: {
    Others: ["Perfume", "music CD"],
  },
};

window.onload = function () {
  var category = document.querySelector(".category-select");
  var taxSlab = document.getElementById("tax-slab");
  var category = document.getElementById("category");
  var product = document.getElementById("product");
  var importCheck = document.getElementById("import");
  var addBtn = document.getElementById("addBtn");
  var submitBtn = document.getElementById("submitBtn");
  var output = document.getElementById("output");
  let Items = [];


  for (var x in productObject) {
    taxSlab.options[taxSlab.options.length] = new Option(x, x);
  }

  taxSlab.onchange = function () {
    product.length = 1;
    category.length = 1;
    for (var y in productObject[this.value]) {
      category.options[category.options.length] = new Option(y, y);
    }
  };

  importCheck.onchange=function(){
    console.log(importCheck.checked)
    if(importCheck.checked===true){
      this.value = "yes";
    }else{
     this.value = "no"; 
    }
   
  }
  category.onchange = function () {
    product.length = 1;
    var z = productObject[taxSlab.value][this.value];
    console.log(z);
    for (var i = 0; i < z.length; i++) {
      product.options[product.options.length] = new Option(z[i], z[i]);
    }
  };
  addBtn.addEventListener("click", () => {
    const Qty = document.getElementById("quantity");

    const Price = document.getElementById("price");
    setProduct(Qty.value, product.value, Price.value);
    addedItems();
  });

  const setProduct = (qty, productName, price) => {
    console.log(qty, price, productName);
    const ItemDesc = {
      qty: qty,
      productName: productName,
      productPrice: price,
    };

    Items.push(ItemDesc);
    addedItems();
  };

  const addedItems = () =>{
    let addedList =''
    let addedProducts = document.getElementById('addedProducts')
    Items.map((data, index) => {
        // console.log(data.productName)
        addedList+=`<li class="added-list">${data.qty+"  Piece : "+ data.productName} at ${data.productPrice}
        </li>
        `
    });
    addedProducts.innerHTML= addedList;
}

  submitBtn.addEventListener("click", () => {
    let outputList = "";
    let result = calculateTax(Items);
    console.log(result)
    for (let i = 0; i < result.length - 2; i++) {
      outputList += `<li class="orders-list"> ${
        result[i].qty + " " + result[i].name + " : " + result[i].price}</li>`
      }
      outputList += `<li class="orders-list">Sales Taxes : ${result[result.length - 2]}</li>`
      outputList += `<li class="orders-list">Total : ${result[result.length - 1]}</li>`;
      console.log(outputList);
      console.log(importCheck.value);
      console.log(typeof(importCheck.value));

      output.innerHTML = outputList;
  });
  const calculateTax = (Items) => {
    let totalPrice = 0,
      SalesTax = 0;
    let productsSummary = [];
    Items.map((item) => {
      let itemData = {
        qty: item.qty,
        name: String(item.productName),
        price: Number(item.productPrice),
      };
      let currPrice = itemData.price * itemData.qty;
      let tempPrice = itemData.price * itemData.qty;
      let tax = (currPrice * 10) / 100;

          if(itemData.name.includes("book") ||  itemData.name.includes("chocolate") || itemData.name.includes("pills")){
            console.log(taxSlab.value)
            totalPrice += currPrice;
          }else {
            console.log(itemData.name);
            
            SalesTax += tax;
            currPrice += tax;
            totalPrice += currPrice;
            itemData.price = roundOff(currPrice);
          }
    
        
      if (importCheck.value==="yes") {
        console.log(typeof(importCheck.value));
        SalesTax += (tempPrice * 5) / 100;
        currPrice += (tempPrice * 5) / 100;
        totalPrice += (tempPrice * 5) / 100;
        itemData.price = roundOff(currPrice);
      }
      productsSummary.push(itemData);
    });
    productsSummary.push(roundOff(SalesTax), totalPrice.toFixed(2));
    console.log(productsSummary);
    return productsSummary;
  };
  const roundOff = (number) => (Math.ceil(number * 20) / 20).toFixed(2);
  
  let printBtn = document.getElementById("printbtn");
  printBtn.addEventListener('click',()=> window.print());
};
