document.getElementsByClassName('btn')[0].onclick = ()=>{

    let flask =  document.getElementById('flask');
    let lang =  document.getElementById('lang');

    localStorage.clear();
    localStorage.setItem("flask",flask.value)
    localStorage.setItem("lang",lang.value)

    location.href = './reaction.html'
 
    
}