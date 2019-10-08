const sampleAccData = {
  items: [
    {
      title: 'Item 1',
      content:
        'Lorem ipsum dolor amet cloud bread fashion axe actually chia four dollar toast, ramps photo booth <a href="#" >drinking vinegar</a>.',
    },
    {
      title: 'Item 2',
      content:
        'Bitters tofu ennui microdosing butcher, biodiesel VHS single-origin coffee ethical polaroid organic. Pug ethical health goth tote bag vape authentic. Copper mug cornhole try-hard fanny pack chia polaroid hell of coloring book everyday carry yuccie cloud bread pour-over hashtag craft beer disrupt.',
    },
    {
      title: 'Item 3',
      content:
        "Wayfarers kombucha woke, organic tumblr dreamcatcher yr DIY sartorial brunch actually. Master cleanse ugh crucifix palo santo heirloom put a bird on it. Echo park taxidermy asymmetrical small batch intelligentsia ethical coloring book cornhole. Hella edison bulb disrupt tilde franzen, yr sustainable. Vaporware YOLO hammock keytar, PBR&B squid you probably haven't heard of them. Tofu taiyaki literally, drinking vinegar farm-to-table 90's PBR&B put a bird on it small batch ugh retro.",
    },
    {
      title: 'Item 4',
      content:
        "Wayfarers kombucha woke, organic tumblr dreamcatcher yr DIY sartorial brunch actually. Master cleanse ugh crucifix palo santo heirloom put a bird on it. Echo park taxidermy asymmetrical small batch intelligentsia ethical coloring book cornhole. Hella edison bulb disrupt tilde franzen, yr sustainable. Vaporware YOLO hammock keytar, PBR&B squid you probably haven't heard of them. Tofu taiyaki literally, drinking vinegar farm-to-table 90's PBR&B put a bird on it small batch ugh retro.",
    },
    {
      title: 'Item 5',
      content:
        "Wayfarers kombucha woke, organic tumblr dreamcatcher yr DIY sartorial brunch actually. Master cleanse ugh crucifix palo santo heirloom put a bird on it. Echo park taxidermy asymmetrical small batch intelligentsia ethical coloring book cornhole. Hella edison bulb disrupt tilde franzen, yr sustainable. Vaporware YOLO hammock keytar, PBR&B squid you probably haven't heard of them. Tofu taiyaki literally, drinking vinegar farm-to-table 90's PBR&B put a bird on it small batch ugh retro.",
    },
  ],
}

const buildAccordion = accData => {
  const itemsHtmlString = accData.items.map(buildAccordionItem).join('')
  return /*html*/ `
    <ul class="accordion">
      ${itemsHtmlString}
    </ul>
  `
}

const buildAccordionItem = (item, i) => {
  return /*html*/ `
    <li
      class="accordion-item"
      data-accitem="${i}"
      aria-controls="content-${i + 1}"
    >
      <button class="accordion-button" aria-expanded="false">
        ${item.title}
      </button>
      <div class="accordion-body" id="content-${i + 1}">
        <p>
          ${item.content}
        </p>
      </div>
    </li>
  `
}

const container = document.querySelector('.container')
container.innerHTML = buildAccordion(sampleAccData)

const accordionButtons = document.querySelectorAll('button.accordion-button')
const getItemNum = e => e.currentTarget.parentNode.dataset.accitem
const getBodies = () => document.querySelectorAll('.accordion-body')
const getBody = num =>
  document.querySelector(
    `.accordion-item[data-accitem="${num}"] .accordion-body`
  )

const handleAccordionClick = e => {
  const clickedAccordionNum = getItemNum(e)
  if (this.currentAccordion === clickedAccordionNum) {
    const body = getBody(clickedAccordionNum)
    shrinkAccordion(body)
    this.currentAccordion = null
  } else {
    this.currentAccordion = clickedAccordionNum
    refreshAccordion(clickedAccordionNum)
  }
}

const refreshAccordion = currentAccordion => {
  const bodies = getBodies()
  bodies.forEach(body => {
    const accordionNum = body.parentNode.dataset.accitem
    accordionNum === currentAccordion
      ? growAccordion(body)
      : shrinkAccordion(body)
  })
}

const growAccordion = body => {
  const bodyP = body.querySelector('p')
  const targetHeight = bodyP.clientHeight
  body.style.height = `${targetHeight}px`
  body.style.animation = 'delayedHeightAuto 0s linear 300ms forwards'
  body.classList.add('active')
  const button = body.parentNode.querySelector('button')
  button.setAttribute('aria-expanded', 'true')
}

const shrinkAccordion = body => {
  body.style.animation = ''
  body.style.height = body.clientHeight
  body.style.height = 0
  body.classList.remove('active')
  const button = body.parentNode.querySelector('button')
  button.setAttribute('aria-expanded', 'false')
}

const initializeAccordion = () => {
  accordionButtons.forEach(button =>
    button.addEventListener('click', handleAccordionClick)
  )
}

initializeAccordion()
