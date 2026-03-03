document.addEventListener("DOMContentLoaded", () => {
  // Page elements
  const joinButton = document.getElementById("join-button");
  const hoursElement = document.getElementById("activity-hours");
  const registrationLinkElement = document.querySelector(".register-link");

  // Modal elements
  const modal = document.getElementById("custom-modal");
  const modalMessageContainer = document.getElementById(
    "modal-message-container"
  );
  const closeButton = document.querySelector(".close-button");

  // Function to show the modal
  const showModal = (messageHtml) => {
    modalMessageContainer.innerHTML = messageHtml;
    modal.style.display = "block";
  };

  // Function to hide the modal
  const hideModal = () => {
    modal.style.display = "none";
  };

  // Event listener for the join button
  joinButton.addEventListener("click", () => {
    // Get activity data
    const hoursText = hoursElement.textContent || "0";
    const hours = parseInt(hoursText, 10);
    const linkUrl = registrationLinkElement
      ? registrationLinkElement.textContent.trim()
      : "";

    // Build the message for the modal
    let message = "";
    if (hours > 0) {
      message = `<p>คุณได้เข้าร่วมกิจกรรมแล้ว! ชั่วโมงจิตอาสาของคุณเพิ่มขึ้น ${hours} ชั่วโมง</p>`;
    } else {
      message = `<p>คุณได้เข้าร่วมกิจกรรมเรียบร้อยแล้ว!</p>`;
    }

    if (linkUrl) {
      message += `<p>ลิงก์สำหรับลงทะเบียน:</p><p><a href="${linkUrl}" target="_blank">${linkUrl}</a></p>`;
    }

    // Show the modal with the message
    showModal(message);

    // Change button state
    joinButton.textContent = "เข้าร่วมแล้ว";
    joinButton.disabled = true;
    joinButton.style.backgroundColor = "#6c757d"; // Gray color
    joinButton.style.cursor = "not-allowed";
  });

  // Event listeners to close the modal
  closeButton.addEventListener("click", hideModal);
  window.addEventListener("click", (event) => {
    if (event.target === modal) {
      hideModal();
    }
  });
});
