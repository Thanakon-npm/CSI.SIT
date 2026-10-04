function calculateBMI() {
  const weight = parseInt(document.getElementById("weight").value);
  const height = parseInt(document.getElementById("height").value);

  if (isNaN(weight) || isNaN(height) || weight <= 0 || height <= 0) {
    document.getElementById("result").innerText = "กรุณากรอกข้อมูลให้ถูกต้อง";
    return;
  }

  const heightM = height / 100;
  const bmi = weight / (heightM * heightM);
  let category = "";

  if (bmi < 18.5) {
    category = "น้ำหนักน้อย";
  } else if (bmi < 23) {
    category = "น้ำหนักปกติ";
  } else if (bmi < 25) {
    category = "น้ำหนักเกิน";
  } else if (bmi < 30) {
    category = "อ้วนระดับ 1";
  } else {
    category = "อ้วนระดับ 2";
  }

  document.getElementById(
    "result"
  ).innerText = `ค่าดัชนีมวลกายของคุณคือ ${bmi.toFixed(2)} (${category})`;
}
