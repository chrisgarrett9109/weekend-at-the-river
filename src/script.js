import 'core-js/stable';
import 'regenerator-runtime/runtime';

('use strict');

// image slider variables
const slide = Array.from(document.querySelectorAll(`.slide`));
const sliderLeftBtn = document.querySelector(`.btn-slider-left`);
const sliderRightBtn = document.querySelector(`.btn-slider-right`);
const sliderDots = document.querySelector(`.slider-dots`);

// image modal variables
const slider = document.querySelector(`.slider`);
const modal = document.querySelector(`.modal`);
const modalImg = document.querySelector(`.modal-img`);
const modalContainer = document.querySelector(`.modal-img-container`);
const btnModalClose = document.querySelector(`.btn-modal-close`);
const btnModalNext = document.querySelector(`.btn-modal-right`);
const btnModalPrev = document.querySelector(`.btn-modal-left`);
const overlay = document.querySelector(`.overlay`);

// calendar variables
const monthYearHeading = document.querySelector(`.month-year-heading`);
const dayHeading = document.querySelectorAll(`.day-heading`);
const calendarTable = document.querySelectorAll(`td`);
const daysArr = Array.from(document.querySelectorAll('td'));
const btnCalendarLeft = document.querySelector(`.btn-calendar-left`);
const btnCalendarRight = document.querySelector(`.btn-calendar-right`);
const btnCalendarJump = document.querySelector(`.btn-jump`);
const monthSelect = document.querySelector(`.month-select`);
const yearSelect = document.querySelector(`.year-select`);

////////////////////////////
//      IMAGE SLIDER
////////////////////////////
{
  // aligns slides on page with slight gap
  const setSlider = function () {
    slide.forEach(
      (s, i) => (s.style.transform = `translateX(${100 * i + 10 * i}%)`)
    );
  };
  setSlider();

  // creates pagination dot for each slide
  const createDots = function () {
    slide.forEach(function (_, i) {
      sliderDots.insertAdjacentHTML(
        `beforeend`,
        `<div class="slider-dot" data-slide="${i}" data-src="${slide[i].dataset.src}"></div>`
      );
    });
  };
  createDots();
  const sliderDot = Array.from(document.querySelectorAll(`.slider-dot`));

  let curSlide = 0;
  const maxSlide = slide.length;
  const win23 = window.matchMedia('(max-width: 23em)'); // 368px
  const win63 = window.matchMedia('(max-width: 63em)'); // 1008px
  const win75 = window.matchMedia('(max-width: 75em)'); // 1200px
  const win88 = window.matchMedia('(max-width: 88em)'); // 1408px
  const win101 = window.matchMedia('(max-width: 101em)'); // 1616px
  const win115 = window.matchMedia('(max-width: 115em)'); // 1840px
  const win128 = window.matchMedia('(max-width: 128em)'); // 2048px

  //Media query variables... inline necessary for slider

  // moves each slide over to the left 100% width
  const slideNext = function () {
    if (win23.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 2;
      } else {
        curSlide--;
      }
    } else if (win63.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 3;
      } else {
        curSlide--;
      }
    } else if (win75.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 4;
      } else {
        curSlide--;
      }
    } else if (win88.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 5;
      } else {
        curSlide--;
      }
    } else if (win101.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 6;
      } else {
        curSlide--;
      }
    } else if (win115.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 7;
      } else {
        curSlide--;
      }
    } else if (win128.matches) {
      if (curSlide === 0) {
        curSlide = maxSlide - 8;
      } else {
        curSlide--;
      }
    } else curSlide === 0 ? (curSlide = maxSlide - 4) : curSlide--;
    slide.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${
          100 * (i - curSlide * 1.1) + 10 * i
        }%)`)
    );
  };

  // moves each slide over to the right 100% width
  const slidePrev = function () {
    if (win23.matches) {
      if (curSlide === maxSlide - 2) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win63.matches) {
      if (curSlide === maxSlide - 3) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win75.matches) {
      if (curSlide === maxSlide - 4) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win88.matches) {
      if (curSlide === maxSlide - 5) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win101.matches) {
      if (curSlide === maxSlide - 6) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win115.matches) {
      if (curSlide === maxSlide - 7) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else if (win128.matches) {
      if (curSlide === maxSlide - 8) {
        curSlide = 0;
      } else {
        curSlide++;
      }
    } else curSlide === maxSlide - 4 ? (curSlide = 0) : curSlide++;
    slide.forEach(
      (s, i) =>
        (s.style.transform = `translateX(${
          100 * (i - curSlide * 1.1) + 10 * i
        }%)`)
    );
  };
  sliderRightBtn.addEventListener(`click`, slideNext);
  sliderLeftBtn.addEventListener(`click`, slidePrev);

  // ////////////////////////////
  // //       IMAGE MODAL
  // ////////////////////////////

  // Open modal
  const openImgModal = function (e) {
    e.preventDefault();
    let curDot = 0;
    if (
      e.target.classList.contains(`slide`) ||
      e.target.classList.contains(`slider-dot`)
    ) {
      modal.classList.remove(`hidden`);
      overlay.classList.remove(`hidden`);
    }
    sliderDot.forEach((d, i) => {
      if (e.target.dataset.src.includes(sliderDot[i].dataset.src)) {
        modalImg.src = sliderDot[i].dataset.src;
        curDot = +sliderDot[i].dataset.slide;
      }
    });

    // move to next picture
    const lastDot = sliderDot.length - 1;
    const modalNext = function () {
      curDot === lastDot ? (curDot = 0) : curDot++;
      modalImg.src = sliderDot[curDot].dataset.src;
    };

    // move to previous picture
    const modalPrev = function () {
      curDot === 0 ? (curDot = lastDot) : curDot--;
      modalImg.src = sliderDot[curDot].dataset.src;
    };

    btnModalNext.addEventListener(`click`, modalNext);
    document.addEventListener(`keydown`, function (e) {
      if (e.key === `ArrowRight` && !modal.classList.contains(`hidden`))
        modalNext();
    });
    btnModalPrev.addEventListener(`click`, modalPrev);
    document.addEventListener(`keydown`, function (e) {
      if (e.key === `ArrowLeft` && !modal.classList.contains(`hidden`))
        modalPrev();
    });
  };
  // Close modal
  const closeImgModal = function () {
    modal.classList.add(`hidden`);
    overlay.classList.add(`hidden`);
  };

  slider.addEventListener(`click`, openImgModal);
  sliderDots.addEventListener(`click`, openImgModal);
  btnModalClose.addEventListener(`click`, closeImgModal);
  // close modal with Esc key
  document.addEventListener(`keydown`, function (e) {
    if (e.key === `Escape` && !modal.classList.contains(`hidden`))
      closeImgModal();
  });
}

// //////////////////////////
//        CALENDAR
// //////////////////////////
{
  const days = [`Sun`, `Mon`, `Tue`, `Wed`, `Thu`, `Fri`, `Sat`];
  const months = [
    `January`,
    `February`,
    `March`,
    `April`,
    `May`,
    `June`,
    `July`,
    `August`,
    `September`,
    `October`,
    `November`,
    `December`,
  ];

  const currentMonthIndex = new Date().getMonth();
  const currentMonth = months[currentMonthIndex];
  const currentYear = new Date().getFullYear();

  // sets month and year in calendar head
  const loadCalendarHeadings = function () {
    monthYearHeading.textContent = `${currentMonth} ${currentYear}`;
    dayHeading.forEach((el, i) => (el.textContent = days[i]));
  };
  loadCalendarHeadings();

  // returns an array with [[year], [month], [# of days]] (in specified month/year)
  const daysInMonth = function (monthIndex, year) {
    let monthDays = Array.from(
      { length: new Date(year, monthIndex, 0).getDate() },
      (_, k) => k + 1
    );
    return [year, months[monthIndex - 1], monthDays];
  };

  // returns first day (`Sun` - `Sat`) in specified month/year
  const getFirstDay = function (monthIndex, year) {
    return new Date(year, monthIndex, 1).toString().split(' ')[0];
  };

  // returns index of first day (0-6) in specified month/year
  const getDayIndex = function (monthIndex, year) {
    let firstIndex = daysInMonth(monthIndex, year);
    return days.indexOf(
      getFirstDay(months.indexOf(firstIndex[1]), firstIndex[0])
    );
  };

  // fills calendar based on # of days in month and 1st day index
  const fillCalendarMonth = function (
    monthIndex = currentMonthIndex + 1,
    year = currentYear
  ) {
    let insertMonth = daysInMonth(monthIndex, year); // insertMonth = [[year], [month], [# of days]]
    let insertDays = insertMonth[2];
    let today = new Date().getDate();

    daysArr.forEach(function (el, i) {
      el.innerHTML = insertDays[i - getDayIndex(monthIndex, year)]; // starting calendar fill at index of first day
      if (el.innerHTML === `undefined`) {
        // adapting css styles to each new month
        el.innerHTML = ``;
        el.classList.add(`no-fill`);
        el.classList.remove(`available`);
      } else {
        el.classList.add(`available`);
        el.classList.remove(`no-fill`);
      }
    });
    const addBooking = function ([month, year, startDay, endDay]) {
      daysArr.forEach(el => {
        if (
          month === insertMonth[1] &&
          year === insertMonth[0] &&
          startDay <= +el.innerHTML &&
          endDay >= +el.innerHTML
        )
          el.textContent += `  `;
        if (el.textContent.includes(`  `)) el.classList.add(`booked`);
        if (!el.textContent.includes(`  `)) el.classList.remove(`booked`);
      });
      daysArr.filter(el => {
        // highlighting current day
        if (
          +el.innerText === today &&
          insertMonth[1] === currentMonth &&
          insertMonth[0] === currentYear
        ) {
          el.classList.add('current-day');
        } else {
          el.classList.remove(`current-day`);
        }
      });
    };

    /////////////////////////////
    //ADD CALENDAR BOOKINGS HERE
    /////////////////////////////
<<<<<<< HEAD
    addBooking([`October`, 2021, 1, 6]);
    addBooking([`November`, 2021, 12, 17]);
    addBooking([`September`, 2021, 17, 22]);
    addBooking([`January`, 2022, 1, 31]);
    addBooking([`February`, 2022, 1, 28]);
    addBooking([`March`, 2022, 1, 31]);
    addBooking([`April`, 2022, 24, 30]);
    addBooking([`May`, 2022, 1, 5]);
    addBooking([`May`, 2022, 20, 25]);
    addBooking([`July`, 2022, 1, 5]);
    addBooking([`July`, 2022, 10, 15]);
    addBooking([`July`, 2022, 20, 24]);
    addBooking([`August`, 2022, 7, 12]);
=======
    addBooking([`September`, 2021, 17, 22]);
      addBooking([`October`, 2021, 1, 6]);
    addBooking([`November`, 2021, 12, 17]);

    addBooking([`January`, 2022, 1, 31]);
    addBooking([`February`, 2022, 1, 28]);
    addBooking([`March`, 2022, 1, 31]);
    addBooking([`April`, 2022, 24, 28]);
>>>>>>> ddf8613a71fb280ae0ac336bf614774c362bde01
  };
  fillCalendarMonth();

  let curMonth = months.indexOf(currentMonth);
  let curYear = currentYear;

  const calendarNext = function () {
    if (curMonth === 11) {
      curYear += 1;
      curMonth = 0;
      fillCalendarMonth(curMonth + 1, curYear);
    } else {
      curMonth += 1;
      fillCalendarMonth(curMonth + 1, curYear);
    }
    monthYearHeading.textContent = `${months[curMonth]} ${curYear}`;
  };
  const calendarPrevious = function () {
    if (curMonth === 0) {
      curYear -= 1;
      curMonth = 11;
      fillCalendarMonth(curMonth + 1, curYear);
    } else {
      curMonth -= 1;
      fillCalendarMonth(curMonth + 1, curYear);
    }
    monthYearHeading.textContent = `${months[curMonth]} ${curYear}`;
  };

  // jumps to selected month/year
  // does nothing if no selection for either month or year
  const calendarJump = function () {
    const jumpMonth = months.indexOf(monthSelect.value);
    const jumpYear = +yearSelect.value;
    if (monthSelect.value === `default` || yearSelect.value === `default`)
      return;
    else fillCalendarMonth((curMonth = jumpMonth) + 1, (curYear = jumpYear));
    monthYearHeading.textContent = `${months[jumpMonth]} ${jumpYear}`;
  };

  btnCalendarRight.addEventListener(`click`, calendarNext);
  btnCalendarLeft.addEventListener(`click`, calendarPrevious);
  btnCalendarJump.addEventListener(`click`, calendarJump);
}

///////////////////////////////////////////////////////////
// Fixing flexbox gap property missing in some Safari versions
function checkFlexGap() {
  var flex = document.createElement('div');
  flex.style.display = 'flex';
  flex.style.flexDirection = 'column';
  flex.style.rowGap = '1px';

  flex.appendChild(document.createElement('div'));
  flex.appendChild(document.createElement('div'));

  document.body.appendChild(flex);
  var isSupported = flex.scrollHeight === 1;
  flex.parentNode.removeChild(flex);

  if (!isSupported) document.body.classList.add('no-flexbox-gap');
}
checkFlexGap();

///////////////////////////////////////////////////////////
// Smooth scrolling animation
const allLinks = document.querySelectorAll('a:link');

allLinks.forEach(function (link) {
  link.addEventListener('click', function (e) {
    e.preventDefault();
    const href = link.getAttribute('href');

    // Scroll back to top
    if (href === '#')
      window.scrollTo({
        top: 0,
        behavior: 'smooth',
      });

    // Scroll to other links
    if (href !== '#' && href.startsWith('#')) {
      const sectionEl = document.querySelector(href);
      sectionEl.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

if (module.hot) {
  module.hot.accept();
}
