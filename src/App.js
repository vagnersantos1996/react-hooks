import React, {useState, useEffect} from 'react';

/*
	state = {repositories: []}
*/

export default function App() {
	const [repositories, setRepositories] = useState([]);

	//primeiro parametro -> o que deve ser feito
	//segundo parametro -> quando deve ser feito. Recebe um array de variáveis que, quando alteradas, ativam a função.
	//Se não houver nada ( "[]" ), ele executará quando iniciar a página, como um "componentDidMount"
	useEffect(() => {
		async function fetchData() {
			const response = await fetch('https://api.github.com/users/vagnersantos1996/repos');
			const data = await response.json();
			setRepositories(data);
		}

		fetchData();
	}, []);

	useEffect(() => {
		const filtered = repositories.filter(repo => repo.favorite)
		document.title = `Você tem ${filtered.length} favorito(s)`;
	}, [repositories]);

	//n pode usa arrow function
	function handleFavorite(id) {
		const newRepositories = repositories.map(repo => {
			return repo.id === id ? {...repo, favorite: !repo.favorite} : repo
		});

		setRepositories(newRepositories);
	}

	return (
		<>
			<ul>
				{repositories.map(repo => <li key={repo.id}>
					{repo.name}
					{repo.favorite && <span>(Favorito)</span>}
					<button onClick={() => handleFavorite(repo.id)}>{repo.favorite ? "Desfavoritar" : "Favoritar"}</button>
				</li>)}
			</ul>
		</>
	)
}