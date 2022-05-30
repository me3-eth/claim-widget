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
        on:click={selectToken(token.id.tokenId)}
        alt={token.title}
        src={token.media[0].gateway}
        label="#{parseInt(token.id.tokenId)}"
        highlight={token.id.tokenId === highlightToken}
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
    gap: 24px;
  }
</style>
