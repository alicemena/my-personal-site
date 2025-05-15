async function hashPin(pin) {
    const encoder = new TextEncoder();
    const data = encoder.encode(pin);
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);
    return Array.from(new Uint8Array(hashBuffer))
      .map(b => b.toString(16).padStart(2, '0'))
      .join('');
  }
  
  async function checkPin(pin) {
    const correctHash = "8032b67b62f573e47ebc2aa6cf225750b1cfcb3f33fa6575647728f9eeb0ccbb"; // hash of '2084'
    if (!pin) return false;
    const hashedInput = await hashPin(pin);
    return hashedInput === correctHash;
  }
  
  document.addEventListener("DOMContentLoaded", () => {
    const modal = document.getElementById("pinModal");
    const pinInput = document.getElementById("pinInput");
    const submitBtn = document.getElementById("submitPin");
  
    // Lock scroll and show modal
    document.body.classList.add("modal-open");
    document.body.style.display = "block";
    modal.style.display = "flex";
    pinInput.focus();
  
    submitBtn.addEventListener("click", async () => {
      const pin = pinInput.value.trim();
      if (!pin) {
        alert("Please enter the PIN or contact the page owner.");
        return;
      }
  
      const isValid = await checkPin(pin);
      if (isValid) {
        modal.style.display = "none";
        document.body.classList.remove("modal-open");
      } else {
        alert("Incorrect PIN. Please try again or contact the page owner.");
        pinInput.value = "";
        pinInput.focus();
      }
    });
  
    pinInput.addEventListener("keydown", async (e) => {
      if (e.key === "Enter") {
        submitBtn.click();
      }
    });
  });