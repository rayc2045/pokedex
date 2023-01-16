import { createApp, reactive } from 'https://unpkg.com/petite-vue?module';

const util = reactive({
  async fetchData(api) {
    return await fetch(api).then(res => res.json());
  },
  firstLetterUppercase(str) {
    return str.charAt(0).toUpperCase() + str.slice(1);
  },
  getNextItem(arr, currentItem) {
    if (currentItem === arr.at(-1)) return arr[0];
    return arr[arr.indexOf(currentItem) + 1];
  },
  getProgress(numerator, denominator) {
    return `${((numerator / denominator) * 100).toFixed()}%`;
  },
});

const App = {
  util,
  isLoading: true,
  max: 905,
  pokemons: [],
  types: [],
  currentLang: navigator.language === 'zh-TW' ? 'zh' : 'en',
  currentTypeIdx: -1,
  currentPokemon: null,
  isDialogOpen: false,
  get progress() {
    return util.getProgress(this.pokemons.length, this.max);
  },
  get pokemonInfoNameSize() {
    if (!this.currentPokemon) return;
    const length = this.currentPokemon.name[this.currentLang].length;
    const baseSize = '2em';
    if (this.currentLang === 'en' && length > 7)
      return `calc(${baseSize} * ${1 - 0.03 * length})`;
    if (this.currentLang === 'zh' && length > 3)
      return `calc(${baseSize} * ${1 - 0.035 * length})`;
    return baseSize;
  },
  async init() {
    const pokemons = await util.fetchData('../data/PokeApi.json');
    this.pokemons = pokemons;
    // get all pokemon types
    pokemons.forEach(pokemon => {
      const langs = Object.keys(pokemon.types);
      const types = langs.map(_ => ({}));
      for (const lang of langs)
        for (const idx in pokemon.types[lang])
          types[idx][lang] = pokemon.types[lang][idx];
      types.length = pokemon.types[langs[0]].length;
      for (const type of types) {
        let isExist = false;
        for (const type1 of this.types.map(t => t[langs[0]]))
          if (type[langs[0]] === type1) isExist = true;
        if (!isExist) this.types.push(type);
      }
    });

    this.isLoading = false;
    // this.types
    // const promises = [];
    // for (let i = 1; i <= this.max; i++) promises.push(this.fetchPokemon(i));
    // await Promise.all(promises);
    // this.pokemons.sort((a, b) => a.id - b.id);
    // document.querySelector('textarea').textContent = JSON.stringify(this.pokemons)
  },
  // async fetchPokemon(id) {
  //   const pokemon = await util.fetchData(`https://pokeapi.co/api/v2/pokemon/${id}`);
  //   const species = await util.fetchData(`https://pokeapi.co/api/v2/pokemon-species/${id}`);
  //   const types = pokemon.types.map(type => type.type.name);
  //   const name = {
  //     en: species.names.find(item => item.language.name === 'en').name,
  //     zh: species.names.find(item => item.language.name === 'zh-Hant').name,
  //   };
  //   function getEntry(entry, language, name = '') {
  //     const results = Array.from(
  //       new Set(
  //         entry
  //           .filter(item => item.language.name === language)
  //           .map(item =>
  //             item['flavor_text']
  //               .replaceAll('\n', language === 'en' ? ' ' : '')
  //               .replaceAll('\f', ' ')
  //               .replaceAll('POKéMON', 'Pokémon')
  //               .replaceAll(name.toUpperCase(), name)
  //           )
  //       )
  //     );
  //     if (results.length > 3) results.length = 3;
  //     return results;
  //   }

  //   this.pokemons.push({
  //     id,
  //     name,
  //     types: {
  //       en: types,
  //       zh: types.map(type => {
  //         if (type === 'grass') return '草';
  //         if (type === 'poison') return '毒';
  //         if (type === 'fire') return '火';
  //         if (type === 'flying') return '飛行';
  //         if (type === 'water') return '水';
  //         if (type === 'bug') return '蟲';
  //         if (type === 'normal') return '一般';
  //         if (type === 'electric') return '電';
  //         if (type === 'ground') return '地面';
  //         if (type === 'fairy') return '妖精';
  //         if (type === 'fighting') return '格鬥';
  //         if (type === 'psychic') return '超能力';
  //         if (type === 'rock') return '岩石';
  //         if (type === 'steel') return '鋼';
  //         if (type === 'ice') return '冰';
  //         if (type === 'ghost') return '幽靈';
  //         if (type === 'dragon') return '龍';
  //         if (type === 'dark') return '惡';
  //       }),
  //     },
  //     genera: {
  //       en: species.genera.find(item => item.language.name === 'en')
  //         ? species.genera.find(item => item.language.name === 'en').genus
  //         : '',
  //       zh: species.genera.find(item => item.language.name === 'zh-Hant')
  //         ? species.genera.find(item => item.language.name === 'zh-Hant').genus
  //         : '',
  //     },
  //     entries: {
  //       en: getEntry(species['flavor_text_entries'], 'en', name.en),
  //       zh: getEntry(species['flavor_text_entries'], 'zh-Hant'),
  //     },
  //   });
  // },
};

createApp(App).mount();
