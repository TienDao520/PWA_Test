const elements = {
  h1: document.querySelector("h1"),
  titleInput: document.querySelector("#title"),
  textInput: document.querySelector("#text"),
  urlInput: document.querySelector("#url"),
  fileInput: document.querySelector("#files"),
  shareBtn: document.querySelector("#share"),
  shareFilesBtn: document.querySelector("#shareFiles"),
};

if (window.location.href.includes("article")) {
  const parseURL = new URL(window.location);
  console.log("parseURL: " + parseURL);
  const protocolURL = parseURL.searchParams.get("id");
  console.log("protocolURL: " + protocolURL);
  const articleId = protocolURL.replace("web+pwa://", "").replace("/", "");
  console.log("articleId: " + articleId);
  document.querySelector("h1").innerHTML = `Article Id: ${articleId}`;
  //https://dev.localhost/article/?id=web+pwa://a323123/
}

const onShare = async () => {
  const title = elements.titleInput.value;
  const text = elements.textInput.value;
  const url = elements.urlInput.value;

  try {
    if (navigator.share) {
      await navigator.share({
        title,
        text,
        url,
        //it is the same with key:value
        //title:title, text:text, url:url
      });
      console.log("Opened share sheet successfully", { title, text, url });
    }
  } catch (err) {
    console.error(`Could not open share dialog`, err);
  }
};

const onShareFile = async () => {
  const title = elements.titleInput.value;
  const text = elements.textInput.value;
  const url = elements.urlInput.value;
  const files = elements.fileInput.files;
  try {
    if (navigator.canShare && navigator.canShare({ files: [] })) {
      await navigator.share({
        title,
        text,
        files,
      });
      console.log("Opened share sheet successfully", { title, text, files });
    } else {
    }
  } catch (err) {
    console.error("Could not open share dialog", err);
  }
};

elements.shareBtn.addEventListener("click", onShare);
elements.shareFilesBtn.addEventListener("click", onShareFile);
