let productsTotal = 0.00;
let state = "";
let discountPercentage = 0.00;

state = prompt("Enter your State: ", "");

function begin() {
    const ppItem = document.getElementById("pricePerItems").value;
    const noItems = document.getElementById("noOfItems").value;

    const validationStatus = validate(ppItem, noItems, state);

    if (validationStatus) {
        return alert(validationStatus);
    }

    calculate(ppItem,noItems, state);
}

function calculate(itemPrice, itemsCount, state) {
    const totalPrice = itemPrice * itemsCount;
    productsTotal += totalPrice;

    discountPercentage = getDiscountRate(totalPrice);
    const tax = getTaxRate(state);

    if (tax && discountPercentage >= 0) {
        const table = document.getElementById("agileTable");
        const row = table.insertRow(1);
        const cellPPItem = row.insertCell(0);
        const cellNoItems = row.insertCell(1);
        const cellTotal = row.insertCell(2);

        cellPPItem.innerHTML = itemPrice;
        cellNoItems.innerHTML = itemsCount;
        cellTotal.innerHTML = totalPrice.toFixed(2);
    } else {
        alert("Tax or Discount calculation failed");
    }
}

function calcSummary() {
    const totalPrice = document.getElementById("totalPrice");
    const discount = document.getElementById("discount");
    const netTotal = document.getElementById("netTotal");
    const taxAmount = document.getElementById("taxAmount");

    const tax = getTaxRate(state);
    if (tax && discountPercentage >= 0) {
        const taxVal = (productsTotal * tax) / 100;
        const finalBal = productsTotal - (productsTotal * discountPercentage) + taxVal;

        totalPrice.innerHTML = productsTotal.toFixed(2);
        discount.innerHTML = (productsTotal * discountPercentage).toFixed(2);
        taxAmount.innerHTML = taxVal.toFixed(2);
        netTotal.innerHTML = finalBal.toFixed(2);

    } else {
        alert("Tax or Discount calculation failed.");
    }
}

function validate(ppItem, noItems, state) {
    if (state) {
        switch (state) {
            case "UT":
                return;
            case "NV":
                return;
            case "TX":
                return;
            case "AL":
                return;
            case "CA":
                return;
            default:
                return "Invalid value for State ID.";
        }
    }

    if (ppItem < 0 ) {
        return "Negative values for Price Per Item field were not allowed."
    } else if (noItems < 0) {
        return "Negative values for No of Item field were not allowed."
    }
}

function getDiscountRate(value) {
    if (value >= 50000) {
        return 0.15;
    } else if (value >= 10000) {
        return 0.10;
    } else if (value >= 7000) {
        return 0.07;
    } else if (value >= 5000) {
        return 0.05;
    } else if (value >= 1000) {
        return 0.03;
    } else {
        return 0;
    }
}

function getTaxRate(state) {
    switch (state) {
        case "UT":
            return 6.85;
        case "NV":
            return 8.00;
        case "TX":
            return 6.25;
        case "AL":
            return 4.00;
        case "CA":
            return 8.25;
        default:
            return;
    }
}
