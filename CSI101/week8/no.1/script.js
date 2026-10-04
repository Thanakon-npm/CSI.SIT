function calculateTicket() {
  const height = parseFloat(document.getElementById("height").value);
  const result = document.getElementById("result");

  if (isNaN(height) || height <= 0) {
    result.textContent = "กรุณากรอกส่วนสูงให้ถูกต้อง";
    return;
  }

  let price;
  if (height <= 130) {
    price = 50;
  } else {
    price = 100;
  }

  result.textContent = `ค่าบัตรผ่านประตูคือ ${price} บาท`;
}
