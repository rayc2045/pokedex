import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const util = reactive({
  fetchData(api) {
    return fetch(api).then(res => res.json());
  },
  firstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
});

const App = {
  util,
  max: 905,
  pokemons: [],
  types: [],
  currentType: '',
  get filterPokemons() {
    if (!this.currentType) return this.pokemons;
    return this.pokemons.filter(pokemon =>
      pokemon.types.includes(this.currentType)
    );
  },
  get progress() {
    return `${(this.pokemons.length / this.max) * 100}%`;
  },
  async init() {
    const pokemons = await fetch('../data/PokeApi.json')
      .then(res => res.json());
    this.pokemons = pokemons;
    pokemons.forEach(pokemon =>
      pokemon.types.forEach(type => {
        if (!this.types.includes(type)) this.types.push(type);
    }));
    // const promises = [];
    // for (let i = 1; i <= this.max; i++) promises.push(this.fetchPokemon(i));
    // await Promise.all(promises);
    // this.pokemons.sort((a, b) => a.id - b.id);
  },
  // async fetchPokemon(id) {
  //   const pokemon = await util.fetchData(
  //     `https://pokeapi.co/api/v2/pokemon/${id}`
  //   );
  //   const types = pokemon.types.map(type => type.type.name);
  //   this.pokemons.push({
  //     id,
  //     name: pokemon.name,
  //     image: pokemon.sprites.other['official-artwork']['front_default'], // pokemon.sprites['front_default'],
  //     types,
  //   });
  //   types.forEach(type => {
  //     if (!this.types.includes(type)) this.types.push(type);
  //   });
  // },
};

createApp(App).mount();
