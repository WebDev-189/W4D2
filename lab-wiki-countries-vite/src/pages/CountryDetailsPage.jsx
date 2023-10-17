import { Link, useParams } from "react-router-dom"
import { useState, useEffect } from "react"
import axios from "axios"
import url from "./../api"

function CountryDetails() {
	const [country, setCountry] = useState(null)
	const params = useParams()

	useEffect(() => {
		axios
			.get(`${url}/countries/${params.alpha3Code}`)
			.then((response) => {
				console.log(response)
				setCountry(response.data)
			})
			.catch((e) => console.log(e))
	}, [params.alpha3Code])

	if (!country) return <p>Loading...</p>

	return (
		<>
			<p>{country.name.common}</p>

			<ul>
				{country.borders.map((border) => {
					return (
						<li key={border}>
							{" "}
							<Link to={`/${border}`}>{border}</Link>
						</li>
					)
				})}
			</ul>
		</>
	)
}

export default CountryDetails
