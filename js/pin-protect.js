document.addEventListener("DOMContentLoaded", function () {
    const unlockBtn = document.getElementById("unlockBtn");
    const pinInput = document.getElementById("pinInput");
    const pinError = document.getElementById("pinError");
    const personalDetailsTable = document.getElementById("personalDetailsTable");
    const pinDisclaimer = document.getElementById("pinDisclaimer");
  
    // SHA-256 hash for PIN 2084
    const correctHashHex = "8032b67b62f573e47ebc2aa6cf225750b1cfcb3f33fa6575647728f9eeb0ccbb";
  
    // Show disclaimer bubble on page load with fade-in
    pinDisclaimer.style.display = "block";
    setTimeout(() => {
      pinDisclaimer.style.opacity = "1";
    }, 10);
  
    unlockBtn.addEventListener("click", async function () {
      const enteredPin = pinInput.value.trim();
  
      if (!enteredPin) return;
  
      const hashed = await sha256(enteredPin);
      if (hashed === correctHashHex) {
        pinError.style.display = "none";
  
        // Inject personal details content
        personalDetailsTable.innerHTML = `
          <table class="table table-borderless">
            <tr><td>Date of Birth:</td><td>28 April 2001</td></tr>
            <tr><td>Gender:</td><td>Female</td></tr>
            <tr><td>Nationality:</td><td>Zimbabwean</td></tr>
            <tr><td>National ID Number:</td><td>63-2709554A63</td></tr>
            <tr><td>Marital Status:</td><td>Single</td></tr>
            <tr><td>Languages:</td><td>English and Shona</td></tr>
            <tr style="font-style: italic; color: blue;"><td colspan="2">Clean Class 2 Driver's License</td></tr>
          </table>
        `;
        personalDetailsTable.style.display = "block";
        pinInput.value = "";
        document.getElementById("pinEntry").style.display = "none";
  
        // Fade out disclaimer bubble
        pinDisclaimer.style.opacity = "0";
        setTimeout(() => {
          pinDisclaimer.style.display = "none";
        }, 500);
  
      } else {
        pinError.style.display = "block";
      }
    });
  
    async function sha256(str) {
      const encoder = new TextEncoder();
      const data = encoder.encode(str);
      const hashBuffer = await crypto.subtle.digest("SHA-256", data);
      const hashArray = Array.from(new Uint8Array(hashBuffer));
      const hashHex = hashArray.map(b => b.toString(16).padStart(2, "0")).join("");
      return hashHex;
    }
  });
