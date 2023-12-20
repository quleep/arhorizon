const { MarkerModule, Package } = ARjsStudioBackend;
let selectedImage = null;
let selectedImageGlb = "";
let websiteLink = "";
let couponCode = null;
let Discount = null;
let campaignName = null;
let email = null;

const now = new Date();
var user = localStorage.getItem("user");
console.log(user);

if (!user) {
  window.location.href = "https://arhorizon.arnxt.com/login";
} else {
  email = user;
  console.log(user);
}

function getImageSrc(img, imgLink) {
  if (selectedImage) {
    selectedImage.classList.remove("selected");
  }

  selectedImage = img;
  selectedImage.classList.add("selected");
  selectedImageGlb = imgLink;
  let selectedImageSrc = img.src;
  console.log(selectedImageSrc);
}
const publish = async () => {
  console.log("first");
  if (!window.markerImage) return alert("Please, select a marker image.");
  if (!selectedImage) return alert("Please, select a animation.");
  if (!couponCode) return alert("Please, Add Coupon Code.");
  if (!Discount) return alert("Please, add Discount.");
  if (!campaignName) return alert("Please, add Campaign Name.");

  const imgElement = document.getElementById("markerImage");
  if (imgElement) {
    imgElement.src = window.fullMarkerImage;
  }
  try {
    const markerPattern = await MarkerModule.getMarkerPattern(
      window.markerImage
    );

    window.name = JSON.stringify({
      arType: "pattern",
      assetType: window.assetType, // image/audio/video/3d
      assetFile: window.assetFile,
      assetName: window.assetName,
      assetParam: window.assetParam,
      markerPatt: markerPattern,
      markerImage: window.markerImage,
      fullMarkerImage: window.fullMarkerImage,
    });
    console.log(window.fullMarkerImage);
    const blob = new Blob([markerPattern], { type: "text/plain" });
    const file = new File([blob], "marker.patt", {
      type: "text/plain",
    });

    const formData = new FormData();
    formData.append("markerPattern", file);

    const readAsDataURL = (file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => resolve(reader.result);
        reader.onerror = reject;
        reader.readAsDataURL(file);
      });
    };

    const base64Content = await readAsDataURL(file);

    const uploadFormData = new FormData();
    const uploadFormData1 = new FormData();

    uploadFormData.append(
      `markerPattern${now.getTime().toString()}`,
      base64Content
    );
    uploadFormData1.append(
      `markerImagw${now.getTime().toString()}`,
      window.fullMarkerImage
    );
    console.log("dcd", selectedImageGlb);

    const uploadResponse = await axios.post(
      "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/file-upload",
      uploadFormData
    );
    const uploadedFileUrl = uploadResponse.data.fileUrl;
    const uploadImageResponse = await axios.post(
      "https://gsrhol3xd0.execute-api.ap-south-1.amazonaws.com/prod/image-upload",
      uploadFormData1
    );
    const uploadedImageUrl = uploadImageResponse.data.fileUrl;
    const newApplicant = {
      Id: now.getTime().toString(),
      TargetImagePattFile: uploadedFileUrl,
      TargetImageFile: uploadedImageUrl,
      AR_Link: `https://arhorizon.arnxt.com/ar/index.html?id=${now
        .getTime()
        .toString()}`,

      TargetGlbFile: selectedImageGlb,
      couponCode: couponCode,
      discountPercentage: Discount,
      campaignName: campaignName,
      email: email,
    };
    const applicantResponse = await axios.post(
      "https://3ef9gn5kk2.execute-api.ap-south-1.amazonaws.com/arnxt_prod/ar-horizon/uploadtargetimage",
      newApplicant
    );
    console.log(applicantResponse);
    console.log(applicantResponse.data.Item.Id);

    window.location.href = "#open-modal";
    let website = `https://arhorizon.arnxt.com/ar/index.html?id=${applicantResponse.data.Item.Id}`;
    if (website) {
      let divElement = document.getElementById("dynamicLinkContainer");
      // Create a new anchor element
      let anchorElement = document.createElement("a");

      // Set the attributes for the anchor element
      anchorElement.href = website;
      anchorElement.target = "_blank"; // Open in a new tab
      anchorElement.textContent = "Open Link"; // Set the link text
      divElement.appendChild(anchorElement);

      let qrcodeContainer = document.getElementById("qrcode");
      qrcodeContainer.innerHTML = "";
      new QRCode(qrcodeContainer, website);

      document.getElementById("qrcode-container").style.display = "block";
    } else {
      alert("Please enter a valid URL");
    }
  } catch (error) {
    console.error("An error occurred:", error);
  }
};
function downloadURI(uri, name) {
  var link = document.createElement("a");
  link.download = name;
  link.href = uri;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  delete link;
}

const setDefaultMarker = () => {
  const c = document.createElement("canvas");
  const img = document.querySelector(".default-marker-hidden");
  c.height = img.naturalHeight;
  c.width = img.naturalWidth;
  const ctx = c.getContext("2d");

  ctx.drawImage(img, 0, 0, c.width, c.height);
  const base64String = c.toDataURL();
  window.markerImage = base64String;

  MarkerModule.getFullMarkerImage(base64String, 0.5, 512, "black").then(
    (fullMarkerImage) => {
      window.fullMarkerImage = fullMarkerImage;
      img.remove();
    }
  );
};
function submitCampaignForm() {
  var enteredcampaignName = document.getElementById("campaignName").value;

  console.log("Selected Discount Percentage: ", enteredcampaignName);
  campaignName = enteredcampaignName;

  var selectedCampaignValue = document.getElementById("selectedCampaignValue");

  selectedCampaignValue.textContent = enteredcampaignName;

  var hiddenDiv = document.getElementById("selectedCampaignDiv");
  hiddenDiv.classList.remove("hiddenCampaign");
  location.href = "#close";
}
function submitForm() {
  var selectedDiscount = document.getElementById("format").value;

  var enteredCouponCode = document.getElementById("couponCode").value;

  console.log("Selected Discount Percentage: ", selectedDiscount);
  console.log("Entered Coupon Code: ", enteredCouponCode);
  couponCode = enteredCouponCode;
  Discount = selectedDiscount;

  var selectedDiscountValue = document.getElementById("selectedDiscountValue");
  var selectedCouponCodeValue = document.getElementById(
    "selectedCouponCodeValue"
  );
  selectedDiscountValue.textContent = selectedDiscount;
  selectedCouponCodeValue.textContent = enteredCouponCode;

  var hiddenDiv = document.getElementById("selectedDiscountDiv");
  hiddenDiv.classList.remove("hidden");
  location.href = "#close";
}
var githubButton = document
  .querySelector("page-footer")
  .shadowRoot.querySelector("#github-publish");
var zipButton = document
  .querySelector("page-footer")
  .shadowRoot.querySelector("#zip-publish");

window.assetParam = {
  scale: 1.0,
  size: {
    width: 1.0,
    height: 1.0,
    depth: 1.0,
  },
};

/**
 * Initialize the default marker image on page load.
 */
const setDefaultMarker = () => {
  const c = document.createElement("canvas");
  const img = document.querySelector(".default-marker-hidden");
  c.height = img.naturalHeight;
  c.width = img.naturalWidth;
  const ctx = c.getContext("2d");

  ctx.drawImage(img, 0, 0, c.width, c.height);
  const base64String = c.toDataURL();
  window.markerImage = base64String;

  MarkerModule.getFullMarkerImage(base64String, 0.5, 512, "black").then(
    (fullMarkerImage) => {
      window.fullMarkerImage = fullMarkerImage;
      img.remove();
    }
  );
};

const checkUserUploadStatus = () => {
  enablePageFooter(window.markerImage && window.assetFile);
};

// All the required components are uploaded by the user => footer will be enable
const enablePageFooter = (enable) => {
  if (enable) {
    githubButton.classList.remove("publish-disabled");
    zipButton.classList.remove("publish-disabled");
    githubButton.removeAttribute("disabled");
    zipButton.removeAttribute("disabled");
  } else {
    githubButton.classList.add("publish-disabled");
    zipButton.classList.add("publish-disabled");
    githubButton.setAttribute("disabled", "");
    zipButton.setAttribute("disabled", "");
  }
};

const zip = () => {
  // TODO: replace alerts with HTML error messages.
  if (!window.markerImage) return alert("please select a marker image");
  if (!window.assetType) return alert("please select the correct content type");
  if (!window.assetFile || !window.assetName)
    return alert("please upload a content");

  MarkerModule.getMarkerPattern(window.markerImage)
    .then(
      (markerPattern) =>
        new Package({
          arType: "pattern",
          assetType: window.assetType, // image/audio/video/3d
          assetFile: window.assetFile,
          assetName: window.assetName,
          assetParam: window.assetParam,
          markerPatt: markerPattern,
        })
    )
    .then((package) => package.serve({ packageType: "zip" }))
    .then((base64) => {
      // window.location = `data:application/zip;base64,${base64}`;
      // sometimes it doesn't work by use window.location directly, so change to this way
      const link = document.createElement("a");
      link.href = `data:application/zip;base64,${base64}`;
      link.download = "ar.zip";
      link.click();
    });
};

/**
 * Stores the session data and redirects to publish page.
 *
 * @param {event} event
 */
const publish = () => {
  // TODO: replace alerts with HTML error messages.
  console.log("first");
  if (!window.markerImage) return alert("Please, select a marker image.");
  if (!window.assetType)
    return alert("Please, select the correct content type.");
  if (!window.assetFile || !window.assetName)
    return alert("Please, upload a content.");

  MarkerModule.getMarkerPattern(window.markerImage).then((markerPattern) => {
    window.name = JSON.stringify({
      arType: "pattern",
      assetType: window.assetType, // image/audio/video/3d
      assetFile: window.assetFile,
      assetName: window.assetName,
      assetParam: window.assetParam,
      markerPatt: markerPattern,
      markerImage: window.markerImage,
      fullMarkerImage: window.fullMarkerImage,
    });
    window.location = "../publish";
  });
};

zipButton.addEventListener("click", zip);
githubButton.addEventListener("click", publish);
