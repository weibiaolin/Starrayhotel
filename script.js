
(function(){
  function updateHeaderOffset(){
    var header=document.querySelector('.site-header');
    if(!header) return;
    document.documentElement.style.setProperty('--header-offset', header.offsetHeight + 'px');
  }
  function scrollToHash(hash, behavior){
    if(!hash) return;
    var el=document.querySelector(hash);
    if(!el) return;
    var header=document.querySelector('.site-header');
    var offset=(header ? header.offsetHeight : 0) + 16;
    var top=el.getBoundingClientRect().top + window.pageYOffset - offset;
    window.scrollTo({top: top, behavior: behavior || 'smooth'});
  }
  window.addEventListener('load', function(){
    updateHeaderOffset();
    if(location.hash){
      setTimeout(function(){ scrollToHash(location.hash, 'auto'); }, 80);
    }
  });
  window.addEventListener('resize', updateHeaderOffset);
  document.querySelectorAll('a[href*="#"]').forEach(function(link){
    link.addEventListener('click', function(e){
      var href = link.getAttribute('href');
      if(!href) return;
      var url = new URL(href, window.location.href);
      if(url.pathname !== window.location.pathname) return;
      if(!url.hash) return;
      e.preventDefault();
      history.replaceState(null,'', url.hash);
      scrollToHash(url.hash, 'smooth');
    });
  });
})();
