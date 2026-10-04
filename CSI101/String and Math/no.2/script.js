function calculate() {
  const waterUnit = parseFloat(document.getElementById("water").value) || 0;
  const electricityUnit = parseFloat(document.getElementById("electricity").value) || 0;
  const phoneMinute = parseFloat(document.getElementById("phone").value) || 0;

  const waterCost = waterUnit * 10;
  const electricityCost = electricityUnit * 10;
  const phoneCost = phoneMinute * 5;

  const total = waterCost + electricityCost + phoneCost;

  document.getElementById("result").innerHTML =
    `water: ${waterUnit} ยูนิต<br>` + `ค่าน้ำ: ${waterCost.toFixed(2)} บาท<br>` +
    `electricity: ${electricityUnit} ยูนิต<br>` + `ค่าไฟ: ${electricityCost.toFixed(2)} บาท<br>` +
    `โทรศัพท์: ${phoneMinute} นาที<br>` +  `ค่าโทรศัพท์: ${phoneCost.toFixed(2)} บาท<br>` +
    `<hr>รวมทั้งหมด: ${total.toFixed(2)} บาท`;
}
