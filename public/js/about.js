document.addEventListener('DOMContentLoaded', () => {
  var iframe = document.getElementById("addres");

  iframe.onload = () => {
    var loader = document.querySelector('.loader');
    var loadBox = document.querySelector('.loadBox');

    loader.parentNode.removeChild(loader);
    loadBox.parentNode.removeChild(loadBox);
  }
});