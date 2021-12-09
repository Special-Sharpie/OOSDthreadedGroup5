/**
 * carousel.js
 * Put the hero images directly beside each other, scroll between them by
 * ether clicking the left/right buttons, or the nav dots under carousel
 * Change the hero text based on image shown
 * Author: Justin Molnar
 * CPRG 207 - Threaded Project
 * 2021-11-30
 */

const track = document.querySelector('.carousel__track');
const slides = Array.from(track.children);
const nextButton = document.querySelector('.carousel__button--right');
const prevButton = document.querySelector('.carousel__button--left');
const dotsNav = document.querySelector('.carousel__nav');
const dots = Array.from(dotsNav.children);
const slideWidth = slides[0].getBoundingClientRect().width; //How far to slide images when switching
const heroText = document.querySelector('.hero-text');  //Hero text to be changed

const heroTextArray = ['Explore Asia on your own terms', 'The New Years experence of a lifetime', 'Euro Train Adventure', 'Paradise on Earth'] //Array of hero text

//Arrange slides next to eachother
const setSlidePosition = (slide, index) => {
    slide.style.left = slideWidth * index + 'px';
};
slides.forEach(setSlidePosition);

//Move to desired action
const moveToSlide = (track, currentSlide, targetSlide) => {
    track.style.transform = 'translateX(-' + targetSlide.style.left + ')';
    currentSlide.classList.remove('current-slide');
    targetSlide.classList.add('current-slide');
}

//Add class to dots under hero to show which is active and darken with CSS
const updateDots = (currentDot, targetDot) => {
    currentDot.classList.remove('current-slide');
    targetDot.classList.add('current-slide');
}

//Add class .is-hidden if cannot move any further left or right - Hide the button W/ CSS
const hideShowArrows = (slides, prevButton, nextButton, targetIndex) => {
    if (targetIndex === 0) {
        prevButton.classList.add('is-hidden');
        nextButton.classList.remove('is-hidden');
    }   else if (targetIndex === slides.length - 1) {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.add('is-hidden');
    }   else {
        prevButton.classList.remove('is-hidden');
        nextButton.classList.remove('is-hidden');
    }
}

//Move slide left w/ button click
prevButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const prevSlide = currentSlide.previousElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const prevDot = currentDot.previousElementSibling;
    const prevIndex = slides.findIndex(slide => slide === prevSlide);

    moveToSlide(track, currentSlide, prevSlide); //Move left
    updateDots(currentDot, prevDot); //Change Active Dot
    hideShowArrows (slides, prevButton, nextButton, prevIndex); //Check if show hide left button
    heroText.innerHTML = heroTextArray[prevIndex]; //Change Hero Text
});

//Move slide right w/ button click
nextButton.addEventListener('click', e =>{
    const currentSlide = track.querySelector('.current-slide');
    const nextSlide = currentSlide.nextElementSibling;
    const currentDot = dotsNav.querySelector('.current-slide');
    const nextDot = currentDot.nextElementSibling;
    const nextIndex = slides.findIndex(slide => slide === nextSlide);

    moveToSlide(track, currentSlide, nextSlide); //Move right
    updateDots(currentDot, nextDot); //Change Active Dot
    hideShowArrows (slides, prevButton, nextButton, nextIndex); //Check if show hide right button
    heroText.innerHTML = heroTextArray[nextIndex]; //Change Hero Text
});

//Move to slide when I click it's dot nav
dotsNav.addEventListener('click', e => {
    //Which dot was clicked?
    const targetDot = e.target.closest('button');

    if (!targetDot) return; //If only the dotnav section was clicked but not a Dot, return nothing

    const currentSlide = track.querySelector('.current-slide');
    const currentDot = dotsNav.querySelector('.current-slide');
    const targetIndex = dots.findIndex(dot => dot === targetDot);
    const targetSlide = slides[targetIndex];

    moveToSlide(track, currentSlide, targetSlide); //Move to slide corresponding to dot
    updateDots(currentDot, targetDot); //Change Active Dot
    hideShowArrows (slides, prevButton, nextButton, targetIndex);  //Check if show hide ether button
    heroText.innerHTML = heroTextArray[targetIndex]; //Change hero text to text corresponding to dot clicked
});
