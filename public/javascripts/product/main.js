var btnNext = document.querySelector(".carousel-btn-next");
var btnPrev = document.querySelector(".carousel-btn-prev");
var carousel_slice_imgs =
  document.getElementsByClassName("carousel-slice")[0].children;

let imgLength = carousel_slice_imgs.length;

let carouseldot = document.querySelector(".carousel-dot");
for (let i = 0; i < imgLength; i++) {
  let carousel_dot_item = document.createElement("div");
  carousel_dot_item.classList.add("carousel-dot-item");

  carousel_dot_item.setAttribute('onclick',`callF(${i*100})`)
  carouseldot.append(carousel_dot_item);
}

{
  let persent = "0";
  let count = 0;
  setInterval(function () {
    carousel_slice_imgs[0].style.marginLeft = persent + "%";
    persent = (Number(persent) + -100).toString();
    for (let i = 0; i < imgLength; i++) {
      carouseldot.children[i].className = carouseldot.children[i].className.replace("red", "");
    }
    carouseldot.children[count].className += " red";
    count++;
    if (count > imgLength - 1) {
      count = 0;
      persent = "0";
    }
  }, 10000);

}

//dot function
function callF(n){
     
     for (let i = 0; i < imgLength; i++) {
      carouseldot.children[i].className = carouseldot.children[i].className.replace("red", "");
    }
    carouseldot.children[Number(n)/100].className += " red";
    carousel_slice_imgs[0].style.marginLeft = `-${n}%`
}


function pushSlice(n){
  let number = carousel_slice_imgs[0].style.marginLeft.replace("%", "");
   if(n==1) 
   {
      if (carousel_slice_imgs[0].style.marginLeft) {
       // 0 -100 -200 -300 -400   500
        if( Number(number)*-1 >=(imgLength-1)*100)
        {
          callF(0)
          return;
        }
        callF((Number(number)*-1)+100)
      }
    }
    else
    {
      if (carousel_slice_imgs[0].style.marginLeft)
      {
        if( Number(number)*-1 <= 0 )
        {
          callF((imgLength-1)*100)
          return;
        }
        callF((Number(number)*-1)-100)
      }
    }

 
}





let stardust_tabs_header = document.querySelectorAll('.stardust-tabs-header li')
let stardust_tabs_header_a = document.getElementsByClassName('stardust-tabs-header__link')




for (let i = 0; i < stardust_tabs_header_a.length; i++) {
  stardust_tabs_header_a[i].onclick = (e) => {
    for (let j = 0; j < stardust_tabs_header_a.length; j++) {
      stardust_tabs_header_a[j].classList.remove("active");
    }
    e.preventDefault()
    e.target.classList.add("active");
    
  };
}
// for(let i = 0 ; i < stardust_tabs_header_a.length ; i++)
// {
//   stardust_tabs_header_a[i].addEventListener('click',e => {
//     e.stopPropagation()
//     e.preventDefault()
//   })
// }