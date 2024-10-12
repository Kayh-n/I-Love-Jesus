let lastSpinTime = 0; // Track the last spin time

document.getElementById("spin-button").addEventListener("click", function () {
  const currentTime = Date.now();
  const cooldownPeriod = 5 * 60 * 1000; // 5 minutes in milliseconds

  // Check if enough time has passed since the last spin
  if (currentTime - lastSpinTime < cooldownPeriod) {
    const remainingTime = Math.ceil(
      (cooldownPeriod - (currentTime - lastSpinTime)) / 1000
    );
    alert(`Please wait ${remainingTime} seconds before spinning again.`);
    return;
  }

  // Update last spin time
  lastSpinTime = currentTime;

  const wheel = document.getElementById("wheel");
  const resultDisplay = document.querySelector(".result");

  // Clear previous result
  resultDisplay.textContent = "";

  const randomDegree = Math.floor(Math.random() * 360) + 3600; // Spin 10 full rotations + random
  wheel.style.transform = `rotate(${randomDegree}deg)`;

  // Calculate the resulting segment after a timeout
  setTimeout(() => {
    const finalDegree = randomDegree % 360; // Normalize to 0-359 degrees
    const segmentIndex = Math.floor((finalDegree + 20) / 40); // Adjust for 9 segments
    const winningText = document.querySelector(
      `.segment:nth-child(${segmentIndex + 1})`
    ).textContent; // +1 because segments are 1-indexed
    resultDisplay.textContent = `Today: "${winningText}"`; // Show the new message
  }, 4000); // Match the duration of the spin
});
