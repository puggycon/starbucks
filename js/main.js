const searchEl = document.querySelector('.search');
const searchInputEl = searchEl.querySelector('input');

searchEl.addEventListener('click', function () {
  //Logic.. input요소를 focus 하겠다.
  searchInputEl.focus();
});

searchInputEl.addEventListener('focus', function () {
  searchEl.classList.add('focused');
  //set 지정 Attribute HTML의 속성 ('속성이름', '속성 값')
  searchInputEl.setAttribute('placeholder', '통합검색');
});

// focus의 반대 blur
searchInputEl.addEventListener('blur', function () {
  searchEl.classList.remove('focused');
  searchInputEl.setAttribute('placeholder', '');
});

/*변수 선언*/
const badgeEl = document.querySelector('header .badges');
/*window는 브라우저 창으로 이해하면 된다. scroll은 미리 지정된 이벤트*/
/*너무 많은 scroll 작업이 실행되기 때문에 이를 제어하기 위해 lodash cdn사용

    import { throttle } from 'lodash';

  const throttledFunction = throttle(function() {
    console.log('사용자가 스크롤 중...');
  }, 1000); // 1초에 한 번만 실행

  window.addEventListener('scroll', throttledFunction);
    */

window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);//scrollY로 바뀌어서 위치를 숫자로 표현
  //if 조건문
  if (window.scrollY > 500) {
    // 배지 숨기기
    // 애니메이션 라이브러리로 자연스럽게 만들기 gsap cdn 외우지 말고 필요할 때 찾아보기기
    gsap.to(badgeEl, 0.6, {
      opacity: 0,
      display: 'none'
    }); //(요소, 지속시간, 옵션(상당수가 객체 데이터 사용));
  } else {
    // 배지 보여주기
    gsap.to(badgeEl, 0.6, {
      opacity: 1,
      display: 'block'
    });
  }
}, 300));
// _.throttle(함수, 시간 300=0.3s) throttle은 제어라는 뜻

// 모두 찾기에 all로
const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function (fadeEl, index) { //(반복되는 요소 지정(원하는 이름으로 대체 가능능), 반복되는 횟수를 index로 받아 사용)
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //지연시간
    opacity: 1
  })
});


// new Swiper(선택자, 옵션{})
// new 생성자
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical', //방향
  autoplay: true, //자동재생 여부
  loop: true //반복 재생 여부부
});
new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여질 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백 px
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true, //반복으로 사용하겠다
  autoplay: {
    delay: 5000 //ms 단위 5초;
  },
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true
  },
  navigation: { //이전으로 이동, 다음으로 이동
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});

//토글 영역역
const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;//보이는 상태이니 false로 설정
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion // 특정 변수값을 반대값으로 반환해주는 코드
  if (isHidePromotion) {
    // 숨김 처리!
    promotionEl.classList.add('hide');
  } else {
    // 보임 처리!
    promotionEl.classList.remove('hide');
  }
});


// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(
    selector, // 선택자
    random(1.5, 2.5),  // 애니메이션 동작 시간
    { // 옵션
      y: size,
      repeat: -1,
      yoyo: true,
      ease: Power1.easeInOut,
      delay: random(0, delay)
    }
  );  //요소, 시간, 옵션
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', 0.5, 15);
floatingObject('.floating3', 1.5, 20);