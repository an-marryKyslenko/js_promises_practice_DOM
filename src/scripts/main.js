'use strict';

let isClickedLeft = false;
let isClickedRight = false;
let timer;
const notification = document.createElement('div');

notification.setAttribute('data-qa', 'notification');

function resetTimer() {
  clearTimeout(timer);

  timer = setTimeout(() => {
    if (!isClickedLeft) {
      firstPromise();
    }
  }, 3000);
}

document.addEventListener('mousedown', (e) => {
  if (e.button === 0) {
    isClickedLeft = true;
    firstPromise();
    resetTimer();
  }

  if (e.button === 2) {
    isClickedRight = true;
  }

  if (isClickedLeft !== isClickedRight) {
    secondPromise();
  }

  if (isClickedLeft && isClickedRight) {
    thirdPromise();
  }
});

document.addEventListener('contextmenu', (e) => {
  e.preventDefault();
});

async function firstPromise() {
  return new Promise((resolve, reject) => {
    if (isClickedLeft) {
      resolve('First promise was resolved');
    } else {
      reject(new Error('First promise was rejected'));
    }
  })
    .then((result) => {
      notification.classList.add('success');
      notification.classList.remove('error');
      notification.innerText = result;
      document.body.prepend(notification);
    })
    .catch((error) => {
      notification.classList.add('error');
      notification.innerText = error.message;
      document.body.prepend(notification);
    });
}

async function secondPromise() {
  return new Promise((resolve, reject) => {
    resolve('Second promise was resolved');
  }).then((result) => {
    setTimeout(() => {
      notification.classList.add('success');
      notification.classList.remove('error');
      notification.innerText = result;
      document.body.prepend(notification);
    }, 1000);
  });
}

async function thirdPromise() {
  return new Promise((resolve, reject) => {
    resolve('Third promise was resolved');
  }).then((result) => {
    setTimeout(() => {
      notification.classList.add('success');
      notification.classList.remove('error');
      notification.innerText = result;
      document.body.prepend(notification);
    }, 2000);
  });
}

resetTimer();
