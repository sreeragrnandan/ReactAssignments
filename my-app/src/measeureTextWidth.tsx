export const measureText = (
  pText: string | null,
  pFontSize: string,
  pStyle: CSSStyleDeclaration | null
) => {
  var lDiv = document.createElement("div");

  document.body.appendChild(lDiv);

  if (pStyle != null) {
    lDiv.style.border = "1px solid #999;";
    lDiv.style.padding = "0.5rem";
    lDiv.style.width = "300px";
  }
  lDiv.style.fontSize = "" + pFontSize + "px";
  lDiv.style.position = "absolute";
  lDiv.style.left = "-1000";
  lDiv.style.top = "-1000";

  lDiv.textContent = pText;

  var lResult = {
    width: lDiv.clientWidth,
    height: lDiv.clientHeight,
  };

  document.body.removeChild(lDiv);

  return lResult;
};
