import axios from "axios"
import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import url from "./../api"

function HomePage() {
	const [countries, setCountries] = useState(null)

	useEffect(() => {
		axios
			.get(`${url}/countries`)
			.then((response) => {
				console.log(response)
				setCountries(
					response.data.sort((a, b) =>
						a.name.common.localeCompare(b.name.common)
					)
				)
			})
			.catch((e) => console.log(e))
	}, [])

	if (!countries) {
		return <p>Loading...</p>
	}
	return (
		<>
			<ul>
				{countries.map((country) => {
					return (
						<li key={country.alpha3Code}>
							{/* <pre>{JSON.stringify(country, null, 2)}</pre> */}
							<Link to={`/${country.alpha3Code}`}>{country.name.common}</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default HomePage
