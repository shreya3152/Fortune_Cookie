const fortunes = [
  "You will find happiness in unexpected places.",
  "A thrilling time is in your immediate future.",
  "Something you lost will soon turn up.",
  "Your hard work will soon pay off.",
  "Adventure awaits you this weekend.",
  "Now is a great time to try something new.",
  "A fresh start will put you on your way.",
  "Don’t let doubt stop you from achieving greatness.",
  "You will receive some great news soon!",
  "You will make someone smile today.",
  "Your dreams are closer than you think.",
  "Kindness will return to you in unexpected ways.",
  "Luck favors the brave — and you're feeling bold!",
  "Today’s challenges are tomorrow’s victories.",
  "The cookie says: take the leap!"
];

const cookieImg = document.getElementById("cookie-img");
const fortuneText = document.getElementById("fortune");
const shareBtn = document.getElementById("share-btn");
const resetBtn = document.getElementById("reset-btn");
const sound = document.getElementById("crack-sound");

let isCracked = false;

function generateFortune() {
  if (isCracked) return; // Prevent cracking again until reset

  const randomIndex = Math.floor(Math.random() * fortunes.length);
  const fortune = fortunes[randomIndex];

  sound.play();

  cookieImg.src = "assets/cookie-cracked.png";
  isCracked = true;

  fortuneText.textContent = fortune;
  shareBtn.style.display = "inline-block";
  resetBtn.style.display = "inline-block";
}

function resetCookie() {
  cookieImg.src = "assets/cookie.png";
  fortuneText.textContent = "";
  shareBtn.style.display = "none";
  resetBtn.style.display = "none";
  isCracked = false;
}

function downloadAndShare() {
  const canvas = document.getElementById("fortuneCanvas");
  const ctx = canvas.getContext("2d");

  const img = new Image();
  img.src = "assets/cookie-cracked.png";

  img.onload = () => {
    // Background
    ctx.fillStyle = "#ffeaa7";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw cookie image
    ctx.drawImage(img, 170, 20, 160, 160);

    // Draw fortune text
    ctx.fillStyle = "#2d3436";
    ctx.font = "20px Comic Sans MS";
    ctx.textAlign = "center";

    const fortune = fortuneText.textContent;
    wrapText(ctx, fortune, canvas.width / 2, 220, 400, 24);

    // Download the image
    const imageURI = canvas.toDataURL("image/png");

    const link = document.createElement("a");
    link.href = imageURI;
    link.download = "my_fortune.png";
    link.click();

    // Optional: WhatsApp share
    const message = encodeURIComponent(fortune + " 🥠");
    const whatsappURL = `https://api.whatsapp.com/send?text=${message}`;
    window.open(whatsappURL, "_blank");
  };
}

// Helper to wrap text in canvas
function wrapText(ctx, text, x, y, maxWidth, lineHeight) {
  const words = text.split(" ");
  let line = "";

  for (let n = 0; n < words.length; n++) {
    const testLine = line + words[n] + " ";
    const metrics = ctx.measureText(testLine);
    const testWidth = metrics.width;

    if (testWidth > maxWidth && n > 0) {
      ctx.fillText(line, x, y);
      line = words[n] + " ";
      y += lineHeight;
    } else {
      line = testLine;
    }
  }
  ctx.fillText(line, x, y);
}
