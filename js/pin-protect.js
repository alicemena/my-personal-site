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
  
        // Inject personal details content with styling
        personalDetailsTable.innerHTML = `
          <div class="card shadow-sm p-3 mb-4 rounded" style="animation: fadeIn 0.5s ease-in-out;">
            <h5 class="mb-3">Personal Details</h5>
            <table class="table table-borderless">
              <tr><td><strong>Date of Birth:</strong></td><td>28 April 2001</td></tr>
              <tr><td><strong>Gender:</strong></td><td>Female</td></tr>
              <tr><td><strong>Nationality:</strong></td><td>Zimbabwean</td></tr>
              <tr><td><strong>National ID Number:</strong></td><td>63-2709554A63</td></tr>
              <tr><td><strong>Marital Status:</strong></td><td>Single</td></tr>
              <tr><td><strong>Languages:</strong></td><td>English and Shona</td></tr>
              <tr style="font-style: italic; color: blue;"><td colspan="2">Clean Class 2 Driver's License</td></tr>
            </table>
          </div>
        `;
        personalDetailsTable.style.display = "block";
        pinInput.value = "";
        document.getElementById("pinEntry").style.display = "none";
  
        // Fade out disclaimer
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
