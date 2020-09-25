const istanbulSearch = document.querySelector('#districts')
const izmirSearch = document.querySelector('#areas')
const errorMessage = document.querySelector('#error-message')
const pharmacies = document.getElementById('pharmacies')

// eslint-disable-next-line no-unused-vars
function getPharmacies(city) {
	const getUrl = () => {
		if (city === 'istanbul') {
			const district = istanbulSearch.value

			return `/api/v1/istanbul/pharmacies/${district}`
		} else if (city === 'izmir') {
			const area = izmirSearch.value

			return `/api/v1/izmir/pharmacies/${area}`
		}
	}

	errorMessage.textContent = ''
	document.querySelector('#loader').style.visibility = 'visible'

	// eslint-disable-next-line no-undef
	fetch(getUrl(), {}).then((response) => {
		response.json().then((data) => {
			if (data.message) {
				errorMessage.textContent = data.message
				pharmacies.textContent = ''
				document.querySelector('#loader').style.visibility = 'hidden'
			} else {
				errorMessage.textContent = ''
				pharmacies.textContent = ''
				let html = ''
				data.pharmacies.forEach((pharmacy) => {
					html += `<div class="card">
									   <h3>${pharmacy.name}</h3>
									 	 <div class="card-member"><b>Phone:</b>   ${pharmacy.phone} </div>
									 	 <div class="card-member"><b>Address:</b> ${pharmacy.address} </div>
									 	 <div class="card-maps"><a href="https://www.google.com/maps/search/?api=1&query=${pharmacy.coordinates.lat},${pharmacy.coordinates.lon}" target="_blank"><b>See in Google Maps</b></a></div>
									 </div>`
				})
				pharmacies.insertAdjacentHTML('beforeend', html)
				document.querySelector('#loader').style.visibility = 'hidden'
			}
		})
	})
}
