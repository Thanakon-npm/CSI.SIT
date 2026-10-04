console.log ("Funtion-base / Recursive Function");
console.log ("array Object Intregation+ ");

// เขียนเอง
function calculate() {
  var income = parseFloat(document.getElementById("Income").value);
  var cost = parseFloat(document.getElementById("Cost").value);
  var result = income - cost;
  if (result < 0) {
    document.getElementById("output").innerText = "ขาดทุน = " + result + " บาท";
    return;
  }
  document.getElementById("output").innerText = "กำไรสุทธิ = " + result + " บาท";
}

/*
// ตัวอย่าง
function calculate(income, cost) {
  if (income >= cost) {
    console.log("calculate Profit as Income - Cost >= " + (income - cost));
    return income - cost;
  }
  else {
    console.log("calculate Loss as Cost - Income >= " + (cost - income));
    return cost - income;
  }
}
  */