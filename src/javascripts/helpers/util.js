const printToDom = (div, textToPrint) => {
  const divId = document.getElementById(div);
  divId.innerHTML = textToPrint;
};

export default { printToDom };
