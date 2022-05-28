<script>
  export let src
  export let width = 97
  export let height = 97
  export let alt
  export let highlight = false
  export let label
</script>

<div class:highlight>
  <img on:click {src} {width} {height} {alt} />
  <p>{label}</p>
</div>

<style>
  div {
    border: none;
    border-radius: 32px;
    opacity: 0.2;

    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;
    gap: 16px;
  }

  .highlight {
    opacity: 1;
  }

  img {
    border: none;
    border-radius: 32px;
  }

  .highlight img {
    box-shadow: 0px 6px 30px rgba(134, 158, 255, 0.5);
  }

  p {
    margin: 0;
    color: #515161;
  }

</style>
