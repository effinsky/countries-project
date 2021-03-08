
const listContainer = document.querySelector("#list-container")
const countryList = listContainer.querySelector("#country-list")
const section = document.querySelector("#section")
// flag says if countries or desc are currently displayed
let countriesShown = false
let projDescShown = false

// render countries btn
const renderCountriesBtn = document.querySelector("#toggle-items")
renderCountriesBtn.addEventListener("click", renderCountries)
renderCountriesBtn.textContent = "show countries"

// render proj desc btn
const renderDescBtn = document.querySelector("#render-desc")
renderDescBtn.addEventListener("click", renderProjectDesc)

async function renderCountries() {
	if (projDescShown) {
		hideProjDesc()
	}
	const countries = await fetchData("http://localhost:666")
	const listElements = countries.map(({ name, code }) => `${name} :: ${code}`)

	listElements.forEach(item => {
		const li = document.createElement("li")
		li.classList.add("list-item")
		li.textContent = item
		countryList.append(li)
	})

	toggleRenderCountries(
		"click",
		renderCountries,
		hideCountries,
		"hide countries"
	)
	countriesShown = true
}

async function fetchData(url) {
	const response = await fetch(url)
	return await response.json()
}

function hideCountries() {
	countryList.innerHTML = ""

	toggleRenderCountries(
		"click",
		hideCountries,
		renderCountries,
		"show countries"
	)
	countriesShown = false
}

function toggleRenderCountries(
	eventType,
	removedHandler,
	addedHandler,
	newTextContent
) {
	renderCountriesBtn.removeEventListener(eventType, removedHandler)
	renderCountriesBtn.addEventListener(eventType, addedHandler)
	renderCountriesBtn.textContent = newTextContent
}

function renderProjectDesc() {
	if (!projDescShown) {
		if (countriesShown) {
			hideCountries()
		}

		const projectDescTemplate = document
			.querySelector("#proj-desc-template")
			.content.cloneNode(true)

		section.append(projectDescTemplate)
		projDescShown = true
	}
}

function hideProjDesc() {
	const projDesc = document.querySelector("#proj-desc")
	section.removeChild(projDesc)
	projDescShown = false
}
