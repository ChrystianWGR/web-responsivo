const menuLinks = document.querySelectorAll('.ul a[href^="#"]');

function getDistanceFromTheTop(element) {
  const id = element.getAttribute("href");
  return document.querySelector(id).offsetTop;
}

function scrollToSection(event) {
  event.preventDefault();
  const distanceFromTheTop = getDistanceFromTheTop(event.target) - 90;
  smoothScrollTo(0, distanceFromTheTop);
}

menuLinks.forEach((link) => {
  link.addEventListener("click", scrollToSection);
});

function smoothScrollTo(endX, endY, duration = 900) {
  const startX = window.scrollX || window.pageXOffset;
  const startY = window.scrollY || window.pageYOffset;
  const distanceX = endX - startX;
  const distanceY = endY - startY;
  const startTime = new Date().getTime();

  const easeInOutQuart = (time, from, distance, duration) => {
    if ((time /= duration / 2) < 1)
      return (distance / 2) * time * time * time * time + from;
    return (-distance / 2) * ((time -= 2) * time * time * time - 2) + from;
  };

  function scroll() {
    const currentTime = new Date().getTime() - startTime;
    const newX = easeInOutQuart(currentTime, startX, distanceX, duration);
    const newY = easeInOutQuart(currentTime, startY, distanceY, duration);

    if (currentTime < duration) {
      window.scrollTo(newX, newY);
      requestAnimationFrame(scroll);
    } else {
      window.scrollTo(endX, endY);
    }
  }

  requestAnimationFrame(scroll);
}
