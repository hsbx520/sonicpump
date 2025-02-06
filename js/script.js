let start = null;
var player, videoList, currentLang;
let url = new URL(window.location.href);
let params = new URLSearchParams(url.search);
let utmParams = [];
let langParam = params.get('lang');
let langCookie = Cookies.get('lang');
let currentConsole = 'playstation5'

document.addEventListener('DOMContentLoaded', () => {
/////cookie set up when page loads. this will allow you to go directly to a FIGS page with index.html?lang="yourlangcode" and be able to have the correct language show up/////



  // Collect UTM parameters
  params.forEach((value, key) => {
      if (key.startsWith('utm_')) {
          utmParams.push({ key, value });
      }
  });

  if (langCookie) {
      if (langParam) {
          if (langParam !== langCookie) {
              // If langParam is different from langCookie, update langParam to match langCookie
              params.set('lang', langCookie);
              utmParams.forEach(param => params.set(param.key, param.value));
              window.location.search = params.toString();
          }
      } else {
          // If langParam is not set, add langParam from langCookie
          params.set('lang', langCookie);
          utmParams.forEach(param => params.set(param.key, param.value));
          window.location.search = params.toString();
      }
  } else if (!langParam) {
      // If no langCookie and no langParam, set langParam to 'en'
      params.set('lang', 'en');
      utmParams.forEach(param => params.set(param.key, param.value));
      window.location.search = params.toString();
  }

  const body = document.body;
  if(!langCookie){langCookie = 'en';}
  if (!body.classList.contains(langCookie)) {
    body.classList.add(langCookie);
  }

  const countrySelected = countries[langCookie];
  const currentCountry = document.getElementById('current-country');
  currentCountry.innerHTML = countrySelected;
  if (langCookie === 'en') {
    currentLang = 'us';
  } else {
    currentLang = langCookie;
  }

    
    
    /* TOUCHSCREEN FUNCTION FOR BODY */
    document.querySelector('.content-wrapper').addEventListener('touchstart', function(e) {
        start = e.touches[0].clientX;
    }, false);
    
    const hamburger = document.querySelector('button.hamburger');
    const nav = document.querySelector('nav');
    const navRightButton = document.querySelectorAll('.nav-right .button-style');
   /*  Object.keys(navButtonsLinks).forEach((buttonLink) => {
    if (navButtonsLinks[buttonLink] === '')
        document.getElementById('nav-' + buttonLink).remove();
    return;
    }); */

    hamburger.addEventListener('click', function () {
    this.classList.toggle('is-active');
    nav.classList.toggle('active');
    });

    /* Sticky Navigation */
    const sectionInView = document.getElementById('universalToolbar');
    const options = {
    root: null, // null is set for entire viewport
    threshold: 1, // value is 0 - 1 for the amount of element in viewport
    rootMargin: '40px', // the distance of element in viewport
    };
    const observer = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
        if (!entry.isIntersecting) {
        hamburger.classList.add('position-fixed');
        nav.classList.add('position-fixed');
        if (window.innerWidth > 1366) {
            nav.classList.add('active');
        }
        } else {
        hamburger.classList.remove('position-fixed');
        nav.classList.remove('position-fixed');
        nav.classList.remove('active');
        }
    });
    }, options);

    observer.observe(sectionInView);

    window.onscroll = function () {
    if (
        (hamburger.classList.contains('is-active') ||
        nav.classList.contains('active')) &&
        window.innerWidth < 941
    ) {
        hamburger.classList.remove('is-active');
        nav.classList.remove('active');
        languageList.classList.remove('active');
    }
    };

    window.addEventListener('resize', function () {
    if (languageList.classList.contains('active')) {
        languageList.classList.toggle('active');
    }
    if (hamburger.classList.contains('is-active')) {
        hamburger.classList.toggle('is-active');
    }
    if (window.innerWidth < 1366 && nav.classList.contains('active')) {
        nav.classList.remove('active');
    }
    });

    /* Language Select Menu */
    const currentLanguage = document.querySelector('.current-language');
    const languageList = document.querySelector('.language-list');
    currentLanguage.addEventListener('click', (event) => {
    languageList.classList.toggle('active');
    });

    /* Language Select Change */

    // Function to get all query parameters
function getAllQueryParams() {
  let params = {};
  let queryString = window.location.search.substring(1);
  let regex = /([^&=]+)=([^&]*)/g;
  let m;
  while (m = regex.exec(queryString)) {
      params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
  }
  return params;
}

// Initialize start variable
let start = null;

const languageLinks = document.querySelectorAll('.language-list a');

languageLinks.forEach((link) => {
  link.addEventListener('click', (event) => {
      event.preventDefault();
      let country = event.target.getAttribute('data-country');
      if (
          country === 'jp' ||
          country === 'ch' ||
          country === 'cn' ||
          country === 'kr' ||
          country === 'asia'
      ) {
          let languageAsia = document.getElementById(country).href;
          window.location.href = languageAsia;
      } else {
          Cookies.set('lang', country);
          // The new code goes here, replacing the existing code in this else block
          let allParams = getAllQueryParams();
          delete allParams.lang; // Remove existing lang parameter if present
          const utmParams = Object.keys(allParams)
              .filter(key => key.startsWith('utm_'))
              .reduce((obj, key) => {
                  obj[key] = allParams[key];
                  return obj;
              }, {});

          const newParams = new URLSearchParams();
          newParams.append('lang', country);
          Object.entries(utmParams).forEach(([key, value]) => {
              newParams.append(key, value);
          });

          const newQueryString = newParams.toString();
          const newUrl = 'index.html?' + newQueryString;
          window.location.href = newUrl;
      }
  });
});

document.querySelector('.content-wrapper').addEventListener('touchend', function(e) {
  let end = e.changedTouches[0].clientX;
  let distance = start - end;

  if (Math.abs(distance) > 100) { // threshold
      if (distance > 0) {
          sonicContent();
      } else {
          shadowContent();
      }
  }
  start = null;
}, false);

    function setSwitcherContainerWidth() {
        // Get the viewport width including the scrollbar
        const viewportWidth = document.querySelector('.content-wrapper').clientWidth;
    }

    // Call the function when the page loads
    setSwitcherContainerWidth();

    // Call the function when the window is resized
    window.addEventListener('resize', setSwitcherContainerWidth);

    // Get all the content switch buttons
    const switchButtons = document.querySelectorAll('.content-switch');

    
    const contentWrapper = document.querySelector('.content-wrapper');
    // Add a click event listener to each button
    switchButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Get the target content
            if(this.id === 'sonic-content') {
                sonicContent();
            }else{
                shadowContent();
            }   
        });
    });
    const navLinks = document.querySelectorAll('.nav-link');
    const originalHrefs = Array.from(navLinks, link => link.getAttribute('href'));
    const sonicButton = document.getElementById('switcher-sonic');
    const shadowButton = document.getElementById('switcher-shadow');
    sonicButton.classList.add('active');

    function sonicContent() {
      const sonicContentHeight = calculateContentHeight(sonicChildren);
      document.querySelector('.content-wrapper').style.transform = 'translateX(-50%)';
        navLinks.forEach((link, index) => {
            link.href = `${originalHrefs[index]}-sonic`;
        });
        contentWrapper.style.height = `${sonicContentHeight}px`;
        shadowButton.classList.add('active');
        sonicButton.classList.remove('active');
    }
    function shadowContent() {
      const shadowContentHeight = calculateContentHeight(shadowChildren); 
      document.querySelector('.content-wrapper').style.transform = 'translateX(0)';
        navLinks.forEach((link, index) => {
            link.href = `${originalHrefs[index]}`;
        });
        contentWrapper.style.height = `${shadowContentHeight}px`;
        shadowButton.classList.remove('active');
        sonicButton.classList.add('active');
    }
    const sonicChildren = document.querySelector('#sonic-height');
    const shadowChildren = document.querySelector('#shadow-height');

    function calculateContentHeight(contentElement) {
      let totalHeight = 0;
    
      // Check if the contentElement has child elements
      if (contentElement.children.length > 0) {
        const contentElements = contentElement.children;
    
        for (let i = 0; i < contentElements.length; i++) {
          const element = contentElements[i];
          const elementHeight = element.offsetHeight;
          totalHeight += elementHeight;
        }
      } else {
        // If the contentElement has no child elements, use its own offsetHeight
        totalHeight = contentElement.offsetHeight;
      }
    
      return totalHeight;
    }
    window.addEventListener('resize', () => {
      const sonicHeight = calculateContentHeight(sonicChildren);
      const shadowHeight = calculateContentHeight(shadowChildren);
    
      if (sonicButton.classList.contains('active')) {
        contentWrapper.style.height = `${shadowHeight}px`;
      } else {
        contentWrapper.style.height = `${sonicHeight}px`;
      }
    });

    updateSVGDimensions();

    Fancybox.bind("[data-fancybox]", {
      ratio: [16,9],
      autoSize: true,
      fitToView: true,
      Toolbar: {
          display: {
              left: [''],
              middle: [''],
              right: ['close'],
          },
      },
      Thumbs: false
    });

    /* Media Carousel */
    const sonicMedia = new Siema({
        selector: '#sonic-carousel',
        duration: 300,
        easing: 'ease-out',
        perPage: {
          1: 1,
          768: 2,
          960: 3,
          1280: 4,
        },
        draggable: false,
        loop: true,
      });
      const prev = document.querySelector('#sonic-media-prev');
      const next = document.querySelector('#sonic-media-next');
      
      prev.addEventListener('click', () => sonicMedia.prev(1));
      next.addEventListener('click', () => sonicMedia.next(1));

      const shadowMedia = new Siema({
        selector: '#shadow-carousel',
        duration: 300,
        easing: 'ease-out',
        perPage: {
          1: 1,
          768: 2,
          960: 3,
          1280: 4,
        },
        draggable: false,
        loop: true,
      });
      const prevShadow = document.querySelector('#shadow-media-prev');
      const nextShadow = document.querySelector('#shadow-media-next');
      
      prevShadow.addEventListener('click', () => shadowMedia.prev(1));
      nextShadow.addEventListener('click', () => shadowMedia.next(1));

      /* Comic Carousel */
      const sonicComic = new Siema({
        selector: '#sonic-comic-carousel',
        duration: 300,
        easing: 'ease-out',
        perPage: {
          1: 1,
          768: 2,
          960: 3,
          1280: 4,
        },
        draggable: false,
        loop: true,
      });
      const prevSonicComic = document.querySelector('#sonic-comic-prev');
      const nextSonicComic = document.querySelector('#sonic-comic-next');
      
      prevSonicComic.addEventListener('click', () => sonicComic.prev(1));
      nextSonicComic.addEventListener('click', () => sonicComic.next(1));
      
      const shadowComic = new Siema({
        selector: '#shadow-comic-carousel',
        duration: 300,
        easing: 'ease-out',
        perPage: {
          1: 1,
          768: 2,
          960: 3,
          1280: 4,
        },
        draggable: false,
        loop: true,
      });
      const prevShadowComic = document.querySelector('#shadow-comic-prev');
      const nextShadowComic = document.querySelector('#shadow-comic-next');
      
      prevShadowComic.addEventListener('click', () => shadowComic.prev(1));
      nextShadowComic.addEventListener('click', () => shadowComic.next(1));

      /* PURCHASE */
// Set-up variables for global use
let currentEdition = "digitalDeluxe";
let currentEditionText;
let currentPlatform;
let currentRetailer;
let currentRetailerLink;
let currentMedium = "digital";

let currentBonusHeader = bonusHeaders[langCookie][currentEdition];
let currentBonus = editionBonuses[currentEdition];
currentPlatform = Object.entries(purchaseConsoles[langCookie][currentEdition])[0][0];
const physicalLaunchObject = purchaseLinks[langCookie]?.physicalLaunch?.[currentPlatform];
if (physicalLaunchObject && Object.keys(physicalLaunchObject).length > 0) {
  [currentRetailer, currentRetailerLink] = Object.entries(physicalLaunchObject)[0];
} else {
  const physicalStandardObject = purchaseLinks[langCookie]?.physicalStandard?.[currentPlatform];
  if (physicalStandardObject && Object.keys(physicalStandardObject).length > 0) {
    [currentRetailer, currentRetailerLink] = Object.entries(physicalStandardObject)[0];
  }else {
    currentRetailer = "";
    currentRetailerLink = "";
  }
}
// BUILD EDITION DROPDOWN
const editionDropdownOptions = document.getElementById('edition-dropdown');
editionDropdownOptions.innerHTML = '';
let isFirstEdition = true;
if (langCookie in purchaseConsoles) {
  for (const edition in purchaseConsoles[langCookie]) {
    if (
      Object.keys(purchaseConsoles[langCookie][edition]).length > 0 &&
      !Object.values(purchaseConsoles[langCookie][edition]).every(platforms => Object.keys(platforms).length === 0)
    ) {
      const option = document.createElement('div');
      const editionValue = gameEditions[langCookie][edition];
      const editionId = gameEditions.en[edition];
      option.id = editionId.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, '-');
      option.dataset.edition = editionValue;
      option.dataset.selectedEdition = edition;
      if (edition === 'digitalDeluxe' || edition === 'digitalStandard' || edition === 'collectorsEdition') {
        option.dataset.medium = 'digital';
      } else {
        option.dataset.medium = 'physical';
      }
      option.innerHTML = editionValue;
      if (isFirstEdition) {
          const selectedEditionElement = document.getElementById('selected-edition');
          if (selectedEditionElement) {
              selectedEditionElement.innerHTML = editionValue;
          } else {
              console.error('Element with ID "selected-edition" not found.');
          }
          // Add a valid class name if needed, or remove this line if not required
          // option.classList.add('some-class-name');
          isFirstEdition = false;
      }
      editionDropdownOptions.appendChild(option);
    }
  }
}

function buildPlatforms(){
  const platformDropdownOptions = document.getElementById('platform-dropdown');
  platformDropdownOptions.innerHTML = '';
  let isFirstPlatform = true;
  if(langCookie in purchaseConsoles){
    const currentEditionConsoles = purchaseConsoles[langCookie][currentEdition];
    if(Object.keys(currentEditionConsoles).length > 0 && !Object.values(currentEditionConsoles).every(console => Object.keys(console).length === 0)){
      for(const consoleKey in currentEditionConsoles){
        const consoleValue = currentEditionConsoles[consoleKey];
        if(Object.keys(consoleValue).length > 0){
          const option = document.createElement('div');
          option.id = `${consoleKey}`;
          option.dataset.platform = consoleKey;
          option.dataset.console = consoleValue;
          option.innerHTML = consoleValue;
          option.classList.add('gtm__platform');
          if(isFirstPlatform){
            currentPlatform = consoleKey;
            document.getElementById('selected-platform').innerHTML = consoleValue;
            updatePurchaseButton();
            isFirstPlatform = false;
          }
          platformDropdownOptions.appendChild(option);
        }
      }
    }
  }
}

function buildRetailers(){
  const retailerDropdownOptions = document.getElementById('retail-dropdown');
  retailerDropdownOptions.innerHTML = '';
  let isFirstRetail = true;
  if(langCookie in purchaseLinks){
    const currentPlatformRetailers = purchaseLinks[langCookie][currentEdition][currentPlatform];
    if(Object.keys(currentPlatformRetailers).length > 0 && !Object.values(currentPlatformRetailers).every(retailer => Object.keys(retailer).length === 0)){
      for(const retailerKey in currentPlatformRetailers){
        currentRetailerLink = currentPlatformRetailers[retailerKey][1];
        const retailerAttribute = currentPlatformRetailers[retailerKey][0];
        const option = document.createElement('div');
        option.id = `${retailerKey}`;
        option.dataset.retailer = retailerAttribute;
        option.innerHTML = retailerAttribute;
        option.classList.add('gtm__retailer');
        if(isFirstRetail){
          currentRetailer = retailerKey;
          document.getElementById('selected-retailer').innerHTML = purchaseLinks[langCookie][currentEdition][currentPlatform][currentRetailer][0];
          document.getElementById('retail-link').href = currentRetailerLink;
          document.getElementById('retail-link').removeAttribute('data-purchase');
          document.getElementById('retail-link').dataset.purchase = `${langCookie} ${currentEdition} ${currentPlatform} ${currentRetailer}`;
          option.classList.add('selected');
          isFirstRetail = false;
        }
        retailerDropdownOptions.appendChild(option);
      }
    }
  }
}

function updatePurchaseButton(){
  let button;
  let buttonLink;
  let buttonAttribute;
  if(currentMedium === "digital"){
    button = document.getElementById('platform-link');
    buttonLink = purchaseLinks[langCookie][currentEdition][currentPlatform];
    buttonAttribute = `${langCookie} ${currentEdition} ${currentPlatform}`;
  }else{
    button = document.getElementById('retail-link');
    buttonLink = purchaseLinks[langCookie][currentEdition][currentPlatform][currentRetailer][1];
    buttonAttribute = `${langCookie} ${currentEdition} ${currentPlatform} ${currentRetailer}`;
  }
  button.href = buttonLink;
  button.dataset.purchase = buttonAttribute;
}

function initialDropdowns(){
  buildPlatforms();
  buildRetailers();
  document.getElementById('retailer').classList.add('dis-none');
}
initialDropdowns();

const dropdowns = document.querySelectorAll('.dropdown');

dropdowns.forEach((dropdown) => {
  // Get the associated content
  const content = dropdown.querySelector('.dropdown-content');
  const selectedEdition = document.querySelector('#selected-edition');
  const purchaseImage = document.getElementById('purchase-glamshot');
  const retailerSection = document.getElementById('retailer');

  // Toggle the class when the dropdown is clicked
  dropdown.addEventListener('click', function (event) {
    // Check if the clicked element is not a child of .dropdown-content
    if (!content.contains(event.target)) {
      content.classList.toggle('dropdown-open');
    }
  });

  // Handle clicks on any element inside .dropdown-content
  content.addEventListener('click', function (event) {
    
    currentBonusHeader = bonusHeaders[langCookie][currentEdition];
    const selectedEditionLink = purchaseLinks[langCookie][currentEdition][currentPlatform];
    const platformSelected = document.getElementById('selected-platform');
    /* const retailer = event.target.getAttribute('data-retailer') ? event.target.getAttribute('data-retailer') : Object.keys(selectedEditionLink)[0]; */

    if (content.id === "edition-dropdown") {
      const editionDropdown = document.querySelectorAll('#edition-dropdown > div');
      const platformButton = document.getElementById('platform-button');
      const editionId = event.target.getAttribute('id');
      const bonusHeader = document.getElementById('bonus-header');
      const bonusList = document.getElementById('bonus-list');
      currentEdition = event.target.getAttribute('data-selected-edition');
      currentEditionText = event.target.getAttribute('data-selected-edition');
      const selectedEditionBonuses = editionBonuses[currentEdition];
      currentMedium = event.target.getAttribute('data-medium');
      editionDropdown.forEach((option) => { option.classList.remove('selected')});
      event.target.classList.add('selected');
      selectedEdition.innerHTML = gameEditions[langCookie][currentEditionText];
      bonusHeader.innerHTML = bonusHeaders[langCookie][currentEdition];
      let imagePath;
      if (event.target.dataset.edition) {
        if (event.target.id.toLowerCase() === 'collectors-edition') {
            imagePath = `img/purchase/${event.target.id.toLowerCase().replace(/\s/g, '-')}-${currentConsole}-${langCookie}.jpg`;
        } else {
            imagePath = `img/purchase/${event.target.id.toLowerCase().replace(/\s/g, '-')}-${langCookie}.jpg`;
        }
    } else {
        imagePath = `img/purchase/${editionId.toLowerCase().replace(/\s/g, '-')}-${langCookie}.jpg`;
    }
      purchaseImage.src = imagePath;
      bonusList.innerHTML = '';
      selectedEditionBonuses.forEach((bonusKey) => {
        let bonusText = "";
        if(currentEdition === 'collectorsEdition'){
          bonusText = purchaseItems.en[bonusKey];
          const listItem = document.createElement('li');
          listItem.id = `${bonusKey}`;
          listItem.innerHTML = bonusText;
          bonusList.appendChild(listItem);
        }else{
          bonusText = purchaseItems[langCookie][bonusKey];
          const listItem = document.createElement('li');
          listItem.id = `${bonusKey}`;
          listItem.innerHTML = bonusText;
          bonusList.appendChild(listItem);
        }
      });
      if (currentMedium === 'physical') {
        retailerSection.classList.remove('dis-none');
        platformButton.classList.add('display-none');
        currentPlatform = Object.entries(purchaseConsoles[langCookie][currentEdition])[0][0];
        currentRetailer = Object.keys(purchaseLinks[langCookie][currentEdition][currentPlatform])[0];
        buildPlatforms();
        buildRetailers();
        updateSVGDimensions();
        updatePurchaseButton();
      } else {
        retailerSection.classList.add('dis-none');
        platformButton.classList.remove('display-none');
        buildPlatforms();
        updateSVGDimensions();
        updatePurchaseButton();
      }
      content.classList.remove('dropdown-open');
    }
    if (content.id === "platform-dropdown") {
      currentPlatform = event.target.getAttribute('data-platform') || 'playstation5';
      platformSelected.innerHTML = event.target.getAttribute('data-console');
      content.classList.remove('dropdown-open');
      const earlyAccess = document.getElementById('earlyaccess');
      if(currentEdition === 'collectorsEdition'){
        purchaseImage.src = `img/purchase/collectors-edition-${currentPlatform}-${langCookie}.jpg`;
        document.getElementById('collectorDigital').classList.add('display-none');
        document.getElementById('collectorPhysical').classList.remove('display-none');    
        if(currentPlatform === 'xbox'){
          document.getElementById('collector-platform').innerHTML = "Xbox Series X & Xbox One"
        }else{
          document.getElementById('collector-platform').innerHTML = purchaseConsoles.en.collectorsEdition[currentPlatform];
        }
        if(currentPlatform === 'steam'){
          document.getElementById('collectorPhysical').classList.add('display-none');
          document.getElementById('collectorDigital').classList.remove('display-none');
        }
      }
      if(earlyAccess){
        if(currentPlatform.includes('switch') && currentEdition === 'digitalDeluxe'){
          document.getElementById('earlyaccess').classList.add('display-none');
        }else{
          document.getElementById('earlyaccess').classList.remove('display-none');
        }
      }
      handlePlatformDropdown(currentPlatform);
      if(currentMedium === "physical"){buildRetailers();};
      updatePurchaseButton();
    }
    if (content.id === "retail-dropdown") {
      content.classList.remove('dropdown-open');
      currentRetailer = event.target.id;
      const retailerSelectedText = purchaseLinks[langCookie][currentEdition][currentPlatform][currentRetailer][0];
      document.getElementById('selected-retailer').innerHTML = retailerSelectedText;
      updatePurchaseButton();
    }
  });
});

function handlePlatformDropdown(currentPlatform) {
  if (currentPlatform.includes('playstation')) {
    document.getElementById('playstationExclusive').classList.remove('display-none');
  } else {
    document.getElementById('playstationExclusive').classList.add('display-none');
  }
}

// Close the dropdown when clicking outside of any dropdown
document.addEventListener('click', function (event) {
  dropdowns.forEach((dropdown) => {
    if (!dropdown.contains(event.target)) {
      // Clicked outside the dropdown, close it
      dropdown
        .querySelector('.dropdown-content')
        .classList.remove('dropdown-open');
    }
  });
});


/* PURCHASE END */

/* NEWSLETTER HANDLER */
function handleNewsletter() {
  //   const universalNewsletter = document.getElementById('universalNewsletter');
  //   const navCheckbox = document.getElementById('navi-toggle');
  document.querySelector('.univnavigation__link .newsletterText').click();
  //   if (universalNewsletter.classList.contains('universalNewsletter__show')) {
  //     universalNewsletter.classList.remove('universalNewsletter__show');
  //     navCheckbox.checked = false;
  //     return;
  //   }
  //   universalNewsletter.classList.add('universalNewsletter__show');
}

const singleButton = document.querySelector('.footer__newsletterButton');
const newsletterButtons = document.querySelectorAll('.openNewsletter');
const universalEmailSignUp = document.querySelector('.open_newsletter');
document.querySelector('#universalNewsletter').remove();
universalEmailSignUp.href = './emailsignup/';
universalEmailSignUp.setAttribute('target', '_blank');

window.addEventListener('load', () => {
  [...newsletterButtons].forEach(elem => {
    elem.addEventListener('click', () => {
      handleNewsletter();
    });
  });
  singleButton.addEventListener('click', () => {
    handleNewsletter();
  });
});




/* LANGUAGE CHANGE START */

const countryCodes = {
  au: 'en_au',
  uk: 'en_gb',
  fr: 'fr_fr',
  it: 'it_it',
  de: 'de_de',
  es: 'es_es',
  mx: 'es_mx',
  br: 'pt_br'
}

// Navigation
document.getElementById('nav-features').innerHTML = languageObjects[langCookie].navigation.features;
document.getElementById('nav-media').innerHTML = languageObjects[langCookie].navigation.media;
document.getElementById('nav-purchase').innerHTML = languageObjects[langCookie].navigation.purchase;
document.getElementById('nav-purchase-text').innerHTML = languageObjects[langCookie].navigation.purchasebutton;
document.getElementById('nav-disclaimer-text').innerHTML = languageObjects[langCookie].navigation.disclaimer;
if(langCookie === 'en'){
  document.getElementById('nav-disclaimer').href = `https://manuals.sega.com/sonic-x-shadow-generations-disclaimer/`
}else{
  document.getElementById('nav-disclaimer').href = `https://manuals.sega.com/${countryCodes[langCookie]}/sonic-x-shadow-generations-disclaimer/`
}

// Hero
document.getElementById('shadow-hero-cta').innerHTML = languageObjects[langCookie].hero.cta;
document.getElementById('sonic-hero-cta').innerHTML = languageObjects[langCookie].hero.cta;
document.getElementById('shadow-trailer-button').innerHTML = languageObjects[langCookie].hero.trailerButton;
document.getElementById('sonic-trailer-button').innerHTML = languageObjects[langCookie].hero.trailerButton;
document.getElementById('shadow-hero-purchase').innerHTML = languageObjects[langCookie].hero.purchaseButton;
document.getElementById('sonic-hero-purchase').innerHTML = languageObjects[langCookie].hero.purchaseButton;

// Features
document.getElementById('shadow-features-header').innerHTML = languageObjects[langCookie].features.title;
document.getElementById('sonic-features-header').innerHTML = languageObjects[langCookie].features.title;
document.getElementById('feature01-header').innerHTML = languageObjects[langCookie].features.feature01title;
document.getElementById('feature01-text').innerHTML = languageObjects[langCookie].features.feature01text;
document.getElementById('feature02-header').innerHTML = languageObjects[langCookie].features.feature02title;
document.getElementById('feature02-text').innerHTML = languageObjects[langCookie].features.feature02text;
document.getElementById('feature03-header').innerHTML = languageObjects[langCookie].features.feature03title;
document.getElementById('feature03-text').innerHTML = languageObjects[langCookie].features.feature03text;
document.getElementById('feature04-header').innerHTML = languageObjects[langCookie].features.feature04title;
document.getElementById('feature04-text').innerHTML = languageObjects[langCookie].features.feature04text;
document.getElementById('feature05-header').innerHTML = languageObjects[langCookie].features.feature05title;
document.getElementById('feature05-text').innerHTML = languageObjects[langCookie].features.feature05text;
document.getElementById('feature06-header').innerHTML = languageObjects[langCookie].features.feature06title;
document.getElementById('feature06-text').innerHTML = languageObjects[langCookie].features.feature06text;
document.getElementById('feature07-header').innerHTML = languageObjects[langCookie].features.feature07title;
document.getElementById('feature07-text').innerHTML = languageObjects[langCookie].features.feature07text;

// Media
document.getElementById('shadow-media-header').innerHTML = languageObjects[langCookie].media.title;
document.getElementById('sonic-media-header').innerHTML = languageObjects[langCookie].media.title;

// Purchase
console.log(edition);
document.getElementById('purchase-header').innerHTML = languageObjects[langCookie].purchase.title;
const purchaseImage = document.getElementById('purchase-image');
document.querySelector('#edition-text p').innerHTML = dropdownSelectionText[langCookie].edition;
document.querySelector('#platform-text p').innerHTML = dropdownSelectionText[langCookie].platform;
document.querySelector('#retail-text p').innerHTML = dropdownSelectionText[langCookie].retailer;
document.getElementById('platform-button-text').innerHTML = languageObjects[langCookie].purchase.button;
document.getElementById('retail-button-text').innerHTML = languageObjects[langCookie].purchase.button;

document.getElementById('bonus-header').innerHTML = bonusHeaders[langCookie].digitalDeluxe;
const langBonus = editionBonuses.digitalDeluxe;
document.getElementById('purchase-glamshot').src = `img/purchase/digital-deluxe-edition-${langCookie}.jpg`;
const bonusList = document.getElementById('bonus-list');
bonusList.innerHTML = '';
langBonus.forEach((bonusKey) => {
  const bonusText = purchaseItems[langCookie][bonusKey];
  const listItem = document.createElement('li');
  listItem.id = `${bonusKey}`;
  listItem.innerHTML = bonusText;
  bonusList.appendChild(listItem);
});
// Hide Steam Collector's Edition on page load
// document.getElementById('collectorDigital').classList.add('display-none');

// Email Signup
document.querySelector('#crm h2').setAttribute('data-crm',emailSignup[langCookie].title);
document.querySelector('#crm h2 span').innerHTML = emailSignup[langCookie].title;
document.getElementById('crm-desc').innerHTML = emailSignup[langCookie].description;
document.getElementById('crm-disclaimer').innerHTML = emailSignup[langCookie].disclaimer;
document.getElementById('email-signup').innerHTML = emailSignup[langCookie].button;

// Footer
document.getElementById('footer-social-title').innerHTML = `<h3>${languageObjects[langCookie].footer.connect}</h3>`;
document.getElementById('rating-icon').src = `img/common/${languageObjects[langCookie].footer.rating}`;
document.getElementById('legal-lines').innerHTML = languageObjects[langCookie].footer.legal;
document.getElementById('cookie-policy').innerHTML = languageObjects[langCookie].footer.cookiepolicy;
document.getElementById('cookie-policy').href = languageObjects[langCookie].footer.cookielink;
document.getElementById('privacy-policy').innerHTML = languageObjects[langCookie].footer.privacypolicy;
document.getElementById('privacy-policy').href = languageObjects[langCookie].footer.privacylink;
document.getElementById('your-privacy-choices').innerHTML = languageObjects[langCookie].footer.privacychoices;
document.getElementById('your-privacy-choices').href = languageObjects[langCookie].footer.privacychoiceslink;
document.getElementById('california-privacy-notice').innerHTML = languageObjects[langCookie].footer.californiaprivacy;
document.getElementById('california-privacy-notice').href = languageObjects[langCookie].footer.californiaprivacylink;

});

window.onload = function() {
  updateSVGDimensions();
};

// Resize SVG to fit text box
function updateSVGDimensions() {
    const svgElements = document.querySelectorAll('svg');
    svgElements.forEach(svgElement => {
      const textElement = svgElement.querySelector('text');
      if (textElement) {
        let textRect;
        try {
          textRect = textElement.getBBox();
        } catch (error) {
          textRect = textElement.getBoundingClientRect();
        }
        const newWidth = textRect.width + 20; // Add some padding
        const newHeight = textRect.height + 20; // Add some padding
        svgElement.setAttribute('width', `${newWidth}`);
        svgElement.setAttribute('height', `${newHeight}`);
      }
    });
  }

  

  /* RESIZE WINDOW SCRIPTS */
  window.addEventListener('resize', updateSVGDimensions);