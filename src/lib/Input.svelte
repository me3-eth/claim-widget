<script>
  export let label
  export let placeholder
  export let value
  export let domain

  export let highlightError = false
  export let validations = []
  export let hasError = !value

  let field
  let id = `field-${Date.now()}`

  function validate (ev) {
    const { value } = ev.target
    hasError = !(validations.every(fn => fn(value)))

    if (highlightError && !hasError) highlightError = false
  }
</script>

<label for={id}>{label}:</label>

<div class="fake-input" class:error={highlightError}>
  <input
    bind:this={field}
    on:input={validate}
    bind:value={value}
    type="text"
    placeholder={placeholder}
    name={id}
    {id}
    />
    <span>.{domain}</span>
</div>

<style>
  .error {
    border: 1px solid red;
  }

  input {
    border: 0;
    text-align: right;
    outline: 0;
    width: 100%;
    background: transparent;
    color: var(--me3-input-text-color, #1c1c33);
    margin: 0;
    padding: 0;
  }

  .fake-input {
    display: flex;
    flex-direction: row;
    align-items: center;

    border-radius: var(--me3-input-border-radius, 8px);
    border: var(--me3-input-border, 1px solid #dedede);
    padding: var(--me3-input-padding, 8px);
    margin: var(--me3-input-margin, 8px);
  }
</style>
