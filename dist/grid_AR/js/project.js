document.addEventListener("DOMContentLoaded", function () {
  const askButtonSoft = document.querySelector("#ask-button-sof");
  askButtonSoft.addEventListener("click", (event) => {
    window.open(
      "https://wowmomodashboard.com/links/wow-momo-nutrition/",
      "_blank"
    );
  });

  const askButtonGraf = document.querySelector("#ask-button-graf");
  askButtonGraf.addEventListener("click", (event) => {
    window.open(
      "https://wowmomodashboard.com/links/wow-china-nutrition/",
      "_blank"
    );
  });

  const askButtonTur = document.querySelector("#ask-button-tur");
  askButtonTur.addEventListener("click", (event) => {
    window.open("https://www.fesc.edu.co/micrositios/turismo/", "_blank");
  });

  const askButtonMod = document.querySelector("#ask-button-mod");
  askButtonMod.addEventListener("click", (event) => {
    window.open("https://www.fesc.edu.co/micrositios/modas/", "_blank");
  });
});
