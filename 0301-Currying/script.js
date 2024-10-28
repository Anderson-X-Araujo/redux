const li = Array.from(document.querySelectorAll("li"));

/* 1º método */

// const dataSlideList = li.map((el) => el.getAttribute("data-slide"));
// const idSlideList = li.map((el) => el.getAttribute("id"));

// --------------------------------------------------

/* 2º Método */

// const getElementAttr = (el, key) => {
//   return el.getAttribute(key);
// };

// const dataSlideList = li.map((el) => getElementAttr(el, "data-slide"));
// const idSlideList = li.map((el) => getElementAttr(el, "id"));

// --------------------------------------------------

/* 3º Método (Currying) */

// const getElementAttr = (key) => {
//   return function (el) {
//     return el.getAttribute(key);
//   };
// };

const getElementAttr = (key) => (el) => el.getAttribute(key);

const getAttrDataSlide = getElementAttr("data-slide");
const getAttrIdSlide = getElementAttr("id");

// const dataSlideList = li.map((el) => getAttrDataSlide(el));
const dataSlideList = li.map(getAttrDataSlide);

// const idSlideList = li.map((el) => getAttrIdSlide(el));
const idSlideList = li.map(getAttrIdSlide);

console.log(dataSlideList);
console.log(idSlideList);
