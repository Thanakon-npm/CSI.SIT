function calculateIncome() {
  // รับค่าจาก input
  const salary = parseFloat(document.getElementById("salary").value);
  const commission = parseFloat(document.getElementById("commission").value);
  const income = parseFloat(document.getElementById("income").value);

  const resultDiv = document.getElementById("result");

  // ตรวจสอบว่าผู้ใช้กรอกข้อมูลถูกต้องหรือไม่
  if (isNaN(salary) || isNaN(commission) || isNaN(income)) {
    resultDiv.textContent = "กรุณากรอกข้อมูลให้ครบถ้วนและเป็นตัวเลข";
    return;
  }

  // คำนวณรายได้รวม
  const totalIncome = salary + commission + income;

  // ตัวอย่างเงื่อนไขโบนัส 
  let bonus = 0;
  if (salary <= 10000) {
    bonus = 0.02 * totalIncome; // โบนัส 2%
  } else if (salary > 10000 && salary <= 20000) {
    bonus = 0.05 * totalIncome; // โบนัส 5%
  } else {
    bonus = 0.1 * totalIncome; // โบนัส 10%
  }

  // แสดงผล
  resultDiv.innerHTML = `
    เงินเดือน: ${salary.toFixed(2)} บาท <br>
    ค่านายหน้า: ${commission.toFixed(2)} บาท <br>
    รายได้อื่น ๆ: ${income.toFixed(2)} บาท <br>
    <strong>รายได้รวม: ${totalIncome.toFixed(2)} บาท</strong><br>
    <strong>โบนัส: ${bonus.toFixed(2)} บาท</strong>
  `;
}
