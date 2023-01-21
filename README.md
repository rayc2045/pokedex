# Pokédex｜寶可夢圖鑑

![cover](https://cdn.dribbble.com/users/3800131/screenshots/20373285/media/49406b603c8d8386bd9cf6bcfb67cc6d.png)

[> Pokédex](https://pokedex-list.netlify.app/)

### 簡介
> 在 Instagram 看到有人分享在日本操作機器、製作寶可夢客製化衣服的貼文，聯想起先前在網上閱讀到關於 Pokémon API 的文章，一時興起也使用 [PokeAPI](https://pokeapi.co/) 仿刻貼文中機器的操作介面。然而在開發過程中，發現連續抓取 905 份寶可夢資料實在耗時 (約 50 秒)，因此特意自製一份包含了 905 隻寶可夢 id、名稱、圖片及種類的 JSON 資料檔，極大縮短頁面的載入時間。

### 外觀與互動設計
- 使用瀏覽器內建支援的色彩 - [HTML Colors](https://www.w3schools.com/tags/ref_colornames.asp) 作為色票參考
- 使用[思源黑體 (Noto Sans TC)](https://fonts.google.com/noto/specimen/Noto+Sans+TC) 作為網站字體
- 加入寶貝球圖片配上 CSS 旋轉動畫作為網頁載入完成前的過場
- 透過載入目標數和當前資料量做計算、結合樣式綁定 (Style Binding) 方法，製作出頁面上方跑動的進度條
- 參考 W3Schools 介紹使用 CSS 製作的[提示框 (Tooltip)](https://www.w3schools.com/css/css_tooltip.asp)，做出滑鼠碰觸圖鑑元素就會在序號前顯示寶可夢名稱的方便設計
- 資訊卡中的寶可夢圖片加上白色陰影 ([CSS `drop-shadow()`](https://developer.mozilla.org/en-US/docs/Web/CSS/filter-function/drop-shadow))，達成如同發出光輝般的效果
- 設計在大尺寸螢幕上，元素及字體大小能夠自適應縮放的響應式設計

### 開發紀錄
- 透過 Node.js 將 PokeAPI 905 份寶可夢資料轉換成一份 [JSON API](https://raw.githubusercontent.com/rayc2045/pokedex/main/data/PokeApi.json)，將網頁載入時間縮短為 1 秒，並實現中英語言切換
- 使用體積小的 Vue 代替方案 - [Petite Vue](https://github.com/vuejs/petite-vue) 作為開發方式
- 使用寶可夢的 `types` 資料，製作出可透過點擊切換不同寶可夢種類的標籤
- 開發過程中發現在切換寶可夢分類 (filter) 時，相較於建立 computed 的資料再使用 Vue 語法 `v-for` 產出元素，透過對元素綁定 HTML 屬性 `hidden` 或是改變其 CSS 屬性 `display` 的作法，有更好的狀態更新效能
- 分別針對資訊卡中的寶可夢中、英文名字，以平均字數為基準，自動調整字體大小