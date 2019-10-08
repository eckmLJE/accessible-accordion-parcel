import sampleAccData from './sample-data'

const buildAccordion = accData => {
  const itemsHtmlString = accData.items.map(mapAccordionItems).join('')
  return /*html*/ `
    <ul class="accordion">
      ${itemsHtmlString}
    </ul>
  `
}

const mapAccordionItems = (item, i) => {
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

let currentAccordion = null

const handleAccordionClick = e => {
  const clickedAccordionNum = getItemNum(e)
  if (currentAccordion === clickedAccordionNum) {
    const body = getBody(clickedAccordionNum)
    shrinkAccordion(body)
    currentAccordion = null
  } else {
    currentAccordion = clickedAccordionNum
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
