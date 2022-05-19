<script>
  import { createEventDispatcher } from 'svelte'
  import Image from './Image.svelte'

  export let tokens = []

  const dispatch = createEventDispatcher()

  let highlightToken = ''

  function selectToken (id) {
    return function () {
      highlightToken = id
      dispatch('tokenSelected', { id })
    }
  }
</script>

<ul>
  {#each tokens as token (token.title)}
    <li>
      <Image
        on:click={selectToken(token.tokenId)}
        alt={token.title}
        src={token.url}
        highlight={token.tokenId === highlightToken}
        />
    </li>
{/each}
</ul>

<style>
  ul {
    list-style-type: none;
    margin: 0;
    padding: 0;

    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    gap: 16px;
  }
</style>
