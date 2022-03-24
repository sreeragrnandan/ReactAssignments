const EditCaretPositioning: any = {};
// let saveSelection, restoreSelection;
export default EditCaretPositioning;
if (window.getSelection && document.createRange) {
  EditCaretPositioning.saveSelection = (
    containerEl: EventTarget & HTMLDivElement
  ) => {
    var range = window.getSelection()!.getRangeAt(0);
    var preSelectionRange = range.cloneRange();
    preSelectionRange.selectNodeContents(containerEl);
    preSelectionRange.setEnd(range.startContainer, range.startOffset);
    var start = preSelectionRange.toString().length;

    return {
      start: start,
      end: start + range.toString().length,
    };
  };

  // let saveSelection, restoreSelection;
  EditCaretPositioning.restoreSelection = function (
    // containerEl: (EventTarget & HTMLDivElement) & Node,
    containerEl: any,

    savedSel: {
      start: number;
      end: number;
    }
  ) {
    console.log(
      "From restoreSelection",
      "containerEl ",
      containerEl,
      "savedSel ",
      savedSel
    );
    var charIndex = 0,
      range = document.createRange();
    range.setStart(containerEl, 0);
    range.collapse(true);
    var nodeStack = [containerEl],
      node,
      foundStart = false,
      stop = false;

    while (!stop && (node = nodeStack.pop())) {
      if (node.nodeType === 3) {
        var nextCharIndex = charIndex + node.innerText.length;
        if (
          !foundStart &&
          savedSel.start >= charIndex &&
          savedSel.start <= nextCharIndex
        ) {
          range.setStart(node, savedSel.start - charIndex);
          foundStart = true;
        }
        if (
          foundStart &&
          savedSel.end >= charIndex &&
          savedSel.end <= nextCharIndex
        ) {
          range.setEnd(node, savedSel.end - charIndex);
          stop = true;
        }
        charIndex = nextCharIndex;
      }
      //   else {
      //     var i = node.childNodes.length;
      //     while (i--) {
      //       nodeStack.push(node.childNodes[i]);
      //     }
      //   }
    }

    var sel = window.getSelection();
    if (sel) {
      sel.removeAllRanges();
      sel.addRange(range);
    }
  };
}
// else if (document.getSelection()) {
//   saveSelection = function (containerEl: EventTarget & HTMLDivElement) {
//     var selectedTextRange = document.createRange();
//     selectedTextRange.removeAllRanges();
//     var preSelectionTextRange = containerEl.createTextRange();
//     preSelectionTextRange.moveToElementText(containerEl);
//     preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
//     var start = preSelectionTextRange.text.length;

//     return {
//       start: start,
//       end: start + selectedTextRange.text.length,
//     };
//   };

//   restoreSelection = function (
//     containerEl: EventTarget & HTMLDivElement,
//     savedSel: any,
//     inputAreaRef: HTMLDivElement
//   ) {
//     const selection = window.getSelection();
//     const range = document.createRange();
//     selection.removeAllRanges();

//     var textRange = inputAreaRef.createTextRange();
//     textRange.moveToElementText(containerEl);
//     textRange.collapse(true);
//     textRange.moveEnd("character", savedSel.end);
//     textRange.moveStart("character", savedSel.start);
//     textRange.select();
//   };
// }
// const EditCaretPositioning: any = {};

// export default EditCaretPositioning;

// if (window.getSelection && document.createRange) {
//   //saves caret position(s)
//   EditCaretPositioning.saveSelection = function (
//     containerEl: EventTarget & HTMLDivElement
//   ) {
//     var range = window.getSelection()!.getRangeAt(0);
//     var preSelectionRange = range.cloneRange();
//     preSelectionRange.selectNodeContents(containerEl);
//     preSelectionRange.setEnd(range.startContainer, range.startOffset);
//     var start = preSelectionRange.toString().length;

//     return {
//       start: start,
//       end: start + range.toString().length,
//     };
//   };
//   //restores caret position(s)
//   EditCaretPositioning.restoreSelection = function (
//     containerEl: HTMLDivElement,
//     savedSel: any
//   ) {
//     var charIndex = 0,
//       range = document.createRange();
//     range.setStart(containerEl, 0);
//     range.collapse(true);
//     var nodeStack = [containerEl],
//       node,
//       foundStart = false,
//       stop = false;

//     while (!stop && (node = nodeStack.pop())) {
//       if (node.nodeType === 3) {
//         var nextCharIndex = charIndex + node.innerText.length;
//         if (
//           !foundStart &&
//           savedSel.start >= charIndex &&
//           savedSel.start <= nextCharIndex
//         ) {
//           range.setStart(node, savedSel.start - charIndex);
//           foundStart = true;
//         }
//         if (
//           foundStart &&
//           savedSel.end >= charIndex &&
//           savedSel.end <= nextCharIndex
//         ) {
//           range.setEnd(node, savedSel.end - charIndex);
//           stop = true;
//         }
//         charIndex = nextCharIndex;
//       }
//       //   else {
//       //     var i = node.childNodes.length;
//       //     while (i--) {
//       //       nodeStack.push(node.childNodes[i]);
//       //     }
//       //   }
//     }

//     var sel = window.getSelection();
//     if (sel) {
//       sel.removeAllRanges();
//       sel.addRange(range);
//     }
//   };
// } else if (document.getSelection() && document.createRange()) {
//   //saves caret position(s)
//   EditCaretPositioning.saveSelection = function (
//     containerEl: EventTarget & HTMLDivElement
//   ) {
//     var selectedTextRange = document.getSelection()!;
//     var preSelectionTextRange = document.createRange();
//     preSelectionTextRange.selectNode(containerEl);
//     preSelectionTextRange.moveToElementText(containerEl);
//     preSelectionTextRange.setEndPoint("EndToStart", selectedTextRange);
//     var start = preSelectionTextRange.text.length;

//     return {
//       start: start,
//       end: start + selectedTextRange.text.length,
//     };
//   };
//   //restores caret position(s)
//   EditCaretPositioning.restoreSelection = function (
//     containerEl: HTMLDivElement,
//     savedSel: any
//   ) {
//     let textRange = document.body.createTextRange();
//     textRange.moveToElementText(containerEl);
//     textRange.collapse(true);
//     textRange.moveEnd("character", savedSel.end);
//     textRange.moveStart("character", savedSel.start);
//     textRange.select();
//   };
// }
