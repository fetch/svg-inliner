(function(){

  function loadSvg(src, callback){
    var xmlhttp = new XMLHttpRequest();

    xmlhttp.onreadystatechange = function(){
      if(xmlhttp.readyState == 4){
        if(xmlhttp.status == 200){
          callback(xmlhttp.responseText, xmlhttp);
        }else{
          console.log('Could not load ' + src);
        }
      }
    };
    xmlhttp.open('GET', src, true);
    xmlhttp.send();
  }

  function inlineSvg(el){
    var src = el.src
      , id = el.id || false
      , className = el.className.replace(/(^| )inline-svg( |$)/, '$1inlined-svg$2');

    var tmp = document.createElement('div');
    var svg, parent;

    loadSvg(src, function(responseText, xmlhttp){
      tmp.innerHTML = responseText;
      svg = tmp.firstChild;
      if(id){
        svg.setAttribute('id', id);
      }
      svg.setAttribute('class', className);

      try {
        el.parentNode.replaceChild(svg, el);
      }catch(e){
        el.className.replace(/(^| )inline-svg( |$)/, '$1inline-svg-failed$2');
      }
    });
  }

  var elements = document.querySelectorAll('.inline-svg');
  var i, el;
  for(i = 0; i < elements.length; i++){
    el = elements.item(i);
    inlineSvg(el);
  }

}());
