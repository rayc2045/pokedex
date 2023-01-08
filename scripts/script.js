import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const util = reactive({
  async fetchData(api) {
    return await fetch(api).then(res => res.json());
  },
  firstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  getProgress(numerator, denominator) {
    return `${((numerator / denominator) * 100).toFixed()}%`;
  }
});

const App = {
  util,
  max: 905,
  pokemons: [],
  types: [],
  currentType: '',
  get progress() {
    return util.getProgress(this.pokemons.length, this.max);
  },
  async init() {
    const pokemons = await util.fetchData('../data/PokeApi.json')
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
