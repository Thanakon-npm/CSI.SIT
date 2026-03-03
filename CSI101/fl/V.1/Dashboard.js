document
  .getElementById("loginForm")
  .addEventListener("submit", function (event) {
    // ป้องกันการ Submit ฟอร์มแบบปกติ (ไม่ให้หน้า Reload)
    event.preventDefault();

    // *** ที่นี่จะเป็นจุดที่คุณเขียนโค้ดตรวจสอบ Username/Password ***
    // สมมติว่าตรวจสอบผ่านแล้ว

    // สั่งให้เปลี่ยนหน้าไปที่ Dashboard.html
    window.location.href = "Dashboard.html";
  });

document.addEventListener("DOMContentLoaded", () => {
  // 1. กำหนดค่า
  const percentage = 70; // เปอร์เซ็นต์ที่ต้องการแสดง
  const maxHours = 72; // ชั่วโมงสูงสุด
  const currentHours = 70; // ชั่วโมงปัจจุบัน (ในกรณีนี้คือ 70)

  // 2. อ้างอิง Element
  const progressCircle = document.querySelector(".circular-progress .fg");
  const percentageText = document.querySelector(".percentage");
  const hoursText = document.querySelector(".hours-text");

  // 3. คำนวณค่าทางคณิตศาสตร์ (สำหรับ Progress Bar)
  const radius = 60; // รัศมี r="60" จาก HTML
  const circumference = 2 * Math.PI * radius; // สูตร 2 * pi * r

  // คำนวณค่า Offset: เส้นรอบวงทั้งหมด ลบด้วย ส่วนของเส้นที่ต้องแสดง
  // (100% - 70%) * circumference = 30% ที่ซ่อนอยู่
  const offset = circumference - (percentage / 100) * circumference;

  // 4. อัปเดต SVG
  progressCircle.style.strokeDasharray = circumference; // กำหนดความยาวเส้นรอบวงเต็ม
  progressCircle.style.strokeDashoffset = offset; // ซ่อนเส้นไป 30%

  // 5. อัปเดตข้อความ
  percentageText.textContent = `${percentage}%`;
  hoursText.textContent = `${currentHours} / ${maxHours} Hours`;

  console.log(`Progress Bar initialized: ${percentage}%`);

  // ----------------------------------------------------
  // 2. Logic for Activity Card Progress (Optional but good for completeness)
  // ----------------------------------------------------
  const activityCards = document.querySelectorAll(".activity-card");

  activityCards.forEach((card) => {
    const current = parseInt(card.getAttribute("data-current"));
    const max = parseInt(card.getAttribute("data-max"));
    const progressBar = card.querySelector(".progress-bar");
    const progressText = card.querySelector(".progress-text");
    const joinButton = card.querySelector(".join-button");

    // อัปเดต Progress Text
    if (progressText) {
      progressText.textContent = `${current}/${max}`;
    }

    // อัปเดต Progress Bar (ถ้ามี)
    if (progressBar) {
      const widthPercent = (current / max) * 100;
      progressBar.style.width = `${widthPercent}%`;
    }

    // จัดการปุ่มเมื่อกิจกรรมเต็ม
    if (current >= max) {
      card.classList.add("full-card");
      joinButton.textContent = "Full";
      joinButton.classList.add("full-button");
      joinButton.disabled = true;
    }
  });
});
