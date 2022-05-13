<script>
  export let src
  export let width = 150
  export let height = 150
  export let alt
  export let highlight = false
</script>

<div class:highlight class="gradient-box">
	<img on:click {src} {width} {height} {alt} />
</div>

<style>
  .highlight {
    box-shadow: 0px 6px 60px rgba(134, 158, 255, 0.5);
  }

  img {
    border: 6px solid transparent;
    border-radius: 24px;
  }
.gradient-box {
  /*max-width: 250px;*/
  position: relative;
    background: linear-gradient(256.24deg, #3D73FF -30.68%, rgba(121, 174, 255, 0.8) 23.64%, rgba(145, 142, 255, 0.75) 63.28%, rgba(87, 122, 255, 0.35) 97.37%);
  padding: 1px;
display: flex;
justify-content: center;
align-items: center;
border-radius: 24px;
}
</style>
