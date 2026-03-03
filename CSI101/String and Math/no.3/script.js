function calculate() {
  let bottles = parseInt(document.getElementById("bottles").value);

  if (isNaN(bottles) || bottles < 0) {
    document.getElementById("output").innerHTML = "กรุณากรอกจำนวนขวดที่ถูกต้อง";
    return;
  }

  let dozen = Math.floor(bottles / 12);
  let remaining = bottles % 12;

  let price = (dozen * 100) + (remaining * 10);
  let tax = price * 0.07;
  let total = price + tax;

  document.getElementById("output").innerHTML =
    "จำนวนโหล: " + dozen + " โหล<br>" +
    "ขวดที่เหลือ: " + remaining + " ขวด<br>" +
    "ราคาน้ำแร่ก่อนภาษี: " + price.toFixed(2) + " บาท<br>" +
    "ภาษี 7%: " + tax.toFixed(2) + " บาท<br>" +
    "<strong>ราคารวมที่ต้องจ่าย: " + total.toFixed(2) + " บาท</strong>";
}