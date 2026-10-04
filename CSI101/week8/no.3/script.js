function checkDay() {
  // รับค่าที่ผู้ใช้กรอกมา
  const dayNumber = parseInt(document.getElementById("dayInput").value);
  const result = document.getElementById("result");

  // ตรวจสอบว่าค่าที่กรอกเป็นตัวเลขไหม
  if (isNaN(dayNumber)) {
    result.textContent = "กรุณากรอกตัวเลขระหว่าง 1 - 7";
    return;
  }

  // ใช้ switch case เพื่อเลือกวัน
  let dayName;
  switch (dayNumber) {
    case 1:
      dayName = "Monday";
      break;
    case 2:
      dayName = "Tuesday";
      break;
    case 3:
      dayName = "Wednesday";
      break;
    case 4:
      dayName = "Thursday";
      break;
    case 5:
      dayName = "Friday";
      break;
    case 6:
      dayName = "Saturday";
      break;
    case 7:
      dayName = "Sunday";
      break;
    default:
      dayName = "Wrong Day";
  }

  // แสดงผลลัพธ์
  result.textContent = `Day : ${dayName}`;
}
